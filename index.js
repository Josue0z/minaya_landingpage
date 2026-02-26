

const express = require('express')
const path = require('path')
const app = express();

app.set('PORT',process.env.PORT || 3000);
app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'views','index.html'))
})

app.listen(app.get('PORT'), (req,res)=>{
    console.log(`server running on port ${app.get('PORT')}`)
})