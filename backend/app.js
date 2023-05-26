const express = require('express');
const mongoose = require('mongoose');

const Usuario = require('./models/usuario');
const UsuarioResponsavel = require('./models/usuarioResponsavel')
const ContatoUsuario = require('./models/contato')
const Categoria = require('./models/categoria')
const CategoriaFigura = require('./models/categoriaFigura')
const Figura  = require('./models/figura')


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
    app.use(express.urlencoded({extended : true}))
    app.use(express.json());


    router.get('/',(req,res)=>res.json({message:'Funcionando'}));

    //API Usuario

    
    router.post('/usuarios', (req, res) => {
    const usuario = new Usuario(req.body);
    usuario.save()
      .then(() => {
        res.status(201).send('Usuário criado com sucesso');
      })
      .catch((error) => {
        res.status(400).send('Erro ao criar usuário: ' + error);
      });
  });
  
  
  router.put('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    Usuario.findByIdAndUpdate(id, req.body)
      .then(() => {
        res.send('Usuário atualizado com sucesso');
      })
      .catch((error) => {
        res.status(400).send('Erro ao atualizar usuário: ' + error);
      });
  });
  
 
  router.get('/usuarios', (req, res) => {
    Usuario.find()
      .then((usuarios) => {
        res.send(usuarios);
      })
      .catch((error) => {
        res.status(500).send('Erro ao obter usuários: ' + error);
      });
  });
  

  router.delete('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    Usuario.findByIdAndDelete(id)
      .then(() => {
        res.send('Usuário excluído com sucesso');
      })
      .catch((error) => {
        res.status(400).send('Erro ao excluir usuário: ' + error);
      });
  });


  //FIM API Usuario


  //API UsuarioResponsavel

  router.post('/usuarios-responsaveis', async (req, res) => {
    try {
      const usuarioResponsavel = await UsuarioResponsavel.create(req.body);
      res.status(201).json(usuarioResponsavel);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar usuário responsável' });
    }
  });
  

  router.get('/usuarios-responsaveis', async (req, res) => {
    try {
      const usuariosResponsaveis = await UsuarioResponsavel.find();
      res.json(usuariosResponsaveis);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter usuários responsáveis' });
    }
  });
  
  
  router.get('/usuarios-responsaveis/:id', async (req, res) => {
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
  
  
  router.put('/usuarios-responsaveis/:id', async (req, res) => {
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
  
  
  router.delete('/usuarios-responsaveis/:id', async (req, res) => {
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


  router.post('/contatos-usuario', async (req, res) => {
    try {
      const contatoUsuario = await ContatoUsuario.create(req.body);
      res.status(201).json(contatoUsuario);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar contato de usuário' });
    }
  });
  

  router.get('/contatos-usuario', async (req, res) => {
    try {
      const contatosUsuario = await ContatoUsuario.find();
      res.json(contatosUsuario);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter contatos de usuário' });
    }
  });
  
 
  router.get('/contatos-usuario/:id', async (req, res) => {
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
  

  router.put('/contatos-usuario/:id', async (req, res) => {
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
  
 
  router.delete('/contatos-usuario/:id', async (req, res) => {
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

    router.get('/figuras', async (req, res) => {
      try {
        const figuras = await Figura.find();
        res.json(figuras);
      } catch (error) {
        res.status(500).json({ error: 'Erro ao obter as figuras' });
      }
    });
    
    
    router.post('/figuras', async (req, res) => {
      try {
        const novaFigura = new Figura(req.body);
        await novaFigura.save();
        res.status(201).json(novaFigura);
      } catch (error) {
        res.status(500).json({ error: 'Erro ao criar a figura' });
      }
    });
    
 
    router.get('/figuras/:id', async (req, res) => {
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
    
   
    router.put('/figuras/:id', async (req, res) => {
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
    
   
    router.delete('/figuras/:id', async (req, res) => {
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

    router.get('/categorias', async (req, res) => {
      try {
        const categorias = await Categoria.find();
        res.json(categorias);
      } catch (error) {
        res.status(500).json({ error: 'Erro ao obter as categorias' });
      }
    });
    
    router.post('/categorias', async (req, res) => {
      try {
        const novaCategoria = new Categoria(req.body);
        await novaCategoria.save();
        res.status(201).json(novaCategoria);
      } catch (error) {
        res.status(500).json({ error: 'Erro ao criar a categoria' });
      }
    });
    
    router.get('/categorias/:id', async (req, res) => {
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
    
    router.put('/categorias/:id', async (req, res) => {
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
    
    router.delete('/categorias/:id', async (req, res) => {
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


  app.use('/',router);
  app.listen(3000)
  console.log("Servidor funcionando ")
