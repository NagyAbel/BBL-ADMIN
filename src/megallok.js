var panels=[
    document.getElementById("utvonalak"),
    document.getElementById("megallok"),
    document.getElementById("settings")

]
panels[0].classList.toggle("hidden",false);


function Utvonalak()
{
    panels[0].classList.toggle("hidden",false);
    panels[1].classList.toggle("hidden",true);
    panels[2].classList.toggle("hidden",true);
}
function Megallok()
{
    panels[0].classList.toggle("hidden",true);
    panels[1].classList.toggle("hidden",false);
    panels[2].classList.toggle("hidden",true);
}

function Settings()
{
    panels[0].classList.toggle("hidden",true);
    panels[1].classList.toggle("hidden",true);
    panels[2].classList.toggle("hidden",false);
}

Utvonalak();

var megallok=[];
var megallo_buttons = [];
class Megallo{
    constructor(name,pos,id)
    {
        this.name =name;
        this.pos = pos;
        this.id = id;

    }
}



var loaded_id = -1;






function UpdateMegalloList()
{
    console.log("Updated List");
    var a = document.getElementById("megallo_holder");
    var name = "";
    var button = "<button class='hover:scale-[1.05] scroll-ml-6 snap-start bg-[#0628325a] px-4 py-1  rounded-[10px] text-white m-3'><p class='text-[35px]'>"+ name + "</p></button>";
   
    fetch('api/get_megallo_list.php')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result=>{
        a.innerHTML = "";
        megallok = [];
        for (var i = 0; i < result.length; i++) {
            var entry = result[i];
            var megallo = new Megallo(entry.nev,entry.hely,entry.id);
            megallok.push(megallo);
            name = megallo.name;
            var button = "<button id='"+i+"' onClick='LoadMegallo("+i+")' class='inline border-solid  border-red  hover:scale-[1.05] w-[180px] h-[50px] bg-[#0628325a] px-4 py-1 m-[5px] rounded-[10px] text-white'><p class='text-[18px]'>"+ name + "</p></button>";

            a.innerHTML+=button;
           // a.innerHTML+="</br> ";
            
        }
    })


 
    
}

function UpdatePosition(lat1,lng1,lat2,lng2)
{

    if(loaded_id == -1)return;
    id = loaded_id;
    
    megallok[id].pos =lat1+ "|" + lng1 + "|" + lat2 + "|" + lng2;
    console.log(megallok[id].pos);
    var data = {
        nev:megallok[id].name,
        hely:megallok[id].pos,
        id:megallok[id].id
    }
    var formData = new URLSearchParams(data).toString();

    fetch('api/edit_megallo.php',
    {
        method: 'POST',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        },
        body:formData
    })
    .then(response => response.text())
.then(result => {
    // The request was successful, and the response is in the 'result' variable
    console.log(result);

    
})
}
//Updates the name of the megallo

function UpdateMegalloNev(id)
{
    megallok[id].name = document.getElementById("megallo_nev").value;
    console.log("Stopped editing"+megallok[id].name);
    var data = {
        nev:megallok[id].name,
        hely:megallok[id].pos,
        id:megallok[id].id
    }
    var formData = new URLSearchParams(data).toString();

    fetch('api/edit_megallo.php',
    {
        method: 'POST',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        },
        body:formData
    })
    .then(response => response.text())
.then(result => {
    // The request was successful, and the response is in the 'result' variable
    console.log(result);
    UpdateMegalloList();

})
.catch(error => {
    // Handle errors
    console.error('Error:', error);
});

}
function clearEventListeners(element) {
    const newElement = element.cloneNode(true);
    element.parentNode.replaceChild(newElement, element);
    return newElement;
}
function LoadMegallo(id)
{
    
    var input = clearEventListeners(document.getElementById("megallo_nev"));
   
    if(loaded_id != -1)
    {
        var prev_button =document.getElementById(loaded_id.toString());
        prev_button.classList.remove("border-[3px]");
    
    }
    loaded_id = id;

    var new_button = document.getElementById(loaded_id.toString());
    new_button.classList.add("border-[3px]");

    

    input.addEventListener('blur', function()
    {
        UpdateMegalloNev(id);
    });
    console.log("Loaded megallo: " + megallok[id].pos);
    if(megallok[id].pos != "x")
    {
        var pos = megallok[id].pos.split('|');
        LoadGrid(pos[0],pos[1],pos[2],pos[3]);
    }
    input.value = megallok[id].name;
}
function CreateMegallo()
{
    var data = {
        nev:"megallo#1",
        hely:"x" 
    }
    var formData = new URLSearchParams(data).toString();

// Make the fetch request
fetch('api/add_megallo.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData
})
.then(response => response.text())
.then(result => {
    // The request was successful, and the response is in the 'result' variable
    console.log(result);
    UpdateMegalloList();

})
.catch(error => {
    // Handle errors
    console.error('Error:', error);
});

}

function DeleteMegallo()
{
    if(loaded_id == -1)return;

    var data = {
        id:megallok[loaded_id].id
    }
    var formData = new URLSearchParams(data).toString();

// Make the fetch request
fetch('api/delete_megallo.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData
})
.then(response => response.text())
.then(result => {

    // The request was successful, and the response is in the 'result' variable
    loaded_id = -1;
    console.log(result);
    UpdateMegalloList();

})
.catch(error => {
    // Handle errors
    console.error('Error:', error);
});

}

//Returns an array of type Megallo from a given ID's
function GetMegallokFromString(data)
{
    
    if(data == "")return [];
    UpdateMegalloList();

    var _megallok = [];
    var list = data.split("|");
    megallok.forEach(element => {
        
        var index = list.indexOf(element.id.toString());
        if(index != -1)
        {
            _megallok[index]=element;
        }
    });

    return _megallok;
}
//Returns a string of ids from a given array of type Megallo
function GetStringFromMegallo(data)
{
    var s = "";

    data.forEach(element=>{
        s+=element.id.toString()+"|";
    });

    return s;
}
UpdateMegalloList();
UpdateUtvonalList();