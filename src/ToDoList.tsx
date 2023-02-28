import { useForm } from "react-hook-form";

function ToDoList() {
  const { register, handleSubmit, formState } = useForm();
  // register함수를 사용하면 onChange 이벤트핸들러가 필요없음.
  // watch함수는 form 입력값의 변화를 관찰할 수 있게 함.
  // handleSubmit함수는 onSubmit을 대체. 함수를 리턴하는 함수. validation를 담당. preventDefault도. 우리가 작성한 코드가 진행될 수 있게 함.
  // formState -> formState.errors를 통해 에러를 확인할 수 있음.
  const onValid = (data: any) => {
    console.log(data);
  };
  console.log(formState.errors);

  return (
    <>
      {/* handleSubmit함수는 2개의 인자를 받는다. (유효할때 실행되는 함수(필수. onValid()) / 유효하지 않을때 실행되는 함수(비필수))
      여기선 이렇게 함수를 호출해야 함. (함수())
      유저가 submit하면, handleSubmit은 해야하는 유효성 검사나, 다른 일들을 마친 후, 데이터가 유효할때만 onValid 함수를 호출할것임.
      { required: true } -> 키보드와 마우스를 유효하지 않은 항목으로 바로 focus시켜줌. */}
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input {...register("email", { required: true })} placeholder="Email" />
        <input
          {...register("firstName", { required: true })}
          placeholder="First Name"
        />
        <input
          {...register("lastName", { required: true })}
          placeholder="Last Name"
        />
        <input
          {...register("username", { required: true, minLength: 10 })}
          placeholder="Username"
        />
        <input
          {...register("password", { required: true, minLength: 5 })}
          placeholder="Password"
        />
        <input
          {...register("password1", {
            required: "Password is required", // 에러 메세지 작성.
            minLength: {
              value: 5,
              message: "Your password is too short", // 에러 메세지 작성.
            },
          })}
          placeholder="Password1"
        />
        {/* 위처럼 하면 register함수가 반환하는 객체를 가져다가 input에 props로 줄 수 있음. */}
        <button>Add</button>
      </form>
    </>
  );
}

// function ToDoList() {
//   const [todo, setTodo] = useState("");
//   const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     // setValue(event.currentTarget.value); // 아래와 같음
//     const {
//       currentTarget: { value },
//     } = event;
//     setTodo(value);
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log(todo);
//   };

//   return (
//     <>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={todo} placeholder="Write a to do" />
//         <button>Add</button>
//       </form>
//     </>
//   );
// }

export default ToDoList;
