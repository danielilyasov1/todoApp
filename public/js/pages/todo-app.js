import todoList from '../cmps/todo-list.cmp.js'
import todoFilter from '../cmps/todo-filter.cmp.js'
import loader from '../cmps/loader.cmp.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export default {
  template: `
      <section class="todo-app">
          <todo-filter @filteredTxt="debounceHandler"
                       @filteredStatus="setFilterByStatus" />
          <todo-list v-if="todos && !isLoading"
                     :todos="todos"
                     @removed="removeTodo"
                     @toggled="toggleTodo" />
          <loader v-else />
          <div class='btnsPages'>
          <button class="btn" @click="setPage(-1)">Prev</button>
          <button class="btn btnNext" @click="setPage(1)">Next</button>
          </div>
          <router-view />
          <footer>© created by Danielle Ilyasov 11.7.2022</footer>
      </section>
  `,
  components: {
    todoList,
    todoFilter,
    loader,
  },
  data() {
    return {
      isLoading: false,
      filterBy: {
        txt: '',
        status: '',
        pageIdx: 0,
      },
    }
  },
  created() {
    this.debounceHandler = _.debounce(this.setFilterByTxt, 500)
  },
  methods: {
    removeTodo(todoId) {
      this.$store
        .dispatch({ type: 'removeTodo', todoId })
        .then(() => {
          showSuccessMsg('Todo removed')
        })
        .catch(err => {
          showErrorMsg('Cannot remove todo')
        })
    },
    toggleTodo(todo) {
      const newTodo = JSON.parse(JSON.stringify(todo))
      newTodo.isDone = !newTodo.isDone
      this.$store
        .dispatch({ type: 'saveTodo', todo: newTodo })
        .then(() => {
          showSuccessMsg('Todo updated')
        })
        .catch(err => {
          showErrorMsg('Cannot update todo')
        })
    },
    filterTodos() {
      this.isLoading = true

      const filterBy = JSON.parse(JSON.stringify(this.filterBy))
      this.$store
        .dispatch({ type: 'filterTodos', filterBy })
        .then(() => (this.isLoading = false))
    },
    setPage(diff) {
      this.filterBy.pageIdx += diff
      if (this.filterBy.pageIdx < 0) this.filterBy.pageIdx = 0
      if (this.filterBy.pageIdx > this.todos.length - 1) {
        this.filterBy.pageIdx = 0
      }
      this.filterTodos()
    },
    setFilterByTxt(txt) {
      this.filterBy.txt = txt
      this.filterTodos()
    },
    setFilterByStatus(status) {
      this.filterBy.status = status
      this.filterTodos()
    },
  },
  computed: {
    todos() {
      return this.$store.getters.todosToDisplay
    },
  },
  unmounted() {},
}
