<?php
include('connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve POST variables
    $nev = $_POST['nev'];
    $hely = $_POST['hely'];

    // Perform SQL insertion
    $sql = "INSERT INTO megallok (nev, hely) VALUES ('$nev', '$hely')";

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