//---------------------------using p5.js ----------------------------------------------------------------

function setup() {
  noCanvas()
  const video = createCapture(VIDEO)
  video.size(320, 240)

  let lat, lon, tempeToCel, aqi
  const btnSubmit = document.getElementById('submit')
  const txtMood = document.getElementById('mood_txt')

  btnSubmit.addEventListener('click', async (event) => {
    video.loadPixels()
    const image64 = video.canvas.toDataURL()

    const mood_val = txtMood.value
    // console.log(mood_val)
    const data = { lat, lon, mood_val, tempeToCel, aqi, image64 } //this data to be send to the sever, when we get lat and longitude
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), //which kind of data client is sending
    }
    const api = await fetch('/api', option)
    const response = await api.json()
    console.log(response)
  })

  if ('geolocation' in navigator) {
    console.log('geolocation is available ')
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        lat = position.coords.latitude
        lon = position.coords.longitude
        document.getElementById('latitude').textContent = lat
        document.getElementById('longitude').textContent = lon
        console.log(position.coords.latitude, position.coords.longitude)

        const getResponse = await fetch('/api_keys', { method: 'GET' })
        const getData = await getResponse.json()
        // console.log(getData)

        const api_temp_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${getData.weather_api_key}`
        const response_temp = await fetch(api_temp_url)
        const data_temp = await response_temp.json()
        // console.log(data_temp)
        const summary = data_temp.weather[0].main
        tempeToCel = (data_temp.main.temp - 273.15).toFixed(2)

        document.getElementById('temp').textContent = tempeToCel
        document.getElementById('summary').textContent = summary

        const api_aqi_url = `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${getData.air_quality_api_key}`
        const response_aqi = await fetch(api_aqi_url)
        const data_aqi = await response_aqi.json()

        document.getElementById('aqi').textContent = data_aqi.data.aqi
        document.getElementById('date_time').textContent = data_aqi.data.time.s
      } catch (err) {
        document.getElementById('aqi').textContent = 'NO DATA'
        document.getElementById('date_time').textContent = 'NO DATA'
        console.log('error is there', err)
      }
    })
  } else {
    console.log(' geolocation IS NOT available ')
  }
}
