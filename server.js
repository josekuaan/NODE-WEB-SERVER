const express =require('express');
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000;
const app = express();
hbs.registerPartials(__dirname +'/views/partials')
app.set('views engins', 'hbs')


app.use((req,res,next) =>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
   
    console.log(log);
    fs.appendFile('server.log',log +'\n', (error)=>{
        if(error)  console.log('Unable to append to server.log');
    })
    next();
});

// app.use((req,res,next) =>{
//     res.render('maintainance.hbs',{
//         pageTitle: 'This site is currently running on maintainance mood'
//     })
//     next();
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentFullYear', ()=>{
   return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

app.get('/', (req,res) => {
    res.render('index.hbs', {
        pageTitle:'welcome to home page'
        
    });
    
});

app.get('/about', (req,res)=>{
    res.render('about.hbs',{
        pageTitle: 'about page'
    })
});

app.get('/project',(req,res) =>{
    res.render('project.hbs',{
        pageTitle:"Project file"
    })
});

app.get('/bad', (req,res) =>{
    res.send('this is a bad request')
})

app.listen(port, ()=>{
    console.log(`connection has being made to port ${port}`)
})
