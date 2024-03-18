var utvonalak = [];
var loaded_utvonal  = -1;
class Utvonal{
    constructor(name,id,megallok)
    {
        this.name = name;
        this.id = id;
        this.megallok = megallok;
    }
}

function UpdateUtvonalList()
{
    var a = document.getElementById("utvonal_holder");
    var name = "";
    var button = "";
    fetch('api/get_utvonal_list.php')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result=>{
        a.innerHTML = "";
        utvonalak = [];
        for (var i = 0; i < result.length; i++) {
            var entry = result[i];
            var utvonal = new Utvonal(entry.nev,entry.id, GetMegallokFromString(entry.megallok));
            utvonalak.push(utvonal);
            console.log(utvonal);
            name = utvonal.name;
            var button = "<button  id='utvonal_"+i+"'onClick='LoadUtvonal("+i+")' class='inline  hover:scale-[1.05] w-[180px] h-[50px] bg-[#0628325a] px-4 py-1 m-[5px] rounded-[10px] text-white'><p class='text-[18px]'>"+ name + "</p></button>";
            
            a.innerHTML+=button;
           // a.innerHTML+="</br> ";
            
        }
    })

}


function CreateUtvonal()
{
    var data = {
        nev:"utvonal#",
        megallok:"",
        indulasi_ido:"09:39:28"
    }
    var formData = new URLSearchParams(data).toString();

    fetch('api/add_utvonal.php', {
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
        UpdateUtvonalList();
    
    })
    .catch(error => {
        // Handle errors
        console.error('Error:', error);
    });
}


function AddNewMegalloToUtvonal()
{
    console.log(loaded_utvonal);
    if(loaded_utvonal=-1)return;
    var id  = utvonalak[loaded_utvonal].id

    var new_megallo = new Megallo('-----','-1','-1');
    utvonalak[loaded_utvonal].megallok.push(new_megallo);
    var d  = GetStringFromMegallo(utvonalak[loaded_utvonal].megallok);
    utvonalak
    var data = {
        id:id,
        megallok:d
    }
    console.log("Clicked");
    
    var formData = new URLSearchParams(data).toString();

    fetch('api/update_megallo_list.php',
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
    console.log("Jej sikerult:" + result);
    UpdateMegalloFromUtvonal(loaded_utvonal);

})
.catch(error => {
    // Handle errors
    console.error('Error:', error);
});



}

function LoadUtvonal(id)
{
    var input =clearEventListeners(document.getElementById("utvonal_nev"));
    if(loaded_utvonal != -1)
    {
        var prev_button =document.getElementById("utvonal_"+loaded_utvonal.toString());
        prev_button.classList.remove("border-[3px]");
    
    }
    loaded_utvonal = id;

    var new_button = document.getElementById("utvonal_"+loaded_utvonal.toString());
    new_button.classList.add("border-[3px]");

    loaded_utvonal = id;
    input.addEventListener('blur', function()
    {
        UpdateUtvonalNev(id);
    });
    console.log("Load utvonal: "+ loaded_utvonal);
    input.value = utvonalak[id].name;
    UpdateMegalloFromUtvonal(id);
    

}
var loaded_megallo_1 = -1;
var loaded_megallo_2 = -1;
function SelectMegalloForSwap(id,type)
{

    if(type==1 && loaded_megallo_1 == -1)
    {
        loaded_megallo_1 = id+"|" + type;
        document.getElementById(loaded_megallo_1).classList.add("border-[3px]");
    } else if(type==2 && loaded_megallo_2 == -1)
    {
        loaded_megallo_2 = id + "|" + type;
        document.getElementById(loaded_megallo_2).classList.add("border-[3px]");

    }else if(loaded_megallo_1==id+"|"+type)
    {
        loaded_megallo_1 = -1;
        document.getElementById(id+"|"+type).classList.remove("border-[3px]");

    }else if(loaded_megallo_2==id+"|"+type)
    {
        loaded_megallo_2 = -1;
        document.getElementById(id+"|"+type).classList.remove("border-[3px]");

    }else if(type=="1")
    {
        document.getElementById(loaded_megallo_1).classList.remove("border-[3px]");
        loaded_megallo_1=id+"|"+type;
        document.getElementById(loaded_megallo_1).classList.add("border-[3px]");

    }else
    {
        document.getElementById(loaded_megallo_2).classList.remove("border-[3px]");
        loaded_megallo_2 = id+"|" + type;
        document.getElementById(loaded_megallo_2).classList.add("border-[3px]");

    }

    
}

function UpdateMegalloFromUtvonal(id)
{
    console.log("updated");
    var holder = document.getElementById("utvonal_megallo_holder");
    var button = "";
    holder.innerHTML = "";
    loaded_megallo_1  = -1;
    loaded_megallo_2 = -1;

    utvonalak[id].megallok.forEach(element => {
        var index = utvonalak[id].megallok.indexOf(element);
     button = "<button id='"+index+"|1' onClick='SelectMegalloForSwap("+index+",1"+")' class='inline border-solid  border-red  hover:scale-[1.05] w-[180px] h-[50px] bg-[#9fc0cb5a] px-4 py-1 ml-3 mt-2 rounded-[10px] text-white'><p class='text-[18px]'>"+ element.name + "</p></button>";
        holder.innerHTML+=button;
    });
}
function UpdateUtvonalNev(id)
{
    utvonalak[id].name = document.getElementById("utvonal_nev").value;
    var data = {
        nev:utvonalak[id].name,
        megallok:GetStringFromMegallo(utvonalak[id].megallok),
        indulasi_ido:"03.03.03",
        id:utvonalak[id].id
    }

    var formData = new URLSearchParams(data).toString();

    fetch('api/edit_utvonal.php',
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
    UpdateUtvonalList();

})
.catch(error => {
    // Handle errors
    console.error('Error:', error);
});
}

function DeleteUtvonal()
{
    if(loaded_utvonal == -1)return;

    var data = {
        id:utvonalak[loaded_utvonal].id
    }
    var formData = new URLSearchParams(data).toString();

// Make the fetch request
fetch('api/delete_utvonal.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData
})
.then(response => response.text())
.then(result => {

    // The request was successful, and the response is in the 'result' variable
    loaded_utvonal = -1;
    console.log(result);
    UpdateUtvonalList();

})
.catch(error => {
    // Handle errors
    console.error('Error:', error);
});

}