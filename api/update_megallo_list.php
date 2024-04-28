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
    $utvonal = $_POST['id'];
    $megallok = $_POST['megallok'];

 // Prepare SQL statement
$sql = "UPDATE utvonalak SET megallok = ? WHERE id = ?";

$stmt = $conn->prepare($sql);

// Bind parameters
$stmt->bind_param("si", $megallok, $utvonal); // Assuming megallok is a string and utvonal is an integer, use "si" for string and integer

// Execute the statement
if ($stmt->execute() === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $stmt->error;
}
} else {
    echo "Invalid request method. This script only supports POST requests.";
}

// Close the database connection
$conn->close();

?>