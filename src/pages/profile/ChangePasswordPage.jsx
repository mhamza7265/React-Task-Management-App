import "../../assets/css/profile.css";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { BarLoader } from "react-spinners";
import axios from "axios";

const ChangePassword = () => {
  let [loading, setLoading] = useState(false);
  const loggedinuser = useSelector((state) => state.loggedin.user);
  const [newPw, setNewPw] = useState("");
  const toast = useToast();
  var nav = useNavigate();

  var hasNum = /\d/;
  var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  var hasletter = /[a-zA-Z]/g;

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
    watch,
  } = useForm();

  const handleChange = (e) => {
    if (e.target.getAttribute("data") == "newpassword") {
      const newpwvalue = e.target.value;
      setNewPw(() => newpwvalue);
    }
  };

  const onSubmit = (data) => {
    const obj = { email: loggedinuser.userkey, password: data.newpassword };
    setLoading(true);
    axios
      .post("https://partytonight.bitwork.tech/public/api/reset_password", obj)
      .then((response) => {
        setLoading(false);
        if (response.data.status == true) {
          setLoading(false);
          toast({
            title: response.data.message,
            position: "top",
            isClosable: true,
            duration: 1000,
            status: "success",
          });
          setTimeout(() => {
            nav("/login");
          }, 1000);
        } else {
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
      <div className="my-3 p-3 bg-body rounded shadow-sm position-relative task-bshadow">
        <BarLoader
          color={"#ffffff"}
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <h6 className="border-bottom pb-2 mb-0 mb-3">Change Password</h6>
        <div className="">
          <div className="col-lg-12">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  New Password
                </label>
                <div className="input-group">
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
                <p className="text-danger m-0">{errors.newpassword?.message}</p>
              </div>
              <div className="col-lg-12 mt-0">
                <p className="err-text text-center">
                  {" "}
                  <i
                    className={`${
                      newPw.length >= 8 &&
                      hasNum.test(newPw) &&
                      format.test(newPw) &&
                      hasletter.test(newPw)
                        ? "fa fa-check text-success"
                        : newPw.length >= 1 || newPw.length == 0
                        ? "fa-solid fa-xmark text-danger"
                        : null
                    } `}
                  ></i>{" "}
                  At least 8 characters a number and special character.
                </p>
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
                      validate: (value) =>
                        value === watch("newpassword") ||
                        "Passwords do not match",
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
              <button className="btn btn-success btn-sm">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
