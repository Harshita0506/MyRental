import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToMongoose from "./src/config/mongoose.config.js";

import userRouter from "./src/features/users/user.routes.js";

const app = express();

// DB
connectToMongoose();

// middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://my-rental-blue.vercel.app"   // frontend live URL
    ],
    credentials: true,
  })
);

// routes
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("MyRental Backend Running");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
