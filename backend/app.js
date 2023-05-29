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


//API UsuarioResponsavel

router.post('/usuario-responsavel', async (req, res) => {
  try {
    const usuarioResponsavel = await UsuarioResponsavel.create(req.body);
    res.status(201).json(usuarioResponsavel);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário responsável' });
  }
});


router.get('/usuario-responsavel', async (req, res) => {
  try {
    const usuariosResponsaveis = await UsuarioResponsavel.find();
    res.json(usuariosResponsaveis);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter usuários responsáveis' });
  }
});


router.get('/usuario-responsavel/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const usuarioResponsavel = await UsuarioResponsavel.findById(id);
    if (usuarioResponsavel) {
      res.json(usuarioResponsavel);
    } else {
      res.status(404).json({ error: 'Usuário responsável não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter usuário responsável' });
  }
});


router.put('/usuario-responsavel/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const usuarioResponsavel = await UsuarioResponsavel.findByIdAndUpdate(id, req.body, { new: true });
    if (usuarioResponsavel) {
      res.json(usuarioResponsavel);
    } else {
      res.status(404).json({ error: 'Usuário responsável não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário responsável' });
  }
});


router.delete('/usuario-responsavel/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const usuarioResponsavel = await UsuarioResponsavel.findByIdAndDelete(id);
    if (usuarioResponsavel) {
      res.json({ message: 'Usuário responsável excluído com sucesso' });
    } else {
      res.status(404).json({ error: 'Usuário responsável não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir usuário responsável' });
  }
});



//FIM API UsuarioResponsavel

//API Contato


router.post('/contato-usuario', async (req, res) => {
  try {
    const contatoUsuario = await ContatoUsuario.create(req.body);
    res.status(201).json(contatoUsuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar contato de usuário' });
  }
});


router.get('/contato-usuario', async (req, res) => {
  try {
    const contatosUsuario = await ContatoUsuario.find();
    res.json(contatosUsuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter contatos de usuário' });
  }
});


router.get('/contato-usuario/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const contatoUsuario = await ContatoUsuario.findById(id);
    if (contatoUsuario) {
      res.json(contatoUsuario);
    } else {
      res.status(404).json({ error: 'Contato de usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter contato de usuário' });
  }
});


router.put('/contato-usuario/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const contatoUsuario = await ContatoUsuario.findByIdAndUpdate(id, req.body, { new: true });
    if (contatoUsuario) {
      res.json(contatoUsuario);
    } else {
      res.status(404).json({ error: 'Contato de usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar contato de usuário' });
  }
});


router.delete('/contato-usuario/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const contatoUsuario = await ContatoUsuario.findByIdAndDelete(id);
    if (contatoUsuario) {
      res.json({ message: 'Contato de usuário excluído com sucesso' });
    } else {
      res.status(404).json({ error: 'Contato de usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir contato de usuário' });
  }
});

//Fim API Contato

// API Figura

router.get('/figura', async (req, res) => {
  try {
    const figuras = await Figura.find();
    res.json(figuras);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter as figuras' });
  }
});


router.post('/figura', async (req, res) => {
  try {
    const novaFigura = new Figura(req.body);
    await novaFigura.save();
    res.status(201).json(novaFigura);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar a figura' });
  }
});


router.get('/figura/:id', async (req, res) => {
  try {
    const figura = await Figura.findById(req.params.id);
    if (figura) {
      res.json(figura);
    } else {
      res.status(404).json({ error: 'Figura não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter a figura' });
  }
});


router.put('/figura/:id', async (req, res) => {
  try {
    const figura = await Figura.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (figura) {
      res.json(figura);
    } else {
      res.status(404).json({ error: 'Figura não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar a figura' });
  }
});


router.delete('/figura/:id', async (req, res) => {
  try {
    const figura = await Figura.findByIdAndDelete(req.params.id);
    if (figura) {
      res.json({ message: 'Figura excluída com sucesso' });
    } else {
      res.status(404).json({ error: 'Figura não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir a figura' });
  }
});

//Fim API Contato

//API Categoria

router.get('/categoria', async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter as categorias' });
  }
});

router.get('/categoria/:id', async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id);
    if (categoria) {
      res.json(categoria);
    } else {
      res.status(404).json({ error: 'Categoria não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter a categoria' });
  }
});

router.post('/categoria', async (req, res) => {
  try {
    const novaCategoria = new Categoria(req.body);
    await novaCategoria.save();
    res.status(201).json(novaCategoria);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar a categoria' });
  }
});

router.put('/categoria/:id', async (req, res) => {
  try {
    const categoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (categoria) {
      res.json(categoria);
    } else {
      res.status(404).json({ error: 'Categoria não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar a categoria' });
  }
});

router.delete('/categoria/:id', async (req, res) => {
  try {
    const categoria = await Categoria.findByIdAndDelete(req.params.id);
    if (categoria) {
      res.json({ message: 'Categoria excluída com sucesso' });
    } else {
      res.status(404).json({ error: 'Categoria não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir a categoria' });
  }
});

//Fim Categoria

//API CategoriaFigura

router.get('/categoria-figuras', async (req, res) => {
  try {
    const categoriaFiguras = await CategoriaFigura.find();
    res.json(categoriaFiguras);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter as categorias de figuras' });
  }
});

router.post('/categoria-figuras', async (req, res) => {
  try {
    const novaCategoriaFigura = new CategoriaFigura(req.body);
    await novaCategoriaFigura.save();
    res.status(201).json(novaCategoriaFigura);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar a categoria de figura' });
  }
});

router.get('/categoria-figuras/:id', async (req, res) => {
  try {
    const categoriaFigura = await CategoriaFigura.findById(req.params.id);
    if (categoriaFigura) {
      res.json(categoriaFigura);
    } else {
      res.status(404).json({ error: 'Categoria de figura não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter a categoria de figura' });
  }
});

router.put('/categoria-figuras/:id', async (req, res) => {
  try {
    const categoriaFigura = await CategoriaFigura.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (categoriaFigura) {
      res.json(categoriaFigura);
    } else {
      res.status(404).json({ error: 'Categoria de figura não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar a categoria de figura' });
  }
});

router.delete('/categoria-figuras/:id', async (req, res) => {
  try {
    const categoriaFigura = await CategoriaFigura.findByIdAndDelete(req.params.id);
    if (categoriaFigura) {
      res.json({ message: 'Categoria de figura excluída com sucesso' });
    } else {
      res.status(404).json({ error: 'Categoria de figura não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir a categoria de figura' });
  }
});

//Fim CategoriaFigura

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




app.use('/', router);
app.listen(3000)
console.log("Servidor funcionando ")