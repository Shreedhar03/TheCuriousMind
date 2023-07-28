
/*
    1. res.send() --------> res.send() can be called only once;
    2. res.write() --------> res.write() can be called multiple times with res.end();
*/

const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.write('<p><center>Home Page</center></p>' , ()=>{
        console.log('writing 1 complete');
    });
    res.write('<p><center>Welcome to Express Js</center></p>' , ()=>{
        console.log('writing 2 complete');
    });
    res.end();
})

app.get('/more', (req, res) => {
    res.send([
        {
            id: 1,
            name: 'Shridhar`'
        },
        {
            id:2,
            name:'yash'
        }
    ]);
    res.end();
});

app.listen(2000,()=>{
    console.log('listening on port 2000');
});