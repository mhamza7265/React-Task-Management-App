import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reducers/loginReducer";
import NewTaskReducer from "../reducers/NewTaskReducer";
import IndexReducer from "../reducers/IndexReducer";
import DisplayTypeReducer from "../reducers/DisplayTypeReducer";
import LoggedInReducer from "../reducers/LoggedInReducer";
import UsersDataReducer from "../reducers/UsersDataReducer";
import InProgressTaskReducer from "../reducers/InProgressTaskReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import CompletedTaskReducer from "../reducers/CompletedTaskReducer";
import TaskFilterReducer from "../reducers/TaskFilterReducer";
import DateFilterReducer from "../reducers/DateFilterReducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  login: loginReducer,
  newtask: NewTaskReducer,
  inprogresstask: InProgressTaskReducer,
  completedtask: CompletedTaskReducer,
  index: IndexReducer,
  display: DisplayTypeReducer,
  loggedin: LoggedInReducer,
  userdata: UsersDataReducer,
  taskfilter: TaskFilterReducer,
  datefilter: DateFilterReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

store.subscribe(() => {});

export default store;
export const persistor = persistStore(store);
