const express = require('express')
const todoService = require('./services/todo.service')
const app = express()

const port = process.env.PORT || 3030

// Express App Configuration:
app.use(express.static('public'))
app.use(express.json())

// app.get('/**', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

// LIST
app.get('/api/todo', (req, res) => {
  const filterBy = req.query

  todoService
    .query(filterBy)
    .then(todos => res.send(todos))
    .catch(err => res.status(500).send('Cannot get todos'))
})

// CREATE
app.post('/api/todo', (req, res) => {
  const todo = req.body

  todoService
    .save(todo)
    .then(savedTodo => res.send(savedTodo))
    .catch(err => res.status(500).send('Cannot save todo'))
})

// UPDATE
app.put('/api/todo/:todoId', (req, res) => {
  const todo = req.body

  todoService
    .save(todo)
    .then(savedTodo => res.send(savedTodo))
    .catch(err => res.status(500).send('Cannot save todo'))
})

// READ
app.get('/api/todo/:todoId', (req, res) => {
  const { todoId } = req.params

  todoService
    .getById(todoId)
    .then(todo => res.send(todo))
    .catch(err => res.status(500).send('Cannot get todo'))
})

app.delete('/api/todo/:todoId', (req, res) => {
  const { todoId } = req.params

  todoService
    .remove(todoId)
    .then(() => res.send('Removed!'))
    .catch(err => res.status(401).send(err))
})

app.listen(port, () => {
  console.log(`Server ready at port http://localhost:${port}`)
})
