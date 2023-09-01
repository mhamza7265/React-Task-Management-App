import { useSelector } from "react-redux";
import TodoTable from "./TodoTable";

const Container = () => {
  const newtasks = useSelector((state) => state.newtask.data);
  const inprogresstasks = useSelector((state) => state.inprogresstask.data);
  const completedtasks = useSelector((state) => state.completedtask.data);
  const displaytype = useSelector((state) => state.display.value);
  const loggedinuser = useSelector((state) => state.loggedin.user.userkey);

  const usersbykeynew = newtasks.filter((item) => item.userkey == loggedinuser);

  const userbykeyip = inprogresstasks.filter(
    (item) => item.userkey == loggedinuser
  );

  const userbykeycomp = completedtasks.filter(
    (item) => item.userkey == loggedinuser
  );

  const completed = [...userbykeycomp];

  const inprogress = [...userbykeyip];

  const pending = [...usersbykeynew];

  return (
    <div className="col-lg-12">
      <div className="container-fluid mt-5">
        <div className="d-flex justify-content-center inner flex-wrap task-container">
          {displaytype == "pending" ? (
            <div className="w-100">
              <div>
                <h6>Pending Tasks</h6>
              </div>
              <table className="table table-striped">
                <thead className="task-table-head">
                  <tr>
                    <th scope="col">Sr No.</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Priority</th>
                    <th scope="col">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {pending != "" ? (
                    pending.map((item, key) => (
                      <TodoTable
                        index={key}
                        id={item.id}
                        title={item.title}
                        desc={item.desc}
                        duedate={item.duedate}
                        priority={item.priority}
                        Status={item.Status}
                        createdon={item.createdon}
                        key={Math.floor(Math.random() * 1000)}
                      />
                    ))
                  ) : (
                    <p className="w-100 text-center">No task created!</p>
                  )}
                </tbody>
              </table>
            </div>
          ) : displaytype == "complete" ? (
            <div className="w-100">
              <div>
                <h6>Completed Tasks</h6>
              </div>
              <table className="table table-striped">
                <thead className="task-table-head">
                  <tr>
                    <th scope="col">Sr No.</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Priority</th>
                    <th scope="col">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {completed != "" ? (
                    completed.map((item, key) => (
                      <TodoTable
                        index={key}
                        id={item.id}
                        title={item.title}
                        desc={item.desc}
                        duedate={item.duedate}
                        priority={item.priority}
                        Status={item.Status}
                        createdon={item.createdon}
                        key={Math.floor(Math.random() * 1000)}
                      />
                    ))
                  ) : (
                    <p className="w-100 text-center">No task created!</p>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="w-100">
              <div>
                <h6>In-progress Tasks</h6>
              </div>
              <table className="table table-striped">
                <thead className="task-table-head">
                  <tr>
                    <th scope="col">Sr No.</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Priority</th>
                    <th scope="col">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {inprogress != "" ? (
                    inprogress.map((item, key) => (
                      <TodoTable
                        index={key}
                        id={item.id}
                        title={item.title}
                        desc={item.desc}
                        duedate={item.duedate}
                        priority={item.priority}
                        Status={item.Status}
                        createdon={item.createdon}
                        key={Math.floor(Math.random() * 1000)}
                      />
                    ))
                  ) : (
                    <p className="w-100 text-center">No task created!</p>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Container;
