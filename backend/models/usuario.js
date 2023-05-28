const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


  // Definir esquemas

const UsuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true, unique: true},
    email: { type: String, required: true },
    senha :{ type: String, required: true },
    observacao :{ type: String, required: false},
    foto :{ type: Buffer, required: false},
    apelido : { type: String, required: false },
  },{timestamps: true});


  UsuarioSchema.pre('save', async function(next) {
    // Verifica se a senha foi modificada ou é nova
    if (!this.isModified('senha')) {
      return next();
    }
  
    try {
      // Gera um hash seguro para a senha usando o bcrypt
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.senha, salt);
      // Substitui a senha em texto claro pelo hash
      this.senha = hashedPassword;
      next();
    } catch (error) {
      return next(error);
    }
  });

module.exports = mongoose.model('Usuario', UsuarioSchema);