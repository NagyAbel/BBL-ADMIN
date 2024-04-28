<?php
include('connect.php');
include('acces.php');
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve POST variables
    $id = $_POST['id'];

    //Checks if the admin is logged in
    session_start();
    if(!$_SESSION["loggedin"])exit;
    $user = $_SESSION["name"];
    $pass = $_SESSION["password"];
    if(!VerifyByAdminAccount($user,$pass))exit;


    


        $sql = "DELETE FROM utvonalak Where id = ? ";
        $p = mysqli_prepare($conn,$sql);
        mysqli_stmt_bind_param($p,"i",$id);
    
        if (mysqli_stmt_execute($p) === TRUE) {
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