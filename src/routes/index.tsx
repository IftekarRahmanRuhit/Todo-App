import Tasks from "@/pages/Tasks.tsx";
import App from "../App.tsx";

import { createBrowserRouter } from "react-router";
import User from "@/pages/User.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    // element: <App></App>,
    Component: App,
    children: [
      {
        path: "tasks",
        // index: true,
        Component: Tasks
      },
      {
        path: "users",
        Component: User
      }
    ]
  },
]);

export default router;