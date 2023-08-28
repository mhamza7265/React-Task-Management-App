import { useDispatch, useSelector } from "react-redux";
import { EditTaskStatus } from "../reducers/NewTaskReducer";
import { AddIndex } from "../reducers/IndexReducer";
import { useNavigate } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { RemoveTaskIP } from "../reducers/InProgressTaskReducer";

const Container = styled.div`
  border-radius: 10px;
  color: #000;
  margin-bottom: 8px;
  min-height: auto;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const TodoStructureIP = ({ task, index }) => {
  const inprogresstasks = useSelector((state) => state.inprogresstask.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickEdit = (e) => {
    const parentid = e.target.closest(".task-card").getAttribute("id");
    const index = inprogresstasks
      .map((item) => item.id)
      .indexOf(Number(parentid));
    dispatch(AddIndex({ ind: index, state: "inprogresstasks" }));
    console.log(parentid);
    navigate("/edittask");
  };

  const handleClick = (e) => {
    const cardid = e.target.closest(".task-card").getAttribute("id");
    const filteredarr = inprogresstasks.filter((item) => item.id != cardid);
    dispatch(RemoveTaskIP(filteredarr));
  };

  const handleChange = (e) => {
    const status = e.target.checked;
    const parentid =
      e.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute(
        "id"
      );
    const index = inprogresstasks
      .map((item) => item.id)
      .indexOf(Number(parentid));
    console.log(parentid);
    status == true
      ? dispatch(EditTaskStatus({ index: index, data: "Complete" }))
      : dispatch(EditTaskStatus({ index: index, data: "Pending" }));
  };

  return (
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div id={task.id} key={task.id} className="col-lg-12 task-card">
            <div className="card mb-3 task-card-border">
              <div className="card-body dash-card-body">
                <h6 className="card-title">{task.title}</h6>
                <p className="card-text">{task.desc}</p>
                <p>Due Date: {task.duedate}</p>
                <div className="w-100">
                  <p
                    className={`card-subtitle mb-2 badge ${
                      task.priority == "High"
                        ? "bg-danger"
                        : task.priority == "Normal"
                        ? "bg-secondary"
                        : "bg-success"
                    }`}
                  >
                    {task.priority}
                  </p>
                </div>
                <p>Status: In Progress</p>
                <p>Created on: {task.createdon}</p>
                <div className="pt-2 bt-dash">
                  <a
                    href="javascript:void(0)"
                    onClick={handleClick}
                    className="btn btn-sm btn-danger"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </a>
                  <button
                    onClick={handleClickEdit}
                    className="btn btn-sm btn-success ms-2"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <label className="float-end dash-label d-none">
                    {" "}
                    Completed
                    <input
                      type="checkbox"
                      className="ms-1 d-none"
                      onChange={(e) => handleChange(e)}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          {provided.placeholder}
        </Container>
      )}
    </Draggable>
  );
};

export default TodoStructureIP;
