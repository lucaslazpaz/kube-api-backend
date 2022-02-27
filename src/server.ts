import cors from "cors";
import express from "express";

import { namespacesRoutes } from "./routes/namespaces.routes";

const app = express();
const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));

app.use(express.json());

app.use("/namespaces", namespacesRoutes);

app.listen(3333, () => console.log("Server is running on port 3333!"));
