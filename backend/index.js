require('dotenv').config()
const axios = require("axios")
// import cors from "cors"
const cors = require("cors")
// import { CallApiForData, readCache } from "./controllers"
const { CallApiForData, readCache } = require("./controllers")

// import { PrismaClient } from '@prisma/client'
const { PrismaClient } =require('@prisma/client')

const prisma = new PrismaClient()



const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const { log } = require('console')
app.use(bodyParser.json())
const baseurl = "https://api.openweathermap.org/data/2.5/weather"
const jwt = require('jsonwebtoken');

app.use(cors())


const { createClient } = require('@supabase/supabase-js')

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_TOKEN)


const bcrypt = require('bcrypt');
function encryptPassword(password) {

  console.log(hashed);
}

app.get('/', (req, res) => {
  console.log(process.env.API_KEY)
  res.send('Hello World!')
})


app.post('/api/register', async (req, res) => {
  const { username: uname, password } = req.body
  if (!uname || !password) {
    return res.status(404).send("either username or password is missing")
  }
  try {

    const user = await prisma.users.findUnique({
      where: {
        username: uname,
      },
    })
    if (user) {
      return res.status(409).send(`${uname} already exists`)
    }
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, async function (err, hash) {
      const newUser = await prisma.users.create({
        data: {
          username:uname,
          password:hash,
        },
      })

      const { id, username, created_at } = newUser
      return res.status(200).send({
        id:id.toString(),
        username,
        created_at,
      })
    });
  } catch (e) {
    console.error(e);
  }
})

app.post('/api/login', async (req, res) => {
  const { username: uname, password } = req.body
  console.log(uname, password);
  if (!uname || !password) {
    return res.status(404).send("missing username or password")
  }

  const user = await prisma.users.findUnique({
    where: {
      username: uname,
    },
  })
  if (!user) {
    return res.status(404).send("user does not exist")
  }

  bcrypt.compare(password, user.password, function (err, result) {
    console.log(err);
    // result == true
    if (!result) {
      return res.status(409).send("password does not match")
    }
    const token = jwt.sign({
      id: user.id.toString(),
      username: user.username
    }, 'michu', { expiresIn: '36h' });
    return res.status(200).send({ token: token })

  });
})

const loginRequired = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'michu', (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.get('/protected', loginRequired, (req, res) => {
  return res.status(200).send("this is protected")
})




app.post('/api/weather', loginRequired, async (req, res) => {
  const { city } = req.body
  const apiurl = `${baseurl}?q=${city}&appid=${process.env.API_KEY}`
  if (!city) {
    return res.status(404).send(`No such city`)
  }
  const lastrow = await readCache(city, prisma)
  // console.log(lastrow);
  if (lastrow) {
    return res.status(200).send(lastrow)
  }
  else {
    const weather = await CallApiForData(apiurl, prisma)
    // console.log(weather);
    if (weather.error) {
      return res.status(404).send(weather)
    }
    else {
      return res.status(200).send(weather)
    }
  }
})









app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

