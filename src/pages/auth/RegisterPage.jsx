import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { BarLoader } from "react-spinners";
import { useState } from "react";

function RegisterPage() {
  let [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const override = {
    display: "block",
    position: "absolute",
    top: 0,
    left: 0,
    margin: "0 auto",
    borderColor: "red",
    width: "100%",
    backgroundColor: "#4b6262",
  };

  const onSubmit = async (data) => {
    const credentials = {
      first_name: data.first_name,
      last_name: data.last_name,
      gender: data.gender,
      email: data.email,
      password: data.password,
    };

    setLoading(true);
    axios
      .post("https://partytonight.bitwork.tech/public/api/signup", credentials)
      .then((response) => {
        setLoading(false);
        response.data.code == 1004
          ? toast({
              title: response.data.message,
              position: "top",
              isClosable: true,
              duration: 3000,
              status: "success",
            })
          : toast({
              title: response.data.message,
              position: "top",
              isClosable: true,
              duration: 3000,
              status: "error",
            });
        setTimeout(() => navigate("/login"), 3000);
      })
      .catch((error) => {
        toast({
          title: error.message,
          position: "top",
          isClosable: true,
          duration: 3000,
          status: "error",
        });
      });
  };

  return (
    <>
      <div className="my-3 p-3 bg-body rounded shadow-sm task-bshadow position-relative">
        <BarLoader
          color={"#ffffff"}
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <h6 className="border-bottom pb-2 mb-0 mb-3">Register</h6>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                First Name
              </label>
              <div className="input-group mb-3">
                <input
                  {...register("first_name", {
                    required: "this field is required",
                    minLength: {
                      value: 3,
                      message: "Minimum length is 5",
                    },
                  })}
                  type="text"
                  data="first_name"
                  placeholder="First Name"
                  className="form-control"
                />
                <span className="input-group-text" id="basic-addon2">
                  <i className="fa fa-user"></i>
                </span>
              </div>
              <p className="text-danger">{errors.firstname?.message}</p>
            </div>
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Last Name
              </label>
              <div className="input-group mb-3">
                <input
                  {...register("last_name", {
                    required: "this field is required",
                    minLength: {
                      value: 3,
                      message: "Minimum length is 5",
                    },
                  })}
                  type="text"
                  data="last_name"
                  placeholder="Last Name"
                  className="form-control"
                />
                <span className="input-group-text" id="basic-addon2">
                  <i className="fa fa-user"></i>
                </span>
              </div>
              <p className="text-danger">{errors.lastname?.message}</p>
            </div>
          </div>
          <div className="row">
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
                  className="form-control"
                  placeholder="Email Address"
                />
                <span className="input-group-text" id="basic-addon2">
                  @
                </span>
              </div>
              <p className="text-danger">{errors.email?.message}</p>
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
                    // pattern: {
                    //   value:
                    //     "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$",
                    //   message:
                    //     "Must include lowercase, uppercase, number and special character",
                    // },
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
              <p className="text-danger">{errors.password?.message}</p>
            </div>
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Confirm Password
              </label>
              <div className="input-group mb-3">
                <input
                  {...register("repeatpw", {
                    required: "this field is required",
                    minLength: {
                      value: 5,
                      message: "Minimum length is 5",
                    },
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                  type="password"
                  data="repeatpw"
                  placeholder="Confirm Password"
                  className="form-control"
                />
                <span className="input-group-text" id="basic-addon2">
                  <i className="fa-solid fa-key"></i>
                </span>
              </div>
              <p className="text-danger">{errors.repeatpw?.message}</p>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Gender
              </label>
              <div className="input-group mb-3">
                <select
                  {...register("gender", {
                    required: "this field is required",
                  })}
                  data="gender"
                  placeholder="Gender"
                  className="form-control"
                  defaultValue={"Male"}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
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
