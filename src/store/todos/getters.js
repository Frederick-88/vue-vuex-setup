export default {
  getTodos: (state) => state.todos.items.filter((item) => !item.archived), // filter deleted todos
  getArchivedTodos: (state) =>
    state.todos.items.filter((item) => item.archived), // only return deleted todos
  getInCompletedTodos: (state) =>
    // only return in completed and not deleted todos
    state.todos.items.filter((item) => !item.status && !item.archived),
}
