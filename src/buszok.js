var buszok=[];
var loaded_busz = -1;
class Busz
{
    constructor(id,name,utvonal,hely,prev_megallo,current_megallo)
    {
        this.id = id;
        this.utvonal = utvonal;
        this.name = name;
        this.hely = hely;
        this.prev_megallo = prev_megallo;
        this.current_megallo = current_megallo;
    }

}



function UpdateBuszLiszt()
{
   
    console.log("Updated List");
    var a = document.getElementById("busz_holder");
    var name = "";
    var button = "";
   
    fetch('api/get_busz_list.php')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result=>{
        a.innerHTML = "";
        var _buszok = [];
        for (var i = 0; i < result.length; i++) {
            var entry = result[i];
            var busz = new Busz(entry.id,entry.nev,entry.utvonal,entry.hely,entry.prev_megallo,entry.current_megallo);
            _buszok.push(busz);
            name = busz.name;
            var button = "<button id='busz"+i+"' onClick='LoadBusz("+i+")' class='inline border-solid  border-red  hover:scale-[1.05] w-[180px] h-[50px] bg-[#0628325a] px-4 py-1 m-[5px] rounded-[10px] text-white'><p class='text-[18px]'>"+ name + "</p></button>";

            a.innerHTML+=button;
           
            
        }
        buszok=_buszok;
        return _buszok;
        

    })

    //UpdateUtvonalList(megallok);


}


function LoadBusz(id)
{
    
    var input = clearEventListeners(document.getElementById("busz_nev"));
   
    if(loaded_busz != -1)
    {
        var prev_button =document.getElementById("busz" + loaded_busz.toString());
        prev_button.classList.remove("border-[3px]");
    
    }
    loaded_busz = id;

    var new_button = document.getElementById("busz" + loaded_busz.toString());
    new_button.classList.add("border-[3px]");

    

    input.addEventListener('blur', function()
    {
        UpdateBuszNev(id);
    });
   // {
    //    var pos = megallok[id].pos.split('|');
     //   LoadGrid(pos[0],pos[1],pos[2],pos[3]);
     var hely = GetHelyFromBusz(buszok[loaded_busz]);
     UpdateMapMarker(hely[0],hely[1]);
   // }
    input.value = buszok[id].name;
}
function DeleteBusz()
{
    if(loaded_busz == -1)return;

    var data = {
        id:buszok[loaded_busz].id
    }
    var formData = new URLSearchParams(data).toString();

// Make the fetch request
fetch('api/delete_busz.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData
})
.then(response => response.text())
.then(result => {

    // The request was successful, and the response is in the 'result' variable
    loaded_busz = -1;
    console.log(result);
    UpdateBuszLiszt();

})
.catch(error => {
    // Handle errors
    console.error('Error:', error);
});

}




function UpdateBuszNev(id)
{
    buszok[id].name = document.getElementById("busz_nev").value;
    var data = {
        nev:buszok[id].name,
        id:buszok[id].id
    }

    var formData = new URLSearchParams(data).toString();

    fetch('api/edit_busz.php',
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
    UpdateBuszLiszt();

})
.catch(error => {
    // Handle errors
    console.error('Error:', error);
});
}
function CreateBusz()
{
    var data = {
        nev:"busz#1",
        utvonal:"x",
        hely:"x",
        prev_megallo:"x",
        current_megallo:"x"
    }
    var formData = new URLSearchParams(data).toString();

// Make the fetch request
fetch('api/add_busz.php', {
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
    UpdateBuszLiszt();

})
.catch(error => {
    // Handle errors
    console.error('Error:', error);
});

}

function GetHelyFromBusz(_busz)
{
    var a = []
    console.log(_busz);

    if(_busz.hely == "" || _busz.hely == "x")
    {
        a[0] =null;
        a[1] =null;
        return a;
    }else
    {
        var  s = _busz.hely.split("|");
        return s;
    }
  
}