// import axios from "axios"
const axios = require("axios")

async function readCache(city, prisma) {
  // const { data, error } = await supabase
  //   .from('weather_data')
  //   .select()
  //   .ilike('name', city)

  const latestQuery = await prisma.weather_data.findMany({
    orderBy: {
        id: 'desc',
    },
    take: 1,
})


  if (latestQuery) {
    const { created_at } = latestQuery
    const storedDate = new Date(created_at);
    const currentDate = new Date();
    const timeDifference = currentDate - storedDate;
    const differenceInMinutes = timeDifference / (1000 * 60);
    if (differenceInMinutes <= 30) {
      return latestQuery
    }
    else {
      return undefined
    }
  }
}

async function CallApiForData(apiurl, supabase) {
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
    const newData = await prisma.weather_data.create({
      data: {
       ...weather 
      },
    })
    // const { error } = await supabase
    //   .from('weather_data')
    //   .insert(weather)
    if (error) {
      return { error: "something went wrong" }
    }
    return weather
  } catch (e) {
    return { error: "city not found" }
  }
}





module.exports = {
  readCache, CallApiForData
}

