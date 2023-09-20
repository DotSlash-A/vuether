export async function readCache(city, supabase) {
  const { data, error } = await supabase
    .from('weather_data')
    .select()
    .ilike('name', city)

  if (data.length != 0) {
    const n = data.length
    const { created_at } = data[n - 1]
    const storedDate = new Date(created_at);
    const currentDate = new Date();
    const timeDifference = currentDate - storedDate;
    const differenceInMinutes = timeDifference / (1000 * 60);
    if (differenceInMinutes <= 30) {
      return data[n - 1]
    }
    else {
      return undefined
    }
  }
}