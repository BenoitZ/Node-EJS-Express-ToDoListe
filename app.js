const express = require('express');
const app = express();
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const bodyParser = require('body-parser')
const port = 8889;
const listeRoutes = require('./routes/listeRoutes');
const optionBDD = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: 3306,
  database: 'todolist'
}

app.use(myConnection(mysql, optionBDD, 'pool'));
app.use(express.static('public')); //definition des resources static
app.set('views', './IHM'); //definition du chemin de mes views
app.set('view engine', 'ejs'); // definition du moteur de views
app.use(express.urlencoded({extended : true}));
app.use(listeRoutes);  //j'utilise le component d'accés aux données pour liste

app.get('/apropos', (req, res)=>{
  res.status(200).render('apropos')
});

app.use((req, res)=>{
  res.status(404).render('404')
});

app.listen(port, ()=>{
  console.log("Server listening on port " + port);
});