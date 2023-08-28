import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AddUsers } from "../../reducers/UsersDataReducer";

function RegisterPage() {
  const [error, setError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [pwError, setPwError] = useState(false);
  const usersdata = useSelector((state) => state.userdata.users);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChange = () => {
    setError(false);
  };

  var nav = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    const useristrue = usersdata.find((item) => item.email == data.email);
    const usernameintrue = usersdata.find(
      (item) => item.username == data.username
    );

    const pwmatch = data.password === data.repeatpw;

    console.log(data.password === data.repeatpw);
    console.log(pwError);
    const dataobj = { ...data, userkey: Math.random(), id: usersdata.length };
    delete dataobj.repeatpw;

    if (!useristrue && !usernameintrue && pwmatch) {
      dispatch(AddUsers(dataobj));
      setError(false);
      setUserError(false);
      nav("/login");
    } else {
      if (useristrue) {
        setError(true);
      } else if (usernameintrue) {
        setUserError(true);
      } else if (!pwmatch) {
        setPwError(true);
      }
    }
    console.log(usersdata);
  };

  return (
    <>
      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <h6 className="border-bottom pb-2 mb-0 mb-3">Register</h6>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Username
              </label>
              <div className="input-group mb-3">
                <input
                  {...register("username", {
                    required: "this field is required",
                    minLength: {
                      value: 5,
                      message: "Minimum length is 5",
                    },
                  })}
                  type="text"
                  data="username"
                  placeholder="Username"
                  className="form-control"
                />
                <span className="input-group-text" id="basic-addon2">
                  <i className="fa fa-user"></i>
                </span>
              </div>
              <p>{errors.username?.message}</p>
              {userError ? (
                <p className="text-danger">Username already exists</p>
              ) : null}
            </div>
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <div className="input-group mb-3">
                <input
                  {...register("email", {
                    required: "this field is required",
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Please enter a valid email",
                    },
                  })}
                  data="email"
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Email Address"
                />
                <span className="input-group-text" id="basic-addon2">
                  @
                </span>
              </div>
              <p>{errors.email?.message}</p>
              {error ? (
                <p className="text-danger">User already exists</p>
              ) : null}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                First Name
              </label>
              <div className="input-group mb-3">
                <input
                  {...register("firstname", {
                    required: "this field is required",
                    minLength: {
                      value: 3,
                      message: "Minimum length is 5",
                    },
                  })}
                  type="text"
                  data="firstname"
                  placeholder="First Name"
                  className="form-control"
                />
                <span className="input-group-text" id="basic-addon2">
                  <i className="fa fa-user"></i>
                </span>
              </div>
              <p>{errors.firstname?.message}</p>
            </div>
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Last Name
              </label>
              <div className="input-group mb-3">
                <input
                  {...register("lastname", {
                    required: "this field is required",
                    minLength: {
                      value: 3,
                      message: "Minimum length is 5",
                    },
                  })}
                  type="text"
                  data="lastname"
                  placeholder="Last Name"
                  className="form-control"
                />
                <span className="input-group-text" id="basic-addon2">
                  <i className="fa fa-user"></i>
                </span>
              </div>
              <p>{errors.lastname?.message}</p>
            </div>
          </div>

          {/*Password*/}
          <div className="row">
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Password
              </label>
              <div className="input-group mb-3">
                <input
                  {...register("password", {
                    required: "this field is required",
                    minLength: {
                      value: 5,
                      message: "Minimum length is 5",
                    },
                  })}
                  type="password"
                  data="password"
                  placeholder="Password"
                  className="form-control"
                />
                <span className="input-group-text" id="basic-addon2">
                  <i className="fa-solid fa-key"></i>
                </span>
              </div>
              <p>{errors.password?.message}</p>
            </div>
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Repeat Password
              </label>
              <div className="input-group mb-3">
                <input
                  {...register("repeatpw", {
                    required: "this field is required",
                    minLength: {
                      value: 5,
                      message: "Minimum length is 5",
                    },
                  })}
                  type="password"
                  data="repeatpw"
                  placeholder="Repeat Password"
                  className="form-control"
                />
                <span className="input-group-text" id="basic-addon2">
                  <i className="fa-solid fa-key"></i>
                </span>
              </div>
              <p>{errors.repeatpw?.message}</p>
            </div>
          </div>
          {pwError ? (
            <p className="text-danger">Password does'nt match</p>
          ) : null}

          <div className="row">
            <div className="col-md-6">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Contact Number
              </label>
              <div className="input-group mb-3">
                <input
                  {...register("contact", {
                    required: "this field is required",
                    minLength: {
                      value: 3,
                      message: "Minimum length is 5",
                    },
                  })}
                  type="text"
                  data="contact"
                  placeholder="Contact Number"
                  className="form-control"
                />
                <span className="input-group-text" id="basic-addon2">
                  <i className="fa fa-mobile"></i>
                </span>
              </div>
              <p>{errors.contact?.message}</p>
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
                  data="designation"
                  placeholder="Designation"
                  className="form-control"
                />
                <span className="input-group-text" id="basic-addon2">
                  <i class="fa-solid fa-briefcase"></i>
                </span>
              </div>
              <p>{errors.designation?.message}</p>
            </div>
          </div>
          <Link className="btn btn-sm btn-danger" to="/login">
            Cancel
          </Link>
          <button className="btn btn-success btn-sm float-end">Submit</button>
        </form>
      </div>
    </>
  );
}

export default RegisterPage;

// function RegisterPage() {
//   return (
//     <div>
//       <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
//         <div className="d-flex align-items-center my-4">
//           <h1 className="text-center fw-normal mb-0 me-3">Sign In</h1>
//         </div>
//         {/* <!-- Email input --> */}
//         <div className="form-outline mb-4">
//           <label className="form-label" htmlFor="form3Example3">
//             Email address
//           </label>
//           <input
//             {...register("username", {
//               required: "this field is required",
//               minLength: {
//                 value: 5,
//                 message: "Minimum length is 5",
//               },
//             })}
//             type="text"
//             data="username"
//             placeholder="Enter your email"
//             onChange={handleChange}
//             id="form3Example3"
//             className="form-control form-control-lg"
//           />
//           <p>{errors.username?.message}</p>
//           {userNameError && <p className="text-danger">Username is wrong</p>}
//         </div>

//         {/* <!-- Password input --> */}
//         <div className="form-outline mb-3">
//           <label className="form-label" htmlFor="form3Example4">
//             Password
//           </label>
//           <input
//             {...register("password", { required: "Password is required" })}
//             type="password"
//             data="password"
//             placeholder="Enter your password"
//             onChange={handleChange}
//             id="form3Example4"
//             className="form-control form-control-lg"
//           />
//           <p>{errors.password?.message}</p>
//           {passError && <p className="text-danger">Password is wrong</p>}
//         </div>

//         <div className="d-flex justify-content-between align-items-center">
//           {/* <!-- Checkbox --> */}
//           <div className="form-check mb-0">
//             <input
//               className="form-check-input me-2"
//               type="checkbox"
//               value=""
//               id="form2Example3"
//             />
//             <label className="form-check-label" htmlFor="form2Example3">
//               Remember me
//             </label>
//           </div>
//           <Link to="/reset-password" className="text-body">
//             Forgot password?
//           </Link>
//         </div>

//         <div className="text-center text-lg-start mt-4 pt-2">
//           <button className="btn btn-primary btn-lg">Login</button>
//           <p className="small fw-bold mt-2 pt-1 mb-0">
//             Don't have an account?
//             <a href="#!" className="link-danger">
//               Register
//             </a>
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default RegisterPage;
