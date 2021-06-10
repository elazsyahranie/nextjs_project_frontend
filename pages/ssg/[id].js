import axios from "axios";

// Saat return tidak perlu dimasukkan ke props
// Implementasi pada search user
export async function getStaticPaths() {
  const users = await axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return [];
    });
  const paths = users.map((item) => ({
    params: { id: `${item.id}` },
  }));

  // console.log(paths);
  // fallback: false | kalau id yang diakses tidak ada, maka akan ditampilkan page 404
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  console.log(context.params);
  const user = await axios
    .get(`https://jsonplaceholder.typicode.com/users/${context.params.id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return {};
    });
  return {
    props: { user },
  };
}

export default function SSGPage(props) {
  return (
    <>
      <h1>SSG Detail Page</h1>
      <hr />
      <h3>{props.user.name}</h3>
      <h3>{props.user.email}</h3>
    </>
  );
}
