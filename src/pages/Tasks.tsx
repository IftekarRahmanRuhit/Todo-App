import { selectFilter, selectTasks } from "@/redux/features/task/taskSlice";
import { useAppSelector } from "@/redux/hook";


export default function Tasks() {
  // const tasks = useAppSelector((state) => state.todo.tasks);// we can use this to access the tasks directly
  // but using the selector function is a better practice for reusability and separation of concerns
  const tasks = useAppSelector(selectTasks);// using the selector function to access the tasks
  const filter = useAppSelector(selectFilter);// using the selector function to access the filter

  console.log(tasks)
  console.log(filter)
  return (
    <div>
      This is task component
    </div>
  )
}
