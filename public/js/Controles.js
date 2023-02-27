import Table from "./Table.js"
export default class Controles {
  constructor(){
    this.adicionar = document.querySelector('.adicionar button')
    this.alterar = document.querySelector('.alterar button')
    this.excluir = document.querySelector('.excluir button')    
    this.Adicionar()
    this.Alterar()
    this.Excluir()
    this.Table = new Table()
  }  
  
  Adicionar(){        
    this.adicionar.addEventListener('click',(event) => {
      event.preventDefault()
      const codigo = Number(document.querySelector('input#add-code').value)     
      const produto = (document.querySelector('input#add-nome').value).toLowerCase()
      const quantidade = Number(document.querySelector('input#add-quant').value)
      if ((codigo !== 0) && (quantidade !== 0) && (produto.length !== 0)) {
        this.Request('POST', {
          produto: produto, 
          quantidade: quantidade, 
          codigo: codigo
        });
        this.Table.CreateTable()
      } else {
        alert('Preencha os Campos corretamente!')
      }                      
    })
  }

 Alterar(){
  this.alterar.addEventListener('click', (event) => {
    event.preventDefault()
    const codigo = Number(document.querySelector('input#alterar-codigo').value)
    const produto = (document.querySelector('input#alterar-produto').value).toLowerCase()
    const quantidade = Number(document.querySelector('input#alterar-quantidade').value)
    if ((codigo !== 0) && (produto.length !== 0) && (quantidade !== 0)) {
      this.Request('PUT', {
        codigo: codigo,
        produto: produto,
        quantidade: quantidade
      }).then( response => console.log(response))
      this.Table.CreateTable()
    } else {
      alert('Preencha os Campos corretamente!')
    }
  })
 }

 Excluir(){
  this.excluir.addEventListener('click', (event) => {
    event.preventDefault()
    const codigo = Number(document.querySelector('input#excluir-produto').value)
    if (codigo !== 0) {
      this.Request('DELETE',{
        codigo: codigo
      }).then( response => console.log(response))
    }else {
      alert('Preencha os Campos corretamente!')
    }
  })
 }

  async Request(method, data){
    const url = `http://localhost:3000/api`
    const options = {
      method: method,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }
    const response = await fetch(url, options)
    console.log(response)    
    if (response.ok) {
      return await response.json()
    } else {
      const json = await response.json()
      alert(`${json.error}`)
      return
    }
    
  }
  
}