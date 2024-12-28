const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const rolesRoutes = require("./routes/rolesRoutes");
const userRoutes = require("./routes/userRoutes");
const storageRoutes = require("./routes/storageRouter");
const transactionRoutes = require("./routes/transactionRoutes");
const volumeRouter = require("./routes/volumeRouter");
const panelRouter = require("./routes/panelRouter");

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/roles", rolesRoutes);
app.use("/storage", storageRoutes);
app.use("/transactions", transactionRoutes);
app.use("/volumes", volumeRouter);
app.use("/panels", panelRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
