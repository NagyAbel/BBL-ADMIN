<?php
include("acces.php");
include("connect.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    session_start();
    
    
    if($_SESSION["loggedin"])
    {
        function generateUniqueApiKey() {
            // Generate a unique string based on the current timestamp and some random bytes
            $uniqueString = uniqid(mt_rand(), true);
        
            // Hash the unique string using SHA-256
            $hashedString = hash('sha256', $uniqueString);
        
            // Encode the hashed string in base64 format
        
            // Return the unique API key
            return $hashedString;
        }


        $user = $_SESSION["name"];
        $pass = $_SESSION["password"];
    
    if(VerifyByAdminAccount($user,$pass))
    {
        $nev =$_POST["name"];
        $value  = generateUniqueApiKey();
        $type = "busz";
        $sql = "INSERT INTO kulcsok(nev,kulcs,tipus) VALUES (?,?,?)";
        $p  = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($p,"sss",$nev,$value,$type);
        if (mysqli_stmt_execute($p) === TRUE) {
            echo "Record inserted successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }else
    {
        echo("Error Not Logged IN");

    }
   
    }else
    {
        echo("Error Not Logged IN");
    }
  
  
}

?>