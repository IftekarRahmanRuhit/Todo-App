import Tasks from "@/pages/Tasks.tsx";
import App from "../App.tsx";
import Home from "@/pages/Home.tsx";

import { createBrowserRouter } from "react-router";
import User from "@/pages/User.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    // element: <App></App>,
    Component: App,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "tasks",
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