import { useState, useEffect } from "react";
import Layout from "components/Layout";
import Navbar from "components/module/Navbar";
import { authPage } from "middleware/authorizationPage";
import axiosApiIntances from "utils/axios";
import styles from "styles/index.module.css";
import Footer from "components/module/Footer";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const data = await authPage(context); // Untuk halaman yang harus login dulu (katanya)
  console.log(data);
  const res = await axiosApiIntances
    .get(`/auth/${data.user}`)
    .then((res) => {
      return res.data; // return kalau hanya satu baris
    })
    .catch((err) => {
      return [];
    });
  return {
    props: { users: res, userLogin: data }, // will be passed to the page component as props
  };
}
export default function TransferPage(props) {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user_id");
    router.push("/login");
  };

  const [form, setForm] = useState({ searchUsername: "" });

  const changeText = (event) => {
    console.log(event.target.value);
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const [username, setUsername] = useState([]);

  const handleSearchUsername = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // mencegah reload halaman karena onsubmit
      console.log(form);
      axiosApiIntances
        .get(`auth/keyword?keyword=${form.keyword}`)
        .then((res) => {
          console.log(res);
          console.log(res.data.data[0]);
          setUsername(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const userReceiverData = username;
  console.log(userReceiverData);

  // const data = ["Array 1", "Array 2", "Aray 3"];

  // const receiverName = props.users.data[0].user_name;
  // const receiverPhone = props.users.data[0].user_phone;

  return (
    <>
      <Layout title="Transfer">
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
            <div className={`col-lg-9 col-md-6 col-sm-9 col-xs-12 `}>
              <div className={`${styles.whiteBackgroundWithBorderRadius}`}>
                <div className="p-4">
                  <h5 className="pb-2">Search Receiver</h5>
                  <div className="d-flex justify-content-between">
                    <input
                      type="text"
                      className="form-control py-2"
                      placeholder="Search receiver here"
                      name="keyword"
                      id="idSearchInput"
                      aria-describedby="searchHelp"
                      onChange={(event) => changeText(event)}
                      onKeyDown={(event) => handleSearchUsername(event)}
                    ></input>
                  </div>
                </div>
              </div>
              {userReceiverData.map((item, index) => {
                return (
                  <div
                    className={`${styles.whiteBackgroundWithBorderRadius} my-4`}
                  >
                    <div className="p-4">
                      <span key={index} className="d-block fw-bold">
                        {item.user_name}
                      </span>
                    </div>
                  </div>
                );
              })}
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
