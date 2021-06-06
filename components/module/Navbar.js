import Link from "next/Link";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import Image from "next/image";
import navbarStyle from "../../styles/navbar.module.css";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    Cookie.remove("token");
    Cookie.remove("user");
    router.push("/login"); // Kalau pakai query param, jadikan template literals
  };
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
                <span className="fw-bold d-block">Robert Chandler</span>
                <span className="d-block">+62 8139 3877 7946</span>
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
