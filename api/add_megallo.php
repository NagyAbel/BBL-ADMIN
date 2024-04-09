<?php
include('connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve POST variables
    $nev = $_POST['nev'];
    $hely = $_POST['hely'];

    // Perform SQL insertion
    //$sql = "INSERT INTO megallok (nev, hely) VALUES ('$nev', '$hely')";
    $sql = "INSERT INTO megallok (nev,hely) VALUES (?,?)";

    $p = mysqli_prepare($conn,$sql);
    mysqli_stmt_bind_param($p,"ss",$nev,$hely);
    if (mysqli_stmt_execute($p) === TRUE) {
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