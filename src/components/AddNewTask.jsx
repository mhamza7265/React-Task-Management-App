import { AddTask } from "../reducers/NewTaskReducer";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddNewTask() {
  const [date, setDate] = useState(new Date());
  const loggedinuser = useSelector((state) => state.loggedin.user);

  let d = new Date();
  let m = d.getMonth();
  let mo = m + 1;
  let day = d.getDate();
  let year = d.getFullYear();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitt = (data) => {
    let d = date;
    let mon = d.getMonth() + 1;
    let y = d.getFullYear();
    let dy = d.getDate();

    const duedate = dy + "/" + mon + "/" + y;
    const updateddata = {
      ...data,
      id: Math.random(),
      duedate: duedate,
      Status: "Pending",
      createdon: day + "/" + mo + "/" + year,
      userkey: loggedinuser.userkey,
    };
    dispatch(AddTask(updateddata));
    return navigate("/tasks");
  };

  return (
    <div className="m-t-85 p-3 bg-body rounded shadow-sm">
      <h6 className="border-bottom pb-2 mb-0 mb-3">Add New Task</h6>
      <form onSubmit={handleSubmit(onSubmitt)}>
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
        <Link className="btn btn-sm btn-danger mt-3" to="/">
          Cancel
        </Link>
        <button type="submit" className="btn btn-success float-end">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddNewTask;
