utvonalak = [];
megallok = [];
//Reference to the api folder
api = "../";
class Utvonal{
    constructor(name,id,megallok)
    {
        this.name = name;
        this.id = id;
        this.megallok = megallok;
    }
}

class Megallo{
    constructor(name,pos,id)
    {
        this.name =name;
        this.pos = pos;
        this.id = id;

    }
}
class Busz{
    constructor(name,id,prev_megallo,current_megallo,hely)
    {
        tihs.name = name;
        this.id = id;
        this.prev_megallo = prev_megallo;
        this.current_megallo = current_megallo;
        this.hely=hely;
    }
}

function UpdateMegalloList()
{
    console.log("Megallok Frissitve");
   
   
    fetch(api+'api/get_megallo_list.php')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result=>{
        var _megallok = [];
        for (var i = 0; i < result.length; i++) {
            var entry = result[i];
            var megallo = new Megallo(entry.nev,entry.hely,entry.id);
            _megallok.push(megallo);
            
        }
        megallok=_megallok;
        console.log("Mukodik a megallo:" + megallok[0].name);
        UpdateUtvonalList(_megallok);
        return _megallok;
    });

}

function UpdateUtvonalList(_megallok)
{
  
    fetch(api+'api/get_utvonal_list.php')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result=>{
        utvonalak = [];
        for (var i = 0; i < result.length; i++) {
            var entry = result[i];
            var utvonal = new Utvonal(entry.nev,entry.id, GetMegallokFromString(entry.megallok,_megallok));
            utvonalak.push(utvonal);
            
        }
        UpdateUtvonalUI(utvonalak)
    })
}


function GetMegallokFromString(data,m_list)
{
    if(data == "")return [];
    console.log("Data: " + data);
    console.log(m_list);
    var _megallok = [];
    var list = data.split("|");
        list.forEach(element =>{

            if(Number(element) == -1)
            {
                var new_megallo = new Megallo('-----','-1','-1');
                _megallok.push(new_megallo);
            }else if(element != "")
            {
                _megallok.push(GetMegalloFromID(m_list,element));
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

UpdateMegalloList();

