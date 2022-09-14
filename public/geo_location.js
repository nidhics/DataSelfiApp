const issMap = L.map('issMap').setView([0, 0], 1)

const myMap = L.map('myMap').setView([0, 0], 1)

const issIcon = L.icon({
  iconUrl: './satellite.png',
  iconSize: [50, 32],
  iconAnchor: [25, 16],
})

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap',
}).addTo(issMap)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap',
}).addTo(myMap)

const marker = L.marker([0, 0], { icon: issIcon }).addTo(issMap)

async function getISS() {
  const api_url = 'https://api.wheretheiss.at/v1/satellites/25544'
  const response = await fetch(api_url)
  const data = await response.json()
  // console.log(data)
  const { latitude, longitude } = data
  console.log(latitude, longitude)
  marker.setLatLng([latitude, longitude])
  document.getElementById('lat').textContent = latitude
  document.getElementById('lon').textContent = longitude
}

setInterval(getISS, 1000)

async function get_data_from_database() {
  const response = await fetch('/ap')
  const data = await response.json()
  console.log(data)
  for (item of data) {
    const { lat, lon, tempeToCel, aqi } = item
    const my_marker = L.marker([lat, lon]).addTo(myMap)
    console.log(lat, lon, tempeToCel, aqi)
    const msg = `latitude: ${lat}, longitude: ${lon} \n Temperature: ${tempeToCel} &deg; \n Air Quality Index: ${aqi} `
    my_marker.bindPopup(msg)
  }
}
get_data_from_database()
