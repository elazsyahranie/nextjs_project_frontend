import { useEffect, useState } from "react";
import axiosApiIntances from "../utils/axios";
import Layout from "../components/Layout";
import Navbar from "../components/module/Navbar";
import styles from "../styles/index.module.css";
import { authPage } from "../middleware/authorizationPage";
import Footer from "../components/module/Footer";

// Proses getData dilakukan di server
export async function getServerSideProps(context) {
  const data = await authPage(context); // Untuk halaman yang harus login dulu (katanya)
  console.log(data);
  const res = await axiosApiIntances
    .get("users")
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
  console.log(props);
  const [users, setUser] = useState(props.users);

  return (
    <>
      <Layout title="Home">
        <div className={`${styles.whiteBackground}`}>
          <Navbar />
        </div>
        <div className="container py-5">
          <div className="row">
            <div
              className={`${styles.whiteBackground} col-lg-3 col-md-3 col-sm-3 col-xs-12`}
            >
              <div className="row py-5 px-4 w-100">
                <div>
                  <img src="/homeOrIndex/grid.png"></img>
                  <span className="ms-5">Dashboard</span>
                </div>
              </div>
              <div className="row pb-5 px-4 w-100">
                <div>
                  <img src="/homeOrIndex/arrow-up.png"></img>
                  <span className="ms-5">Transfer</span>
                </div>
              </div>
              <div className="row pb-5 px-4 w-100">
                <div>
                  <img src="/homeOrIndex/plus.png"></img>
                  <span className="ms-5">Top Up</span>
                </div>
              </div>
              <div className="row pb-5 px-4 w-100">
                <div>
                  <img src="/homeOrIndex/grid.png"></img>
                  <span className="ms-5">Profile</span>
                </div>
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
