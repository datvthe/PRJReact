import DefaultLayout from "../layouts/defaultlayout";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const proceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      fetch(`http://localhost:9999/users?username=${username}`)
        .then((res) => res.json())
        .then((resp) => {
          if (Object.keys(resp).length === 0) {
            toast.error("Please enter a valid username");
          } else {
            if (resp[0].password === password) {
              toast.success("Login success");
              sessionStorage.setItem("username", username);
              sessionStorage.setItem("isAdmin", resp[0].isAdmin);
              navigate("/");
            } else {
              toast.error("Please enter valid credentials");
            }
          }
        })
        .catch((err) => {
          toast.error("Login failed due to: " + err.message);
        });
    }
  };

  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.warning("Please enter a username");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please enter a password");
    }
    return result;
  };

  return (
    <DefaultLayout>
      <ToastContainer />
      <form onSubmit={proceedLogin} style={{ marginLeft: "-100px" }}>
        <div className="row">
          <div className="col-lg-6">
            <h3>ĐĂNG NHẬP</h3>
            <br />
            <br />
            <label>
              Tên Đăng Nhập <span style={{ color: "red" }}>*</span>
            </label>
            <br />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              style={{ width: "90%" }}
            ></input>
            <br />
            <br />
            <label>
              Mật Khẩu <span style={{ color: "red" }}>*</span>
            </label>
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={{ width: "90%" }}
            ></input>
            <br />
            <br />
            <div className="row">
              <div className="col-lg-6" style={{ paddingLeft: "18px"}}>
                <button type="submit">Đăng nhập</button>
              </div>
              <div className="col-lg-6" style={{ marginTop: "25px" }}>
                <Link to="/">Quên mật khẩu?</Link>
              </div>
            </div>
          </div>

          <div className="col-lg-6" style={{ borderLeft: "1px solid white" }}>
            <div style={{ marginLeft: "30px" }}>
              <h3>Bạn chưa có tài khoản?</h3>
              <button type="submit">
                <Link to="/register" style={{ color: "white" }}>
                  Đăng ký ngay
                </Link>
              </button>
            </div>
          </div>
        </div>
      </form>
      <br />
      <br />
    </DefaultLayout>
  );
}