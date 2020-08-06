export default {
  SET_TODOS: (state, item) => {
    // make copy of current todos's state
    const updateTodos = [].concat(state.todos.items)

    // find if item already exist
    const itemExists = updateTodos.find((i) => i.id === item.id)

    // mutate copy
    if (itemExists) {
      const itemIndex = updateTodos.findIndex((i) => i.id === item.id)
      updateTodos[itemIndex] = {
        ...itemExists,
        ...item,
      }
    } else {
      updateTodos.push({ id: "todo-" + state.todos.counts, ...item })
    }

    // update state
    state.todos.items = updateTodos
  },
  SET_TODOS_COUNT: (state) => {
    state.todos.counts = state.todos.items.filter(
      (item) => !item.archived
    ).length
  },
}
