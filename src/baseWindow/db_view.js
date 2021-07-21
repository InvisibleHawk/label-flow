const { database } = require('../database')
const { v4: uuidv4 } = require('uuid')

const table = document.querySelector('.data')
const modal = document.querySelector('.modal-window')

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

function addClient(client) {
  const row = document.createElement('tr')
  for (let item in client) {
    const td = document.createElement('td')
    td.innerText = `${client[item]}`
    row.appendChild(td)
  }
  table.appendChild(row)
}

function fetchItems() {
  database('items')
    .select()
    .then((items) => {
      viewAllClients(items)
    })
    .catch(console.error)
}

function addItem(item) {
  database('items')
    .insert(item)
    .then(() => {
      addClient(item)
      console.log(item)
    })
}

function updateItem(item) {
  database('items').where('id', '=', item.id).update({})
}

function deleteItem(item) {
  database('items').where('id', item.id).delete().catch(console.error)
}

ipcRenderer.on('db_view', (event, data) => {
  addItem({
    id: uuidv4().toString().slice(0, 5),
    name: data[0],
    problem: data[3],
    number: data[1],
    price: data[2],
    date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
    status: `В очереди`,
  })
})

table.addEventListener('click', () => {
  modal.style.display = 'block'
 
})

window.addEventListener('click', (event) => {
  if (event.target == modal) {
    modal.style.display = 'none'
  }
})

fetchItems()
