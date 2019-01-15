console.log('To-Do List')


const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'));

var db

MongoClient.connect('mongodb://todolist:todolist8@ds135624.mlab.com:35624/to-do-list', (err, client) => {
  if (err) return console.log(err)
  db = client.db('to-do-list')

  port = process.env.PORT || 3000

  app.listen(port, () => {
    console.log('listenin on 3000')
  })

  app.post('/activities', (req, res) => {
    db.collection('activities').save(req.body, (err,result) => {
      if (err) return console.log(err)

      console.log('saved to databse')
      res.redirect('/')
    })
  })

  db.collection('activities').find().toArray(function(err, results) {
    console.log(results)
  })

})



app.get('/', (req, res) => {
  var cursor = db.collection('activities').find().toArray(function(err,results) {
      res.render('index.ejs', {activities: results})
  })
})


app.set('view engine', 'ejs')
// res.render(view, locals)
