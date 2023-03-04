import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

// handleSubmit을 useForm에서 가져온 다음에 그걸 호출해야 함.
// 그러면 handleSubmit함수가 data를 검사하고, 유효하다면 내가 만든 함수(handleValid())를 호출할거임.
function ToDoList() {
  // const toDos = useRecoilValue(toDoState); // setState과 유사함.
  // console.log(toDos);
  // const [toDo, doing, done] = useRecoilValue(toDoSelector); // toDoSelector가 배열을 리턴하도록 해놨기때문에, 안에 있는 3 배열을 꺼내기 위해, 배열을 여는거임.

  // 사용자가 현재 선택한 카테고리의 toDo목록. 빈[]이거나, [{…}, {…}, {…}, {…}] 이런 형태
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (evnet: React.FormEvent<HTMLSelectElement>) => {
    setCategory(evnet.currentTarget.value as Categories);
  };
  console.log(toDos);

  return (
    <>
      <h1>To Dos</h1>
      <hr />
      {/* select value는 default value */}
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDo />
      {/* 사용자가 '현재 선택한 카테고리의 toDo목록'을 랜더링 */}
      {toDos.map((toDo) => (
        <ToDo
          key={toDo.id}
          text={toDo.text}
          id={toDo.id}
          category={toDo.category}
        />
      ))}
      {/* <h2>To Do</h2>
      <ul>
        {toDo.map((toDo) => (
          <ToDo
            key={toDo.id}
            text={toDo.text}
            id={toDo.id}
            category={toDo.category}
          /> // {...toDo} 이렇게만 해도 동일함. 같은 ITodo 타입을 공유하고있어서임.
        ))}
      </ul>
      <hr />
      <h2>Doing</h2>
      <ul>
        {doing.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <hr />
      <h2>Done</h2>
      <ul>
        {done.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <hr /> */}
    </>
  );
}

export default ToDoList;
