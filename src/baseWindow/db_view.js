const { database } = require('../database')
const table = document.querySelector('.data')
const testBtn = document.querySelector('button')
let stateTable = []

function viewAllClients(clients) {
  clients.map((client) => {
    const row = document.createElement('tr')
    for (let item in client) {
      const td = document.createElement('td')
      td.innerText = `${client[item]}`
      row.appendChild(td)
    }
    table.appendChild(row)
  })
}

function fetchItems() {
  database('items')
    .select()
    .then((items) => {
      items.map((item, index) => {
        stateTable.push(item)
      })
      viewAllClients(stateTable)
    })
    .catch(console.error)
}

function addItem(item) {
  database('items')
    .insert(item)
    .then(() => {
      stateTable.push(item)
    })
}

function deleteItem(item) {
  database('items').where('id', item.id).delete().catch(console.error)
}

testBtn.addEventListener('click', () => {
  addItem({
    name: 'Test User',
    problem: 'Something wrong',
    number: '+79000000000',
    date: '05.07.2021 19:24',
    status: 'test',
  })
})

fetchItems()
