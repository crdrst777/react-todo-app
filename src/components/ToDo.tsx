import { ITodo } from "../atoms";

const ToDo = ({ text }: ITodo) => {
  return (
    <>
      <li>
        <span>{text}</span>
        <button>Doing</button>
        <button>To Do</button>
        <button>Done</button>
      </li>
    </>
  );
};

export default ToDo;
