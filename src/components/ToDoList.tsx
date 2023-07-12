import { useRecoilValue } from "recoil";
import { toDoSelector } from "../atoms";
import CreateToDos from "./CreateToDo";
import CreateUserCategory from "./CreateUserCategory";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateUserCategory />
      <CreateToDos />
      <h2>To Do</h2>
      <ul>
        {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <hr />
    </div>
  );
}

export default ToDoList;
