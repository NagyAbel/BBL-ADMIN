class megallo_ui{
    constructor(dot,line,id)
    {
        this.dot =dot;
        this.line = line;
        this.id = id;

    }
}
var normal_color = "#B6C4B6";
var active_color= "#46FFF4";

megallo_ui_list = [];
function DeselectUtvonal()
{
    loaded_utvonal  = -1;
        ToggleMap(true);
    
    var main = document.getElementById("MAIN");
    var megallo_site = document.getElementById("MEGALLO");
    main.classList.toggle("hidden",false);
    megallo_site.classList.toggle("hidden",true)
}

function LoadMegallok(_utvonal,_colors)
{
    var holder  = document.getElementById("megallo_holder");
    holder.innerHTML = "";
    var count = 0;
    _utvonal.megallok.forEach(element => {
        var name = element.name;
        var id = element.id;
        //46FFF4
        count++;
        var colors = GetColorFromID(_colors,element.id);

        var color = colors.dot;
        var line_color =colors.line;
        var dot = "<button  class='ml-[15px] mr-[15px]  flex-shrink-0 flex  w-95 h-[150px] bg-[#798B7D] rounded-[45px]'><div class='w-[140px] h-full flex justify-center items-center '><div class='w-[70px] h-[70px] rounded-full bg-["+color+"]'></div></div><div class='w-full h-full flex justify-start items-center'><p class='text-white font-[Museo] text-[40px]'>"+name+"</p></div></button> ";
        var line = " <div class='flex-shrink-0  w-full h-[80px] '><div class='ml-[63px] w-[20px] h-full bg-["+line_color+"]'></div></div>"
        holder.innerHTML+=dot;
        if(count != _utvonal.megallok.length)
        {
            holder.innerHTML+=line;

        }
    });
}


function GetMegalloColors(_utvonal_id)
{
    var data = {
        utvonal_id:utvonalak[_utvonal_id].id
    }
    var formData = new URLSearchParams(data).toString();

    fetch(api+'api/get_busz_by_utvonal.php',
    {
        method: 'POST',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        },
        body:formData

    })

    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result=>{
        var megalloColors = [];
        ClearMarkers();
        for (var i = 0; i < result.length; i++) {

            var entry = result[i];
            PlaceMarker(entry.hely);

           if(entry.current_megallo != "-1" && entry.current_megallo != "" && entry.current_megallo != "x")
           {
                megallo = new megallo_ui(active_color,normal_color,entry.current_megallo);
           }else if(entry.prev_megallo !="-1" && entry.prev_megallo !="" && entry.prev_megallo != "x" )
           {
                megallo = new megallo_ui(normal_color,active_color,entry.prev_megallo);
           }
           megalloColors.push(megallo);
            
        }

        LoadMegallok(utvonalak[_utvonal_id],megalloColors);
        
        return megalloColors;
    });
}

function GetColorFromID(color_list,id)
{
    var a = null;
    
    color_list.forEach(element => {
        if(element.id==id && element.id != "-1")
        {
            a =  element;
            
        }
    });

    if(a == null){
        a = new megallo_ui(normal_color,normal_color,id);
    }

    return a;
}


function RefreshMegallok()
{
    if(loaded_utvonal != -1)
    {
        GetMegalloColors(loaded_utvonal);
    }
}



