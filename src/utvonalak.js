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

function UpdateUtvonalList(_megallok)
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
       // console.log("UPDATE MEGALLOK: "+ _megallok[0].name);
        a.innerHTML = "";
        utvonalak = [];
        console.log(_megallok + "   :MEGALLOK");
        for (var i = 0; i < result.length; i++) {
            var entry = result[i];
            var utvonal = new Utvonal(entry.nev,entry.id, GetMegallokFromString(entry.megallok,_megallok));
            utvonalak.push(utvonal);
            console.log(utvonal);
            name = utvonal.name;
            var button = "<button  id='utvonal_"+i+"'onClick='LoadUtvonal("+i+")' class='inline  hover:scale-[1.05] w-[190px] h-[50px] bg-[#798B7D] px-4 py-1 m-[5px] rounded-[10px] text-white'><p class='text-[15px] font-[Museo]'>"+ name + "</p></button>";
            
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
        UpdateUtvonalList(megallok);
    
    })
    .catch(error => {
        // Handle errors
        console.error('Error:', error);
    });
}


function AddNewMegalloToUtvonal()
{
    console.log(loaded_utvonal);
    if(loaded_utvonal==-1)return;
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
    //.then(response => response.text())
.then(result => {
    // The request was successful, and the response is in the 'result' variable
    console.log("Jej sikerult:" + result);
    UpdateMegalloList(false);

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
    
    }else
    {
        input.value = "";


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


    if(loaded_megallo_1 != -1 && loaded_megallo_2 != -1)
    {
        var  a = document.getElementById("swap_button");
        a.classList.toggle("hidden",false);
    }else
    {
        var  a = document.getElementById("swap_button");
        a.classList.toggle("hidden",true);
    }

    
}

function SwapMegallo()
{
    if(loaded_utvonal==-1)return;
    if(loaded_megallo_1 == -1)return;
    if(loaded_megallo_2 == -2) return;

    var id  = utvonalak[loaded_utvonal].id

    //var new_megallo = new Megallo('-----','-1','-1');
    utvonalak[loaded_utvonal].megallok[loaded_megallo_1.split("|")[0]]=megallok[loaded_megallo_2.split("|")[0]];
    var d  = GetStringFromMegallo(utvonalak[loaded_utvonal].megallok);
    utvonalak
    var data = {
        id:id,
        megallok:d
    }
    
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
    var  a = document.getElementById("swap_button");
    a.classList.toggle("hidden",true);

    // The request was successful, and the response is in the 'result' variable
    //UpdateMegalloList();
    UpdateMegalloFromUtvonal(loaded_utvonal);

})
.catch(error => {
    // Handle errors
    console.error('Error:', error);
});  
}

function UpdateMegalloFromUtvonal(id)
{
    var  a = document.getElementById("swap_button");
    a.classList.toggle("hidden",true);

    console.log("updated");
    var holder = document.getElementById("utvonal_megallo_holder");
    var button = "";
    if(id == -1)
    {
        holder.innerHTML = "";
        return;
    }
    holder.innerHTML = "";
    loaded_megallo_1  = -1;
    loaded_megallo_2 = -1;
    var index = 0;
    utvonalak[id].megallok.forEach(element => {
     button = "<button id='"+index+"|1' onClick='SelectMegalloForSwap("+index+",1"+")' class='inline border-solid  border-red  hover:scale-[1.05] w-[180px] h-[50px] bg-[#798B7D] px-4 py-1 ml-3 mt-2 rounded-[10px] text-white'><p class='text-[15px] font-[Museo]'>"+ element.name + "</p></button>";
        holder.innerHTML+=button;
        index++;
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
    UpdateUtvonalList(megallok);

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
    UpdateMegalloList();
    //UpdateUtvonalList(megallok);

})
.catch(error => {
    // Handle errors
    console.error('Error:', error);
});

}

function DeleteMegalloFromUtvonal()
{
    if(loaded_utvonal==-1)return;
    console.log(loaded_megallo_1);
    if(loaded_megallo_1 == -1)return;

    var id  = utvonalak[loaded_utvonal].id

    //var new_megallo = new Megallo('-----','-1','-1');
    utvonalak[loaded_utvonal].megallok.splice(loaded_megallo_1.split("|")[0],1);
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
    UpdateMegalloList();

    UpdateMegalloFromUtvonal(loaded_utvonal);

})
.catch(error => {
    // Handle errors
    console.error('Error:', error);
});

}