const bodyParser = require('body-parser')
const express = require('express')
const fs = require('fs')
const shell = require('shelljs')
const app = express()
var cors = require('cors');
app.use(cors());

const port = 8088
const TMP_FOLDER = "./tmp"
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })) 

const router = express.Router()
router.get('/', (req, res) => { 
  res.send('Version 1 API')
})
router.post('/try_code', (req, res) => {
  if (!req.body.lang | !req.body.code) {
    res.status(400)
    res.send("Error: Missing Parameters")
    return
  }
  try {
    const FOLDER = `${TMP_FOLDER}/${shell.exec('tr -dc A-Za-z0-9 </dev/urandom | head -c 13', {silent:true})}`
    const SOURCE_FILE = `${FOLDER}/Main.${req.body.lang}`

    shell.mkdir('-p', FOLDER)
    res.FOLDER = FOLDER;
    
    fs.writeFileSync(SOURCE_FILE, req.body.code)
    
    res.send(shell.exec(`bash ./main.sh ${req.body.lang} ${FOLDER}`))
    
    shell.rm('-rf', FOLDER)
  } catch (error) {
    console.log(error)
    res.send("Somthing went wrong")
    shell.rm('-rf', res.FOLDER)
  }

})
app.use('/v1', router)


app.get('/', (req, res) => {
  res.send('Hello Hust VN 02!')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
