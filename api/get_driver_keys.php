<?php
include("acces.php");
include("connect.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    session_start();
    

    if($_SESSION["loggedin"])
    {
        $user = $_SESSION["name"];
        $pass = $_SESSION["password"];
    
    if(VerifyByAdminAccount($user,$pass))
    {
        $sql = "SELECT * FROM kulcsok";
        $result = $conn->query($sql);
        $data = [];
        while($row = $result->fetch_assoc())
        {
            $data[] = $row;
        }
    
        echo json_encode($data);
    }
    }
  
}

?>