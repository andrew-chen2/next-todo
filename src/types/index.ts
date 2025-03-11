export type Task = {
    id: string; // Unique ID for the task
    title: string; // Task name
    completed: boolean; // Task status
};
  
export type TodoList = {
    id: string; // Unique ID for the list
    name: string; // Name of the list
    tasks: Task[]; // Array of tasks in the list
};
  