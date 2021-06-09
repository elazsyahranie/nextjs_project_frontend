import { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Layout from "../../../components/Layout";
import styles from "../../../styles/Login.module.css";
import { unauthPage } from "../../../middleware/authorizationPage";
import axios from "axios";

export async function getServerSideProps(context) {
  await unauthPage(context);
  return { props: {} }; // untuk halaman yang ga perlu login
}

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ userEmail: "", userPassword: "" });

  const changeText = (event) => {
    // console.log(event.target.value);
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleLogin = (event) => {
    event.preventDefault(); // mencegah reload halaman karena onsubmit
    console.log(form);
    axios
      .post(`http://localhost:3003/api/v1/auth/login`, { ...form })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        // // ambil id
        Cookies.set("user_id", res.data.data.user_id, {
          expires: 7,
          secure: true,
        });
        Cookies.set("token", res.data.data.token, {
          expires: 7,
          secure: true,
        });
        // // yang di simpan adalah token dan user id
        router.push(`/`);
      });
  };

  return (
    <Layout title="Login">
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
                  <img src="/login/email.png" className="my-auto"></img>
                  <input
                    type="email"
                    class={`form-control py-2 ${styles.myFormControl}`}
                    aria-describedby="emailHelp"
                    placeholder="Enter your email"
                    onChange={(event) => changeText(event)}
                    name="userEmail"
                  ></input>
                </div>
                <div
                  className={`d-flex justify-content-start mb-5 ${styles.bottomBorder}`}
                >
                  <img src="/login/password.png" className="my-auto"></img>
                  <input
                    type="password"
                    class={`form-control py-2 ${styles.myFormControl}`}
                    placeholder="Enter your password"
                    onChange={(event) => changeText(event)}
                    name="userPassword"
                  ></input>
                </div>
                <button
                  type="submit"
                  className={`btn  ${styles.btnLogin} w-100`}
                  onClick={handleLogin}
                >
                  Submit
                </button>
              </form>
              <span className="d-block my-5 mx-auto">
                Don't have an account? Let's sign up
              </span>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
}
