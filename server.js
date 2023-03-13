var express = require('express')
var cors = require('cors')
const path = require('path')
require('dotenv').config()
const multer = require('multer')
// const upload = multer({ dest: './public/data/uploads' })

var app = express()

const { connectToDb, getDb } = require('./db')
const { ObjectId } = require('mongodb')

// db connection
let db
connectToDb((err) => {
    if (!err) {
        app.listen(process.env.PORT || 3000, () => {
        })
        db = getDb()
    }
})

// const port = process.env.PORT || 3000
// app.listen(port, function () {
//     console.log('Your app is listening on port ' + port)
// })

app.use(express.json())
app.use(cors())
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {

    let blogs = []
    db.collection('blogs')
        .find()
        .sort({ _id: -1 })
        .forEach(blog => blogs.push(blog))
        .then(() => {

            res.render(path.join(__dirname + '/views/index.ejs'), { articles: blogs })
            // res.render('index', { articles: blogs })
        })
        .catch((err) => {
            res.status(500).json({ error: 'could not get data' })
        })

    // res.render(path.join(__dirname + '/views/index.ejs'))
})

// app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
//   const fileInfo = req.file

//   res.json({
//     name: fileInfo.originalname,
//     type: fileInfo.mimetype,
//     size: fileInfo.size,
//   })
// })



module.exports = app