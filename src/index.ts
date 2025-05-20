import express from "express";
import dotenv from "dotenv";
import connectDB from "./connection/conextion";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const UserRoutes = require("./app/users/routes/UserRoute");
const SocialNetworkRoute = require("./app/sociallNetwork/routes/SocialNetworkRoute");

app.use("/api/user", UserRoutes);
app.use('/api/social', SocialNetworkRoute)

app.get("/", (_req, res) => {
  res.send("¡Hola, TypeScript con Express!");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
