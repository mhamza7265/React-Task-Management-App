import { AddTask } from "../reducers/NewTaskReducer";
import { AddTaskIP } from "../reducers/InProgressTaskReducer";
import { RemoveTask } from "../reducers/NewTaskReducer";
import { RemoveTaskIP } from "../reducers/InProgressTaskReducer";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { AddTaskComp, RemoveTaskComp } from "../reducers/CompletedTaskReducer";

const Organiser = () => {
  const loggedinuser = useSelector((state) => state.loggedin.user.userkey);
  const newtasks = useSelector((state) => state.newtask.data);
  const inprogresstasks = useSelector((state) => state.inprogresstask.data);
  const completedtasks = useSelector((state) => state.completedtask.data);
  const tasksfilter = useSelector((state) => state.taskfilter.value);
  const datetofilter = useSelector((state) => state.datefilter.value);
  const dispatch = useDispatch();

  const newtasksbyuser = newtasks.filter(
    (item) => item.userkey == loggedinuser
  );
  const iptasksbyuser = inprogresstasks.filter(
    (item) => item.userkey == loggedinuser
  );
  const completedtasksbyuser = completedtasks.filter(
    (item) => item.userkey == loggedinuser
  );

  const newtasksfilterres = newtasksbyuser.filter(
    (item) => item.priority == tasksfilter
  );
  const newtasksdatefilterres = newtasksbyuser.filter(
    (item) => item.duedate == datetofilter
  );
  const iptasksfilterres = iptasksbyuser.filter(
    (item) => item.priority == tasksfilter
  );
  const iptasksdatefilterres = iptasksbyuser.filter(
    (item) => item.duedate == datetofilter
  );
  const completedtasksfilterres = completedtasksbyuser.filter(
    (item) => item.priority == tasksfilter
  );
  const completedtasksdatefilterres = completedtasksbyuser.filter(
    (item) => item.duedate == datetofilter
  );

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (source.droppableId == destination.droppableId) return;

    if (source.droppableId == 1111 && destination.droppableId == 2222) {
      dispatch(RemoveTask(removeItemById(draggableId, newtasks)));
      dispatch(AddTaskIP(findItemById(draggableId, newtasks)));
    } else if (source.droppableId == 2222 && destination.droppableId == 1111) {
      dispatch(RemoveTaskIP(removeItemById(draggableId, inprogresstasks)));
      dispatch(AddTask(findItemById(draggableId, inprogresstasks)));
    } else if (source.droppableId == 2222 && destination.droppableId == 3333) {
      dispatch(RemoveTaskIP(removeItemById(draggableId, inprogresstasks)));
      dispatch(AddTaskComp(findItemById(draggableId, inprogresstasks)));
    } else if (source.droppableId == 3333 && destination.droppableId == 2222) {
      dispatch(RemoveTaskComp(removeItemById(draggableId, completedtasks)));
      dispatch(AddTaskIP(findItemById(draggableId, completedtasks)));
    } else if (source.droppableId == 3333 && destination.droppableId == 1111) {
      dispatch(RemoveTaskComp(removeItemById(draggableId, completedtasks)));
      dispatch(AddTask(findItemById(draggableId, completedtasks)));
    } else if (source.droppableId == 1111 && destination.droppableId == 3333) {
      dispatch(RemoveTask(removeItemById(draggableId, newtasks)));
      dispatch(AddTaskComp(findItemById(draggableId, newtasks)));
    }
  };

  function findItemById(id, array) {
    return array.find((item) => item.id == id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item.id != id);
  }

  return (
    <div className="Organiser position-relative mt-5">
      <div className="container-fluid">
        <div className="px-4">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Column
                title={"To-Do"}
                tasks={
                  tasksfilter == "all"
                    ? newtasksbyuser
                    : tasksfilter == "date"
                    ? newtasksdatefilterres
                    : newtasksfilterres
                }
                id="1111"
              />
              <Column
                title={"In-Progress"}
                tasks={
                  tasksfilter == "all"
                    ? iptasksbyuser
                    : tasksfilter == "date"
                    ? iptasksdatefilterres
                    : iptasksfilterres
                }
                id="2222"
              />
              <Column
                title={"Completed"}
                tasks={
                  tasksfilter == "all"
                    ? completedtasksbyuser
                    : tasksfilter == "date"
                    ? completedtasksdatefilterres
                    : completedtasksfilterres
                }
                id="3333"
              />
            </div>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default Organiser;
