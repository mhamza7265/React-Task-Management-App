import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { BarLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

function EnterOtp() {
  let [loading, setLoading] = useState(false);
  const toast = useToast();
  var nav = useNavigate();

  const verifyinguser = useSelector((state) => state.loggedin.user);

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
    const obj = { email: verifyinguser.userkey, otp: data.otp };
    setLoading(true);
    axios
      .post("https://partytonight.bitwork.tech/public/api/verif_otp", obj)
      .then((response) => {
        setLoading(false);
        if (response.data.code == 1020) {
          toast({
            title: response.data.message,
            position: "top",
            isClosable: true,
            duration: 1000,
            status: "success",
          });
          setTimeout(() => nav("/change-password"), 1000);
        } else if (response.data.code == 2019) {
          toast({
            title: response.data.message,
            position: "top",
            isClosable: true,
            duration: 1000,
            status: "error",
          });
        } else {
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
        <h2 className="text-center mt-4">Enter OTP</h2>
      </div>
      <p>Sent an OTP on your email</p>
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
              {...register("otp", {
                required: "this field is required",
                minLength: {
                  value: 4,
                  message: "Minimum length is 4",
                },
              })}
              name="otp"
              placeholder="Enter OTP"
              className="form-control form-control-lg"
            />
            <p className="text-danger">{errors.otp?.message}</p>
          </div>

          <div className="form-group mt-4">
            <div className="d-grid gap-2">
              <button className="btn btn-success btn-md">Verify OTP</button>
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
  );
}

export default EnterOtp;
