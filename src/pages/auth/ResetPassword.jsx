import "../../assets/css/login.css";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { BarLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loggedInUser } from "../../reducers/LoggedInReducer";
import { useState } from "react";

const ResetPassword = () => {
  let [loading, setLoading] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  var nav = useNavigate();

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

  const onSubmit = (data) => {
    setLoading(true);
    axios
      .post("https://partytonight.bitwork.tech/public/api/send_otp", data)
      .then((response) => {
        setLoading(false);
        if (response.data.code == 1018) {
          setLoading(false);
          toast({
            title: response.data.message,
            position: "top",
            isClosable: true,
            duration: 1000,
            status: "success",
          });
          dispatch(loggedInUser({ username: "blank", userkey: data.email }));
          setTimeout(() => nav("/otp"), 1000);
        } else if (response.data.code == 2014) {
          setLoading(false);
          toast({
            title: response.data.message,
            position: "top",
            isClosable: true,
            duration: 1000,
            status: "error",
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        toast({
          title: error.message,
          position: "top",
          isClosable: true,
          duration: 1000,
          status: "error",
        });
      });
  };

  return (
    <>
      <div className="reset-password-section text-center position-relative task-bshadow">
        <BarLoader
          color={"#ffffff"}
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <div>
          <i className="fa fa-lock fa-4x"></i>
          <h2 className="text-center mt-4">Forgot Password?</h2>
        </div>
        <p>You can reset your password here.</p>
        <div className="panel-body">
          <form
            id="register-form"
            className="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-group">
              <span className="input-group-addon">
                <i className="glyphicon glyphicon-envelope color-blue"></i>
              </span>
              <input
                {...register("email", {
                  required: "this field is required",
                  minLength: {
                    value: 5,
                    message: "Minimum length is 5",
                  },
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Please enter a valid email",
                  },
                })}
                id="email"
                name="email"
                placeholder="email address"
                className="form-control form-control-lg"
              />
              <p className="text-danger">{errors.email?.message}</p>
            </div>

            <div className="form-group mt-4">
              <div className="d-grid gap-2">
                <button className="btn btn-success btn-md">Send OTP</button>
              </div>
            </div>
            <p className="small fw-bold mt-4 pt-1 mb-0">
              Remember your password ?{" "}
              <Link to="/login" className="link-danger">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
