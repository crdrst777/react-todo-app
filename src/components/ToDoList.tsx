import { useRecoilValue } from "recoil";
import { toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

// handleSubmit을 useForm에서 가져온 다음에 그걸 호출해야 함.
// 그러면 handleSubmit함수가 data를 검사하고, 유효하다면 내가 만든 함수(handleValid())를 호출할거임.
function ToDoList() {
  const toDos = useRecoilValue(toDoState); // setState과 유사함.

  return (
    <>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo
            key={toDo.id}
            text={toDo.text}
            id={toDo.id}
            category={toDo.category}
          /> // {...toDo} 이렇게만 해도 동일함. 같은 ITodo 타입을 공유하고있어서임.
        ))}
      </ul>
    </>
  );
}

export default ToDoList;
