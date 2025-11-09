const presensiRecords = require("../data/presensiData");
const { format } = require("date-fns-tz");
const timeZone = "Asia/Jakarta";
const { Presensi } = require("../models");

exports.CheckIn = (req, res) => {
  const { id: userId, nama: userName } = req.user;
  const waktuSekarang = new Date();
  const existingRecord = presensiRecords.find(
    (record) => record.userId === userId && record.CheckOut === null
  );
  if (existingRecord) {
    return res
      .status(400)
      .json({ message: "Anda sudah melakukan check-in hari ini." });
  }
  const newRecord = {
    userId,
    nama: userName,
    CheckIn: waktuSekarang,
    CheckOut: null,
  };
  presensiRecords.push(newRecord);

  const formattedData = {
    ...newRecord,
    CheckIn: format(newRecord.CheckIn, "yyyy-MM-dd HH:mm:ssXXX", { timeZone }),
  };
  console.log(
    `DATA TERUPDATE: Karyawan ${userName} (ID: ${userId}) melakukan check-in.`
  );

  res.status(201).json({
    message: `Halo ${userName}, check-in Anda berhasil pada pukul ${format(
      waktuSekarang,
      "HH:mm:ss",
      { timeZone }
    )} WIB`,
    data: formattedData,
  });
};

exports.CheckOut = (req, res) => {
  const { id: userId, nama: userName } = req.user;
  const waktuSekarang = new Date();
  const recordToUpdate = presensiRecords.find(
    (record) => record.userId === userId && record.CheckOut === null
  );

  if (!recordToUpdate) {
    return res.status(404).json({
      message: "Tidak ditemukan catatan check-in yang aktif untuk Anda.",
    });
  }
  recordToUpdate.CheckOut = waktuSekarang;
  const formattedData = {
    ...recordToUpdate,
    CheckIn: format(recordToUpdate.CheckIn, "yyyy-MM-dd HH:mm:ssXXX", {
      timeZone,
    }),
    CheckOut: format(recordToUpdate.CheckOut, "yyyy-MM-dd HH:mm:ssXXX", {
      timeZone,
    }),
  };

  console.log(
    `DATA TERUPDATE: Karyawan ${userName} (ID: ${userId}) melakukan check-out.`
  );

  res.json({
    message: `Selamat jalan ${userName}, check-out Anda berhasil pada pukul ${format(
      waktuSekarang,
      "HH:mm:ss",
      { timeZone }
    )} WIB`,
    data: formattedData,
  });

 	// 1. Ganti sumber data dari array ke model Sequelize
 	const { Presensi } = require("../models");
 	const { format } = require("date-fns-tz");
 	const timeZone = "Asia/Jakarta";
 	
 	exports.CheckIn = async (req, res) => {
 	  // 2. Gunakan try...catch untuk error handling
 	  try {
 	    const { id: userId, nama: userName } = req.user;
 	    const waktuSekarang = new Date();
 	
 	    // 3. Ubah cara mencari data menggunakan 'findOne' dari Sequelize
 	    const existingRecord = await Presensi.findOne({
 	      where: { userId: userId, checkOut: null },
 	    });
 	
 	    if (existingRecord) {
 	      return res
 	        .status(400)
 	        .json({ message: "Anda sudah melakukan check-in hari ini." });
 	    }
 	
 	    // 4. Ubah cara membuat data baru menggunakan 'create' dari Sequelize
 	    const newRecord = await Presensi.create({
 	      userId: userId,
 	      nama: userName,
 	      checkIn: waktuSekarang,
 	    });
 	    
 	    const formattedData = {
 	        userId: newRecord.userId,
 	        nama: newRecord.nama,
 	        checkIn: format(newRecord.checkIn, "yyyy-MM-dd HH:mm:ssXXX", { timeZone }),
 	        checkOut: null
 	    };
 	
 	    res.status(201).json({
 	      message: `Halo ${userName}, check-in Anda berhasil pada pukul ${format(
 	        waktuSekarang,
 	        "HH:mm:ss",
 	        { timeZone }
 	      )} WIB`,
 	      data: formattedData,
 	    });
 	  } catch (error) {
 	    res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
 	  }
 	};
 	
 	exports.CheckOut = async (req, res) => {
 	  // Gunakan try...catch
 	  try {
 	    const { id: userId, nama: userName } = req.user;
 	    const waktuSekarang = new Date();
 	
 	    // Cari data di database
 	    const recordToUpdate = await Presensi.findOne({
 	      where: { userId: userId, checkOut: null },
 	    });
 	
 	    if (!recordToUpdate) {
 	      return res.status(404).json({
 	        message: "Tidak ditemukan catatan check-in yang aktif untuk Anda.",
 	      });
 	    }
 	
 	    // 5. Update dan simpan perubahan ke database
 	    recordToUpdate.checkOut = waktuSekarang;
 	    await recordToUpdate.save();
 	
 	    const formattedData = {
 	        userId: recordToUpdate.userId,
 	        nama: recordToUpdate.nama,
 	        checkIn: format(recordToUpdate.checkIn, "yyyy-MM-dd HH:mm:ssXXX", { timeZone }),
 	        checkOut: format(recordToUpdate.checkOut, "yyyy-MM-dd HH:mm:ssXXX", { timeZone }),
 	    };
 	
 	    res.json({
 	      message: `Selamat jalan ${userName}, check-out Anda berhasil pada pukul ${format(
 	        waktuSekarang,
 	        "HH:mm:ss",
 	        { timeZone }
 	      )} WIB`,
 	      data: formattedData,
 	    });
 	  } catch (error) {
 	    res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
 	  }
 	};

exports.Report = async (req, res) => {
  try {
    const records = await Presensi.findAll();
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
  }
};

exports.getReport = (req, res) => {
  const formattedRecords = presensiRecords.map((record) => ({
    userId: record.userId,
    nama: record.nama,
    CheckIn: format(record.CheckIn, "yyyy-MM-dd HH:mm:ssXXX", { timeZone }),
    CheckOut: record.CheckOut
      ? format(record.CheckOut, "yyyy-MM-dd HH:mm:ssXXX", { timeZone })
      : null,
  }));

  res.json({
    message: "Data report presensi",
    data: formattedRecords,
  });
};

exports.deletePresensi = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const presensiId = req.params.id;
    const recordToDelete = await Presensi.findByPk(presensiId);

    if (!recordToDelete) {
      return res
        .status(404)
        .json({ message: "Catatan presensi tidak ditemukan." });
    }
    if (recordToDelete.userId !== userId) {
      return res
        .status(403)
        .json({ message: "Akses ditolak: Anda bukan pemiliki catatan ini." });
    }
    await recordToDelete.destroy();
    res.json({ message: "Catatan presensi berhasil dihapus." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan pada server.", error: error.message });
  }
};

exports.updatePresensi = async (req, res) => {
  try {
    const presensiId = req.params.id;
    const { CheckIn, CheckOut, nama } = req.body;
    if(CheckIn === undefined && CheckOut === undefined){
      return res.status(400).json({ 
        message: "Request body tidak berisi data yang valid untuk diupdate (CheckIn, CheckOut, atau nama).",
      });
    }
    const recordToUpdate = await Presensi.findByPk(presensiId);

    if (!recordToUpdate) {
      return res
        .status(404)
        .json({ message: "Catatan presensi tidak ditemukan." });
    }
    recordToUpdate.CheckIn = CheckIn || recordToUpdate.CheckIn;
    recordToUpdate.CheckOut = CheckOut || recordToUpdate.CheckOut;  
    recordToUpdate.nama = nama || recordToUpdate.nama;
    await recordToUpdate.save();

    res.json({
      message: "Data presensi berhasil diperbarui.",
      data: recordToUpdate,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan pada server.", error: error.message });
  }
};  

exports.getDailyReport = async (req, res) => {
  try {
    const { nama } = req.query;
    let options = {where: {}};

    if(nama){
      options.where.nama ={
        [Op.iLike]: `%${nama}%`
      };
    }

    const records = await Presensi.findAll(options);

    res.json({
      reportDate: new Date().toISOString(),
      data: records,
    });
  } catch(error) {
    res
    .status(500)
    .json({ message: "Gagal mengambil laporan.", error: error.message });
  }
};

exports.getAllPresensi = async (req, res) => {
  try {
    const data = await Presensi.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data", error: error.message });
  }
};
    
module.exports = {
  CheckIn: exports.CheckIn,
  CheckOut: exports.CheckOut,
  getReport: exports.getReport,
  deletePresensi: exports.deletePresensi,
  updatePresensi: exports.updatePresensi,
}};

