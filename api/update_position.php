<?php
include('connect.php');
include('acces.php');
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve POST variables


    session_start();
    $kulcs = $_POST['kulcs'];
    if(!VerifyByDriverKey($kulcs))
    {
        echo("Wrong API Key:".$kulcs);

        exit;
    }



    $busz_id = $_POST['id'];
    $_hely =  $_POST['hely'];
    $_utvonal = $_POST['utvonal'];
    

        $current_megallo = GetMegalloFromPosition($_hely,$_utvonal);
    
        if($current_megallo != "-1")
        {
            $prev_megallo = $current_megallo;
            $sql = "UPDATE buszok  SET hely= '$_hely', current_megallo= '$current_megallo', prev_megallo='$prev_megallo' ,utvonal = '$_utvonal'  where id= '$busz_id' ";

        }else
        {
            $sql = "UPDATE buszok  SET hely= '$_hely', current_megallo= '$current_megallo',utvonal = '$_utvonal'  where id= '$busz_id' ";

        }

        if ($conn->query($sql) === TRUE) {
            echo "$_hely:  Update Position: $busz_id";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
        
    

     
    }

 else {
    //echo "Invalid request method. This script only supports POST requests.";
}


//GetMegalloFromID(3);
//Returns the name of the megallo if  the position is within a megallo else returns -1
function GetMegalloFromPosition($pos,$utvonal)
{
    $megallok = GetMegalloListFromUtvonal($utvonal);
    //$megallo_list = 
    if($megallok != null)
    {
        foreach($megallok as $m)
        {
            if(MegalloContainsPos($pos,$m['hely']))
            {
                return $m['id'];
            }
        }
    }
  

    return "-1";

    //echo($megallok[0]['hely']);


}
//
function strToFloat( $val )
{
    preg_match( "#^([\+\-]|)([0-9]*)(\.([0-9]*?)|)(0*)$#", trim($val), $o );
    return $o[1].sprintf('%d',$o[2]).($o[3]!='.'?$o[3]:'');
}

function MegalloContainsPos($pos,$m_pos)
{
    if($m_pos=="x")return false;
    $pos_list = explode("|",$pos);
    $m_pos_list = explode("|",$m_pos);

    $lat = strToFloat($pos_list[0]);
    $long  = strToFloat($pos_list[1]);



    $minLat =strToFloat($m_pos_list[1]);
    $maxLat = strToFloat($m_pos_list[0]);
    $minLng = strToFloat($m_pos_list[3]);
    $maxLng = strToFloat($m_pos_list[2]);

   
  if ($lat >= $minLat && $lat <= $maxLat && $long >= $minLng && $long <= $maxLng) {
        return true;
    } else {
        return false;
    }



}


function GetMegalloListFromUtvonal($utvonal_id)
{
    global $conn;
    $sql = "SELECT * FROM utvonalak where id=$utvonal_id";
    $result = $conn->query($sql);
    while($row = $result->fetch_assoc())
    {
        $data[] = $row;
    }
    $m_string = str_replace('|',',', $data[0]['megallok']);
    $megallok_string = substr($m_string,0,-1);
    if(strlen($megallok_string)!=0){

    $sql="SELECT * FROM megallok WHERE id IN ($megallok_string)";
    $result = $conn->query($sql);
    while($row = $result->fetch_assoc())
    {
        $megallok[] = $row;
    }
    return $megallok;

    }else
    {
        return null;
    }

}

//Not using this one right now
function GetMegalloFromID($megallo_id)
{
    //include('connect.php');
    global $conn;
    $sql = "SELECT * FROM megallok WHERE megallok.id =$megallo_id;";
    $result = $conn->query($sql);

    while($row = $result->fetch_assoc())
    {
        $data[] = $row;
    }
   // $conn->close();

    return $data[0];
    
}

// Close the database connection
//$conn->close();

?>