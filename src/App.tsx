// import { Button } from "./components/ui/button"

function App() {
  return (
    <div>
      <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="text-lg font-bold">MyTodo</div>
        <ul className="flex space-x-4">
          <li><a href="#" className="hover:underline">Home</a></li>
          <li><a href="#" className="hover:underline">Tasks</a></li>
          <li><a href="#" className="hover:underline">About</a></li>
        </ul>
      </nav>

      {/* <p className="text-red-600 font-extrabold mt-4 px-6">Todo app</p> */}
    </div>
  );
}

export default App;
