import DefaultLayout from "../layouts/defaultlayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { username, password, email, name, age };
    if (!validateInputs(user)) {
      return;
    }
    fetch("http://localhost:9999/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then(() => {
        alert("Add new success.");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const validateInputs = (user) => {
    for (const key in user) {
      if (user[key] === "" || user[key] === undefined) {
        alert(`Please enter a value for ${key}.`);
        return false;
      }
    }
    return true;
  };

  return (
    <DefaultLayout>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 border-right-white">
            <h3>Sign Up</h3>
            <br />
            <br />
            <form onSubmit={handleSubmit} style={{borderRight:'1px solid white', marginLeft:'-10%'}}>
              <div className="form-group">
                <label>
                  Username <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  Password <span style={{ color: "red" }}>*</span>{" "}
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  Age<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter your age"
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  Email<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Đăng ký ngay
              </button>
            </form>
            <br />
            <br />
            <p>
              Bạn đã có tài khoản?{" "}
              <a href="/login">
                Đăng nhập
              </a>
            </p>
          </div>

          <div className="col-md-6">
            <img
              src={require("../components/image/11.jpg")}
              style={{ width: "70%", marginLeft:'10%'}}
              alt="Image"
            />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}