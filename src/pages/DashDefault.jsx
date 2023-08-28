import { useSelector, useDispatch } from "react-redux";
import { EditDisplayType } from "../reducers/DisplayTypeReducer";
import { useNavigate } from "react-router-dom";

const DashDefault = () => {
  const newtasks = useSelector((state) => state.newtask.data);
  const inprogresstasks = useSelector((state) => state.inprogresstask.data);
  const completedtasks = useSelector((state) => state.completedtask.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedinuser = useSelector((state) => state.loggedin.user.userkey);

  const usersbykeynew = newtasks.filter((item) => item.userkey == loggedinuser);

  const userbykeyip = inprogresstasks.filter(
    (item) => item.userkey == loggedinuser
  );

  const userbykeycomp = completedtasks.filter(
    (item) => item.userkey == loggedinuser
  );

  const completed = [...userbykeycomp];

  const pending = [...usersbykeynew, ...userbykeyip];

  const all = [...userbykeycomp, ...usersbykeynew, ...userbykeyip];

  const handleClick = (e) => {
    if (e.target.getAttribute("value") == "all") {
      dispatch(EditDisplayType("all"));
      navigate("tasks");
      console.log("all");
    } else if (e.target.getAttribute("value") == "complete") {
      dispatch(EditDisplayType("complete"));
      navigate("taskstat");
    } else if (e.target.getAttribute("value") == "pending") {
      dispatch(EditDisplayType("pending"));
      navigate("taskstat");
    }
  };

  return (
    <div className="row m-t-85">
      <div className="col-xl-3 col-sm-6 mb-3 ms-auto">
        <div className="card text-white bg-primary o-hidden h-100 dash-card">
          <div className="card-body">
            <div className="card-body-icon">
              <i className="fa fa-fw fa-list"></i>
            </div>
            <div className="mr-5 card-body-text">{all.length} Total Tasks</div>
          </div>
          <a
            className="card-footer text-white clearfix small z-1 dash-card-footer"
            value="all"
            href="javascript:void(0)"
            onClick={handleClick}
          >
            View Details
            <span className="float-right">
              <i className="fa fa-angle-right"></i>
            </span>
          </a>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6 mb-3">
        <div className="card text-white bg-warning o-hidden h-100 dash-card">
          <div className="card-body">
            <div className="card-body-icon">
              <i className="fa-solid fa-list-check"></i>
            </div>
            <div className="mr-5 card-body-text">
              {completed.length} Completed Tasks
            </div>
          </div>
          <a
            className="card-footer text-white clearfix small z-1 dash-card-footer"
            value="complete"
            href="javascript:void(0)"
            onClick={handleClick}
          >
            View Details
            <span className="float-right">
              <i className="fa fa-angle-right"></i>
            </span>
          </a>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6 mb-3 me-auto">
        <div className="card text-white bg-success o-hidden h-100 dash-card">
          <div className="card-body">
            <div className="card-body-icon">
              <i className="fa-solid fa-spinner"></i>
            </div>
            <div className="mr-5 card-body-text">
              {pending.length} Pending Tasks
            </div>
          </div>
          <a
            className="card-footer text-white clearfix small z-1 dash-card-footer"
            value="pending"
            href="javascript:void(0)"
            onClick={handleClick}
          >
            View Details
            <span className="float-right">
              <i className="fa fa-angle-right"></i>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashDefault;
