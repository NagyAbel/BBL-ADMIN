<html>
    <link rel="stylesheet" href="../src/output.css">
    <title>LOGIN</title>
    <link rel="Icon" type="image/png" href="../static/icon.png"/>

    <body class="bg-[#304D30]   content-start items-center">
        <div class="w-100 h-[100px] flex items-center flex-col">
            <p class=" w-[220px] mt-[30px] h-[60px] rounded-[10px] p-[10px] bg-[#163020] text-white font-medium text-[30px]">ADMIN PANEL</p>

        </div>
        <div class=" w-200 h-100 flex items-center flex-col ">
            <form class="items-center flex flex-col " action="" method="POST">
                <input name = "nev" id="nev" placeholder="Felhasznalonev..." type="text"     maxlength="50" class="w-[450px] h-[80px] bg-[#163020] text-white p-2 rounded-[10px] m-3 outline-none font-medium text-[25px]">
    
                <input name="jelszo" id="jelszo" placeholder="Jelszo..." type="password"     maxlength="255" class="w-[450px] h-[80px] bg-[#163020] text-white p-2 rounded-[10px] m-3 outline-none font-medium text-[25px]">
    
                <input class="font-medium text-[30px] text-white w-[150px] h-[50px] bg-[#163020] rounded-[10px] " type="submit" value="Belepes">
            </form> 
        </div>
    </body>
</html>



<?php
include("../api/connect.php");

if ($_SERVER['REQUEST_METHOD'] != 'POST') exit;
if ( !isset($_POST['nev'], $_POST['jelszo']) || $_POST['nev']=='' || $_POST['jelszo'] == '' ) {
	// Could not get the data that should have been sent.
    session_start();

    $_SESSION['loggedin'] = FALSE;
    $_SESSION['name'] ="";
    $_SESSION['password']="";
    $_SESSION['id'] = "";

	exit('<div class="flex items-center justify-center"><p id="error" class="text-white font-medium text-[20px]">Hiba: Üres mezők!</p></div>');
}

if ($stmt = $conn->prepare('SELECT id, jelszo FROM felhasznalok WHERE nev = ?')) {
	$stmt->bind_param('s', $_POST['nev']);
	$stmt->execute();
	$stmt->store_result();
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $password);
        $stmt->fetch();
        if ($_POST['jelszo'] == $password) {
            session_start();
            session_regenerate_id();
            $_SESSION['loggedin'] = TRUE;
            $_SESSION['name'] = $_POST['nev'];
            $_SESSION['password']=$password;
            $_SESSION['id'] = $id;
            echo '<div class="flex items-center justify-center"><p id="error" class="text-white font-medium text-[20px]">Siker!</p></div>';
            header("Location: ../index.php");
        } else {
            session_start();

            $_SESSION['loggedin'] = FALSE;
            $_SESSION['name'] ="";
            $_SESSION['password']="";
            $_SESSION['id'] = "";

            // Incorrect password
        }
    } else {
        session_start();

        $_SESSION['loggedin'] = FALSE;
        $_SESSION['name'] ="";
        $_SESSION['password']="";
        $_SESSION['id'] = "";
        // Incorrect username
        echo '<div class="flex items-center justify-center"><p id="error" class="text-white font-medium text-[20px]">Hiba: Felhasználónév vagy jelszó nem helyes!</p></div>';
    }

	$stmt->close();
}

?>


