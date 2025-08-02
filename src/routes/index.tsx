import App from "../App.tsx";

import { createBrowserRouter } from "react-router";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>
  },
]);

export default router;