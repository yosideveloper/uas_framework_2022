const express = require('express'); //impor require module express lalu simpan di conts express
const router = express.Router();//instance object express untuk menjalankan route secara modular
const projectcontroller = require('../controllers/project');
const Projectku = require('../models/project');
const fs = require('fs');
var multer = require('multer');
var path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
const upload = multer({ storage: storage, limits: { fieldSize: 10 * 1024 * 1024 } })


//route 
router.route('/project')
  .get(projectcontroller.index)
// .post(projectcontroller.tambah)

router.route('/project').post(upload.single('image'), (req, res, next) => {
  const project = new Projectku({
    id: req.body.id,
    jdlproject: req.body.jdlproject,
    keterangan: req.body.keterangan,
    password: req.body.password,
    img: {
      data: fs.readFileSync(path.join(__dirname, '../' + '/uploads/' + req.file.filename)),
      contentType: 'image/jpg'
    }
  });
  project.save(function (error) {
    if (error) return handleError(error);
    res.redirect('/project')
  });


});
// router.route('/project/update').post(projectController.baharui)
router.route('/project/update').post(upload.single('image'), (req, res, next) => {
  const _id = req.body._id
  const id = req.body.id
  const jdlproject = req.body.jdlproject
  const keterangan = req.body.keterangan
  const password = req.body.password
  const filter = { _id: _id };
  const update = {
    id: id,
    jdlproject: jdlproject,
    keterangan: keterangan,
    password: password,
    img: {
      data: fs.readFileSync(path.join(__dirname, '../' + '/uploads/' + req.file.filename)),
      contentType: 'image/jpg'
    }
  };
  Projectku.updateOne(filter, update, function (err) {
    res.redirect('/project')
  });
});
router.route('/project/update').post(projectcontroller.baharui)
router.get('/project/create', projectcontroller.create)
router.get('/project/:id', projectcontroller.show)
router.get('/project/hapus/:id', projectcontroller.hapus)
router.route('/project/update/:_id/:id/:jdlproject/:keterangan/:password').get(projectcontroller.renderUpdate)

//UPDATE DATA
router.put('/project/:idproject', projectcontroller.update)
//HAPUS DATA
router.delete('/project/:idproject', projectcontroller.delete)

module.exports = router;


