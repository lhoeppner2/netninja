const express= require('express');
const { method } = require('lodash');
const morgan = require('morgan');
const dbURI = 'mongodb://tropicthunder:<tropicthunder>@<hostname>/?ssl=true&replicaSet=atlas-11qgdv-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'

//express app
const app = express();

//register view engine
app.set('view engine', 'ejs');

//listen
app.listen(3000); 

//middleware and static files

app.use(express.static('public'));

app.use(morgan('dev'));


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

