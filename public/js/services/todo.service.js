// import { storageService } from './storage.service.js'
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

// const KEY = 'todosDB'
const API = 'api/todo/'
export const todoService = {
  query,
  getById,
  remove,
  save,
  getEmptyTodo,
}

// _createTodos()

function query(filterBy = { txt: '', status: '', pageIdx: 0 }) {
  return axios.get(API, { params: filterBy }).then(res => res.data)
  // return storageService.query(KEY).then(todos => {})
}

function getById(id) {
  return axios
    .get(API + id)
    .then(res => res.data)
    .catch(err => console.log(err))
  // return storageService.get(KEY, id)
}

function remove(id) {
  return axios.delete(API + id).then(res => res.data)
  // return storageService.remove(KEY, id)
}

function save(todo) {
  if (todo._id) return axios.put(API + todo._id, todo).then(res => res.data)

  return axios.post(API, todo).then(res => res.data)
  // const savedTodo = todo._id
  //   ? storageService.put(KEY, todo)
  //   : storageService.post(KEY, todo)

  // return savedTodo
}

function getEmptyTodo() {
  return {
    _id: '',
    txt: '',
    isDone: false,
  }
}

// function _createTodos() {
//   let todos = localStorage.getItem(KEY)

//   if (!todos || !todos.length) {
//     todos = [
//       _createTodo('Recover from sprint 3'),
//       _createTodo('Own Todos app once and for all'),
//       _createTodo('Wait for a async version'),
//     ]
//     localStorage.setItem(KEY, JSON.stringify(todos))
//   }
//   return todos
// }

// function _createTodo(txt) {
//   return {
//     _id: utilService.makeId(),
//     txt,
//     isDone: false,
//   }
// }
