<?php
    include("auth/auth.php");

    if(!loggedin())
    {
        header("Location: public/main.php");
    }
?>
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ADMIN</title>
    <link rel="stylesheet" href="src/output.css">
    <link rel="Icon" type="image/png" href="static/icon.png"/>
    <script src="src/utvonalak.js" defer></script>
    <script src="src/buszok.js" defer></script>

    <script src="src/megallok.js" defer></script>
    <script src="src/settings.js" defer></script>

    <script src="src/main.js" defer></script>


</head>
<body class="bg-[#304D30] w-screen h-screen">
<script src="src/maps.js"></script>
    <div class="flex justify-center grid-flow-row grid-cols-1">
        <button onclick="Buszok()" class="active:scale-95 hover:scale-[1.01] hover:bg-[#3D5444] bg-[#163020] px-4 py-1 rounded-[26px] text-white m-3">
            <p class="text-[35px] font-[Museo]">Buszok
            </p>
        </button>   
        <button onclick="Utvonalak()" class="active:scale-95 hover:scale-[1.01] hover:bg-[#3D5444] bg-[#163020] px-4 py-1 rounded-[26px] text-white m-3">
            <p class="text-[35px] font-[Museo]">Útvonalak
            </p>
        </button>   
        <button onclick="Megallok()"  class="active:scale-95 hover:scale-[1.01] hover:bg-[#3D5444] bg-[#163020] px-4 py-1 rounded-[26px] text-white m-3">
            <p class="text-[35px] font-[Museo]">Megállók
            </p>
        </button> 
        <button  onclick="Settings()" class="active:scale-95 hover:scale-[1.01] hover:bg-[#3D5444] bg-[#163020] px-4 py-1 rounded-[26px] text-white m-3">
            <p class="text-[35px] font-[Museo]">Beállítások
            </p>
        </button> 
    </div>



    <div id="utvonalak" class="hidden flex justify-center w-full h-max">
        <div class="bg-[#163020] w-[800px] rounded-[30px] h-max ml-30 mr-30 flex">
            <div class="h-[450px] w-[250px]">
                <button onclick="CreateUtvonal()" class=" border-solid border-1 border-cyan-900 active:scale-95 hover:scale-[1.01] hover:bg-[#4c6955] bg-[#3D5444] px-4 py-1 rounded-[26px] text-white m-3">
                    <p class="text-[33px] font-[Museo]">Új útvonal</p>
                </button>
                <div id="utvonal_holder" class=" gap-[11px]   items-center h-[300px] w-[220px]  scrollable-container overflow-y-scroll  mb-4 overflow-x-hidden ">
                   
                    </div>
            </div>
    
            <div class=" flex w-max h-80">
    
            <div class=" h-[400px] w-max">
                <input id="utvonal_nev" type="text" maxlength="18" class="bg-[#3D5444] text-white p-2 rounded-[10px] m-3 outline-none font-medium text-[35px]">
                <div class="flex ">


                
                <div class="flex flex-col  w-[230px]   ml-1 h-[300px] grid-flow-col grid-cols-1">
                   <div class="w-[250px]  flex">
                    <div class="rounded-[20px] flex bg-[#3D5444]   w-[150px] h-[50px] justify-center">
                        <p class="text-[25px] mt-1.5 text-white font-[Museo]">Megállók</p>
                    </div>
                    <div class="ml-1 w-[40px] hover:scale-1.01 active:scale-95  rounded-[13px] bg-[#3D5444] content-center flex">
                        <button onclick = "AddNewMegalloToUtvonal()" class="h-max "><img class="ml-[6px] mt-[10px] w-[30px] h-[30px]" src="static/plus.png" ></button>
                    </div>
                    <div class="ml-1 w-[40px] hover:scale-1.01 active:scale-95  rounded-[13px] bg-[#3D5444] content-center flex">
                        <button onclick = "DeleteMegalloFromUtvonal()" class="h-max "><img class="ml-[6px] mt-[10px] w-[30px] h-[30px]" src="static/delete_white.png" ></button>

                    </div>
                    </div>
                    <div id="utvonal_megallo_holder" class=" bg-[#3D5444] rounded-[20px] mt-[5px] w-[220px] h-[300px] overflow-y-scroll overflow-x-hidden">
                     
                        
                   
                   
                      

                    </div>
                    

    
                </div>
                

                <div class="w-[80px] h-[300px]  flex items-center">
                    <div id="swap_button" class="ml-1 w-[60px] h-[60px] hover:scale-1.01 active:scale-95 hidden  rounded-[13px] bg-[#3D5444] items-center flex">
                        <button onclick = "SwapMegallo()" class="ml-2.5 "><img class=" w-[40px] h-[40px]" src="static/swap.png" ></button>
                    </div>
                </div>
                <div class="flex flex-col  w-[150px]   ml-[0px] h-[300px] grid-flow-col grid-cols-1">
                   
                    <div class="rounded-[20px] flex bg-[#3D5444]  w-[220px]  justify-center">
                        <p class="text-[25px] text-white font-[Museo]">Összes megálló</p>
                    </div>
                    <div id="megallo_holder_utvonal" class=" bg-[#3D5444] rounded-[20px] mt-[5px] w-[220px] h-[300px] overflow-y-scroll overflow-x-hidden">
                     
                        <button class=" inline mb-[25px] w-full h-[150px] bg-[#798B7D] rounded-[10px]"><p class="text-white font-[Museo] text-[40px]">Mosnica</p></button>

                      

                    </div>
                    

    
                </div>
                </div>

            </div>
            </div>
            <div class=" ml-[15px] h-[80px] w-[80px]  content-center  ">
                <button onclick="DeleteUtvonal()" class="active:scale-95 hover:scale-[1.01] w-[50px] h-[50px] mt-[20px]" ><img   src="static/delete_white.png" ></button>
            </div>
         
        </div>
        </div>
        

    <div id="megallok" class="hidden flex justify-center w-full h-max">
        <div class="bg-[#163020] w-[800px] rounded-[30px] h-max ml-30 mr-30 flex">
            <div class="h-[450px] w-[250px]">
                <button onclick="CreateMegallo()" class=" active:scale-95 hover:scale-[1.01] hover:bg-[#4d6a56] bg-[#3D5444] px-4 py-1 rounded-[26px] text-white m-3">
                    <p class="text-[33px] font-[Museo]">Új megálló</p>
                </button>
                <div id="megallo_holder" class="   gap-[11px]   items-center h-[300px] w-[220px]  scrollable-container overflow-y-scroll  mb-4 overflow-x-hidden">
                   
                
                    </div>
            </div>
    
            <div class=" flex w-[425px] h-[80px]">
    
            <div class=" h-[400px] w-max">
                <input id="megallo_nev" type="text" maxlength="18" class="bg-[#3D5444] text-white p-2 rounded-[10px] m-3 outline-none font-medium text-[35px]">
                <div class="flex inline-flex items-center   ">
                    <input id="searchInput" placeholder="Keresés..." type="text"     maxlength="25" class="bg-[#3D5444] text-white p-2 rounded-[10px] m-3 outline-none font-medium text-[20px]">

                </div>

                    <div id="map"class="bg-cyan-500 w-[530px] h-[330px]"></div>

                

            </div>




           
           
            
        </div>
        <div class=" ml-[45px] h-[80px] w-[80px]  content-center  ">
            <button onclick="DeleteMegallo()" class="active:scale-95 hover:scale-[1.01] w-[50px] h-[50px] mt-[20px]" ><img   src="static/delete_white.png" ></button>
        </div>

        
        
    </div>
    </div>
    
    <div id="settings" class="hidden flex justify-center w-full h-max">



        <div class="bg-[#163020] w-[800px] rounded-[30px] h-[450px] ml-30 mr-30 flex">


        <div class="ml-[35px] w-[350px] h-[450px] flex items-start justify-center">

        <div class=" mt-[25px] flex flex-col  w-[350px]   ml-1 h-[250px] grid-flow-col grid-cols-1 ">
                   <div class="w-[350px]  flex">
                    <div class="rounded-[20px] flex bg-[#3D5444]   w-[150px] h-[50px] justify-center items-center">
                        <p class="text-[18px]  text-white font-[Museo]">Követő Kulcsok</p>
                    </div>
                    <div class="ml-1 w-[40px] hover:scale-1.01 active:scale-95  rounded-[13px] bg-[#3D5444] content-center flex">
                        <button onclick = "AddDriverKey()" class="h-max "><img class="ml-[6px] mt-[10px] w-[30px] h-[30px]" src="static/plus.png" ></button>
                    </div>
                    <div class="ml-1 w-[40px] hover:scale-1.01 active:scale-95  rounded-[13px] bg-[#3D5444] content-center flex">
                        <button onclick = "DeleteDriverKey()" class="h-max "><img class="ml-[6px] mt-[10px] w-[30px] h-[30px]" src="static/delete_white.png" ></button>

                    </div>
                    <div id="download" class="hidden ml-1 w-[40px] hover:scale-1.01 active:scale-95  rounded-[13px] bg-[#3D5444] content-center flex">
                        <button onclick = "Download()" class="h-max "><img class="ml-[6px] mt-[10px] w-[30px] h-[30px]" src="static/download2.png" ></button>

                    </div>
                    </div>
                    <div id="driver_key_holder" class=" bg-[#3D5444] rounded-[20px] mt-[5px] w-[235px] h-[300px] p-[3px] overflow-y-scroll overflow-x-hidden">
                     
                    <button id='busz"+i+"' onClick='LoadBusz("+i+")' class='inline border-solid  border-red  hover:scale-[1.05] w-[200px] h-[50px] flex items-center justify-start bg-[#798B7D]  m-[5px] rounded-[10px] text-white'><img class="w-[25px] h-[25px] ml-[5px] mr-[10px]" src="static/download2.png"><p class='text-[15px] font-[Museo]'>Kulcs#132</p></button>

                   
                      

                    </div>
                    

    
                </div>
                </div>

            </div>
    
           

    
              



           
           
            
        </div>
        
    </div>
    </div>



    <div id="buszok" class="hidden flex justify-center w-full h-max">
        <div class="bg-[#163020] w-[800px] rounded-[30px] h-max ml-30 mr-30 flex">
            <div class="h-[450px] w-[250px]">
                <button onclick="CreateBusz()" class=" border-solid border-1 w-[185px] border-cyan-900 active:scale-95 hover:scale-[1.01] hover:bg-[#4c6955] bg-[#3D5444] px-4 py-1 rounded-[26px] text-white m-3">
                    <p class="text-[33px] font-[Museo]">Új busz</p>
                </button>
                <div id="busz_holder" class=" gap-[11px]   items-center h-[300px] w-[220px]  scrollable-container overflow-y-scroll  mb-4 overflow-x-hidden ">
                   
                    </div>
            </div>
    
            <div class=" flex w-max h-80">
    
            <div class=" h-[400px] w-max">
                <input id="busz_nev" type="text" maxlength="18" class="bg-[#3D5444] text-white p-2 rounded-[10px] m-3 outline-none font-medium text-[35px]">

    
                        <div id="map_busz"class="bg-cyan-500 w-[500px] h-[330px]"></div>
    
                
                

            </div>
            </div>
            <div class="ml-[10ps] h-[80px] w-[80px]  content-center  ">
                <button onclick="DeleteBusz()" class="active:scale-95 hover:scale-[1.01] w-[50px] h-[50px] mt-[20px]" ><img   src="static/delete_white.png" ></button>
            </div>
         
        </div>
        </div>


    
    
    
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAPSJR3gOUrSEfOJPHXndxe58_MDMhVdnY&libraries=places&callback=initMap&loading=async"></script>
</body>
</html>