<?php
// index.php
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>GeoTrees - Smart Navigation</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Leaflet & Plugins for show map -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css" />

  <!-- Style untuk interface -->
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #2e7d32;
      color: white;
      padding: 10px 20px;
    }

    header h1 {
      font-size: 24px;
    }

    .search-container {
      text-align: center;
      margin: 10px 0;
    }

    .search-container input[type="text"] {
      padding: 8px;
      width: 50%;
      max-width: 400px;
    }

    #map {
  height: 75vh;
  width: 80%;        /* Make it narrower */
  margin: 0 auto;    /* Center horizontally */
  border: 2px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
}


    .legend {
      background: white;
      padding: 10px;
      font-size: 15px;
      border-radius: 5px;
      line-height: 1.5em;
    }

    .info-box {
      background: #f0f0f0;
      padding: 10px;
      margin: 10px;
      border-radius: 5px;
    }

    table {
      width: 90%;
      margin: 10px auto;
      border-collapse: collapse;
    }

    table, th, td {
      border: 1px solid #ccc;
    }

    th, td {
      padding: 8px;
      text-align: left;
    }

    th {
      background-color: #2e7d32;
      color: white;
    }
  </style>
</head>
<body>

  <!-- Header with Title -->
  <header>
    <h1>🌳 GeoTrees - Smart Navigation </h1>
  </header>

  <!-- Search design -->
  <div class="search-container">
    <input type="text" id="searchInput" placeholder="Search Tree by Name or ID">
    <button onclick="searchTree()">Search</button>
  </div>

  <!-- Map -->
  <div id="map"></div>

  <!-- Info box -->
  <div id="treeInfo" class="info-box" style="display:none;"></div>

  <!-- Table below map for details tree after click for direction-->
  <table id="treeDetailsTable" border="1" style="margin-top: 20px; display: none; width: 100%;">
  <thead>
    <tr>
      <th>Tree ID</th>
      <th>Name</th>
      <th>Scientific Name</th>
      <th>Latitude</th>
      <th>Longitude</th>
      <th>Tree Circumference (cm)</th>
      <th>DBH (cm)</th>
      <th>Height (m)</th>
      <th>Wood Density</th>
      <th>AGB</th>
      <th>Carbon Storage</th>
    </tr>
  </thead>
  <tbody></tbody>
</table>


  <!-- untuk ke Scripts -->
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script src="https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js"></script>
  <script src="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js"></script>

  <script src="script.js"></script>

</body>
</html>
