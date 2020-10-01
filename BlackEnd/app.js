const express = require('express')
const cors = require('cors')
const app = express();app.use(cors())
const bodyparser=require('body-parser');
const session=require('express-session');
const morgan = require('morgan');
const path = require('path')
const port = process.env.port || 3000


const Login = require('./routes/login')

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('view options', {delimiter: '?'});

// Import the appropriate class
const {
  WebhookClient
} = require('dialogflow-fulfillment');

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({
  // name:'sid',
  secret:'secret',
  // saveUninitialized: false,
  resave: true,
  rolling: true
}));
app.use(bodyparser.json())

app.use('/api', [Login]) 

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

//route not exist
app.use(function(req, res, next) {
  var err = createError(404)
  next(err)
})

//handle errors
app.use(function (err, req, res, next) {
  // กำหนด response local variables 
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // กำหนด status และ render หน้า error page
  res.status(err.status || 500) // ถ้ามี status หรือถ้าไม่มีใช้เป็น 500
  res.render('error') 
})

app.listen(port, function() {
  console.log(`App listening on port ${port}!`)
})

