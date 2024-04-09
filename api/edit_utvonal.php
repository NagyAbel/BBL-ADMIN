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
        $sql = "UPDATE utvonalak SET nev = ? WHERE id = ?";
        $p = mysqli_prepare($conn,$sql);
        mysqli_stmt_bind_param($p,"si",$nev,$id);
    
        if (mysqli_stmt_execute($p)=== TRUE) {
            echo "Record inserted successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
        
    }

    if($megallok != "")
    {
        $sql = "UPDATE utvonalak SET megallok = ? WHERE id = ?";
        $p = mysqli_prepare($conn,$sql);
        mysqli_stmt_bind_param($p,"si",$megallok,$id);
    
        if (mysqli_stmt_execute($p)=== TRUE) {
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