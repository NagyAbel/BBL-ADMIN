
let markers =[];
var map_ready = false;
function initMap() {
    _map = new google.maps.Map(document.getElementById('map_holder'), {
        center: { lat: 45.7489, lng: 21.2087 }, // Timisoara, Romania
        zoom: 12
    });
    map_ready = true;
   
};

var map_enabled = true;
function ToggleMap(force=false)
{
    if(!map_ready)return;
    
    var map_holder = document.getElementById("map_holder");
    var megallo_holder = document.getElementById("megallo_holder");
    map_enabled = !map_enabled;

    if(force){
        map_holder.classList.toggle("hidden",true);
        megallo_holder.classList.toggle("hidden",false);
        map_enabled =true;
        ClearMarkers();

    }else
    {
        map_holder.classList.toggle("hidden",map_enabled);
        megallo_holder.classList.toggle("hidden",!map_enabled);

    }
    
    

}


function PlaceMarker(busz)
{
    if(!map_ready)return;

    var a = GetHelyFromBusz(busz);
    if(a[0] == null)return;

    var coordinates = { lat: parseFloat(a[0]), lng: parseFloat(a[1]) }; // Example: New York City coordinates
   var  marker = new google.maps.Marker({
            position:coordinates,
            map:_map
    });
    markers.push(marker);
    _map.setCenter(marker.getPosition());
}

function GetHelyFromBusz(_busz)
{
    var a = []

    if(_busz == "" || _busz == "x")
    {
        a[0] =null;
        a[1] =null;
        return a;
    }else
    {
        var  s = _busz.split("|");
        return s;
    }
  
}

function ClearMarkers()
{
    markers.forEach(element => {
       if(element !=null)
       {
        element.setMap(null);
       } 
    });
    markers = [];
}
