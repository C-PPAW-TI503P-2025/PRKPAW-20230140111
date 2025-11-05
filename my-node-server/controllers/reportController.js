const presensiRecords = require("../data/presensiData");
const {Presensi} = require("../models");
const{Op} = require("sequelize");

exports.getDailyReport = (req, res) => {
  try {
    const { nama } = req.query;
    let records = presensiRecords;

    if (nama) {
      records = records.filter(r =>
        r.nama.toLowerCase().includes(nama.toLowerCase())
      );
    }

    res.json({
      reportDate: new Date().toISOString().split("T")[0],
      data: records,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil laporan.",
      error: error.message,
    });
  }
};
