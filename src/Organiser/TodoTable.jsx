function TodoTable({ title, desc, priority, id, duedate, index }) {
  return (
    <tr id={id}>
      <td>{index + 1}</td>
      <td>{title}</td>
      <td>{desc}</td>
      <td>{priority}</td>
      <td>{duedate}</td>
    </tr>
  );
}

export default TodoTable;
