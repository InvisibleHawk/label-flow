const { database } = require('../database')
const table = document.querySelector('.divTableBody')
let state = null

const randomID = () => {
  return Math.floor(Math.random() * 100)
}

function fetchItems() {
  database('items')
    .select()
    .then((items) => {
      console.log(items)
      items.map((item) => {
        table.innerHTML += `<div class="divTableRow">
                            <div class="divTableCell">${item.id}</div>
                            <div class="divTableCell">${item.name}</div>
                            <div class="divTableCell">${item.problem}</div>
                            <div class="divTableCell">${item.number}</div>
                            <div class="divTableCell">${item.date}</div>
                            <div class="divTableCell">${item.status}</div>
                            </div>`
        console.log(item)
      })
    })
    .catch(console.error)
}

function addItem(item) {
  database('items').insert(item).then(fetchItems())
}

function deleteItem(item) {
  database('items').where('id', item.id).delete().catch(console.error)
}

// addItem({
//   name: 'Роман Минкин',
//   problem:
//     'Замена usb-модуля много букв даннных информации и так далее, Замена usb-модуля много букв даннных информации и так далее',
//   number: '+79143424298',
//   date: '05.07.2021 19:24',
//   status: 'Готово',
// })

fetchItems()
