const express = require('express');
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const cors = require('cors')
const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

let transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    secure: true,
    port: 465,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    },
    tls: {rejectUnauthorized: false}
})

app.get('/', (req, res) => {
    res.send('Hello World')
})
app.post('/sendMessage', async function (req, res) {

        let info = await transporter.sendMail({
                from: 'rabota-trassa@mail.ru',
                to: 'rabota-trassa@mail.ru',
                subject: 'Test gmail',
                html: `<div> 

    <div><span>name : </span><span>${req.body.name}</span></div>
    <div><span>mail : </span><span>${req.body.email}</span></div>
    <div><span>message : </span><span>${req.body.message}</span></div>
</div>`
            }, (err, success) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('OK')
                }
            }
        )
        res.sendStatus(200)
    }
);


let port = process.env.PORT || 80

app.listen(port, function () {
    console.log('Server start')
})
