const mysql = requires("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  passwors: "",
  database: "jual_karcis",
});

export default connection;
