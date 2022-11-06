import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { getActiveTodosLocal, getCompliteTodosLocal } from '../localStorage/localStarage';
import { Todo } from '../model';
import SingleTodo from './SingleTodo';
import "./style.css";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
}

const TodoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos }) => {
  React.useEffect(() => {
    const activeDataLocal: string | null = getActiveTodosLocal();
    const completeDataLocal: string | null = getCompliteTodosLocal();
    if (activeDataLocal) {
      setTodos(JSON.parse(activeDataLocal))
    }
    if (completeDataLocal) {
      setCompletedTodos(JSON.parse(completeDataLocal))
    }
  }, []);
  return (

    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Активные задачи</span>
            {
              todos?.map((todo, index) => (
                <SingleTodo
                  index={index}
                  key={todo.id}
                  todo={todo}
                  todos={todos}
                  setTodos={setTodos} />
              ))
            }
            {provided.placeholder}
          </div>
        )
        }
      </Droppable>
      <Droppable droppableId="ComplitedList">
        {(provided, snapshot) => (
          <div className={`todos ${snapshot.isDraggingOver ? "dragcomplete" : "remove"}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Выполненые зачади</span>
            {
              completedTodos?.map((todo, index) => (
                <SingleTodo
                  index={index}
                  key={todo.id}
                  todo={todo}
                  todos={completedTodos}
                  setTodos={setCompletedTodos} />
              ))
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div >
  )
}

export default TodoList