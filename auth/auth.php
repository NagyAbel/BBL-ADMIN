<?php

    function loggedin()
    {
        session_start();
        
        if(isset($_SESSION["loggedin"]) )
        {
            if($_SESSION["loggedin"]== TRUE)
            {
                return true;

            }else
            {
                return false;
            }
        }else
        {
            return false;
        }
    }
?>