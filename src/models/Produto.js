const mongoose = require('mongoose')
const {Schema, model, models} = mongoose

class Produto {
  constructor(){
    this.produto = models.produto || model('produto', this.produtoSchema())
  }

  produtoSchema(){
    return new Schema({
      codigo: Number,
      produto: String,
      quantidade: Number
    })
  }
}

module.exports = Produto