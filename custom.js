var map = L.map('map', {doubleClickZoom: false}).locate({setView: true, maxZoom: 16})

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20, // max amount of times to zoom in
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function onLocationFound(e) { // Displays user's location | Function template by TomazicM
    var radius = e.accuracy / 2; // to get the radius, divide diameter by 2.
    L.marker(e.latlng).addTo(map)
    .bindPopup("You are within " + radius + " meters from this point").openPopup(); // Message on pin.
    L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);
map.locate({setView: true, watch: true, maxZoom: 8}); // If you want to update location when moving.

var popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent('You clicked the map at ' + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);

//Dark mode toggle

function darkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
    // Remember dark mode
    let theme = localStorage.getItem("theme");
    if (theme && theme === "dark-mode") {
        localStorage.setItem("theme", "");
    } else {
        localStorage.setItem("theme", "dark-mode");
    }

    document.getElementById("theme").textContent = localStorage.getItem("theme");
}

// Remember dark mode choice

(function() {
    let onpageLoad = localStorage.getItem("theme") || "";
    let element = document.body;
    element.classList.add(onpageLoad);
    document.getElementById("theme").textContent =
      localStorage.getItem("theme") || "light";

})();

