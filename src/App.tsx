import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import ToDoList from "./ToDoList";

const GlobalStyle = createGlobalStyle`
${reset}
* {
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans Pro', serif;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
}
a {
  text-decoration: none;
  color: inherit;
  &:link,&:visited{
  color: inherit;
  }
}
button{
  cursor: pointer;
  border: none;
  padding: 0;
}
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <ToDoList />
    </>
  );
}
export default App;
