<?php
include('connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve POST variables
    $nev = $_POST['nev'];
    $megallok =$_POST['megallok'];
    $indulasi_ido =  $_POST['indulasi_ido'];
    $id = $_POST['id'];

  

    if($nev != "")
    {
        $sql = "UPDATE utvonalak SET nev = '$nev' WHERE id = $id";
        if ($conn->query($sql) === TRUE) {
            echo "Record inserted successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
        
    }

    if($megallok != "")
    {
        $sql = "UPDATE utvonalak SET megallok = '$megallok' WHERE id = $id";
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