import { useEffect, useState } from "react";

function App() {
  const [taskInput, setTaskInput] = useState("");

  const [taskList, setTaskList] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedTaskInput = taskInput.trim();
    if (trimmedTaskInput) {
      setTaskList((existingTasks) => [
        ...existingTasks,
        { description: trimmedTaskInput, finished: false },
      ]);
      setTaskInput("");
    }
  };

  useEffect(() => {
    console.log(taskList);
  }, [taskList]);

  const handleChange = (event) => {
    setTaskInput(event.target.value);
  };
  // Function to toggle task completion status
  const toggleTask = (index) => {
    // create a copy of the task list
    const newTaskList = [...taskList];
    // update the finished property of the task we clicked
    newTaskList[index].finished = !newTaskList[index].finished;
    // update the task list in state
    setTaskList(newTaskList);
  };

  const handleDelete = (index) => {
    // create a copy of the taskList array
    const newTaskList = [...taskList];
    // remove the item at the given index
    newTaskList.splice(index, 1);
    // update the taskList state variable
    setTaskList(newTaskList);
  };

  return (
    <div className="App">
      <div className="card">
        <h2 className="heading">To-do List</h2>
        <form onSubmit={handleSubmit} className="input-wrapper">
          <input
            className="input"
            placeholder="Add a task"
            value={taskInput}
            onChange={handleChange}
          ></input>
          <button type="submit" className="add-btn">
            Add
          </button>
        </form>
        <div className="items-list">
          {taskList.map((task, index) => (
            <label className="tag" key={index}>
              <input
                type="checkbox"
                checked={task.finished}
                onChange={() => toggleTask(index)}
              />
              <span className={task.finished ? "finished" : ""}>
                {task.description}
              </span>
              <button className="remove-btn" onClick={handleDelete}>
                <span>+</span>
              </button>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
export default App;
