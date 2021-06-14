import Layout from "components/Layout";
import Navbar from "components/module/Navbar";
import { authPage } from "middleware/authorizationPage";
import axiosApiIntances from "utils/axios";

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
  return (
    <Layout title="Transfer">
      <Navbar data={props.users.data[0]} />
      <h1>Transfer Page</h1>
    </Layout>
  );
}
