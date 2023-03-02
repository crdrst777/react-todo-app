import { atom } from "recoil";

// 하나의 todo 객체의 타입
export interface ITodo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

export const toDoState = atom<ITodo[]>({
  key: "toDo",
  default: [],
});
