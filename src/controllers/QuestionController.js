module.exports = {
  index(req, res) {
    const { room, question, action } = req.params
    const password = req.body.password

    console.log(room, question, action, password)
  }
}