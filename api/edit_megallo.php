<?php
include('connect.php');
include('acces.php');
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    //Checks if the admin is logged in
    session_start();
    if(!$_SESSION["loggedin"])exit;
    $user = $_SESSION["name"];
    $pass = $_SESSION["password"];
    if(!VerifyByAdminAccount($user,$pass))exit;

   
   
    // Retrieve POST variables
    $nev = $_POST['nev'];
    $hely = $_POST['hely'];
    $id = $_POST['id'];

    if($nev != "")
    {
        $sql = "UPDATE megallok SET nev = ? WHERE id = ?";
        $p = mysqli_prepare($conn,$sql);
        mysqli_stmt_bind_param($p,"si",$nev,$id);

        if (mysqli_stmt_execute($p) === TRUE) {
            echo "Record inserted successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
        
    }

    if($hely != "")
    {
        $sql = "UPDATE megallok SET hely = ? WHERE id = ?";
        $p = mysqli_prepare($conn,$sql);
        mysqli_stmt_bind_param($p,"si",$hely,$id);

        if (mysqli_stmt_execute($p) === TRUE) {
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