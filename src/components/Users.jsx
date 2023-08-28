import { useSelector } from "react-redux";

function Users() {
  const usersdata = useSelector((state) => state.userdata.users);
  return (
    <table className="table table-striped m-t-85 table-dark">
      <thead>
        <tr className="text-center">
          <th className="text-center">ID</th>
          <th className="text-center">Name</th>
          <th className="text-center">Designation</th>
          <th className="text-center">Contact No.</th>
        </tr>
      </thead>
      {usersdata.map((item, key) => (
        <tr key={key} className="text-dark text-center">
          <td>{item.id}</td>
          <td>{item.firstname + "" + item.lastname}</td>
          <td>{item.designation}</td>
          <td>{item.contact}</td>
        </tr>
      ))}
    </table>
  );
}

export default Users;
