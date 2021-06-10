import axios from "axios";

export async function getStaticProps(context) {
  const users = await axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return [];
    });
  return {
    props: { users },
  };
}

// Selalu isi parameter dengan 'props' kalau mau isi dengan hasil fetching data
export default function SSGPage(props) {
  console.log(props);
  return (
    <>
      <h1>SSG Page</h1>
      {props.users.map((item, index) => (
        <h3 key={index}>{item.email}</h3>
      ))}
    </>
  );
}
