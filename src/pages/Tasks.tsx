
import { AddTaskModal } from "@/components/TaskCard/AddTaskModal";
import TaskCard from "@/components/TaskCard/TaskCard";
import { selectTasks } from "@/redux/features/task/taskSlice";
import { useAppSelector } from "@/redux/hook";


export default function Tasks() {
  // const tasks = useAppSelector((state) => state.todo.tasks);// we can use this to access the tasks directly
  // but using the selector function is a better practice for reusability and separation of concerns
  const tasks = useAppSelector(selectTasks);// using the selector function to access the tasks

  console.log(tasks)

  return (
    <div className="mx-auto max-w-7xl px-5 mt-20">
      <div className="flex justify-between">
        <h1>Tasks</h1>
      <AddTaskModal>
        
      </AddTaskModal>
      </div>
      <div className="space-y-5 mt-5">
        {
          tasks.map((task) =>(
            <TaskCard task={task}></TaskCard>
          ))
        }

      </div>
    </div>
  )
}
