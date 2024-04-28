<?php
function VerifyByDriverKey($key)
{
    include("connect.php");


    if ($stmt = $conn->prepare("SELECT id FROM kulcsok WHERE kulcs = ? AND tipus = 'busz' ")) {
        $stmt->bind_param('s', $key);
        $stmt->execute();
        $stmt->store_result();
        if ($stmt->num_rows > 0) {
          return true;
        } else {
            return false;
        }
    
        $stmt->close();
    }
}


function VerifyByClientKey($key)
{
    include("connect.php");


    if ($stmt = $conn->prepare("SELECT id FROM kulcsok WHERE kulcs = ? AND tipus = 'client' ")) {
        $stmt->bind_param('s', $key);
        $stmt->execute();
        $stmt->store_result();
        if ($stmt->num_rows > 0) {
          return true;
        } else {
            return false;
        }
    
        $stmt->close();
    }
}

function VerifyByAdminAccount($_username,$_password)
{
    include("connect.php");


    if ($stmt = $conn->prepare("SELECT id, jelszo FROM felhasznalok WHERE nev = ?")) {
        $stmt->bind_param('s', $_username);
        $stmt->execute();
        $stmt->store_result();
        if ($stmt->num_rows > 0) {
            $stmt->bind_result($id, $password);
            $stmt->fetch();
            if ($_password == $password) {
               return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    
        $stmt->close();
    }
}


?>