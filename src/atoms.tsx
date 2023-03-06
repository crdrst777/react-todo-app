import { atom, selector } from "recoil";

let localData = JSON.parse(localStorage.getItem("toDos" || "[]")!);
// Non-null assertion operator. 접미에 붙는 느낌표(!) 연산자인 단언 연산자는 해당 피연산자가 null, undeifned가 아니라고 단언해줌

// type categories = "TO_DO" | "DOING" | "DONE";

// enum은 프로그래머를 도와주기 위해 일련의 숫자를 문자로 표현해준다. 그치만 아래와같이 해주면 string이 됨.
export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

// 하나의 todo 객체의 타입
export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

// 사용자가 현재 선택한 카테고리의 toDo
export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: localData,
});

// toDoSelector는 사용자가 '현재 선택한 카테고리의 toDo목록'을 리턴한다. 빈[]이거나, [{…}, {…}, {…}, {…}] 이런 형태
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState); // get func이 atom을 받음.
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
// get func(메서드)은 보다시피 인자로 객체를 받는데, 그 객체에는 get func이 들어가있음.
// get 이 return하는 값이 selector의 value가 될것임.
// filter()는 조건에 참인 요소들만으로 이루어진 새 배열을 리턴한다.
// toDos -> 카테고리에 상관없이 순서대로 쌓인 toDo목록. 빈[]이거나, [{…}, {…}, {…}, {…}] 이런 형태
// selector 덕분에 toDo가 컴포넌트에 오기도 전에 이미 변형됨.
