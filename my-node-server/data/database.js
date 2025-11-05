const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("praktikum_20230140111_db", "root", "Binoza2610", {
  host: "localhost",
  dialect: "mysql",
});

// Cek koneksi pas file ini dipanggil
sequelize.authenticate()
  .then(() => console.log("Koneksi ke database berhasil!"))
  .catch(err => console.error("Gagal konek:", err));

module.exports = sequelize;
