import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useTodoStore = defineStore('todo', () => {
  const ToDOs = ref([{ ToDo: 'Do tutorial', done: false, priority: 'Low' }, { ToDo: 'Do script', done: false, priority: 'High' }]);
  const completedTasks = ref([]);
  const deletedTasks = ref([]);
  const isSnackbarOpen = ref(false);
  const snackbarMessage = ref('');

  const addToDo = (newToDo) => {
    const todoText = newToDo.ToDo;
    const todoPriority = newToDo.priority;
    if (todoText.trim() !== '') {
      ToDOs.value.push({ ToDo: todoText, done: false, priority: todoPriority });
      isSnackbarOpen.value = true;
      snackbarMessage.value = 'The task is added';
    }
  };

  const deleteToDo = (index) => {
    const deletedTask = ToDOs.value.splice(index, 1)[0];
    deletedTasks.value.push(deletedTask);
    isSnackbarOpen.value = true;
    snackbarMessage.value = 'The task is deleted';
  };

  const deleteCompletedTask = (index) => {
    const deletedTask = completedTasks.value.splice(index, 1)[0];
    deletedTasks.value.push(deletedTask);
    isSnackbarOpen.value = true;
    snackbarMessage.value = 'The completed task is deleted';
  };

  const doneTask = (index) => {
    const completedTask = ToDOs.value.splice(index, 1)[0];
    completedTask.done = true;
    completedTasks.value.push(completedTask);
    isSnackbarOpen.value = true;
    snackbarMessage.value = 'The task is done';
  };

  const undoneTask = (index) => {
    const undoneTask = completedTasks.value.splice(index, 1)[0];
    undoneTask.done = false;
    ToDOs.value.push(undoneTask);
    isSnackbarOpen.value = true;
    snackbarMessage.value = 'The task is undone';
  };

  const emptyTrash = () => {
    deletedTasks.value = [];
    isSnackbarOpen.value = true;
    snackbarMessage.value = 'Deleted tasks cleared';
  };

  const countUndone = computed(() => ToDOs.value.length);
  const countDone = computed(() => completedTasks.value.length);

  return {
    ToDOs,
    addToDo,
    completedTasks,
    deletedTasks,
    deleteToDo,
    deleteCompletedTask,
    doneTask,
    undoneTask,
    emptyTrash,
    countUndone,
    countDone,
    isSnackbarOpen,
    snackbarMessage
  };
});
