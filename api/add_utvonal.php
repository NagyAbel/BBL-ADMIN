<?php
include('connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve POST variables
    $nev = $_POST['nev'];
    $megallok = $_POST['megallok'];
    $indulasi_ido  = $_POST['indulasi_ido'];
    // Perform SQL insertion

    $sql = "INSERT INTO utvonalak(nev,megallok,indulasi_ido) VALUES (?,?,?)";
    $p = mysqli_prepare($conn,$sql);
    mysqli_stmt_bind_param($p,'sss',$nev,$megallok,$indulasi_ido);

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