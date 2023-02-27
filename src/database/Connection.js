const mongoose = require('mongoose')

class Connection {
  
  async connectMongo(){
    try {
      mongoose.set('strictQuery', true)
      const {connection} = await mongoose.connect('mongodb://127.0.0.1:27017/lista-de-compras')
      // console.log(connection.readyState)
      if (connection.readyState === 1) {
        return Promise.resolve(true)
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
module.exports = Connection