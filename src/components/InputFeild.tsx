import React from 'react';
import "./style.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}
const InputFeild: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <form className="input" onSubmit={(e) => {
      handleAdd(e);
      inputRef.current?.blur();
    }
    }>
      <input
        ref={inputRef}
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        type="input"
        placeholder="Введите задачу"
        className="input__box" />
      <button
        className="input__submit"
        type="submit">Добавить
      </button>
    </form >
  )
}

export default InputFeild