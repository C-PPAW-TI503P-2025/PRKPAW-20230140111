const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const PORT = 3001;
const morgan = require("morgan");

// Impor router
const presensiRoutes = require("./routes/presensi");
const reportRoutes = require("./routes/reports");
const authRouters = require("./routes/auth"); // import route auth
const ruteBuku = require("./routes/books");

// 🔹 Import koneksi database
const db = require("./models");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.get("/", (req, res) => {
  res.send("Home Page for API");
});
app.use("/api/books", ruteBuku);
app.use("/api/presensi", presensiRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/auth", authRouters); // gunakan route auth

// 🔹 Koneksi ke database & jalankan server
db.sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}/`);
    });
  })
  .catch((err) => {
    console.error("❌ Gagal koneksi ke database:", err);
  });

// Routes
const ruteBuku = require("./routes/books");
app.use("/api/books", ruteBuku);

const presensiRoutes = require("./routes/presensi");
const reportRoutes = require("./routes/reports");
app.use("/api/presensi", presensiRoutes);
app.use("/api/reports", reportRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Home Page for API");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});