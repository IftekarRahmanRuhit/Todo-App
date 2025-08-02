import { Link } from "react-router";
import { ModeToggle } from "../mode-toggler/mode-toggler";


export default function Navbar() {
  return (
    <div>
      <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="text-lg font-bold">MyTodo</div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/tasks">Tasks</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
           <ModeToggle></ModeToggle>
          </li>
        </ul>
      </nav>
    </div>
  );
}
