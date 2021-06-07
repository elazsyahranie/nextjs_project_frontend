import { useState } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import axios from "axios";
import Layout from "../../../components/Layout";
import styles from "../../../styles/Login.module.css";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
  });

  const changeText = (event) => {
    // console.log(event.target.value);
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleRegister = (event) => {
    event.preventDefault(); // mencegah reload halaman karena onsubmit
    console.log(form);
    axios
      .post(`http://localhost:3003/api/v1/auth/register`, { ...form })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        router.push("/login");
      });
  };
  return (
    <Layout title="Register">
      <>
        <div className="container-fluid">
          <div className="row">
            <div
              className={`col-lg-7 col-md-7 col-sm-7 col-xs-12 ${styles.whiteText} ${styles.blueBackground} py-5`}
            >
              <div className={`row pt-4 ${styles.myLeftPadding}`}>
                <h2>Zdompet</h2>
              </div>
              <div className="d-flex justify-content-center">
                <img src="/login/Group57.png" className=""></img>
              </div>
              <div
                className={`row pt-4 ${styles.myLeftPadding} ${styles.paragraphRightPadding}`}
              >
                <h2 className="mb-4">App That Covering Banking Needs</h2>
                <p className="mt-4">
                  Zwallet is an application that focussing in banking needs for
                  all users in the world. Always updated and always following
                  world trends. 5000+ users registered in Zwallet everyday with
                  worldwide users coverage.
                </p>
              </div>
            </div>
            <div
              className={`col-lg-4 col-md-4 col-sm-4 col-sx-12 d-flex align-content-center flex-wrap ${styles.leftContentInnerPadding}`}
            >
              <h2>
                Start Accessing Banking Needs With All Devices and All Platforms
                With 30.000+ Users
              </h2>
              <p className="py-4">
                Transfering money is eassier than ever, you can access Zwallet
                wherever you are. Desktop, laptop, mobile phone? we cover all of
                that for you!
              </p>
              <form className="w-100">
                <div
                  className={`d-flex justify-content-start mb-5 ${styles.bottomBorder}`}
                >
                  <img src="/login/Vector.png" className="my-auto"></img>
                  <input
                    type="text"
                    class={`form-control py-2 ${styles.myFormControl}`}
                    aria-describedby="emailHelp"
                    onChange={(event) => changeText(event)}
                    name="userName"
                    placeholder="Enter your username"
                  ></input>
                </div>
                <div
                  className={`d-flex justify-content-start mb-5 ${styles.bottomBorder}`}
                >
                  <img src="/login/email.png" className="my-auto"></img>
                  <input
                    type="email"
                    class={`form-control py-2 ${styles.myFormControl}`}
                    aria-describedby="emailHelp"
                    onChange={(event) => changeText(event)}
                    name="userEmail"
                    placeholder="Enter your email"
                  ></input>
                </div>
                <div
                  className={`d-flex justify-content-start mb-5 ${styles.bottomBorder}`}
                >
                  <img src="/login/password.png" className="my-auto"></img>
                  <input
                    type="password"
                    class={`form-control py-2 ${styles.myFormControl}`}
                    onChange={(event) => changeText(event)}
                    name="userPassword"
                    placeholder="Enter your password"
                  ></input>
                </div>
                <button
                  type="submit"
                  className={`btn  ${styles.btnLogin} w-100`}
                  onClick={handleRegister}
                >
                  Sign Up
                </button>
              </form>
              <span className="d-block my-5 mx-auto">
                Already have an account? Let's Login
              </span>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
}
