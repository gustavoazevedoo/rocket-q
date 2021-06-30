const Database = require("../db/config")

module.exports = {
  async create(req, res) {
    const db = await Database()
    const pass = req.body.password
    let roomId
    let isRoom = true

    while (isRoom) {
      /* Gera o número da sala */
      for (var i = 0; i < 6; i++) {
        i == 0 ? roomId = Math.floor(Math.random() * 10).toString() :
          roomId += Math.floor(Math.random() * 10).toString()
      }

      /* Verifica se esse número ja existe */
      const roomsExistIds = await db.all(`SELECT id FROM rooms`)
      isRoom = roomsExistIds.some(roomExistId => roomExistId === roomId)

      if (!isRoom) {
        await db.run(`
        INSERT INTO rooms (
          id,
          pass
        ) VAlUES (
          ${parseInt(roomId)},
          ${pass}
        )`)
      }
    }

    await db.close()

    res.redirect(`/room/${roomId}`)
  },

  async open(req, res) {
    const db = await Database()

    const { room } = req.params
    const questions = await db.all(`SELECT * FROM questions WHERE room = ${room} and read = 0`)
    const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${room} and read = 1`)
    let isQuestions = true

    if (questions.length == 0) {
      if (questionsRead.length == 0) {
        isQuestions = false
      }
    }

    res.render("room", { room, questions, questionsRead, isQuestions })
  },

  enter(req, res) {
    const { roomId } = req.body

    res.redirect(`/room/${roomId}`)
  }
}