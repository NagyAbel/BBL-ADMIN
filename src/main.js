var panels=[
    document.getElementById("utvonalak"),
    document.getElementById("megallok"),
    document.getElementById("settings"),
    document.getElementById("buszok")

]
panels[0].classList.toggle("hidden",false);


function Utvonalak()
{
    panels[0].classList.toggle("hidden",false);
    panels[1].classList.toggle("hidden",true);
    panels[2].classList.toggle("hidden",true);
    panels[3].classList.toggle("hidden",true);
}
function Megallok()
{
    panels[0].classList.toggle("hidden",true);
    panels[1].classList.toggle("hidden",false);
    panels[2].classList.toggle("hidden",true);
    panels[3].classList.toggle("hidden",true);

}

function Settings()
{
    panels[0].classList.toggle("hidden",true);
    panels[1].classList.toggle("hidden",true);
    panels[2].classList.toggle("hidden",false);
    panels[3].classList.toggle("hidden",true);

}

function Buszok()
{
    panels[0].classList.toggle("hidden",true);
    panels[1].classList.toggle("hidden",true);
    panels[2].classList.toggle("hidden",true);
    panels[3].classList.toggle("hidden",false);

}

function UpdateALL()
{
UpdateMegalloList(true);
UpdateBuszLiszt();

}
UpdateALL();
Utvonalak()
