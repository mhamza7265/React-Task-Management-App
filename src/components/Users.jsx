import { useSelector } from "react-redux";

function Users() {
  const usersdata = useSelector((state) => state.userdata.users);

  return (
    <table className="table table-striped m-t-85">
      <thead className="task-table-head">
        <tr className="text-center">
          <th className="text-center">ID</th>
          <th className="text-center">Name</th>
          <th className="text-center">Designation</th>
          <th className="text-center">Contact No.</th>
        </tr>
      </thead>
      <tbody>
        {usersdata.map((item, key) => (
          <tr key={key} className="text-dark text-center">
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.designation}</td>
            <td>{item.contact}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Users;
