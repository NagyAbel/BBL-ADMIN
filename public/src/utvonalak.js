
loaded_utvonal = -1;
function UpdateUtvonalUI(utvonalak)
{
    var holder = document.getElementById("utvonal_holder");
    var button = "";
    holder.innerHTML = "";
    var id = 0;
    utvonalak.forEach(element => {
        var name = element.name;
        button = "<button onClick=LoadUtvonal("+id+") class='ml-[15px] mr-[15px] active:scale-95 hover:scale-[1.01] flex-shrink-0  inline mb-[25px] w-90% h-[150px] bg-[#798B7D] rounded-[10px]'><p class='text-white font-[Museo] text-[40px]'>"+name+"</p></button>";
        id++;

        holder.innerHTML+=button;
    });
}

function LoadUtvonal(id)
{
    loaded_utvonal = id;
    var main = document.getElementById("MAIN");
    var megallo_site = document.getElementById("MEGALLO");
    main.classList.toggle("hidden",true);
    megallo_site.classList.toggle("hidden",false)
    var name = document.getElementById("utvonal_nev");
    name.innerText = utvonalak[id].name;
    GetMegalloColors(id);
}