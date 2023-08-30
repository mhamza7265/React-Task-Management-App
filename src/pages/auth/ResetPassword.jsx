import "../../assets/css/login.css";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  return (
    <>
      <div className="reset-password-section text-center">
        <div>
          <i className="fa fa-lock fa-4x"></i>
          <h2 className="text-center mt-4">Forgot Password?</h2>
        </div>
        <p>You can reset your password here.</p>
        <div className="panel-body">
          <form
            id="register-form"
            role="form"
            autoComplete="off"
            className="form"
            method="post"
          >
            <div className="form-group">
              <span className="input-group-addon">
                <i className="glyphicon glyphicon-envelope color-blue"></i>
              </span>
              <input
                id="email"
                name="email"
                placeholder="email address"
                className="form-control form-control-lg"
                type="email"
              />
            </div>

            <div className="form-group mt-4">
              <div className="d-grid gap-2">
                <button type="button" className="btn btn-success btn-md">
                  Reset Password
                </button>
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
