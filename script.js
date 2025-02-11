 const express = require('express');
 const ImageKit = require('imagekit');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const register = require('./Controllers/Register');
const signin = require('./Controllers/signin');
const image = require('./Controllers/image');
const profile = require('./Controllers/profile');
const { Pool } = require("pg");

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


// const db = knex({
//   client: 'pg',
//   connection: {
//     host : 'postgres.railway.internal', 
//     port : 5432,
//     user : 'postgres',
//     password : 'AptjHuMqYDBOFqRIjnRoXGILhjNAFAnC',
//     database : 'railway'
//   }
// });


const db = knex({
  client: 'pg',
  connection: 
 'postgresql://postgres:AptjHuMqYDBOFqRIjnRoXGILhjNAFAnC@roundhouse.proxy.rlwy.net:46147/railway'
//  PUBLIC URL
});














const app = express(); 
// /--to create the app--/

app.use(cors()); 

app.use(bodyParser.json()); //to make the req.body accessible or readable to the backend.

//this is to bypass the browser's CORS(cross-origin sharing) policy...this syntax however means all
// websites have access to the server.

//AN IDEAL SYNTAX FOR USING cors WOULD BE :
// app.use(cors({
//     origin: ['website_1', 'website2']
// })); 
//(where website_1 & website_2 are the websites given access)..we could add more sites if we wish.

// app.get('/',(req,res)=> { 
// 	res.send(database.users)
// })

const imagekit = new ImageKit({
  publicKey: 'public_2cFR1za5B66cOp21VNf0BqyfyUU=',
  privateKey: 'private_OrcsyyTI8OlDh0vT16DN5UNKwzo=', // Replace with your private API key
  urlEndpoint: 'https://ik.imagekit.io/lgddg4vjl',
});




// app.get('/auth', (req, res) => {
//   const authParameters = imagekit.getAuthenticationParameters();
//   res.json(authParameters);
// });

app.get('/imagekit-auth', (req, res) => {
  const authParams = imagekit.getAuthenticationParameters();
  res.json(authParams);
});


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







// Replace with the actual database URL from your hosting provider (like Railway or Heroku)
const DATABASE_URL = process.env.DATABASE_URL
//  || 'postgresql://postgres:AptjHuMqYDBOFqRIjnRoXGILhjNAFAnC@postgres.railway.internal:5432/railway'
 || 'postgresql://postgres:AptjHuMqYDBOFqRIjnRoXGILhjNAFAnC@roundhouse.proxy.rlwy.net:46147/railway'

// Initialize the pool
const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for hosted databases with SSL
  },
});

// Check database connection
const checkDatabaseConnection = async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Database connected successfully:', res.rows[0]);
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
  }
};

// Call the function when your app starts
checkDatabaseConnection();

module.exports = pool; // Export the pool for use in other parts of your app




























