import todoPreview from './todo-preview.cmp.js'
export default {
  props: ['todos'],
  template: `
      <section class="todo-list">
        <router-link class="btn btn-add" to="/todo/edit">Add new todo</router-link>
        <ul class="clean-list">
          <li v-for="todo in todos" :key="todo._id" >
              <todo-preview 
              :todo="todo" 
              @removed="$emit('removed', todo._id)" 
              @toggled="$emit('toggled', todo)" />
          </li>
        </ul>
      </section>
    `,
  components: {
    todoPreview,
  },
  data() {
    return {}
  },
  created() {},
  methods: {},
  computed: {},
  unmounted() {},
}
