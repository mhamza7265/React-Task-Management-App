import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { EditDisplayType } from "../reducers/DisplayTypeReducer";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isActive, setIsActive] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDisplayClick = (e) => {
    if (e.target.getAttribute("value") == "complete") {
      dispatch(EditDisplayType("complete"));
    } else if (e.target.getAttribute("value") == "pending") {
      dispatch(EditDisplayType("pending"));
    }

    navigate("taskstat");
  };

  const handleClick = (e) => {
    e.target.getAttribute("value") == "task"
      ? setIsActive(true)
      : setIsActive(false);

    dispatch(EditDisplayType("all"));
    console.log(e.target.getAttribute("value") == "task");
  };

  return (
    <div className="border-end sidenav" id="sidebar-wrapper">
      <PerfectScrollbar className="sidebar-items">
        <ul className="list-unstyled ps-0">
          <li className="mb-1">
            <NavLink
              data="all"
              tag="a"
              className=""
              to="/"
              onClick={handleClick}
            >
              <i className="fa fa-dashboard"></i> Dashboard
            </NavLink>
          </li>
          <li className="mb-1">
            <NavLink
              tag="a"
              className=""
              to="/addnewtask"
              onClick={handleClick}
            >
              <i className="fa-solid fa-circle-plus"></i> Add Tasks
            </NavLink>
          </li>
          <li className="mb-1">
            <NavLink
              onClick={handleClick}
              value="task"
              tag="a"
              className=""
              to="tasks"
            >
              <i className="fa fa-fw fa-list"></i> All Tasks
            </NavLink>
          </li>
          {isActive && (
            <div className="ms-4">
              <li className="mb-1">
                <a
                  className=""
                  href="javascript:void(0)"
                  value="complete"
                  onClick={handleDisplayClick}
                >
                  <i className="fa-solid fa-list-check"></i> Completed Tasks
                </a>
              </li>
              <li className="mb-1">
                <a
                  className=""
                  href="javascript:void(0)"
                  value="pending"
                  onClick={handleDisplayClick}
                >
                  <i className="fa-solid fa-spinner"></i> Pending Tasks
                </a>
              </li>
            </div>
          )}
          <li className="mb-1">
            <NavLink onClick={handleClick} tag="a" className="" to="users">
              <i className="fa-solid fa-users"></i> Users
            </NavLink>
          </li>

          {/* collapsable list item example */}
          {/* <li className="mb-1">
                          <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                          Opportunity
                          </button>
                          <div className="collapse" id="dashboard-collapse">
                          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                              <li><a href="#" className="rounded">Overview</a></li>
                              <li><a href="#" className="rounded">Weekly</a></li>
                              <li><a href="#" className="rounded">Monthly</a></li>
                              <li><a href="#" className="rounded">Annually</a></li>
                          </ul>
                          </div>
                      </li> 
                      <li className="border-top my-3"></li> */}
        </ul>
      </PerfectScrollbar>
    </div>
  );
};

export default Sidebar;
