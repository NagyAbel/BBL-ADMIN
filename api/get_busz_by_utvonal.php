<?php
include('connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve POST variables
    $utvonal_id = $_POST["utvonal_id"];
    
    // Prepare SQL statement
    $sql = "SELECT * FROM buszok WHERE utvonal=?";
    $stmt = $conn->prepare($sql);
    
    // Bind parameters
    $stmt->bind_param("i", $utvonal_id); // Assuming utvonal_id is an integer, use "i" for integer
    
    // Execute the statement
    $stmt->execute();
    
    // Get the result
    $result = $stmt->get_result();
    
    $data = [];
    while($row = $result->fetch_assoc())
    {
        $data[] = $row;
    }
    
    // Output the data as JSON
    echo json_encode($data);
    
    // Close the statement
    $stmt->close();

} else {
    echo "Invalid request method. This script only supports POST requests.";
}

// Close the database connection
$conn->close();
?>