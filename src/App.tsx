import clsx from "clsx";
import { Check, Trash } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { STORAGE_PREFIX } from "./utils/constants";
import { getStoredTodos } from "./utils/get-stored-todos";

export interface Todo {
  value: string;
  completed: boolean;
}

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>(() => getStoredTodos());

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX, JSON.stringify(todos));
  }, [todos]);

  function handleCreateTodo(event: FormEvent) {
    event.preventDefault();

    if (!todo) {
      return alert("O input do todo está vazio!");
    }

    setTodos([
      ...todos,
      {
        value: todo,
        completed: false,
      },
    ]);
  }

  function handleDeleteTodo(todoIndex: number) {
    setTodos(todos.filter((_, index) => index !== todoIndex));
  }

  function handleToggleTodoStatus(todoIndex: number) {
    const filteredTodos = todos.map((todo, index) => {
      if (index === todoIndex) return { ...todo, completed: !todo.completed };

      return todo;
    });

    setTodos(filteredTodos);
  }

  return (
    <>
      <header className="bg-purple-700 h-64 w-full flex items-center justify-center">
        <h1 className="font-bold text-5xl">Todo</h1>
      </header>
      <main className="max-w-lg w-full mx-auto -mt-6">
        <form
          className="w-full h-12 flex items-center gap-x-3"
          onSubmit={handleCreateTodo}
        >
          <input
            type="text"
            className="bg-neutral-700 h-full flex-[3] rounded px-3 border border-solid border-transparent hover:border-blue-500 transition-colors outline-none shadow-sm"
            value={todo}
            onChange={(event) => setTodo(event.target.value)}
          />
          <button
            type="submit"
            className="h-full flex-1 px-4 bg-purple-600 hover:bg-purple-500 transition-colors rounded font-semibold shadow-sm"
          >
            Criar
          </button>
        </form>

        <div className="flex flex-col w-full mt-6 gap-y-4">
          <h2 className="font-medium text-lg">Lista de todos</h2>

          <ul className="w-full flex flex-col gap-y-3">
            {todos.length === 0 ? (
              <div className="px-4 h-28 w-full border border-dashed border-neutral-700 text-neutral-600 rounded text-base flex items-center justify-center">
                Ainda não foi adicionado nenhum todo.
              </div>
            ) : (
              todos.map((todo, index) => (
                <li
                  key={`todo-${index}`}
                  className={clsx(
                    "px-4 py-3 w-full bg-neutral-700 rounded text-base border border-solid border-transparent hover:border-blue-500 transition-colors cursor-pointer flex items-center justify-between",
                    todo.completed && "bg-neutral-800 text-neutral-500"
                  )}
                >
                  {todo.value}

                  <div className="flex items-center gap-x-1">
                    <button
                      type="button"
                      className={clsx(
                        "bg-transparent hover:bg-[#52525280] border-none h-8 w-8 rounded-full flex items-center justify-center"
                      )}
                      onClick={() => handleToggleTodoStatus(index)}
                    >
                      <Check
                        size={18}
                        weight="bold"
                        color={todo.completed ? "#22c55e" : "#737373"}
                      />
                    </button>
                    <button
                      type="button"
                      className="bg-transparent hover:bg-[#52525280] border-none h-8 w-8 rounded-full flex items-center justify-center"
                      onClick={() => handleDeleteTodo(index)}
                    >
                      <Trash size={18} color="#ef4444" weight="bold" />
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </main>
    </>
  );
}

export default App;
