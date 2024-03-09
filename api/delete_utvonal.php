<?php
include('connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve POST variables
    $id = $_POST['id'];

    
        $sql = "DELETE FROM Utvonalak Where id = '$id' ";
        if ($conn->query($sql) === TRUE) {
            echo "Deleted Utvonal: $id";
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