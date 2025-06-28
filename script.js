// Initialize map
var map = L.map("map", {
  maxZoom: 45,  // Increase zoom limit
}).setView([1.56, 103.635], 16);  // Zoom in further

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 45, // 🔍 Allow deeper zoom
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);


let markersLayer = L.markerClusterGroup(); // for keluarkan pin pokok/point

let currentLocationMarker; //auto detect our location after click allow my location at device location

// Fetch tree data
async function fetchTreeData() {
  const response = await fetch("get_trees.php");
  return await response.json();
}

// Load tree markers
async function loadMarkers() {
  const trees = await fetchTreeData();
  console.log("Trees fetched:", trees);

  markersLayer.clearLayers();

  trees.forEach((tree) => {
    if (!tree.Latitude || !tree.Longitude) return;
    // Tree location based on latitude and longitude at database data
    let lat = parseFloat(tree.Latitude);
    let lon = parseFloat(tree.Longitude);

    if (isNaN(lat) || isNaN(lon)) return;

    let color = getMarkerColor(parseFloat(tree.Carbon_Storage));

    let icon = L.icon({
  iconUrl: 'treeicon.png',  // image from destop
  iconSize: [30, 30],               // icom size
  iconAnchor: [20, 40],             // Anchor 
  popupAnchor: [0, -40]             // Popup appears above the image
});

    // pop up tree details, when device arrow go to tree, ot gonna show details about treename, id, scientific name and CS
    let marker = L.marker([lat, lon], { icon })
  .bindTooltip(`
    <strong>📍 Navigating to ${tree.Name}</strong><br>
    <strong>ID:</strong> ${tree.Tree_ID}<br>
    <strong>Scientific Name:</strong> ${tree.Scientific_Name}<br>
    <strong>Carbon Storage:</strong> ${tree.Carbon_Storage} kg
  `, {
    permanent: false,
    direction: 'top',
    offset: [0, -25],
    opacity: 0.9
  })
  .on("click", () => showRoute(lat, lon, tree));


    markersLayer.addLayer(marker);
  });

  map.addLayer(markersLayer);
}


      // ✅ Update Table Below the Map
const table = document.getElementById("treeDetailsTable");
const tbody = table.querySelector("tbody");
table.style.display = "table";

tbody.innerHTML = `
  <tr>
    <td>${tree.Tree_ID}</td>
    <td>${tree.Name}</td>
    <td>${tree.Scientific_Name}</td>
    <td>${tree.Latitude}</td>
    <td>${tree.Longitude}</td>
    <td>${tree["Tree_Circumference(cm)"]}</td>
    <td>${tree["DBH(cm)"]}</td>
    <td>${tree["Height(m)"]}</td>
    <td>${tree.WoodDensity}</td>
    <td>${tree.AGB}</td>
    <td>${tree.Carbon_Storage}</td>
  </tr>
`;

// this code for box funtion dekat atas map untuk search, diamana kami buat untuk search id and name only
function searchTree() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  fetchTreeData().then((trees) => {
    const filtered = trees.filter(tree =>
      tree.Name.toLowerCase().includes(query) ||
      tree.Tree_ID.toLowerCase().includes(query)
    );

    markersLayer.clearLayers();

    // Reuse tree icon before
    const treeIcon = L.icon({
      iconUrl: 'treeicon.png',
      iconSize: [30, 30],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });
      // code for each tree also have same icon seperti code diatas mengikut latitud longitud
    filtered.forEach(tree => {
      let lat = parseFloat(tree.Latitude);
      let lon = parseFloat(tree.Longitude);
      if (isNaN(lat) || isNaN(lon)) return;

      let marker = L.marker([lat, lon], { icon: treeIcon })

      // this code nak kelaurkan detail pokok sebelum tekan, just drag mouse and pergi dekat pokok
      // nanti akan keluar detail simple untuk mudah pencarian pokok sebelum direction
  .bindTooltip(`
    <strong>Navigating to ${tree.Name}</strong><br>
    <strong>ID:</strong> ${tree.Tree_ID}<br>
    <strong>Scientific Name:</strong> ${tree.Scientific_Name}<br>
    <strong>Carbon Storage:</strong> ${tree.Carbon_Storage} kg
  `, {
    permanent: false,
    direction: 'top',
    offset: [0, -25],
    opacity: 0.9
  })
  .on("click", () => showRoute(lat, lon, tree));


      markersLayer.addLayer(marker);
    });
  });
}

// setting location legend nak letak mane
let legend = L.control({ position: "topright" });
legend.onAdd = function () {
  var div = L.DomUtil.create("div", "info legend");
  div.innerHTML = `
    <h4 style="text-align:center"><u>Legend</u></h4>
    <p><img src="treeicon.png" width="20" style="vertical-align:middle;"> Tree Location</p>
    <p><span style="display:inline-block;width:20px;height:4px;background:blue;margin-right:6px;"></span> Navigation Path</p>
    <p><img src="https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png" width="20" style="vertical-align:middle;"> Your Location</p>
  `;
  return div;
};
legend.addTo(map);


// Start map
document.addEventListener("DOMContentLoaded", loadMarkers);
