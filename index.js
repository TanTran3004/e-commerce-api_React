const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const blogRoute = require("./routes/blogRoute");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
dbConnect();
// app.use("/", (req, res) => {
//   res.send("Hello World");
// });

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/user", authRoute);
app.use("/api/product", productRoute);
app.use("/api/blog", blogRoute);

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running  on port ${PORT}`);
});
