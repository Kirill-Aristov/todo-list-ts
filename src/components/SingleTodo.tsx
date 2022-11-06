import React from 'react';
import { Todo } from '../model';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Draggable } from 'react-beautiful-dnd';
import "./style.css";
interface Props {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos, index }) => {
  const [edit, setEdit] = React.useState<boolean>(false);
  const [editTodo, setEditTodo] = React.useState<string>(todo.todo);


  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(
      todos.map((todo) => (
        todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };
  const inputRef = React.useRef<HTMLInputElement>(null)
  React.useEffect(() => {
    inputRef.current?.focus();
  }, [edit])
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form
          className="todos__single"
          onSubmit={(e) => handleEdit(e, todo.id)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {edit ? (
            <input
              className="todos__single--text"
              ref={inputRef}
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)} />
          ) :
            todo.isDone ? (
              <s className="todos__single--text">{todo.todo}</s>
            ) : (
              <span className="todos__single--text">{todo.todo}</span>
            )
          }

          <div>
            <span className="icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit)
                } else {
                  setEdit(!edit)
                }
              }}>
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
          </div>
        </form >
      )}
    </Draggable>
  )
}

export default SingleTodo