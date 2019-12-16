const express = require('express')
const app = express()
var bodyParser = require('body-parser')

app.set('view-engine', 'ejs')

/*
app.get('/', (req, res) => {
    res.render('index.ejs');
})
*/

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

app.get('/login', function(req, res){
    res.render('login.ejs')
})

app.post('/login', function(req, res){
    res.render('tasks.ejs')
})

app.listen(3000)
//module.exports = router
