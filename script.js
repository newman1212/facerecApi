const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const register = require('./Controllers/Register');
const signin = require('./Controllers/signin');
const image = require('./Controllers/image');
const profile = require('./Controllers/profile');

// const db = knex({
//   client: 'pg',
//   connection: {
//     host : '127.0.0.1',
//     port : 5432,
//     user : 'postgres',
//     password : '0574200952',
//     database : 'facerecdb'
//   }
// });


const db = knex({
  client: 'pg',
  connection: {
    host : 'postgres://user:ZUCzoA3fIJZJPCRD5Mi66KDlIlKjy64K@dpg-cg0iolo2qv2bfopr7m4g-a/facerecdb_7ffq',
    port : 5432,
    // hostname: 'dpg-cg0iolo2qv2bfopr7m4g-a'
    user : 'user',
    password : 'ZUCzoA3fIJZJPCRD5Mi66KDlIlKjy64K',
    database : 'facerecdb_7ffq'
  }
});






const app = express(); 
// /--to create the app--/

app.use(bodyParser.json()); //to make the req.body accessible or readable to the backend.

app.use(cors()); //this is to bypass the browser's CORS(cross-origin sharing) policy...this syntax however means all
// websites have access to the server.

//AN IDEAL SYNTAX FOR USING cors WOULD BE :
// app.use(cors({
//     origin: ['website_1', 'website2']
// })); 
//(where website_1 & website_2 are the websites given access)..we could add more sites if we wish.

// app.get('/',(req,res)=> { 
// 	res.send(database.users)
// })

app.post('/signin',(req,res)=> {
  signin.signInHandler(req,res,db,bcrypt)
})

app.post('/register', (req, res) => {
register.registerHandler(req,res,db,bcrypt)
}) //this is called dependency injection

app.get('/profile/:id',(req,res) => {
  profile.profileHandler(req,res,db)
})

app.put('/image',(req,res) => {image.imageFormHandler(req,res,db);
})


app.post('/imageUrl',(req,res) => {image.apiCallHandler(req,res);
})



const PORT = process.env.PORT

app.listen(PORT,()=>{
	console.log(`Server is listening on ${PORT}`)
});

// console.log(PORT);





























