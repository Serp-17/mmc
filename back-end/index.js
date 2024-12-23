const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const rolesRoutes = require("./routes/rolesRoutes");
const userRoutes = require("./routes/userRoutes");
const storageRoutes = require("./routes/storageRouter");

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Роуты
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/roles", rolesRoutes);
app.use("/storage", storageRoutes);

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
