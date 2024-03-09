var map;
var rectangle;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
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
}


function searchLocation() {
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
    console.log(lat1 + " " + lng1 + " " + lat2 + " " + lng2);

    // Set new bounds for the rectangle
    rectangle.setBounds(newBounds);   
}

