require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRouter = require("./Routes/authRoutes");
const userRouter = require("./Routes/userRoutes");
const adminRouter = require("./Routes/adminRoutes");
const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");
const app = express();

// app.use(cors());
const corsOptions = {
  origin: 'https://cc17-project-client.onrender.com',
  credentials: true,
};
// const corsOptions = {
//   origin: 'http://localhost:5173',
//   credentials: true,
// };
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);
const port = process.env.PORT || 8888;
app.listen(8888, () => console.log(`server is running in port ${port}`));
