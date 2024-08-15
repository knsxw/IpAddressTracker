const searchForm = document.querySelector(".header_form");
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = document.querySelector("#search").value;
    searchIpAddress(value);
});
async function searchIpAddress(ipAddress) {
    const apiKey = "at_nt3WeqWuEfFMyEzoFSax4uuU9i9H9";
    const request = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}`);
    const response = await request.json();

    const { location, ip, isp} = response;
    updateUI(ip, location.city, location.timezone, isp);

    if (map !== undefined && map != null) {
        map.remove()
    }
    createMap(location.lat, location.lng, location.country, location.region)
}
function updateUI(ip, location, timezone, isp) {
    document.querySelector(".address").textContent = ip;
    document.querySelector(".location").textContent = location;
    document.querySelector(".utc").textContent = 'UTC' + timezone;
    document.querySelector(".isp").textContent = isp;
}
let map;
function createMap(lat, lng, country, region) {
    map = L.map('map').setView([lat, lng], 14);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    const myIcon = L.icon({
        iconUrl: '/icon-location.svg',
        iconSize: [40, 60],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
       
    })
    L.marker([lat, lng], {icon: myIcon}).addTo(map)
    	.bindPopup(`${region}, ${country}`)
    	.openPopup();
}
const defaultIp = "26.37.52.179";
searchIpAddress(defaultIp)