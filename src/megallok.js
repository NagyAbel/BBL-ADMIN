
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






function UpdateMegalloList(force=true)
{
    
    var a = document.getElementById("megallo_holder");
    var b = document.getElementById("megallo_holder_utvonal");
    var name = "";
    var button = "<button class='hover:scale-[1.05] scroll-ml-6 snap-start bg-[#798B7D] px-4 py-1  rounded-[10px] text-white m-3'><p class='text-[35px] font-[Museo]'>"+ name + "</p></button>";
   
    fetch('api/get_megallo_list.php')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result=>{
        a.innerHTML = "";
        b.innerHTML = "";
        var _megallok = [];
        for (var i = 0; i < result.length; i++) {
            var entry = result[i];
            var megallo = new Megallo(entry.nev,entry.hely,entry.id);
            _megallok.push(megallo);
            name = megallo.name;
            var button = "<button id='"+i+"' onClick='LoadMegallo("+i+")' class='inline border-solid  border-red  hover:scale-[1.05] w-[180px] h-[50px] bg-[#798B7D] px-4 py-1 m-[5px] rounded-[10px] text-white'><p class='text-[15px] font-[Museo]'>"+ name + "</p></button>";
            var button2 = "<button id='"+i+"|2' onClick='SelectMegalloForSwap("+i+",2"+")' class='inline border-solid  border-red  hover:scale-[1.05] w-[180px] h-[50px] bg-[#798B7D] px-4 py-1 m-[5px] rounded-[10px] text-white'><p class='text-[15px] font-[Museo]'>"+ name + "</p></button>";

            a.innerHTML+=button;
            b.innerHTML+=button2;
           // a.innerHTML+="</br> ";
            
        }
        megallok=_megallok;
        UpdateUtvonalList(_megallok);
        return _megallok;
        

    })

    //UpdateUtvonalList(megallok);bg


}

function UpdatePosition(lat1,lng1,lat2,lng2)
{

    if(loaded_id == -1)return;
    id = loaded_id;
    
    megallok[id].pos =lat1+ "|" + lng1 + "|" + lat2 + "|" + lng2;
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

    
})
}
//Updates the name of the megallo

function UpdateMegalloNev(id)
{
    megallok[id].name = document.getElementById("megallo_nev").value;
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
    UpdateMegalloList();
    UpdateMegalloFromUtvonal(-1);

})
.catch(error => {
    // Handle errors
    console.error('Error:', error);
});

}

//Returns an array of type Megallo from a given ID's
function GetMegallokFromString(data,m_list)
{
    
    if(data == "")return [];
   // var m = UpdateMegalloList();
   //var m = UpdateMegalloList();
    var _megallok = [];
    var list = data.split("|");
   

    
        list.forEach(element =>{

            if(Number(element) == -1)
            {
                var new_megallo = new Megallo('-----','-1','-1');
                _megallok.push(new_megallo);
            }else if(element != "")
            {
                var _megallo = GetMegalloFromID(m_list,element);
                if(_megallo != null)
                {
                    _megallok.push(_megallo);

                }
            }
        })
    



   

    return _megallok;
}

function GetMegalloFromID(_megallok,id)
{
    var a = null;
    _megallok.forEach(element =>{
        if(element.id ==id)
        {
             a=element;
            
        }
    })

    return a;
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

