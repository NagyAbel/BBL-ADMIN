class Key{
    constructor(id,name,value,type)
    {
        this.id = id;
        this.name = name;
        this.value = value
        this.type = type;
    }
}
var selected_driver_key  = -1;
var kulcsok = []
function LoadDriverKeys()
{
    selected_driver_key = -1;
    console.log("Updated List");
    var a = document.getElementById("driver_key_holder");
    var name = "";
    var button = "";
    a.innerHTML = "";

    fetch('api/get_driver_keys.php')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result=>{
        a.innerHTML = "";
        var _kulcsok = [];
        for (var i = 0; i < result.length; i++) {
            var entry = result[i];
            var kulcs = new Key(entry.id,entry.nev,entry.kulcs,entry.tipus);
            _kulcsok.push(kulcs);
            name = kulcs.name;
            var button = "<button id='d_key"+i+"' onClick='SelectDriverKey("+i+")' class='inline border-solid  border-red  hover:scale-[1.05] w-[200px] h-[50px] flex items-center justify-start bg-[#798B7D]  m-[5px] rounded-[10px] text-white'><img class='w-[20px] h-[20px] ml-[5px] mr-[10px]' src='static/key.png'><p class='text-[15px] font-[Museo]'>"+ name+"</p></button>";

            a.innerHTML+=button;
           
            
        }
        kulcsok=_kulcsok;
        return _kulcsok;
        

    })
}
LoadDriverKeys();
function AddDriverKey()
{
    var data = {
        name:  GetRandomKeyName(6)+kulcsok.length.toString()
    }
    console.log(data.name);
    var formData = new URLSearchParams(data).toString();

    fetch('api/add_driver_key.php',{
        method: 'POST',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        },
        body:formData
    })
    .then(response =>{
        console.log(response.text);
    })
    .then(result =>
    {
        console.log(result);
        LoadDriverKeys();
    })
}

function SelectDriverKey(id)
{
    
    if(selected_driver_key != -1)
    {
        var a  = document.getElementById("d_key"+selected_driver_key.toString())
        a.classList.remove("border-[3px]");
    }

        var a = document.getElementById("download");
        a.classList.remove("hidden");
        var button = document.getElementById("d_key"+id,toString());
        button.classList.add("border-[3px]");
        selected_driver_key = id;
   

}

function GetRandomKeyName(length)
{
    return [...Array(length)].map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('');

}

function DeleteDriverKey()
{
    var id= selected_driver_key;
    if(id == -1)return;
    var data = {
        id:  kulcsok[id].id
    }
    var formData = new URLSearchParams(data).toString();

    fetch('api/delete_driver_key.php',{
        method: 'POST',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        },
        body:formData
    })
    .then(response =>{
        console.log(response.text);
    })
    .then(result =>
    {
        console.log(result);
        LoadDriverKeys();
    })
}

function Download()
{
    var id = selected_driver_key;
    if(id == -1)return;
    const filename = kulcsok[id].name;
   const blob = new Blob([kulcsok[id].value],{type:'text/plain'});
   const url = URL.createObjectURL(blob);
   const link = document.createElement('a');
   link.href = url;
   link.download = filename;
   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
   URL.revokeObjectURL(url);
}