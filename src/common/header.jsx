import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { EditDisplayType } from "../reducers/TaskFilterReducer";
import DatePicker from "react-datepicker";
import { useState } from "react";

function Header() {
  const [date, setDate] = useState(new Date());
  const [dateVis, setDateVis] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const handleClick = (e) => {
    if (e.target.getAttribute("id") == "completed") {
      dispatch(EditDisplayType("completed"));
      setDateVis(false);
    } else if (e.target.getAttribute("id") == "pending") {
      dispatch(EditDisplayType("pending"));
      setDateVis(false);
    } else if (e.target.getAttribute("id") == "high") {
      dispatch(EditDisplayType("High"));
      setDateVis(false);
    } else if (e.target.getAttribute("id") == "normal") {
      dispatch(EditDisplayType("Normal"));
      setDateVis(false);
    } else if (e.target.getAttribute("id") == "low") {
      dispatch(EditDisplayType("Low"));
      setDateVis(false);
    } else if (e.target.getAttribute("id") == "all") {
      dispatch(EditDisplayType("all"));
      setDateVis(false);
    } else if (e.target.getAttribute("id") == "duedate") {
      setDateVis(true);
    }
  };

  const handleClickButton = () => {
    let d = date;
    let mon = d.getMonth() + 1;
    let y = d.getFullYear();
    let dy = d.getDate();

    const duedate = dy + "/" + mon + "/" + y;
    dispatch(EditDisplayType({ date: duedate, type: "date" }));
  };

  console.log(location.pathname);
  return (
    <nav className="navbar navbar-expand-lg  fixed-top border-bottom">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {location.pathname == "/tasks" && (
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="ms-auto row">
              {dateVis && (
                <>
                  <button
                    className="btn btn-sm-date btn-secondary"
                    onClick={handleClickButton}
                  >
                    Filter
                  </button>
                  <DatePicker
                    className="form-control"
                    selected={date}
                    value={date}
                    onChange={(date) => setDate(date)}
                    name="duedate"
                  />
                </>
              )}
              <ul className="navbar-nav mt-2 mt-lg-0">
                {/* <li className="nav-item"><a data-bs-toggle="modal" data-bs-target="#add-lead-modal"  className="nav-link highlighted-text" href="#!">Add lead</a></li> */}
                <li className="nav-item dropdown notifications">
                  <a
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fa-solid fa-filter"></i>
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdown"
                  >
                    <a className="dropdown-item" id="all" onClick={handleClick}>
                      All Tasks
                    </a>
                    <div className="dropdown-divider"></div>

                    <a
                      className="dropdown-item"
                      id="high"
                      onClick={handleClick}
                    >
                      Filter by High Priority
                    </a>
                    <a
                      className="dropdown-item"
                      id="normal"
                      onClick={handleClick}
                    >
                      Filter by Normal Priority
                    </a>
                    <a className="dropdown-item" id="low" onClick={handleClick}>
                      Filter by Low Priority
                    </a>
                    <div className="dropdown-divider"></div>
                    <a
                      className="dropdown-item"
                      id="duedate"
                      onClick={handleClick}
                    >
                      Filter by Due Date
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
