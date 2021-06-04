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

export default function Home(props) {
  return (
    <>
      <h2>Lorem Ipsum Dolor Sit Amet</h2>
    </>
  );
}
