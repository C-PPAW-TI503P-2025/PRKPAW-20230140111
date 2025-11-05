const { DataTypes } = require("sequelize");
const sequelize = require("../data/database");

const Presensi = sequelize.define("Presensi", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  checkIn: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  checkOut: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: "presensis", // sesuai tabel di database kamu
  timestamps: true,
});

module.exports = Presensi;
