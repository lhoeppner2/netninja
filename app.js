const express= require('express');
const { method, result } = require('lodash');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

//express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://lhoeppner2:test@cluster0.z63lj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI)
.then ((result) => app.listen(3000))
.catch((err) => console.log(err));


//register view engine
app.set('view engine', 'ejs');

 

//middleware and static files

app.use(express.static('public'));

app.use(morgan('dev'));

//mongoose and mongo routes
app.get('/add-blog', (req,res) => {
    const blog = new Blog({
        title:'new blog2',
        snippet: 'asdfasdf',
        body: 'morewasdf'
    });

    blog.save()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    });
});

app.get('/all-blogs', (req,res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/single-blog', (req,res) => {
    Blog.findById('67502eaf44a84cc3c057c695')
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
});


app.get('/', (req,res) =>{
    //res.send('<p>home page</p>');
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];
    res.render('index', {title: 'Home', blogs});
});

app.get('/about', (req,res) =>{
   // res.send('<p>about page</p>');
   res.render('about', {title: 'About'});
});

app.get('/blogs/create', (req,res) => {
    res.render('create', {title: 'Create a new blog'});
})

//404
app.use((req,res) => {
    res.status(404).render('404', {title: '404'});
});

