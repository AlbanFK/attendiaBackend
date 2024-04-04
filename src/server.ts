import app from "./app";
import dbo from "./app/db/conn";

const port = process.env.PORT || 5000;

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer();
  console.log("Up and running 🚀 on port: ", port);
});
