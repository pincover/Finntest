const mysql = require('mysql')
 
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'finn'
  })
 
db.connect((err) =>{
    if(err){
        console.error('error connecting: ' + err.stack)
        return
    }
    console.log('connected')
})
// db.end()
module.exports = db