// Di browser untuk mengakses harus sama persis dengan nama file. Case-sensitive.
// Kalau di alam folder, maka aksesnya localhost:3000/nama_folder/nama_file.js
import Layout from "../../components/Layout";

export default function Profile() {
  return (
    <Layout title="Profile">
      <h1>Profile Page !</h1>
    </Layout>
  );
}
