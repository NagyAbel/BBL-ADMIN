<?php
include('connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve POST variables
    $utvonal_id = $_POST["utvonal_id"];
    // Perform SQL insertion
    $sql = "SELECT * FROM buszok WHERE utvonal=$utvonal_id";
    $result = $conn->query($sql);
    $data = [];
    while($row = $result->fetch_assoc())
    {
        $data[] = $row;
    }

    echo json_encode($data);

} else {
    echo "Invalid request method. This script only supports POST requests.";
}

// Close the database connection
$conn->close();

?>