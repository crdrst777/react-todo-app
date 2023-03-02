import { useForm } from "react-hook-form";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

// input들의 타입
interface IForm {
  toDo: string;
}

// 하나의 todo 객체의 타입
interface ITodo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

const toDoState = atom<ITodo[]>({
  key: "toDo",
  default: [],
});

// handleSubmit을 useForm에서 가져온 다음에 그걸 호출해야 함.
// 그러면 handleSubmit함수가 data를 검사하고, 유효하다면 내가 만든 함수(handleValid())를 호출할거임.
function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState); // setState과 유사함.
  // const value = useRecoilValue(toDoState); // 데이터의 value
  // const modFn = useSetRecoilState(toDoState); // value를 변경하기 위헤 사용되는 함수

  const { register, handleSubmit, setValue } = useForm<IForm>();
  // { toDo } === data.toDo // input에 입력된 값
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...oldToDos,
    ]); // setToDos() 안에 함수를 쓰면 그 함수의 리턴값이 새로운 state가 됨.
    setValue("toDo", "");
  };
  console.log(toDos);

  return (
    <>
      <h1>To Dos</h1>
      <hr />
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("toDo", {
            required: "Please write a To Do",
          })}
          placeholder="Write a to do"
        />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </>
  );
}

export default ToDoList;
