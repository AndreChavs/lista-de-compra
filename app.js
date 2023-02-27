const express = require('express')
const Connection = require('./src/database/Connection.js')
const Produto = require('./src/models/Produto.js')


class Server { 
  constructor(){
    this.app = express()
    this.porta = 3000
    this.connect = new Connection()
    this.db = new Produto()
    this.app.set('view engine', 'ejs')
    this.app.use(express.static('public'))    
    this.app.use(express.json())
    this.home()
    this.getData()
    this.adicionar()
    this.alterar()
    this.excluir()       
    this.listen()
  }

  home(){    
    this.app.get('/', async (req, res) => {
      this.connect.connectMongo().catch((error) => {
        res.status(405).json({error: `${error}`})
      })
      const produtos = await this.db.produto.find({})            
      if (produtos) {
        return res.render('index.ejs', {produtos})
      } else {
        return res.status(404).json({error: 'Data not Found'})
      }
    })
  }

  getData(){
    this.app.get('/api', async (req, res) => {
      this.connect.connectMongo().catch((error) => {
        res.status(405).json({error: `${error}`})
      })
      const data = await this.db.produto.find({})      
      if(data){
        return res.status(200).json(data)
      } else{
        return res.status(404).json({error: 'Data not Found'})
      }
    })
  }

  adicionar(){    
    this.app.post('/api', async (req, res) => {      
      this.connect.connectMongo().catch((error) => {
        res.status(405).json({error: `${error}`})
      })      
      const formData = req.body
      if(!formData){
        return res.status(404).json({error: 'Data not provider'})         
      }else {
        const {produto, quantidade, codigo} = formData        
        const verification = await this.db.produto.findOne({codigo: codigo})        
        if (verification === null) {
          await this.db.produto.create(formData, (error, data) => {
            return res.status(200).json({data: data})        
          })
        }else {
          return res.status(404).json({error: `Item ja existente no banco de dados`})
        }
      }
    })
  }

  alterar(){
    this.app.put('/api', async (req, res) => {
      this.connect.connectMongo().catch((error) => {
        res.status(405).json({error: `${error}`})
      })
      const formData = req.body
      if(!formData){
        return res.status(404).json({error: 'Data not provider'})        
      }else {
        const {codigo, produto, quantidade} = formData        
        const data = await this.db.produto.findOneAndUpdate(
          {codigo},
          {produto: produto, quantidade: quantidade},
          {new: true}
        )        
        return res.status(200).json({alteracao: data})
      }
    })
  }

  excluir(){
    this.app.delete('/api', async (req, res) => {
      this.connect.connectMongo().catch((error) => {
        res.status(405).json({error: `${error}`})
      })
      const {codigo} = req.body
      if (!codigo) {
        return res.status(404).json({error: 'Data not provider'})
      } else {
        const deleted = await this.db.produto.findOneAndDelete({codigo})
        return res.status(200).json({delete: deleted})
      }
    })
  }

  listen(){
    this.app.listen(this.porta, (error) => {
      if (error) {
        console.log(`Erro ao iniciar o servidor na porta: ${this.porta}`)
      } else {
        console.log(`Servidor Rodando http://localhost:${this.porta}`)
      }
    })
  }
}

new Server()
