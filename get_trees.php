<?php
session_start(); // Start session
require 'db_connect.php'; // Connect to first coding where first coding connect with database at phpmyadmin

$sql = "SELECT * FROM trees_info"; // SQL query select in table at geotrees(database name In my phpmyadmin)
$result = $conn->query($sql); // Run the query

$trees = []; // Empty array to store results

if ($result->num_rows > 0) {
    // Loop through each row and add to array
    while ($row = $result->fetch_assoc()) {
        $trees[] = $row;
    }
} else {
    // If no data, return
    echo json_encode([]);
}

header('Content-Type: application/json'); // Set response type to JSON
echo json_encode($trees); // Send data as JSON
?>
