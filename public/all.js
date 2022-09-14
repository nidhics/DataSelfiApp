async function getData() {
  // const mood=[]
  const response = await fetch('/ap')
  const data = await response.json()
  console.log(data)
  for (item of data) {
    const root = document.createElement('div')
    const mood = document.createElement('div')
    const latlon = document.createElement('div')
    const date_time = document.createElement('div')
    const temperature = document.createElement('div')
    const aqi = document.createElement('div')
    const image = document.createElement('img')
    const saprator = document.createElement('div')

    mood.textContent = 'mood was: ' + item.mood_val
    latlon.textContent = `latitude:${item.lat}, longitude:${item.lon}`
    const date_time_readable = new Date(item.timeStamp).toLocaleString()
    date_time.textContent = 'recorded on: ' + date_time_readable
    temperature.textContent = `Temperature was : ${item.tempeToCel}°C`
    aqi.textContent = `Air Quality index was : ${item.aqi}`
    image.src = item.image64
    image.alt = 'image database'

    saprator.textContent = '----------------------------------------------'

    root.append(mood, latlon, date_time, temperature, aqi, image, saprator)
    document.body.append(root)
  }
}

getData()
