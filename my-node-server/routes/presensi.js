const express = require('express');
const router = express.Router();
const presensiController = require('../controllers/presensiController');
const { addUserData } = require('../middleware/permissionMiddleware');

router.use(addUserData);

router.post('/check-in', presensiController.CheckIn);
router.post('/check-out', presensiController.CheckOut);
router.get('/report', presensiController.getReport);

router.put('/:id', presensiController.updatePresensi);
router.delete('/:id', presensiController.deletePresensi);
router.get('/report', presensiController.Report);

module.exports = router;


