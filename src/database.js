require('sqlite3').verbose()
const knex = require('knex')

const database = knex({
  client: 'sqlite3',
  connection: {
    filename: './db.sqlite',
  },

  useNullAsDefault: true,
})

database.schema.hasTable('items').then((exist) => {
  if (!exist) {
    return database.schema.createTable('items', (t) => {
      t.string('id', 10)
      t.string('name', 50)
      t.string('problem', 100)
      t.string('number', 12)
      t.string('price', 20)
      t.string('date', 50)
      t.string('status', 20)
    })
  }
})

module.exports = { database }
