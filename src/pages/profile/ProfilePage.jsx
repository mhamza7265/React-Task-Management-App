import "../../assets/css/profile.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { AddUsers } from "../../reducers/UsersDataReducer";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [registered, setRegistered] = useState(false);
  const loggedinuser = useSelector((state) => state.loggedin.user);
  const usersdata = useSelector((state) => state.userdata.users);
  const dispatch = useDispatch();

  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const userdata = usersdata.find(
      (item) => item.email == loggedinuser.userkey
    );
    userdata ? setRegistered(true) : setRegistered(false);
  }, []);

  const userdata = usersdata.find((item) => item.email == loggedinuser.userkey);

  const onSubmit = (data) => {
    const obj = {
      ...data,
      name: loggedinuser.username,
      email: loggedinuser.userkey,
      id: usersdata.length + 1,
    };
    dispatch(AddUsers(obj));
    setRegistered(true);
    toast({
      title: "Succesfully Updated",
      position: "top",
      isClosable: true,
      duration: 3000,
      status: "success",
    });
  };

  return (
    <>
      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <h6 className="border-bottom pb-2 mb-0 mb-3">Personal Info</h6>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Name
              </label>
              <div className="input-group mb-3">
                <input
                  {...register("name")}
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  defaultValue={loggedinuser.username}
                  disabled
                />
                <span className="input-group-text" id="basic-addon2">
                  <i className="fa fa-user"></i>
                </span>
              </div>
            </div>
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <div className="input-group mb-3">
                <input
                  {...register("email")}
                  type="text"
                  className="form-control"
                  placeholder="Email Address"
                  defaultValue={loggedinuser.userkey}
                  disabled
                />
                <span className="input-group-text" id="basic-addon2">
                  @
                </span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Contact Number
              </label>
              <div className="input-group mb-3">
                <input
                  {...register("contact", {
                    required: "this field is required",
                  })}
                  type="text"
                  className="form-control"
                  placeholder="Contact Number"
                  {...(registered && { disabled: true })}
                  defaultValue={userdata && userdata.contact}
                />
                <span className="input-group-text" id="basic-addon2">
                  <i className="fa fa-mobile"></i>
                </span>
              </div>
              <p className="text-danger">{errors.contact?.message}</p>
            </div>
            <div className="col-md-6">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Designation
              </label>
              <div className="input-group mb-3">
                <input
                  {...register("designation", {
                    required: "this field is required",
                  })}
                  type="text"
                  className="form-control"
                  placeholder="Designation"
                  {...(registered && { disabled: true })}
                  defaultValue={userdata && userdata.designation}
                />
                <span className="input-group-text" id="basic-addon2">
                  <i className="fa-solid fa-briefcase"></i>
                </span>
              </div>
              <p className="text-danger">{errors.designation?.message}</p>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-sm btn-success"
            {...(registered && { disabled: true })}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ProfilePage;
