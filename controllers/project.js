const Projectku = require("../models/project");
// let project = [
//     { idproject: 1, jdlproject: 'Express js.1', keterangan: 111 },
//     { idproject: 2, jdlproject: 'Express js.2', keterangan: 222 }
// ]
//route 
module.exports = { //lakukan module export sebuah object
    index: function (req, res) { //membuat property function dengan nama index
        let keyword = {}
        if (req.query.keyword) {
            keyword = { jdlproject: { $regex: req.query.keyword } }
        }
        Projectku.find(keyword, "jdlproject _id keterangan img id password", function (error, project) {
            if (error) console.log(error)
            res.render('pages/project/index', { project })
        })
    },

    create: function (req, res) {
        res.render('pages/project/create')
    },
    tambah: function (req, res) {
        const project = new Projectku({
            id: req.body.id,
            jdlproject: req.body.jdlproject,
            keterangan: req.body.keterangan,
            password: req.body.password,

        });
        project.save(function (error) {
            if (error) return handleError(error);
            res.redirect('/project')
        });
    },
    show: function (req, res) {
        const id = req.params.id
        Projectku.findById(id, function (error, data) {
            if (error) console.log(error)
            console.log('/project')
            res.render('pages/project/show', { project: data })
        })

    },

    update: function (req, res) { //Memperbaharui data
        const id = req.params.idproject;
        let isFound = false
        console.log(id)
        project.filter(proj => { //Filter adalah metode update dari javascript (agar data katalog di filter satu/satu)
            if (proj.idproject == id) { //Untuk pengecekan kondisi
                proj.jdlproject = req.body.jdlproject
                proj.keterangan = req.body.keterangan
                res.send({
                    status: true,
                    data: project,
                    message: "Project berhasil diperbaharui",
                    method: req.method,
                    url: req.url,
                    tanggal: new Date()
                })
                isFound = true
                return proj //return data katalog yang baru
            }
        })
        if (isFound == false) {
            res.send({
                status: false,
                message: "project tidak ditemukan"
            })
        }
        res.json(project) //tampilkan data katalog yang baru
    },
    baharui: function (req, res) {
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
            password: password
        };
        Projectku.updateOne(filter, update, function (err) {
            console.log(jdlproject, keterangan, password)
            res.redirect('/project')
        });


    },
    renderUpdate: function (req, res) {
        const id = req.params._id
        Projectku.findById(id, function (error, data) {
            if (error) console.log(error)
            console.log(data)
            res.render('pages/project/update', { project: data })
        })
    },

    hapus: function (req, res) {
        const id = req.params.id
        Projectku.deleteOne({ _id: id }, function (err) {
            if (err) return console.log(err);
            res.redirect('/project')
        });
    },
    delete: function (req, res) { //Menghapus data
        const id = req.params.idproject;
        let isFound = false
        project.filter(proj => {
            if (proj.idproject == id) {
                const index = project.indexOf(proj)
                project.splice(index, 1)
                res.send({
                    status: true,
                    data: project,
                    message: "Project berhasil dihapus",
                    method: req.method,
                    url: req.url,
                    tanggal: new Date()
                })
                isFound = true
            }
        })
        if (isFound == false) {
            res.json({
                status: false,
                message: "Project tidak ditemukan"
            })
        }
        res.json(project)
    }
}