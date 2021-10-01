import express from "express";
import { connectDataBase } from "./db/index.js";
import productRouter from "./services/products/index.js"
import reviewsRouter from "./services/reviews/index.js"

const server = express();

const { PORT } = process.env;
const loggerMiddleware = (req, res, next) => {
     console.log(`Request method: ${req.method}+++++++ Request URL ${req.url}`);
     next()
};
server.use(express.json());
server.use(loggerMiddleware)
server.use("/products", productRouter)
server.use("/reviews", reviewsRouter)
server.listen(PORT, async () => {
    await connectDataBase()
  console.log( `server is running on port ${PORT}`);
});
server.on("error", (error) => {
  console.log("server crashed", error);
});
