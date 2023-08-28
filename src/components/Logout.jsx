import { isLoggedOut } from "../reducers/loginReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch(isLoggedOut());
    alert("Logged out!");
    navigate("/");
  };

  return (
    <div className="p-0">
      <div className="w-max-content ms-auto">
        <button className="btn btn-sm btn-danger" onClick={handleClick}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Logout;
