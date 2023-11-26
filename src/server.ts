import express from "express";
import cors from "cors";
import routes from "./routes";
import routesVideo from "./routes/video";
import routesUser from "./routes/user";
import routesProduct from "./routes/product";


require("dotenv").config();

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

app.use(routes);
app.use("/videos", routesVideo);
app.use("/usuarios", routesUser);
app.use("/produtos", routesProduct);

app.listen(process.env.PORT || 3333, async () => {
  console.log("running on port 3333");
});
