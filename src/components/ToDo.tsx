import { useRecoilState, useRecoilValue } from "recoil";
import { IToDo, categoryBtnState, toDoState } from "../atoms";

export default function ToDo({ text, category, id }: IToDo) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const categoryList = useRecoilValue(categoryBtnState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    if (name === "DEL") {
      setToDos((oldToDos) => {
        const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
        const newToDo = { text, id, category: name as IToDo["category"] }; // as IToDo.catagory 안됨
        // 기존에 있는 배열을 수정해서 쓰면 안되고 이렇게 매번 새로운 배열을 return 해줘야지 렌더링이 됨!
        return [
          ...oldToDos.slice(0, targetIndex),
          ...oldToDos.slice(targetIndex + 1),
        ];
      });
    } else {
      setToDos((oldToDos) => {
        const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
        const newToDo = { text, id, category: name as IToDo["category"] }; // as IToDo.catagory 안됨
        // 기존에 있는 배열을 수정해서 쓰면 안되고 이렇게 매번 새로운 배열을 return 해줘야지 렌더링이 됨!
        return [
          ...oldToDos.slice(0, targetIndex),
          newToDo,
          ...oldToDos.slice(targetIndex + 1),
        ];
      });
    }
  };
  return (
    <li>
      <span>{text}</span>
      {categoryList
        .filter((element) => element !== category)
        .map((element) => (
          <button name={element} onClick={onClick}>
            {element}
          </button>
        ))}
      <button name="DEL" onClick={onClick}>
        DEL
      </button>
    </li>
  );
}
