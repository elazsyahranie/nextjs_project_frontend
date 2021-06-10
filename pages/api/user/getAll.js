import connection from "configs/db";

export default (req, res) => {
  connection.query("SELECT * FROM user", (err, result) => {
    if (!err) {
      res.status(200).json({ data: result });
    } else {
      res.status(500).json({ err: "Bad Request" });
    }
  });
};
