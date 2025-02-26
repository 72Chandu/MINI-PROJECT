const socket = io(); // Establish connection to the backend
console.log("hey");

if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
        const { longitude, latitude } = position.coords;
        socket.emit("send-location", { latitude, longitude });
    }, (err) => {
        console.log(err);
    }, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
    });
}

const map = L.map("map").setView([0, 0], 16); // Set initial coordinates and zoom level
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "chandu",
}).addTo(map); // Show the map

const markers = {};

socket.on("receive-location", (data) => {
    const { id, latitude, longitude } = data;
    map.setView([latitude, longitude]); // Update the map view

    if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]); // Update marker position
    } else {
        markers[id] = L.marker([latitude, longitude]).addTo(map); // Add new marker
    }
});

socket.on("user-disconnected", (id) => {
    if (markers[id]) {
        map.removeLayer(markers[id]); // Remove marker from map
        delete markers[id]; // Delete marker from the markers object
    }
});
