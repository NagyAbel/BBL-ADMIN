<?php
include('connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve POST variables
    $id = $_POST['id'];

    
        $sql = "DELETE FROM buszok Where id = ? ";

        $p = mysqli_prepare($conn,$sql);
        mysqli_stmt_bind_param($p,"i",$id);
        if (mysqli_stmt_execute($p) === TRUE) {
            echo "Deleted Megallo: $id";
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