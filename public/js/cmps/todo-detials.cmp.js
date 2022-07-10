export default {
  template: `
    <section v-if="todo" class="todo-details flex flex-column align-center justify-center">
        <p>{{todo.txt}}</p>
        <p>{{ status }}</p>
    </section>
`,
  watch: {
    '$route.params': {
      handler: function () {
        const { todoId } = this.$route.params

        this.$store
          .dispatch({ type: 'setCurrTodo', todoId })
          .then(todo => (this.todo = todo))
      },
    },
  },
  data() {
    return {
      todo: null,
    }
  },
  created() {},
  methods: {},
  computed: {
    status() {
      return this.todo.isDone ? 'Compeleted Task' : 'Pending Task'
    },
  },
  unmounted() {},
}
