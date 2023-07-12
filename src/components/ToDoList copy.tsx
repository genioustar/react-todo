import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector } from "../atoms";
import CreateToDos from "./CreateToDo";
import ToDo from "./ToDo";

interface userCategory {
  userCategory?: string;
}

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [userCategory, setUserCategory] = useState<string[]>([]);
  const { register, handleSubmit, setValue } = useForm();
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const handleValid = ({ userCategory }: userCategory) => {
    if (userCategory) {
      setUserCategory((prev) => {
        return [...prev, userCategory];
      });
      setValue("userCategory", "");
    }
  };
  console.log(userCategory);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("userCategory", {
            required: "Please write a custom category",
          })}
          placeholder="Write Custom Category"
        />
        <button>Add</button>
      </form>
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
        {userCategory.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
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
