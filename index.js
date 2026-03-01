require('dotenv').config();

const express = require('express')
const path = require('path')
const app = express();

const nodemailer = require('nodemailer');

// Configuración del transporte
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
    }
});

console.log(process.env.GMAIL_USERNAME)

console.log(process.env.GMAIL_PASSWORD)
// Definir la carpeta pública 
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.set('PORT',process.env.PORT || 3000);
app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'views','index.html'))
})

app.post('/submit',async(req,res) =>{
     try{
        const {name,subject,email,description} = req.body;
        await transporter.sendMail({
           from:process.env.GMAIL_USERNAME,
           to:email,
           subject: `Nuevo mensaje: ${subject}`,
           text: `
                Nombre: ${name}
                Email: ${email}
                Asunto: ${subject}
                Mensaje: ${description}
            
            `
        })

        console.log(req.body)
        res.json(req.body)
     }catch(error){
        res.status(501).json({
            error
        })
     }
})
app.listen(app.get('PORT'), (req,res)=>{
    console.log(`server running on port ${app.get('PORT')}`)
})