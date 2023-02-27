export default class Table {
  constructor(){    
    this.table = document.querySelector('tbody')    
    this.CreateTable()
  }

  async GetRequest(){
    const url = `http://localhost:3000/api`
    const response = await fetch(url)
    return await response.json()   
  }

  CreateTable(){
    this.ResetTable()    
    this.GetRequest().then( data => {
      data.forEach( item => {        
        const tr = document.createElement('tr')
        this.table.appendChild(tr)
        for(let i = 0; i < 3; i++){
          const td = document.createElement('td')
          tr.appendChild(td)
          if (i === 0) {
            td.innerText = `${item.codigo}`
          }
          if (i === 1) {
            td.innerText = `${item.produto}`
          }
          if (i === 2) {
            td.innerText = `${item.quantidade}`
          }
        }
      })
    })
  }

  ResetTable(){
    const trs = document.querySelectorAll('tbody tr')
    trs.forEach( tr => {  
      this.table.removeChild(tr)
    })    
  }
}

