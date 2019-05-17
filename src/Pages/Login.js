import React, { useState, useEffect } from "react";
import "./Login.css";
import Axios from "axios";
import { login } from "../helpers/Auth";
import { Redirect } from "react-router-dom";
import { loadCSS, loadScript, clearAllScriptAndCSS } from "../helpers/Loader";
import loading from "../components/Loading";
import "../components/loading.css";
const loadHtmlLibrary = () => {
  clearAllScriptAndCSS();
  // Head
  loadCSS("lib/bootstrap/dist/css/bootstrap.min.css");
  loadCSS("lib/font-awesome/css/font-awesome.min.css");
  loadCSS("lib/Ionicons/css/ionicons.min.css");
  loadCSS("dist/css/AdminLTE.css");
  loadCSS("plugins/alertifyjs/css/alertify.min.css");
  loadCSS("plugins/alertifyjs/css/themes/default.min.css");
  loadCSS("plugins/jquery-confirm/jquery-confirm.min.css");
  loadCSS("dist/css/skins/skin-blue.min.css");
  loadCSS(
    "https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic"
  );

  // Footer
  loadScript("lib/jquery/dist/jquery.min.js");
  loadScript("lib/bootstrap/dist/js/bootstrap.min.js");
  loadScript("dist/js/adminlte.js");
  loadScript("plugins/alertifyjs/alertify.min.js");
  loadScript("plugins/jquery-confirm/jquery-confirm.min.js");
  
  window.onload = () => {
    console.log('onload');
    window.$.alertError = message => {
      window.$.alert({
        title: "Lỗi",
        content: message,
        type: "red",
        animationSpeed: 100
      });
    };
    
    window.$.alertWarning = message => {
      window.$.alert({
        title: "Lưu ý",
        content: message,
        animationSpeed: 100,
        type: "orange"
      });
    };
    
    window.$.alertSuccess = message => {
      window.$.alert({
        title: "Thành công",
        content: message,
        animationSpeed: 100,
        type: "green"
      });
    };
    // custorm library
    window.$.showAlert = (title, message) => {
      window.$.alert({
        title: title,
        content: message,
        animation: "bottom",
        animationSpeed: 200
      });
    };
  };
};

const Login = props => {
  // loadHtmlLibrary();
  var $ = window.$;
  const [isload, setIsload] = useState(true);
  useEffect(() => {
  }, []);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitForm = e => {
    e.preventDefault();
    console.log(process.config.loginUrl);
    Axios.post(process.config.loginUrl, {
      email: email,
      password: password
    })
      .then(res => {
        if (res.data.result) {
          login(res.data.token, res.data.role, res.data.imageCode);
          if (res.data.role === "admin")
            window.location.href = "/admin/dashboard";
          else if (res.data.role === "provider")
            window.location.href = "/provider/dashboard";
          else if (res.data.role === "customer") window.location.href = "/";
        } else $.alertError(res.data.message);
      })
      .catch(err => {
        console.log(err);
        $.alertError("Lỗi kết nối");
      });
  };


  return isload == false ? (
    <div className="login-box">
      {/* <!-- /.login-logo --> */}
      <div className="login-box-body">
        <p className="login-box-msg">Đăng nhập để tiếp tục</p>

        <form action={process.config.loginUrl} method="post">
          <div className="form-group has-feedback">
            <input
              type="email"
              className="form-control"
              placeholder="Email or Username"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <span className="glyphicon glyphicon-envelope form-control-feedback" />
          </div>
          <div className="form-group has-feedback">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <span className="glyphicon glyphicon-lock form-control-feedback" />
          </div>
          <div className="row">
            <div className="col-xs-8">
              <div className="checkbox icheck">
                <label>
                  <div
                    className="icheckbox_square-blue checked"
                    aria-checked="false"
                    aria-disabled="false"
                    style={{ position: "relative" }}
                  />
                  <input
                    type="checkbox"
                    style={{ position: "unset", margin: 0 }}
                  />
                  <span>Nhớ tài khoản</span>
                </label>
              </div>
            </div>
            {/* <!-- /.col --> */}
            <div className="col-xs-4">
              <button
                className="btn btn-primary btn-block btn-flat"
                onClick={submitForm}
              >
                Đăng nhập
              </button>
            </div>
            {/* <!-- /.col --> */}
          </div>
        </form>

        <a href="#">Quên mật khẩu</a>
        <br />
        <a href="register.html" className="text-center">
          Đăng kí mới
        </a>
      </div>
    </div>
  ) : null;
};

export default Login;
