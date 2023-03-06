import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";
import styled from "styled-components";

// 수정하고 싶은 todo의 id를 받아옴.
const ToDo = ({ text, category, id }: IToDo) => {
  const setToDos = useSetRecoilState(toDoState);
  const handleCategoryClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // console.log(event.currentTarget.name);  아래 코드와 같음.
    const {
      currentTarget: { name },
    } = event;

    // oldTodos는 현재의 todo목록(배열)
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id); // 클릭한 todo의 인덱스
      // const oldToDo = oldTodos[targetIndex]; // 클릭한 todo객체
      const newToDo = { text, id, category: name as any }; // text: text -> text로 줄여쓸 수 있음.
      console.log("newToDo", newToDo);
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });

    // splice를 이용한 방법
    // setToDos((oldToDos) => {
    //   const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
    //   const newToDo: IToDo = {
    //     text,
    //     id,
    //     category: name as IToDo["category"],
    //   };
    //   console.log(newToDo);
    //   const newToDos = [...oldToDos]; // create new array
    //   newToDos.splice(targetIndex, 1, newToDo); // 해당 인덱스 자리의 요소를 지우고 newToDo로 채움
    //   return newToDos;
    // });

    // 또다른 방법
    // setToDos((prev) =>
    //   prev.map((toDo) => {
    //     if (toDo.id === id) {
    //       return { text, id, category: name as any };
    //     }
    //     return toDo;
    //   })
    // );
  };

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {};

  return (
    <>
      <Container>
        <Text>{text}</Text>

        <BtnContainer>
          {category !== Categories.DOING && (
            <button name={Categories.DOING} onClick={handleCategoryClick}>
              Doing
            </button>
          )}
          {category !== Categories.TO_DO && (
            <button name={Categories.TO_DO} onClick={handleCategoryClick}>
              To Do
            </button>
          )}
          {category !== Categories.DONE && (
            <button name={Categories.DONE} onClick={handleCategoryClick}>
              Done
            </button>
          )}
          {/* category가 "DONE"이 아닐때만, "DONE"버튼을 보여준다. -> "DONE"이면 그외의 버튼을 보여준다. */}
          <button onClick={handleDeleteClick}>Delete</button>
        </BtnContainer>
      </Container>
    </>
  );
};

export default ToDo;

const Container = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;

const Text = styled.div`
  width: 290px;
  word-break: break-all;
  white-space: pre-wrap;
`;

const BtnContainer = styled.div``;
