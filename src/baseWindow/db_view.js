const { database } = require('../database')
const table = document.querySelector('.data')
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
        table.innerHTML += `<tr">
                            <td>${item.id}</td>
                            <td>${item.name}</td>
                            <td>${item.problem}</td>
                            <td>${item.number}</td>
                            <td>${item.date}</td>
                            <td>${item.status}</td>
                            </tr>`
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
fetchItems()
fetchItems()
