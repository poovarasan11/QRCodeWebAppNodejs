//Author:Poovarasan
const express = require('express');
const ejs = require('ejs');
const path = require('path')
const qrcode = require('qrcode')
const app = express()
const port = process.env.port || 4000


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
console.log(`QR Code generator`)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'view'))
app.use(express.static('public'))

app.get('/', (req, res, next) => {
    res.render(`index`)
    // res.send(`Hello This is QR Code App... `)
})

app.post('/scan', (req, res, next) => {
    const input_text = req.body.text;
    // console.log(input_text);
    qrcode.toDataURL(input_text, (err, src) => {
        // console.log("****************************", src);
        res.render('scan', {
            qr_code: src,
        })
    })
})

app.listen(port, console.log(`Runing on port ${port}`))

