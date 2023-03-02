import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  firstName: string;
  lastName: string; // 필수항목이 아니라면 ?를 붙이기
  username: string;
  password: string;
  password1: string;
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  // register함수를 사용하면 onChange 이벤트핸들러가 필요없음.
  // watch함수는 form 입력값의 변화를 관찰할 수 있게 함.
  // handleSubmit함수는 onSubmit을 대체. 함수를 리턴하는 함수. validation를 담당. preventDefault도. 우리가 작성한 코드가 진행될 수 있게 함.
  // formState -> formState: { errors } ( = formState.errors)를 통해 에러를 확인할 수 있음.
  // setError -> 발생하는 문제에 따라 추가적으로 에러를 설정할 수 있게 해줌.
  const onValid = (data: IForm) => {
    // onSubmit // handleValid
    if (data.password !== data.password1) {
      setError(
        "password1",
        { message: "Password are not the same" },
        { shouldFocus: true }
      );
    } // 비번과 비번확인이 일치하지 않을 경우 위 메세지를 뱉고, 커서가 자동으로 focus됨.
    // setError("extraError", { message: "Server offline." });
    // extraError는 특정한 항목이 아닌 전체 form에 해당되는 에러임.
    setValue("email", "");
    // 값이 유효하다면 submit했을때 해당 창을 비워줌. ""가 아닌 다른 값을 넣어도됨.
  };
  console.log(errors);

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
        <input
          {...register("email", {
            // email -> value
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com email allowed",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        {/* email이 undefined. errors 안에 아무것도 없기때문에 에러가 난다. -> ?로 해결 (옵셔널 체이닝. es6) */}
        <input
          {...register("firstName", {
            required: "write here",
            validate: {
              noNick: (value) =>
                value.includes("nick") ? "no nick allowed" : true,
              noNico: (value) =>
                value.includes("nico") ? "no nicos allowed" : true,
              // value가 nico를 포함하지 않는다면, true를 반환한다. nico가 포함되면 위의 메세지를 보낸다. 이렇게 여러개의 조건을 달수도 있음.
            },
          })}
          placeholder="First Name"
        />
        <span>{errors?.firstName?.message}</span>
        <input
          {...register("lastName", { required: "write here" })}
          placeholder="Last Name"
        />
        <span>{errors?.lastName?.message}</span>
        <input
          {...register("username", { required: "write here", minLength: 10 })}
          placeholder="Username"
        />
        <span>{errors?.username?.message}</span>
        <input
          {...register("password", { required: "write here", minLength: 5 })}
          placeholder="Password"
        />
        <span>{errors?.password?.message}</span>
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
        <span>{errors?.password1?.message}</span>
        {/* 위처럼 하면 register함수가 반환하는 객체를 가져다가 input에 props로 줄 수 있음. */}
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
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
