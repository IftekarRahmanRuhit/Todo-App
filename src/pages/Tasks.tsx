import { AddTaskModal } from "@/components/TaskCard/AddTaskModal";
import TaskCard from "@/components/TaskCard/TaskCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { selectTasks, updateFilter } from "@/redux/features/task/taskSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

export default function Tasks() {
  // const tasks = useAppSelector((state) => state.todo.tasks);// we can use this to access the tasks directly
  // but using the selector function is a better practice for reusability and separation of concerns
  const tasks = useAppSelector(selectTasks); // using the selector function to access the tasks

  console.log(tasks);

  const dispatch = useAppDispatch()

  return (
    <div className="mx-auto max-w-7xl px-5 mt-20">
      <div className="flex justify-between">
        <h1>Tasks</h1>
        <div className="flex justify-end gap-2">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger onClick={()=>dispatch(updateFilter("all"))} value="all">All</TabsTrigger>
              <TabsTrigger onClick={()=>dispatch(updateFilter("low"))} value="low">Low</TabsTrigger>
              <TabsTrigger onClick={()=>dispatch(updateFilter("medium"))} value="medium">Medium</TabsTrigger>
              <TabsTrigger onClick={()=>dispatch(updateFilter("high"))} value="high">High</TabsTrigger>
            </TabsList>
          </Tabs>
          <AddTaskModal />
        </div>
      </div>
      <div className="space-y-5 mt-5">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task}></TaskCard>
        ))}
      </div>
    </div>
  );
}
