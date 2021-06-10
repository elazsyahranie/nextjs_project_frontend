import { useEffect, useState } from "react";
import axiosApiIntances from "../../../utils/axios";
import Layout from "../../../components/Layout";
import Navbar from "../../../components/module/Navbar";
import styles from "../../../styles/index.module.css";
import { authPage } from "../../../middleware/authorizationPage";
import Footer from "../../../components/module/Footer";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "axios";

// Proses getData dilakukan di server
export async function getServerSideProps(context) {
  const data = await authPage(context); // Untuk halaman yang harus login dulu (katanya)
  console.log(data);
  const res = await axiosApiIntances
    .get(`auth/${data.user}`)
    .then((res) => {
      console.log(res.data);
      return res.data; // return kalau hanya satu baris
    })
    .catch((err) => {
      console.log(err);
      return [];
    });

  // Menjembatani 'getServerSideProps' dan....
  return {
    props: { users: res, userLogin: data }, // will be passed to the page component as props
  };
}

// Data yang dilempar akan masuk ke props
export default function Home(props) {
  // console.log(props);
  const router = useRouter();
  const [users, setUser] = useState(props.users);
  console.log(props.users.data[0]);
  const userId = props.users.data[0].user_id;
  console.log(userId);

  const [form, setForm] = useState({
    userName: "",
    emailName: "",
    phoneNumber: "",
  });

  const changeText = (event) => {
    // console.log(event.target.value);
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleChange = (event) => {
    event.preventDefault();
    console.log(form);
    axiosApiIntances.patch(`auth/${userId}`, { ...form }).then((res) => {
      console.log(res);
      console.log(res.data);
      // router.push(`/login`);
    });
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user_id");
    router.push("/login");
  };

  return (
    <>
      <Layout title="Edit Profile">
        <div className={`${styles.whiteBackground}`}>
          <Navbar data={props.users.data[0]} />
        </div>
        <div className={`container py-5`}>
          <div className={`row justify-content-between`}>
            <div
              className={` col-lg-3 col-md-6 col-sm-12 col-xs-12  ${styles.homeContentMinHeight}`}
            >
              <div className={`${styles.whiteBackgroundWithBorderRadius}`}>
                <div className="row py-5 px-4 w-100">
                  <div>
                    <img src="/homeOrIndex/grid.png"></img>
                    <span className="ms-4">Dashboard</span>
                  </div>
                </div>
                <div className="row pb-5 px-4 w-100">
                  <div>
                    <img src="/homeOrIndex/arrow-up.png"></img>
                    <span className="ms-4">Transfer</span>
                  </div>
                </div>
                <div className="row pb-5 px-4 w-100">
                  <div>
                    <img src="/homeOrIndex/plus.png"></img>
                    <span className="ms-4">Top Up</span>
                  </div>
                </div>
                <div className="row pb-5 px-4 w-100">
                  <div>
                    <img src="/homeOrIndex/group40.png"></img>
                    <span className="ms-4">Profile</span>
                  </div>
                </div>
                <div className="row pb-5 px-4 w-100">
                  <div>
                    <img src="/homeOrIndex/logOut.png"></img>
                    <button
                      className={`ms-4 ${styles.superTransparentButton}`}
                      type="submit"
                      onClick={handleLogout}
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={`col-lg-9 col-md-6 col-sm-12 col-xs-12`}>
              <div
                className={`row p-4 ${styles.whiteBackgroundWithBorderRadius}`}
              >
                <h5 className="fw-bold py-2">Personal Information</h5>
                <p className="py-2">
                  We got your personal information from the sign up proccess. If
                  you want to make changes on your information, contact our
                  support.
                </p>
                <form>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Full Nmae"
                      onChange={(event) => changeText(event)}
                      name="userName"
                    ></input>
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">
                      Verified Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Your verified email"
                      onChange={(event) => changeText(event)}
                      name="emailName"
                    ></input>
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Phone Number"
                      onChange={(event) => changeText(event)}
                      name="phoneNumber"
                    ></input>
                  </div>
                  <button
                    type="submit"
                    onClick={handleChange}
                    class="btn btn-primary mx-auto"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.theFooter}`}>
          <Footer />
        </div>
      </Layout>
    </>
  );
}
