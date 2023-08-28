import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { EditTask } from "../reducers/NewTaskReducer";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { EditTaskIP } from "../reducers/InProgressTaskReducer";
import { EditTaskComp } from "../reducers/CompletedTaskReducer";

function EditTasks() {
  const [date, setDate] = useState(new Date());
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const editedindex = useSelector((state) => state.index.value);

  const newtasks = useSelector((state) => state.newtask.data);
  const inprogresstasks = useSelector((state) => state.inprogresstask.data);
  const completedtasks = useSelector((state) => state.completedtask.data);

  const navigate = useNavigate();

  const onSubmit = (data) => {
    let d = date;
    let mon = d.getMonth() + 1;
    let y = d.getFullYear();
    let dy = d.getDate();
    console.log(dy);
    const duedate = dy + "/" + mon + "/" + y;
    const updateddata = {
      ...data,
      duedate: duedate,
    };
    editedindex.state == "newtasks"
      ? dispatch(EditTask({ index: editedindex.ind, data: updateddata }))
      : editedindex.state == "inprogresstasks"
      ? dispatch(EditTaskIP({ index: editedindex.ind, data: updateddata }))
      : dispatch(EditTaskComp({ index: editedindex.ind, data: updateddata }));
    navigate("/tasks");
  };

  const valuestoeditnew = newtasks.filter((_, i) => i == editedindex.ind)[0];
  const valuestoeditip = inprogresstasks.filter(
    (_, i) => i == editedindex.ind
  )[0];
  const valuestoeditcomp = completedtasks.filter(
    (_, i) => i == editedindex.ind
  )[0];

  return (
    <div className="m-t-85 p-3 bg-body rounded shadow-sm">
      <h6 className="border-bottom pb-2 mb-0 mb-3">Edit Task</h6>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <div className="col-lg-12">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Title
            </label>
            <div className="input-group mb-3">
              <input
                {...register("title", { required: "This field is required" })}
                name="title"
                type="text"
                className="form-control"
                placeholder="Title"
                defaultValue={
                  editedindex.state == "newtasks"
                    ? valuestoeditnew.title
                    : editedindex.state == "inprogresstasks"
                    ? valuestoeditip.title
                    : valuestoeditcomp.title
                }
              />
            </div>
            <p className="text-danger">{errors.title?.message}</p>
          </div>
          <div className="col-lg-12">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Description
            </label>
            <div className="input-group mb-3">
              <textarea
                {...register("desc", { required: "This field is required" })}
                name="desc"
                type="text"
                className="form-control"
                placeholder="Description"
                defaultValue={
                  editedindex.state == "newtasks"
                    ? valuestoeditnew.desc
                    : editedindex.state == "inprogresstasks"
                    ? valuestoeditip.desc
                    : valuestoeditcomp.desc
                }
              ></textarea>
            </div>
            <p className="text-danger">{errors.desc?.message}</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Priority
            </label>
            <div className="input-group mb-3">
              <select
                className="form-control"
                {...register("priority")}
                name="priority"
                defaultValue={
                  editedindex.state == "newtasks"
                    ? valuestoeditnew.priority
                    : editedindex.state == "inprogresstasks"
                    ? valuestoeditip.priority
                    : valuestoeditcomp.priority
                }
              >
                <option value={"Low"}>Low</option>
                <option value={"Normal"}>Normal</option>
                <option value={"High"}>High</option>
              </select>
            </div>
          </div>
          <div className="col">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Due Date:
            </label>
            <div className="input-group mb-3">
              <DatePicker
                className="form-control"
                selected={date}
                value={date}
                onChange={(date) => setDate(date)}
                name="duedate"
              />
            </div>
            <p className="text-danger">{errors.duedate?.message}</p>
          </div>
        </div>
        <Link className="btn btn-sm btn-danger mt-3" to="/tasks">
          Cancel
        </Link>
        <button type="submit" className="btn btn-success float-end">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditTasks;
