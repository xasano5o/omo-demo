// Login.js

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTokenUserMutation } from "../../../redux/slice/client/auth/useGetToken";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [login_set, { isLoading }] = useTokenUserMutation();

  const handleLogin = () => {
    const data = login_set(credentials).unwrap();
    data
      .then((item) => {
        if (item.refresh && item.access) {
          localStorage.setItem("token", JSON.stringify(item.refresh));
          navigate("/admin/home");
          toast.success(`Siz muvofaqiyatli kirdingiz`);
        } else {
          toast.error(`Siz kira olmadingiz`);
        }
      })
      .catch((error) => {
        toast.error(`Username yoki parolda xatolik bor`);
      });
  };
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6">
        <div className="card shadow">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Login</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3 position-relative">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  required
                />
                <span
                  className="position-absolute top-50 end-0 px-2"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? (
                    <FaEye className="text-2xl" />
                  ) : (
                    <FaEyeSlash className="text-2xl" />
                  )}
                </span>
              </div>

              {/* {isLoading ? (
                <ButtonLoader Color="white" Size={20} extraclassName="h-6" />
              ) : ( */}
              <button
                type="submit"
                disabled={isLoading && true}
                onClick={handleLogin}
                className="disabled:bg-gray-300 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center w-100"
              >
                Kirish
              </button>
              {/* )} */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
