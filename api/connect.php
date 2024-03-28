<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
$servername = "localhost"; // Change this to your MySQL server's hostname or IP address
$username = "root"; // Change this to your MySQL username
$password = ""; // Change this to your MySQL password
$database = "data"; // Change this to your MySQL database name


//$username = "sammy"; // Change this to your MySQL username
//$password = "password"; // Change this to your MySQL password



// Create a connection
$conn = new mysqli($servername, $username, $password, $database);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>