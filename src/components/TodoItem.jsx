function TodoItem({ task, toggleTask, deleteTask }) {

  return (
    <div className="todo-item">

      <span
        className={task.completed ? "completed" : ""}
        onClick={() => toggleTask(task.id)}
      >
        {task.text}
      </span>

      <button onClick={() => deleteTask(task.id)}>
        Delete
      </button>

    </div>
  );
}

export default TodoItem;
