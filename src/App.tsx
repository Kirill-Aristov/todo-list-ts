import React from 'react'
import InputFeild from './components/InputFeild';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Todo } from './model';
import { setActiveTodosLocal, setCompleteTodosLocal } from './localStorage/localStarage';
import "./App.css";

const App: React.FC = () => {
  const [todo, setTodo] = React.useState<string>("");
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = React.useState<Todo[]>([])
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };
  React.useEffect(() => {
    setActiveTodosLocal(JSON.stringify(todos))
  }, [todos]);
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    let add;

    if (source.droppableId === "TodosList") {
      add = todos[source.index];
      todos.splice(source.index, 1);
    } else {
      add = completedTodos[source.index];
      completedTodos.splice(source.index, 1)
    }
    if (destination.droppableId === "TodosList") {
      todos.splice(destination.index, 0, add)
    } else {
      completedTodos.splice(destination.index, 0, add)
    }

    setCompletedTodos(completedTodos);
    setCompleteTodosLocal(JSON.stringify(completedTodos))
    setTodos(todos);
    setActiveTodosLocal(JSON.stringify(todos))
  };
  React.useEffect(() => {
    setActiveTodosLocal(JSON.stringify(todos))
  }, [todos]);
  React.useEffect(() => {
    setCompleteTodosLocal(JSON.stringify(completedTodos))
  }, [completedTodos]);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">todo list</span>
        <InputFeild
          todo={todo}
          setTodo={setTodo}
          handleAdd={handleAdd}
        />
        <TodoList todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos} />
      </div>
    </DragDropContext>
  )
}

export default App