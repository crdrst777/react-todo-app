import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

// input들의 타입
interface IForm {
  toDo: string;
}

const CreateToDo = () => {
  const toDos = useRecoilValue(toDoState); // setState과 유사함.
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  // { toDo } === data.toDo // input에 입력된 값
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category }, // category: category -> category
      ...oldToDos,
    ]); // setter 함수인 setToDos() 안에 함수를 쓰면 그 함수의 리턴값이 새로운 state가 됨.
    localStorage.setItem(
      "toDos",
      JSON.stringify([{ text: toDo, id: Date.now(), category }, ...toDos])
    );
    setValue("toDo", "");
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("toDo", {
            required: "Please write a To Do",
          })}
          placeholder="Write a to do"
        />
        <button>Add</button>
      </form>
    </>
  );
};

export default CreateToDo;
