import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { isLoggedIn } from "../../reducers/loginReducer";
import { loggedInUser } from "../../reducers/LoggedInReducer";
import { BarLoader } from "react-spinners";
import axios from "axios";

const Loginform = () => {
  let [loading, setLoading] = useState(false);

  const toast = useToast();

  const dispatch = useDispatch();

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  var nav = useNavigate();

  const onSubmit = (data) => {
    const obj = { ...data, device_token: "gvhvfcfcxasdkjbhasvyhuvchvuhvbjbj" };
    setLoading(true);
    axios
      .post("https://partytonight.bitwork.tech/public/api/login", obj)
      .then((response) => {
        setLoading(false);
        if (response.data.code == 1005) {
          setLoading(false);
          toast({
            title: response.data.message,
            position: "top",
            isClosable: true,
            duration: 1000,
            status: "error",
          });
        } else if (response.data.status == true) {
          setLoading(false);
          toast({
            title: response.data.message,
            position: "top",
            isClosable: true,
            duration: 1000,
            status: "success",
          });
          dispatch(
            isLoggedIn({ access_token: response.data.user.access_token })
          );
          localStorage.setItem("access_token", response.data.user.access_token);
          localStorage.setItem("user", JSON.stringify(response.data.user.name));
          dispatch(
            loggedInUser({
              username: response.data.user.name,
              userkey: response.data.user.email,
            })
          );
          setTimeout(() => nav("/"), 1000);
        }
      })
      .catch((error) => {
        setLoading(false);
        error.message == "Request failed with status code 401" &&
          toast({
            title: "Wrong password.",
            position: "top",
            isClosable: true,
            duration: 1000,
            status: "error",
          });
      });
  };

  return (
    <form
      className="login-form position-relative task-bshadow"
      onSubmit={handleSubmit(onSubmit)}
    >
      <BarLoader
        color={"#ffffff"}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
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
          id="form3Example3"
          className="form-control form-control-lg"
        />
        <p className="text-danger">{errors.email?.message}</p>
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
          id="form3Example4"
          className="form-control form-control-lg"
        />
        <p>{errors.password?.message}</p>
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
        <button className="btn btn-success btn-md">Login</button>
        <p className="small fw-bold mt-2 pt-1 mb-0">
          Don't have an account?
          <Link to="/register" className="link-danger">
            Register
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Loginform;
