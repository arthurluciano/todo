import { Todo } from "../App";
import { STORAGE_PREFIX } from "./constants";

export function getStoredTodos(): Todo[] {
  const storedTodos = localStorage.getItem(STORAGE_PREFIX);

  return storedTodos ? JSON.parse(storedTodos) : [];
}
