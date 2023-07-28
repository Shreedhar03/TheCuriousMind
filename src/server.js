const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");
const mongoose = require('mongoose');
const Blog = require('../mongoModel/blogs.js')
const port = 5000;
require('dotenv').config()
// connect to MongoDB Atlas

mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(results => {
    console.log("Connected to MongoDB Atlas !")
    app.listen(port , () => {
      console.log(`listening on port ${port}`);
    });
  })
  .catch(err => {
    console.log(err)
  })

/* 
    Serving static Websites...
    express.static() - built-in middleware function in Express
    console.log("pathToPublic : ", pathToPublic);    
*/
const pathToPublic = path.join(__dirname, '../public');

app.use(express.static(pathToPublic))
app.use(express.urlencoded({ extended: true }))

//    Template Engine - Express handleBar HBS
const viewsPath = path.join(__dirname, "../src/templateEngine/views");
const partialsPath = path.join(__dirname, "../src/templateEngine/partials");

app.set("view engine", "hbs"); // set view engine ;
app.set("views", viewsPath); // (rename) set path of view folder

//    Register partials 
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.redirect('/blogs')
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
  });
});

app.get("/new-blog", (req, res) => {
  res.render("new-blog");
});

app.delete('/blogs/:id' , (req,res)=>{
  const id = req.params.id ;
  Blog.findByIdAndDelete(id)
    .then((result)=>{
      res.json({redirect : '/blogs'})
    })
    .catch(err=>console.log(err))
})

app.post('/blogs', (req, res) => {
  console.log(req.body)
  const blog = new Blog(req.body);

  blog.save()
    .then((result) => {
      res.redirect('/blogs')
    })
    .catch((err) => { console.log(err) })
})

app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then((results) => {
      res.render("index", {
        user: "SDU",
        title: "Home",
        blog: results
      }); // render the dynamic hbs file ;
      // console.log(results[0]._id)
    }).catch((err) => { console.log(err) })
})

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: "Blog Details" });
      // console.log(result)
    })
    .catch(err => {
      console.log(err)
    })

})

app.get("/all-blogs", (req, res) => {

  Blog.find()
    .then((result) => { res.send(result) })
    .catch((err) => { console.log(err) })

})

app.get("*", (req, res) => {
  res.render("404", {
    errNote: "This page might be temporarily unavailable !",
    title: "Page Not Found",
  });
});


