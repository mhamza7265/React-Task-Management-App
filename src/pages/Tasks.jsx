const Tasks = () => {
  return (
    <div className="row">
      <div className="col-xl-3 col-sm-6 mb-3 ms-auto">
        <div className="card text-white bg-primary o-hidden h-100 dash-card">
          <div className="card-body">
            <div className="card-body-icon">
              <i className="fa fa-fw fa-list"></i>
            </div>
            <div className="mr-5">26 Total Tasks</div>
          </div>
          <a
            className="card-footer text-white clearfix small z-1 dash-card-footer"
            href="#"
          >
            <span className="float-left">View Details</span>
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
            <div className="mr-5">11 Completed Tasks</div>
          </div>
          <a
            className="card-footer text-white clearfix small z-1 dash-card-footer"
            href="#"
          >
            <span className="float-left">View Details</span>
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
            <div className="mr-5">123 Pending Tasks</div>
          </div>
          <a
            className="card-footer text-white clearfix small z-1 dash-card-footer"
            href="#"
          >
            <span className="float-left">View Details</span>
            <span className="float-right">
              <i className="fa fa-angle-right"></i>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
