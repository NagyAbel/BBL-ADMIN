<?php
include('connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve POST variables
    $utvonal = $_POST['id'];
    $megallok = $_POST['megallok'];

    // Perform SQL insertion
    $sql = "UPDATE utvonalak SET megallok = '$megallok' WHERE utvonalak.id = '$utvonal';";

    if ($conn->query($sql) === TRUE) {
        echo "Record inserted successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "Invalid request method. This script only supports POST requests.";
}

// Close the database connection
$conn->close();

?>