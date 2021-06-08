import Link from "next/Link";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import Image from "next/image";
import navbarStyle from "../../styles/navbar.module.css";

// Data yang dilempar dari halaman pages/index.js harus di tangkap dulu
// Kalau yang ini ya cara untuk di functional component
export default function Navbar(props) {
  const router = useRouter();

  const handleLogout = () => {
    Cookie.remove("token");
    Cookie.remove("user");
    router.push("/login"); // Kalau pakai query param, jadikan template literals
  };

  console.log(props.data);
  return (
    <>
      <div className="container py-4">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 h-100 my-auto">
            <h2 className={`${navbarStyle.logoColor} `}>Zdompet</h2>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div className="d-flex flex-row-reverse">
              <div>
                <img src="/navbarImg/bell_icon.png"></img>
              </div>
              <div className="mx-4">
                <span className="fw-bold d-block">{props.data.user_name}</span>
                <span className="d-block">{props.data.user_phone}</span>
              </div>
              <div>
                <img src="/navbarImg/rectangle25.png"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Navbar For Smaller Screens! */}
    </>
  );
}
