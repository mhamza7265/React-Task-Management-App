import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn, isLoggedOut } from "../../reducers/loginReducer";
import { loggedInUser } from "../../reducers/LoggedInReducer";

const Loginform = () => {
  const [inputs, setInputs] = useState({});
  const [passError, setPassError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);

  const usersdata = useSelector((state) => state.userdata.users);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChange = (event) => {
    const name = event.target.getAttribute("data");
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    setPassError(false);
    setUserNameError(false);
    console.log(inputs);
  };

  var nav = useNavigate();

  const onSubmit = () => {
    const userData = usersdata.find((user) => user.email === inputs.email);
    console.log(userData);
    if (userData && userData.password === inputs.password) {
      dispatch(isLoggedIn());
      dispatch(
        loggedInUser({
          username: userData.firstname + " " + userData.lastname,
          userkey: userData.userkey,
        })
      );
      nav("/");
    } else if (userData && userData.password !== inputs.password) {
      dispatch(isLoggedOut());
      setPassError(true);
    } else {
      dispatch(isLoggedOut());
      setUserNameError(true);
    }
    userData.password === inputs.password && nav("/");
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="d-flex align-items-center my-4">
        <h1 className="text-center fw-normal mb-0 me-3">Sign In</h1>
      </div>
      {/* <!-- Email input --> */}
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form3Example3">
          Email address
        </label>
        <input
          {...register("email", {
            required: "this field is required",
            minLength: {
              value: 5,
              message: "Minimum length is 5",
            },
          })}
          type="text"
          data="email"
          placeholder="Enter your email"
          onChange={handleChange}
          id="form3Example3"
          className="form-control form-control-lg"
        />
        <p>{errors.username?.message}</p>
        {userNameError && <p className="text-danger">Username is wrong</p>}
      </div>

      {/* <!-- Password input --> */}
      <div className="form-outline mb-3">
        <label className="form-label" htmlFor="form3Example4">
          Password
        </label>
        <input
          {...register("password", { required: "Password is required" })}
          type="password"
          data="password"
          placeholder="Enter your password"
          onChange={handleChange}
          id="form3Example4"
          className="form-control form-control-lg"
        />
        <p>{errors.password?.message}</p>
        {passError && <p className="text-danger">Password is wrong</p>}
      </div>

      <div className="d-flex justify-content-between align-items-center">
        {/* <!-- Checkbox --> */}
        <div className="form-check mb-0">
          <input
            className="form-check-input me-2"
            type="checkbox"
            value=""
            id="form2Example3"
          />
          <label className="form-check-label" htmlFor="form2Example3">
            Remember me
          </label>
        </div>
        <Link to="/reset-password" className="text-body">
          Forgot password?
        </Link>
      </div>

      <div className="text-center text-lg-start mt-4 pt-2">
        <button className="btn btn-primary btn-lg">Login</button>
        <p className="small fw-bold mt-2 pt-1 mb-0">
          Don't have an account?
          <Link to="/register" className="link-danger">
            Register
          </Link>
        </p>
      </div>
    </form>
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <div className="inpt-div">
    //     <input
    //       {...register("username", {
    //         required: "this field is required",
    //         minLength: {
    //           value: 5,
    //           message: "Minimum length is 5",
    //         },
    //       })}
    //       type="text"
    //       data="username"
    //       placeholder="Email"
    //       onChange={handleChange}
    //     />
    //     <p>{errors.username?.message}</p>
    //     {userNameError && <p className="text-danger">Username is wrong</p>}
    //   </div>
    //   <div className="inpt-div">
    //     <input
    //       {...register("password", { required: "Password is required" })}
    //       type="password"
    //       data="password"
    //       placeholder="Password"
    //       onChange={handleChange}
    //     />
    //     <p>{errors.password?.message}</p>
    //     {passError && <p className="text-danger">Password is wrong</p>}
    //     <div className="text-end">
    //       <div className="w-100">
    //         <Link className="float-end d-block me-4" to="update">
    //           Update Password
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="w-100 mt-5">
    //     <button className="">login</button>
    //   </div>
    // </form>
  );
};

export default Loginform;
