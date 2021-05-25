import {action, computed} from 'mobx';

// todos argument is a reference to "this" in TodoStore
export const TodoActions = todos => ({
  // actions
  addTodo: action(todo => {
    todos.collection.unshift(todo);
  }),

  total: computed(() => {
    return todos.collection.length;
  }),
});
