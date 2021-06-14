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
                  <input
                    type="text"
                    className="form-control py-2"
                    placeholder="Search receiver here"
                    id="idSearchInput"
                    aria-describedby="searchHelp"
                  ></input>
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
