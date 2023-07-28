const express = require('express')

const app = express();

app.get('/' , (req,res)=>{
    res.status(200).send('<h1>Express JS</h1><p>Minimalist web framework for Node.js.</p>');
})
app.get('/gallery' , (req,res)=>{
    res.send('<h2><center>Gallery Page</center></h2>')
})
app.get('/contact' , (req,res)=>{
    res.send('<h2><center>Contact Page</center></h2>')
})

app.get('*' , (req,res)=>{
    res.status(404).send('<h2><center>404 - page not found</center></h2>')
})

app.listen(3000 , ()=>{
    console.log('Listening on port 3000');
});