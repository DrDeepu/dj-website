// import "./images/icons/favicon.ico";
// import "./vendor/bootstrap/css/bootstrap.min.css";
// import "./fonts/font-awesome-4.7.0/css/font-awesome.min.css";
// import "./vendor/animate/animate.css";
// import "./vendor/css-hamburgers/hamburgers.min.css";
// import "./vendor/select2/select2.min.css";
// import "./css/util.css";
// import "./css/main.css";

import Image from "next/image";
import Layout from "@/components/Layout";
import Link from "next/link";

const { default: Head } = require("next/head");

const Index = () => {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* <body> */}
      <Layout>
        <div className="limiter">
          <div className="container-login100">
            <div className="wrap-login100">
              <div className="login100-pic js-tilt" data-tilt>
                <img src="http://localhost:3000/img-01.png" alt="IMG" />
              </div>

              <form className="login100-form validate-form">
                <label className="login100-form-title">Login</label>

                <div className="wrap-input100 validate-input">
                  <input
                    className="input100"
                    type="text"
                    name="email"
                    placeholder="Email"
                  />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                  </span>
                </div>

                <div
                  className="wrap-input100 validate-input"
                  data-validate="Password is required"
                >
                  <input
                    className="input100"
                    type="password"
                    name="pass"
                    placeholder="Password"
                  />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i className="fa fa-lock" aria-hidden="true"></i>
                  </span>
                </div>

                <div className="container-login100-form-btn">
                  <button className="login100-form-btn">Login</button>
                </div>

                <div className="text-center p-t-12">
                  <label className="txt1">Forgot</label>
                  <a className="txt2" href="#">
                    Username / Password?
                  </a>
                </div>

                <div className="text-center p-t-136">
                  <Link
                    className="txt2"
                    href="http://localhost:3000/account/register"
                  >
                    Create your Account
                    <i
                      className="fa fa-long-arrow-right m-l-5"
                      aria-hidden="true"
                    ></i>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* </body> */}
      </Layout>
    </>
  );
};

export default Index;
