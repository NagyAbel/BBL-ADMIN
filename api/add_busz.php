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
    $utvonal = $_POST['utvonal'];
    $prev_megallo  = $_POST['prev_megallo'];
    $current_megallo = $_POST['current_megallo'];


    // Perform SQL insertion
    //$sql = "INSERT INTO buszok (nev,utvonal,hely,prev_megallo,current_megallo) VALUES ('$nev', '$utvonal','$hely','$prev_megallo','$current_megallo')";
    $sql = "INSERT INTO buszok (nev,utvonal,hely,prev_megallo,current_megallo) VALUES (?,?,?,?,?)";

    $p = mysqli_prepare($conn,$sql);
    mysqli_stmt_bind_param($p,"sssss",$nev,$utvonal,$hely,$prev_megallo,$current_megallo);

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