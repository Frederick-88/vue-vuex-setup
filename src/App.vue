<template>
  <div
    id="app"
    :class="{
      'dark-mode': theme,
    }"
  >
    <h2 class="title">Todos: {{ counts }}</h2>
    <button class="button-theme" @click="toggleTheme">
      Switch to {{ theme ? "light" : "dark" }} theme
    </button>
    <button @click="toggleAdd">+ Add todo</button>

    <hr />

    <div class="filter">
      <p>Filter</p>
      <button
        :class="{ active: filter === 'default' }"
        @click="() => (filter = 'default')"
      >
        Default
      </button>

      <button
        :class="{ active: filter === 'in-completed' }"
        @click="() => (filter = 'in-completed')"
      >
        In completed
      </button>

      <button
        :class="{ active: filter === 'archived' }"
        @click="() => (filter = 'archived')"
      >
        Archived
      </button>
    </div>

    <ul>
      <li
        v-for="todo in filteredTodos"
        :key="todo.id"
        :class="{
          completed: todo.status,
        }"
      >
        <label :for="todo.id"
          ><input
            type="checkbox"
            :id="todo.id"
            :checked="todo.status"
            @change="toggleTodoStatus($event, todo.id)"
          />
          Completed</label
        ><br />
        <p>{{ todo.text }}</p>
        <div class="todo-actions">
          <button @click="toggleEdit(todo)">Edit</button>
          <button @click="deleteTodo(todo.id)">Delete</button>
        </div>
      </li>
    </ul>

    <form class="form" v-if="add">
      <label>Create todo</label>
      <input v-model="textTodo" placeholder="What would you do?" />
      <button type="submit" @click="createTodo">Create todo</button>
      <button @click="toggleAdd">Cancel</button>
    </form>

    <form class="form" v-if="edit">
      <label>{{ editedId }}</label>
      <input v-model="textTodo" placeholder="What would you do?" />
      <button type="submit" @click="editTodo">Save change</button>
      <button @click="toggleEdit">Cancel</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"

export default {
  name: "App",
  data() {
    return {
      add: false,
      edit: false,
      editedId: "",
      textTodo: "",
      filter: "default",
    }
  },
  computed: {
    ...mapState({
      theme: (state) => state.theme,
      counts: (state) => state.todos.counts,
    }),
    ...mapGetters(["getTodos", "getArchivedTodos", "getInCompletedTodos"]),
    filteredTodos() {
      switch (this.filter) {
        case "archived":
          return this.getArchivedTodos
        case "in-completed":
          return this.getInCompletedTodos
        default:
          return this.getTodos
      }
    },
  },
  methods: {
    ...mapActions(["setTheme", "setTodos"]),
    toggleTheme() {
      this.setTheme(!this.theme)
    },
    toggleAdd() {
      this.textTodo = ""
      this.edit = false
      this.add = !this.add
    },
    toggleEdit(todo) {
      this.textTodo = ""
      this.add = false
      this.edit = !this.edit

      if (this.edit) {
        this.textTodo = todo.text
        this.editedId = todo.id
      } else {
        this.textTodo = ""
        this.editedId = ""
      }
    },
    toggleTodoStatus(e, id) {
      this.setTodos({
        id,
        status: e.target.checked,
      })
    },
    createTodo() {
      this.setTodos({
        text: this.textTodo,
        status: false,
        archived: false,
      })

      this.textTodo = ""
      this.add = false
    },
    editTodo() {
      this.setTodos({
        id: this.editedId,
        text: this.textTodo,
      })

      this.textTodo = ""
      this.edit = false
    },
    deleteTodo(id) {
      this.setTodos({
        id,
        archived: true,
      })
    },
  },
}
</script>
