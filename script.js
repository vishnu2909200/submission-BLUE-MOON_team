var map;
var marker;
var locations = [];

function initMap() {
  var initialLocation = {lat: -34.397, lng: 150.644}; // Initial location (for example purposes)

  map = new google.maps.Map(document.getElementById('map'), {
    center: initialLocation,
    zoom: 8
  });

  // Add an event listener to the map
  map.addListener('click', function(event) {
    updateMarker(event.latLng);
    showAddLocationForm(event.latLng);
  });

}


function updateMarker(location) {
    // Remove previous marker (if any)
    if (marker) {
      marker.setMap(null);
    }
  
    // Add a new marker at the clicked location
    marker = new google.maps.Marker({
      position: location,
      map: map
    });
  
  
    // Display the coordinates in the designated div
  var coordinatesDiv = document.getElementById('coordinates');
  coordinatesDiv.innerHTML = 'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng();
  
  
  }
  
  
  
    function showInfoWindow(location) {
      var infoWindow = new google.maps.InfoWindow({
        content: '<div><button onclick="addLocation()">Add Location</button></div>',
        position: location
      });
    
      infoWindow.open(map); 
  
    }
    
    function addLocation(location, name, description) {
      var marker = new google.maps.Marker({
        position: location,
        map: map,
        title: name
      });
    
      var infowindow = new google.maps.InfoWindow({
        content: `<strong>${name}</strong><br>${description}`
      });
    
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    
      locations.push({
        name: name,
        description: description,
        marker: marker
      });
    }
  
    
    function showAddLocationForm(location) {
      var sidebar = document.getElementById('sidebar');
      sidebar.style.display = 'block';
    
      var locationForm = document.getElementById('locationForm');
      locationForm.onsubmit = function(event) {
        event.preventDefault();
    
        var locationName = document.getElementById('locationName').value;
        var locationDescription = document.getElementById('locationDescription').value;
    
        addLocation(location, locationName, locationDescription);
    
        sidebar.style.display = 'none';
        locationForm.reset();
      }
    }