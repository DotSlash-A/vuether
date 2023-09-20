require('dotenv').config()
const axios = require("axios")
import cors from "cors"


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
const supabase = createClient('https://glboqlscxkesrvazihnb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsYm9xbHNjeGtlc3J2YXppaG5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQxNTc2MzgsImV4cCI6MjAwOTczMzYzOH0.3bkjlSJk7ud7CaX8XsUI2_2GsFk0lHaFCY9R4yeFKMI')

const bcrypt = require('bcrypt');
function encryptPassword(password) {

  console.log(hashed);
}

app.get('/', (req, res) => {
  console.log(process.env.API_KEY)
  res.send('Hello World!')
})

app.post('/api/weather', async (req, res) => {
  const { city } = req.body
  if (!city) {
    return res.status(404).send(`No such city`)
  }
  const { data, error } = await supabase
    .from('weather_data')
    .select()
    .ilike('name', city)
  if (data.length != 0) {
    console.log("from database")
    const n = data.length
    const lastrow = data[n-1]
    const { created_at }= lastrow
    console.log(created_at)
    const storedDate = new Date(created_at);

    const currentDate = new Date();
    
    const timeDifference = currentDate - storedDate;
    console.log(timeDifference);
    const differenceInMinutes = timeDifference / (1000 * 60);
    console.log(differenceInMinutes);
    if (differenceInMinutes <= 30){
      return res.status(200).send(lastrow)
    }
  }

  const apiurl = `${baseurl}?q=${city}&appid=${process.env.API_KEY}`
  try {
    const { data } = await axios.get(apiurl)
    const { main, name } = data
    const { temp, feels_like, temp_min, temp_max, pressure, humidity } = main
    const weather = {
      temp,
      feels_like,
      temp_min,
      temp_max,
      pressure,
      humidity,
      name
    }
    const { error } = await supabase
      .from('weather_data')
      .insert(weather)
    if (error) {
      console.log(error)
      return res.status(500).send("something went wrong")
    }
    return res.status(200).send(weather)
  } catch (e) {
    return res.status(404).send("city not found")
  }
})


app.post('/api/register', async (req, res) => {
  const { username: uname, password } = req.body
  if (!uname || !password) {
    return res.status(404).send("either username or password is missing")
  }
  try {

    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('username', uname)

    if (data.length != 0) {
      return res.status(409).send(`${uname} already exists`)
    }
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, async function (err, hash) {
      const { data: userCreated, error: userNotCreated } = await supabase
        .from('users')
        .insert({ username: uname, password: hash })
        .select()
      const { id, username, created_at } = userCreated[0]
      return res.status(200).send({
        id,
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
  if (!uname || !password) {
    return res.status(404).send("missing username or password")
  }
  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('username', uname)
  if (data.length == 0) {
    return res.status(404).send("user does not exist")
  }

  bcrypt.compare(password, data[0].password, function (err, result) {
    // result == true
    if (!result) {
      return res.status(409).send("password does not match")
    }
    const token = jwt.sign({
      id: data[0].id,
      username: data[0].username
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

// app.get('/api/database', async (req, res) => {

// })














app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

