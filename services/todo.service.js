const fs = require('fs')
const todos = require('../data/todo.json')

const PAGE_SIZE = 3

module.exports = {
  query,
  save,
  remove,
  getById,
}

function query({ txt, pageIdx, status }) {
  let filteredTodos = todos

  const regex = new RegExp(txt, 'i')
  filteredTodos = filteredTodos.filter(todo => regex.test(todo.txt))

  if (status) {
    filteredTodos = filteredTodos.filter(
      todo =>
        (todo.isDone && status === 'done') ||
        (!todo.isDone && status === 'active')
    )
  }

  const startIdx = pageIdx * PAGE_SIZE
  filteredTodos = filteredTodos.slice(startIdx, startIdx + PAGE_SIZE)

  return Promise.resolve(filteredTodos)
}

function save(todo) {
  if (todo._id) {
    const idx = todos.findIndex(currTodo => currTodo._id === todo._id)
    if (idx === -1) return Promise.reject('No such todo')
    todos[idx] = todo
  } else {
    todo._id = _makeId()
    todos.push(todo)
  }

  return _saveTodosToFile().then(() => todo)
}

function getById(todoId) {
  const todo = todos.find(todo => todo._id === todoId)
  return Promise.resolve(todo)
}

function remove(todoId) {
  const idx = todos.findIndex(todo => todo._id === todoId)
  if (idx === -1) return Promise.reject('No such todo')

  todos.splice(idx, 1)
  return _saveTodosToFile()
}

function _makeId(length = 5) {
  let txt = ''
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

function _saveTodosToFile() {
  return new Promise((resolve, reject) => {
    const content = JSON.stringify(todos, null, 2)
    fs.writeFile('./data/todo.json', content, err => {
      if (err) {
        console.error(err)
        return reject(err)
      }
      resolve()
    })
  })
}
