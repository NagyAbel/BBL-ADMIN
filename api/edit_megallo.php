<?php
include('connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve POST variables
    $nev = $_POST['nev'];
    $hely = $_POST['hely'];
    $id = $_POST['id'];

    if($nev != "")
    {
        $sql = "UPDATE megallok SET nev = '$nev' WHERE id = $id";
        if ($conn->query($sql) === TRUE) {
            echo "Record inserted successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
        
    }

    if($hely != "")
    {
        $sql = "UPDATE megallok SET hely = '$hely' WHERE id = $id";
        if ($conn->query($sql) === TRUE) {
            echo "Record inserted successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
     
    }

 else {
    echo "Invalid request method. This script only supports POST requests.";
}

// Close the database connection
$conn->close();

?>