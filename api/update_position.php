<?php
include('connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve POST variables
    $busz_id = $_POST['id'];
    $_hely =  $_POST['hely'];
    $_utvonal = $_POST['utvonal'];

    
        $sql = "UPDATE buszok  SET hely= ? ,utvonal =? where id=? ";
        $stmt = $conn->prepare($sql);

        $stmt->bind_param("ssi", $_hely,$_utvonal, $busz_id);
        if ($stmt->execute() === TRUE) {
            echo "Update Position: $busz_id";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
        
    

     
    }

 else {
    echo "Invalid request method. This script only supports POST requests.";
}

// Close the database connection
$conn->close();

?>