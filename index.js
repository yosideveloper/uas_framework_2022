const express = require('express')
const app = express()
const projectRouter = require('./router/project')
const port = 3000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static("public"));
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

//mengoneksikan dengan database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/27029');

//tambahkan pesan jika koneksi database tidak berhasil 
const db = mongoose.connection
db.on('error', function () {
    console.log('Koneksi gagal')
})
db.once('open', function () {
    console.log('Koneksi Berhasil')
})

var myLogger = function (req, res, next) {
    console.log("LOGGED")
    next();
}
app.use(myLogger);
//aktifkan/tambahkan setting default untuk req.body

app.use(projectRouter) //memanggil routeR project



//Middleware Waktu
const requestTime = function (req, res, next) {
    date = new Date(); //pesan yang ingin ditampilkan
    console.log(date);
    next();
}
app.use(requestTime); //nama properti middleware
app.set('view engine', 'ejs')
app.get('/', function (req, res) {
    const market = {
        nmMatauang: 'BTC',
        nilaiJual: 'USD',
    };
    res.render('pages/index', { place: market })
});
app.get('/about', function (req, res) {
    res.render('pages/about')
})

app.get('/project/index', function (req, res) {
    res.render('pages/project/index')
})


// var multer = require('multer');

// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'pages/project/index')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });

// var upload = multer({ storage: storage });
// const Projectku = require('./models/project');




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})