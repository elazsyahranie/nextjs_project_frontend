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
  const { id } = context.query;
  const thisIsId = id;
  console.log(`This is the ${id}`);
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
  const receive = await axiosApiIntances
    .get(`/auth/${id}`)
    .then((res) => {
      console.log(res);
      return res.data; // return kalau hanya satu baris
    })
    .catch((err) => {
      return [];
    });
  return {
    props: {
      users: res,
      userLogin: data,
      receiverId: thisIsId,
      receiver: receive,
    }, // will be passed to the page component as props
  };
}
export default function Transaction(props) {
  console.log(props.users.data[0].user_id);
  console.log(props.receiverId);
  console.log(props.receiver.data[0]);

  const { user_id, user_name, user_phone } = props.receiver.data[0];

  const router = useRouter();
  const [form, setForm] = useState({
    transactionValue: "",
    receiverId: props.users.data[0].user_id,
    senderId: user_id,
  });

  const changeText = (event) => {
    // console.log(event.target.value);
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const sendBalance = (event) => {
    event.preventDefault();
    console.log(form);
    axiosApiIntances
      .post("/transaction/insertransaction", { ...form })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        return err;
      });
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user_id");
    router.push("/login");
  };
  console.log(props.users.data[0].balance);
  return (
    <>
      <Layout title="Transaction">
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
            <div className={`col-lg-9 col-md-6 col-sm-9 col-xs-12`}>
              <div className={`${styles.whiteBackgroundWithBorderRadius} mb-2`}>
                <div className="p-4">
                  <h5>Transaction Page</h5>
                  <div className="pt-4 px-4">
                    <span className="d-block pb-1 fw-bold">{user_name}</span>
                    <span className="d-block pt-1">{user_phone}</span>
                  </div>
                </div>
              </div>
              <div className={`${styles.whiteBackgroundWithBorderRadius} mt-2`}>
                <div className="p-4">
                  <span>
                    Type the amount you want to transfer and then
                    <br />
                    press continue to the next steps.
                  </span>
                </div>
                <form className="w-100">
                  <div className="mt-5">
                    <input
                      className="form-control mx-auto"
                      onChange={(event) => changeText(event)}
                      name="transactionValue"
                      placeholder="0.00"
                    ></input>
                  </div>
                  <div className="row mt-3">
                    <span className="fw-bold text-center">
                      Rp{props.users.data[0].balance.toLocaleString()} Available
                    </span>
                  </div>
                  <div className="mt-5">
                    <input
                      className="form-control mx-auto"
                      name="notes"
                      placeholder="Add some notes"
                    ></input>
                  </div>
                  <button type="submit" onClick={sendBalance}>
                    Continue
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
