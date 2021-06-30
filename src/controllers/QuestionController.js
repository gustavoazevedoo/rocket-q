const Database = require('../db/config')

module.exports = {

  async index(req, res) {
    const db = await Database()
    const { room, question, action } = req.params
    const password = req.body.password

    console.log(room, question, action, password)

    /* Verificar se a senha está correta */
    const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${room}`)
    if (verifyRoom.pass === password) {
      if (action === "delete") {
        await db.run(`DELETE FROM questions WHERE id = ${question}`)

      } else if (action === "check") {
        await db.run(`UPDATE questions SET read = 1 WHERE id = ${question}`)
      }

      res.redirect(`/room/${room}`)
    } else {
      res.render('pass-incorrect', { room })
    }

  },

  async create(req, res) {
    const db = await Database()

    const { question } = req.body
    const { room } = req.params

    db.run(`INSERT INTO questions(
      title,
      room,
      read
    )VALUES (
      "${question}",
      ${room},
      0
    )`)

    res.redirect(`/room/${room}`)
  }
}