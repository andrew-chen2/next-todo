import { TodoList } from "@/types";

// Key used to store lists in localStorage
const STORAGE_KEY = "todo_lists";

/**
 * Retrieve all todo lists from localStorage.
 * @returns {TodoList[]} The array of saved todo lists.
 */
export function getTodoLists(): TodoList[] {
  if (typeof window === "undefined") return []; // Prevents errors during Server-side rendering (SSR)
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * Save an array of todo lists to localStorage.
 * @param {TodoList[]} lists - The list array to be stored.
 */
export function saveTodoLists(lists: TodoList[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
  }
}

/**
 * Add a new todo list and save it.
 * @param {string} name - The name of the new todo list.
 * @returns {TodoList} The newly created list.
 */
export function createTodoList(name: string): TodoList {
  const lists = getTodoLists();
  const newList: TodoList = {
    id: crypto.randomUUID(), // Unique ID
    name,
    tasks: [],
  };
  saveTodoLists([...lists, newList]);
  return newList;
}

/**
 * Delete a todo list by its ID.
 * @param {string} id - The ID of the list to delete.
 */
export function deleteTodoList(id: string): void {
  const lists = getTodoLists().filter((list) => list.id !== id);
  saveTodoLists(lists);
}

/**
 * Update the name of a todo list.
 * @param {string} id - The ID of the list to update.
 * @param {string} newName - The new name for the list.
 */
export function renameTodoList(id: string, newName: string): void {
  const lists = getTodoLists().map((list) =>
    list.id === id ? { ...list, name: newName } : list
  );
  saveTodoLists(lists);
}
