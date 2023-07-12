import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { categoryBtnState, categoryState } from "../atoms";

interface userCategory {
  userCategory?: string;
}

export default function CreateUserCategory() {
  const { register, handleSubmit, setValue } = useForm();
  const [userCategory, setUserCategory] = useRecoilState(categoryBtnState);
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
  return (
    <>
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
        {/* <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option> */}
        {userCategory.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}
