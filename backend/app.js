const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const Usuario = require('./models/usuario');
const UsuarioResponsavel = require('./models/usuarioResponsavel')
const ContatoUsuario = require('./models/contato')
const Categoria = require('./models/categoria')
const CategoriaFigura = require('./models/categoriaFigura')
const Figura = require('./models/figura')
const fs = require('fs');

const mongoURI = 'mongodb+srv://saulopontes:sauloPontesBlue@clusterbluetalks.kd8yiz7.mongodb.net/blueTalksDB';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 50000
};

mongoose.connect(mongoURI, options)
  .then(() => {
    console.log('Conexão bem-sucedida ao MongoDB');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
  });



const app = express();
const router = express.Router();
app.use(require('cors')());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use('/uploads', express.static('uploads'));

router.get('/', (req, res) => res.json({ message: 'Funcionando' }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const directory = 'uploads/';
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }
    cb(null, directory);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });



//API Usuario


router.post('/usuario', upload.single('foto'), async (req, res) => {
  try {
    const { nome, email, senha, observacao, apelido } = req.body;
    const fotoPerfil = req.file.filename;
    const novoUsuario = new Usuario({ nome, email, senha, observacao, foto: fotoPerfil, apelido });
    await novoUsuario.save();
    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ message: 'Erro ao criar usuário' });
  }
});


router.get('/usuario', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
    res.status(500).json({ message: 'Erro ao obter usuários' });
  }
});


router.get('/usuario/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }
    res.json(usuario);
  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    res.status(500).json({ message: 'Erro ao obter usuário' });
  }
});

app.get('/usuario/:id/foto', async (req, res) => {
  try {
    const id = req.params.id;
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }
    const fotoPerfil = usuario.foto;
    const caminhoFoto = 'uploads/' + fotoPerfil;
    const foto = fs.readFileSync(caminhoFoto);
    res.set('Content-Type', 'image/jpeg');
    res.send(foto);
  } catch (error) {
    console.error('Erro ao obter a foto do usuário:', error);
    res.status(500).json({ message: 'Erro ao obter a foto do usuário' });
  }
});



router.put('/usuario/:id', upload.single('foto'), async (req, res) => {
  try {
    const id = req.params.id;
    const { nome, email, senha, observacao, apelido } = req.body;
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }


    if (req.file) {
      const fotoPerfil = req.file.filename;

      if (usuario.foto) {
        const caminhoFotoAntiga = 'uploads/' + usuario.foto;
        fs.unlinkSync(caminhoFotoAntiga);
      }

      usuario.foto = fotoPerfil;
    }


    usuario.nome = nome;
    usuario.email = email;
    usuario.senha = senha;
    usuario.observacao = observacao;
    usuario.apelido = apelido;

    await usuario.save();
    res.json(usuario);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ message: 'Erro ao atualizar usuário' });
  }
});





router.delete('/usuario/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const usuario = await Usuario.findByIdAndDelete(id);
    if (!usuario) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }
    res.json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({ message: 'Erro ao excluir usuário' });
  }
});

//FIM API Usuario


// API adicionando figuras aos usuarios

router.get('/usuario/:usuarioId/figuras', async (req, res) => {
  const usuarioId = req.params.usuarioId;

  try {
    const usuario = await Usuario.findById(usuarioId).populate('figuras');
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json(usuario.figuras);
  } catch (error) {
    console.error('Erro ao obter as figuras:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota para adicionar uma figura a um usuário
router.post('/usuario/:usuarioId/figura', upload.fields([{ name: 'imagem', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), async (req, res) => {
  const usuarioId = req.params.usuarioId;
  const { nome_figura, figura_favorita } = req.body;

  try {
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const imagemPath = req.files['imagem'][0].path;
    const audioPath = req.files['audio'][0].path;

    const figura = new Figura({
      usuario: usuario._id,
      imagem: imagemPath,
      nome_figura,
      audio: audioPath,
      figura_favorita
    });

    await figura.save();

    usuario.figuras.push(figura._id);
    await usuario.save();

    res.status(201).json({ message: 'Figura adicionada com sucesso' });
  } catch (error) {
    console.error('Erro ao adicionar a figura:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota para remover uma figura do usuário
router.delete('/usuario/:usuarioId/figura/:figuraId', async (req, res) => {
  const usuarioId = req.params.usuarioId;
  const figuraId = req.params.figuraId;

  try {
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const figura = await Figura.findOneAndDelete({ _id: figuraId, usuario: usuario._id });
    if (!figura) {
      return res.status(404).json({ message: 'Figura não encontrada' });
    }

    fs.unlink(figura.imagem, (error) => {
      if (error) {
        console.error('Erro ao remover o arquivo de imagem:', error);
      }
    });
    fs.unlink(figura.audio, (error) => {
      if (error) {
        console.error('Erro ao remover o arquivo de áudio:', error);
      }
    });

    usuario.figuras.pull(figura._id);
    await usuario.save();

    res.status(200).json({ message: 'Figura removida com sucesso' });
  } catch (error) {
    console.error('Erro ao remover a figura:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota para atualizar uma figura do usuário
router.put('/usuario/:usuarioId/figura/:figuraId', upload.fields([{ name: 'imagem', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), async (req, res) => {
  const usuarioId = req.params.usuarioId;
  const figuraId = req.params.figuraId;
  const { nome_figura, figura_favorita } = req.body;

  try {
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const figura = await Figura.findOne({ _id: figuraId, usuario: usuario._id });
    if (!figura) {
      return res.status(404).json({ message: 'Figura não encontrada' });
    }

    if (req.files['imagem']) {
      fs.unlink(figura.imagem, (error) => {
        if (error) {
          console.error('Erro ao remover o arquivo de imagem antigo:', error);
        }
      });
      figura.imagem = req.files['imagem'][0].path;
    }

    if (req.files['audio']) {
      fs.unlink(figura.audio, (error) => {
        if (error) {
          console.error('Erro ao remover o arquivo de áudio antigo:', error);
        }
      });
      figura.audio = req.files['audio'][0].path;
    }

    figura.nome_figura = nome_figura;
    figura.figura_favorita = figura_favorita;

    await figura.save();

    res.status(200).json({ message: 'Figura atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar a figura:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota para deletar todas as figuras de um usuário
router.delete('/usuario/:usuarioId/figuras', async (req, res) => {
  const usuarioId = req.params.usuarioId;

  try {
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    for (const figuraId of usuario.figuras) {
      const figura = await Figura.findById(figuraId);
      if (figura) {
        fs.unlink(figura.imagem, (error) => {
          if (error) {
            console.error('Erro ao remover o arquivo de imagem:', error);
          }
        });
        fs.unlink(figura.audio, (error) => {
          if (error) {
            console.error('Erro ao remover o arquivo de áudio:', error);
          }
        });
        await figura.delete();
      }
    }

    usuario.figuras = [];
    await usuario.save();

    res.status(200).json({ message: 'Todas as figuras foram removidas com sucesso' });
  } catch (error) {
    console.error('Erro ao remover as figuras:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota para deletar uma figura pelo nome da figura
router.delete('/usuario/:usuarioId/figura/nome/:nomeFigura', async (req, res) => {
  const usuarioId = req.params.usuarioId;
  const nomeFigura = req.params.nomeFigura;

  try {
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const figura = await Figura.findOneAndDelete({ nome_figura: nomeFigura, usuario: usuario._id });
    if (!figura) {
      return res.status(404).json({ message: 'Figura não encontrada' });
    }

    fs.unlink(figura.imagem, (error) => {
      if (error) {
        console.error('Erro ao remover o arquivo de imagem:', error);
      }
    });
    fs.unlink(figura.audio, (error) => {
      if (error) {
        console.error('Erro ao remover o arquivo de áudio:', error);
      }
    });

    usuario.figuras.pull(figura._id);
    await usuario.save();

    res.status(200).json({ message: 'Figura removida com sucesso' });
  } catch (error) {
    console.error('Erro ao remover a figura:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});


// Rota para atualizar uma figura pelo nome da figura
router.put('/usuario/:usuarioId/figura/nome/:nomeFigura', upload.fields([{ name: 'imagem', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), async (req, res) => {
  const usuarioId = req.params.usuarioId;
  const nomeFigura = req.params.nomeFigura;
  const { figura_favorita } = req.body;

  try {
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const figura = await Figura.findOne({ nome_figura: nomeFigura, usuario: usuario._id });
    if (!figura) {
      return res.status(404).json({ message: 'Figura não encontrada' });
    }

    if (req.files['imagem']) {
      fs.unlink(figura.imagem, (error) => {
        if (error) {
          console.error('Erro ao remover o arquivo de imagem antigo:', error);
        }
      });
      figura.imagem = req.files['imagem'][0].path;
    }

    if (req.files['audio']) {
      fs.unlink(figura.audio, (error) => {
        if (error) {
          console.error('Erro ao remover o arquivo de áudio antigo:', error);
        }
      });
      figura.audio = req.files['audio'][0].path;
    }

    figura.nome_figura = nomeFigura;
    figura.figura_favorita = figura_favorita;

    await figura.save();

    res.status(200).json({ message: 'Figura atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar a figura:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});


// RELAÇAO CONTATO E USUARIO


router.post('/usuario/:id/contato', async (req, res) => {
  const { numero, nome, relacao } = req.body;
  const usuarioId = req.params.id;

  try {
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const contato = new ContatoUsuario({
      usuario: usuarioId,
      numero,
      nome,
      relacao
    });

    const novoContato = await contato.save();
    usuario.contatos.push(novoContato._id);
    await usuario.save();

    res.status(201).json(novoContato);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.get('/usuario/:id/contatos', async (req, res) => {
  const usuarioId = req.params.id;

  try {
    const usuario = await Usuario.findById(usuarioId).populate('contatos');
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json(usuario.contatos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/usuario/:id/contatos/:contatoNome', async (req, res) => {
  const usuarioId = req.params.id;
  const contatoNome = req.params.contatoNome;

  try {
    const usuario = await Usuario.findById(usuarioId).populate('contatos');
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const contato = usuario.contatos.find(contato => contato.nome === contatoNome);
    if (!contato) {
      return res.status(404).json({ message: 'Contato não encontrado' });
    }

    res.json(contato);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.put('/usuario/:id/contato/:contatoNome', async (req, res) => {
  const usuarioId = req.params.id;
  const contatoNome = req.params.contatoNome;
  const { numero, nome, relacao } = req.body;

  try {
    const usuario = await Usuario.findById(usuarioId).populate('contatos');
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const contato = usuario.contatos.find(contato => contato.nome === contatoNome);
    if (!contato) {
      return res.status(404).json({ message: 'Contato não encontrado' });
    }

    contato.numero = numero;
    contato.nome = nome;
    contato.relacao = relacao;
    await contato.save();

    res.json(contato);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



router.delete('/usuario/:id/contato/:contatoNome', async (req, res) => {
  const usuarioId = req.params.id;
  const contatoNome = req.params.contatoNome;

  try {
    const usuario = await Usuario.findById(usuarioId).populate('contatos');
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const contatoIndex = usuario.contatos.findIndex(contato => contato.nome === contatoNome);
    if (contatoIndex === -1) {
      return res.status(404).json({ message: 'Contato não encontrado' });
    }

    const contatoId = usuario.contatos[contatoIndex]._id;
    usuario.contatos.splice(contatoIndex, 1);
    await usuario.save();

    await ContatoUsuario.findByIdAndRemove(contatoId);

    res.json({ message: 'Contato removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



  // rotas get/put/post/delete usuario responsavel para o usuario
router.post('/usuario/:usuarioId/responsavel', async (req, res) => {
  const usuarioId = req.params.usuarioId;
  const { nomeResponsavel } = req.body;

  try {
    const usuario = await Usuario.findOne({ nome: nomeResponsavel });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário responsável não encontrado' });
    }

    const usuarioResponsavelObj = new UsuarioResponsavel({
      usuario_responsavel: usuario._id,
      usuario_dependente: usuarioId
    });

    await usuarioResponsavelObj.save();

    res.status(201).json({ message: 'Usuário responsável adicionado com sucesso' });
  } catch (error) {
    console.error('Erro ao adicionar o usuário responsável:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Obter usuário responsável de um usuário específico
router.get('/usuario/:usuarioId/responsavel', async (req, res) => {
  const usuarioId = req.params.usuarioId;

  try {
    const usuarioResponsavel = await UsuarioResponsavel.findOne({ usuario_dependente: usuarioId })
      .populate('usuario_responsavel')
      .exec();

    if (!usuarioResponsavel) {
      return res.status(404).json({ message: 'Usuário responsável não encontrado' });
    }

    res.json(usuarioResponsavel.usuario_responsavel);
  } catch (error) {
    console.error('Erro ao obter o usuário responsável:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Atualizar usuário responsável de um usuário específico
router.put('/usuario/:usuarioId/responsavel', async (req, res) => {
  const usuarioId = req.params.usuarioId;
  const { nomeResponsavel } = req.body;

  try {
    const usuario = await Usuario.findOne({ nome: nomeResponsavel });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário responsável não encontrado' });
    }

    const usuarioResponsavel = await UsuarioResponsavel.findOneAndUpdate(
      { usuario_dependente: usuarioId },
      { usuario_responsavel: usuario._id },
      { new: true }
    );

    if (!usuarioResponsavel) {
      return res.status(404).json({ message: 'Usuário responsável não encontrado' });
    }

    res.json({ message: 'Usuário responsável atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar o usuário responsável:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Remover usuário responsável de um usuário específico
router.delete('/usuario/:usuarioId/responsavel', async (req, res) => {
  const usuarioId = req.params.usuarioId;

  try {
    const usuarioResponsavel = await UsuarioResponsavel.findOneAndDelete({ usuario_dependente: usuarioId });

    if (!usuarioResponsavel) {
      return res.status(404).json({ message: 'Usuário responsável não encontrado' });
    }

    res.json({ message: 'Usuário responsável removido com sucesso' });
  } catch (error) {
    console.error('Erro ao remover o usuário responsável:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});



// FIM rotas get/put/post/delete usuario responsavel para o usuario

app.use('/', router);
app.listen(3000)
console.log("Servidor funcionando ")