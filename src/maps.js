var map;
var rectangle;
var marker = null;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 45.7489, lng: 21.2087 }, // Timisoara, Romania
        zoom: 12
    });
    _map = new google.maps.Map(document.getElementById('map_busz'), {
        
      center: { lat: 45.7489, lng: 21.2087 }, // Timisoara, Romania
      zoom: 12
  });

    rectangle = new google.maps.Rectangle({
        map: map,
        bounds: {
            north: 45.7590,
            south: 45.7388,
            east: 21.2225,
            west: 21.1950
        },
        editable: true
    });

    google.maps.event.addListener(rectangle, 'bounds_changed', function() {
        var bounds = rectangle.getBounds();
        var ne = bounds.getNorthEast();
        var sw = bounds.getSouthWest();
        updateOutput(ne.lat(), ne.lng(), sw.lat(), sw.lng());
    });


const input = document.getElementById("searchInput");
  const searchBox = new google.maps.places.SearchBox(input);

 
 map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        return;
      }

      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

 
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  
});
};
function searchLocabction() {
    var address = document.getElementById('searchInput').value;
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            map.setZoom(14);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}


function updateOutput(lat1, lng1, lat2, lng2) {
      UpdatePosition(lat1,lat2,lng1,lng2);  
}

function LoadGrid(lat1,lng1,lat2,lng2)
{
    var newBounds = {
        north: parseFloat(lat1),
        south: parseFloat(lng1),
        east: parseFloat(lat2),
        west: parseFloat(lng2)
    };


    // Set new bounds for the rectangle
    rectangle.setBounds(newBounds);  
    
    map.fitBounds(newBounds);
 
    
   
}

function UpdateMapMarker(lat,lng)
{
  if(lat == null)return;
    if(marker != null)
    {
        marker.setMap(null);

    }

    var coordinates = { lat: parseFloat(lat), lng: parseFloat(lng) }; // Example: New York City coordinates
    marker = new google.maps.Marker({
            position:coordinates,
            map:_map
    });
    _map.setCenter(marker.getPosition());
}
