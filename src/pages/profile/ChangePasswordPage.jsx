import "../../assets/css/profile.css";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { EDITUSERSPASSWORD } from "../../reducers/UsersDataReducer";
import { useState } from "react";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const usersdata = useSelector((state) => state.userdata.users);
  const loggedinuser = useSelector((state) => state.loggedin.user);
  const [newPw, setNewPw] = useState("");
  const [currErr, setCurrErr] = useState(false);
  const [matchErr, setMatchErr] = useState(false);

  var hasNum = /\d/;
  var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  var hasletter = /[a-zA-Z]/g;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  var nav = useNavigate();

  const handleChange = (e) => {
    if (e.target.getAttribute("data") == "newpassword") {
      const newpwvalue = e.target.value;
      setNewPw(() => newpwvalue);
    }
    setCurrErr(false);
    setMatchErr(false);
  };

  console.log(newPw);

  const onSubmit = (data) => {
    const loggedinuserdetail = usersdata.find(
      (item) => item.userkey == loggedinuser.userkey
    );
    const currentpw = data.currentpassword === loggedinuserdetail.password;
    const matchpw = data.newpassword === data.confirmnewpassword;
    const userindex = usersdata
      .map((item) => item.password)
      .indexOf(loggedinuserdetail.password);

    console.log(loggedinuserdetail);
    console.log(currentpw);
    console.log(userindex);

    if (currentpw && matchpw) {
      dispatch(
        EDITUSERSPASSWORD({ index: userindex, password: data.newpassword })
      );
      nav("/profile");
    } else if (!currentpw) {
      setCurrErr(true);
    } else if (!matchpw) {
      setMatchErr(true);
    }
  };

  return (
    <>
      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <h6 className="border-bottom pb-2 mb-0 mb-3">Change Password</h6>

        <div className="row">
          <div className="col-4">
            <p>Your Password must contain.</p>
            <p>
              {" "}
              <i
                className={`${
                  newPw.length >= 8
                    ? "fa fa-check"
                    : newPw.length >= 1
                    ? "fa-solid fa-xmark"
                    : null
                } `}
              ></i>{" "}
              At least 8 characters.
            </p>
            <p>
              {" "}
              <i
                className={`${
                  hasNum.test(newPw)
                    ? "fa fa-check"
                    : newPw.length == 0
                    ? null
                    : "fa-solid fa-xmark"
                } `}
              ></i>{" "}
              at least 1 number.
            </p>
            <p>
              {" "}
              <i
                className={`${
                  format.test(newPw)
                    ? "fa fa-check"
                    : newPw.length == 0
                    ? null
                    : "fa-solid fa-xmark"
                } `}
              ></i>{" "}
              at least 1 special character.
            </p>
            <p>
              {" "}
              <i
                className={`${
                  format.test(newPw) &&
                  hasNum.test(newPw) &&
                  hasletter.test(newPw)
                    ? "fa fa-check"
                    : newPw.length == 0
                    ? null
                    : "fa-solid fa-xmark"
                } `}
              ></i>{" "}
              mixed case characters.
            </p>
          </div>
          <div className="col-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Current Password
                </label>
                <div className="input-group mb-3">
                  <input
                    {...register("currentpassword", {
                      required: "this field is required",
                    })}
                    type="password"
                    data="currentpassword"
                    className="form-control"
                    placeholder="Current Password"
                    onChange={handleChange}
                  />
                  <span className="input-group-text" id="basic-addon2">
                    <i className="fa fa-key"></i>
                  </span>
                </div>
                {currErr && <p className="text-danger">Wrong Password</p>}
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  New Password
                </label>
                <div className="input-group mb-3">
                  <input
                    {...register("newpassword", {
                      required: "this field is required",
                      minLength: {
                        value: 8,
                        message: "Minimum length is 8",
                      },
                    })}
                    type="password"
                    data="newpassword"
                    className="form-control"
                    placeholder="New Password"
                    onChange={handleChange}
                  />
                  <span className="input-group-text" id="basic-addon2">
                    <i className="fa fa-key"></i>
                  </span>
                </div>
                <p className="text-danger">{errors.newpassword?.message}</p>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Confirm New Password
                </label>
                <div className="input-group mb-3">
                  <input
                    {...register("confirmnewpassword", {
                      required: "this field is required",
                      minLength: {
                        value: 8,
                        message: "Minimum length is 8",
                      },
                    })}
                    type="password"
                    data="confirmnewpassword"
                    className="form-control"
                    placeholder="Confirm New Password"
                    onChange={handleChange}
                  />
                  <span className="input-group-text" id="basic-addon2">
                    <i className="fa fa-key"></i>
                  </span>
                </div>
                <p className="text-danger">
                  {errors.confirmnewpassword?.message}
                </p>
              </div>
              <hr />
              <button className="btn btn-success btn-sm float-end">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
