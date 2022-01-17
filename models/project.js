const mongoose = require('mongoose')
const { Schema } = mongoose

//membuat table project
const projectSchema = new Schema({
    id: String,
    jdlproject: String,
    keterangan: String,
    password: String,
    img: {
        data: Buffer, contentType: String
    },
}, { timestamps: true });
const Projectku = mongoose.model('Projectku', projectSchema);
module.exports = Projectku