var order = [1, 2, 3, 4]
var latitude1;
var longitude1;
var ticketsLink;
var concertName;
var concertVenue;
var concertCity;
var concertName;
var marker;

var apikey = "aGCZcahc2U4ciJp31qvGwHVQ6PrHkZ2U";
var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=cardib&apikey=" + apikey;

// submit button functions
$(".search-bar-form").on("submit", function () {
  event.preventDefault();

  $(".search-row").animate({ marginTop: '0%' }, 250);


  $(".left-div").html('');
  $(".right-div").html('');

  var eventInput = $("#textarea1").val();
  // console.log(eventInput);
  // making the url 
  var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + eventInput + "&apikey=" + apikey;


  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    // console log for the artist that the user searches for 
    // console.log(response);               

    // as long as the user searches an artist that exists with events this will execute
    var eventsTotal = response._embedded.events;
    // console.log(eventsTotal);
    // for loop will create as many divs as there are events, so need to figure out how to limit number of divs 
    for (var i = 0; i < eventsTotal.length; i++) {
      // console log the event 
      // console.log(response._embedded.events[i]);

      // there should always be a name,venue and local date for each event so we can go ahead and append those to the new div
      var eventName = response._embedded.events[i].name;
      var eventVenue = response._embedded.events[i]._embedded.venues[0].name;
      var eventDate = response._embedded.events[i].dates.start.localDate;
      var latitude = response._embedded.events[i]._embedded.venues[0].location.latitude;
      var longitude = response._embedded.events[i]._embedded.venues[0].location.longitude;
      var tickets = response._embedded.events[i].url;
      var eventCity = response._embedded.events[i]._embedded.venues[0].city.name;
      var eventCountry = response._embedded.events[i]._embedded.venues[0].country.countryCode;

      // Making variables that create divs and ps
      var buttonDiv = $("<div>");
      buttonDiv.attr("class", "col s8 offset-s2 Btn" + order[i]);
      buttonDiv.attr("data-lat", latitude);
      buttonDiv.attr("data-long", longitude);
      buttonDiv.attr("data-tickets", tickets);
      buttonDiv.attr("data-city", eventCity + ", " + eventCountry);
      buttonDiv.attr("data-date", eventDate);

      var row1 = $("<div>");
      row1.attr("class", "row row1");
      var row2 = $("<div>");
      row2.attr("class", "row row2");
      var pName = $("<p>");
      pName.attr("class", "p-name p-main col s12");
      pName.text(eventName);
      var pDate = $("<p>");
      pDate.attr("class", "p-date p-sub col s6");
      pDate.text("Date: " + eventDate);
      var pLocation = $("<p>");
      pLocation.attr("class", "p-location p-sub col s6");
      pLocation.text(eventVenue);

      row1.append(pName);
      buttonDiv.append(row1);
      row2.append(pDate, pLocation);
      buttonDiv.append(row2);
      // the price range seems to not always exist so we will check to see if it is in the object before appending it

      // var priceExist = response._embedded.events[i].priceRanges;            

      // // if statements for if price range isnt there
      // if (priceExist === undefined) {
      //    console.log("No price range");
      // } else {
      //     console.log("price range");
      //     var eventMinPrice = response._embedded.events[i].priceRanges[0].min;
      //     eventDiv.append(eventMinPrice);
      // }
      // append the newly created eventDiv to the main-container div which is where i assume the events should go?
      $(".div" + order[i]).append(buttonDiv);

      $(".Btn" + order[i]).click(function (event) {
        event.preventDefault();
        latitude1 = this.getAttribute("data-lat");
        latitude1 = parseFloat(latitude1);
        longitude1 = this.getAttribute("data-long");
        longitude1 = parseFloat(longitude1);
        concertName = this.querySelector(".p-name").innerText;
        concertDate = this.getAttribute("data-date");
        concertVenue = this.querySelector(".p-location").innerText;
        concertCity = this.getAttribute("data-city");
        ticketsLink = this.getAttribute("data-tickets");
        concertInfo();
        // PLACEHOLDER FOR FUNCTION to invoke mini-map
        var mapLink = "//maps.googleapis.com/maps/api/js?key=AIzaSyBg8H-9S7JXehlh3z4iyqRWNHfbnbEE3ko&callback=initMap"
        $("#mapScript").attr("src", mapLink);
        marker.setMap(map);
      })
    }
  });


});

function concertInfo() {
  var lDiv = $(".left-div");
  var rDiv = $(".right-div");
  lDiv.html('');
  rDiv.html('');

  var row1 = $("<div>");
  row1.attr("class", "row row1");
  var row2 = $("<div>");
  row2.attr("class", "row row2");
  var row3 = $("<div>");
  row3.attr("class", "row row3");
  var pDetails = $("<p>");
  pDetails.attr("class", "p-details p-main col s12");
  pDetails.text("Concert Details");
  var pName = $("<p>");
  pName.attr("class", "p-name p-main col s12");
  pName.text(concertName);
  var pVenue = $("<p>");
  pVenue.attr("class", "p-venue p-sub col s12");
  pVenue.text("Venue: " + concertVenue);
  var pDate = $("<p>");
  pDate.attr("class", "p-date p-sub col s12");
  pDate.text("When: " + concertDate);
  var pCity = $("<p>");
  pCity.attr("class", "p-city p-sub col s12");
  pCity.text("Where: " + concertCity);
  var aTicket = $("<a>");
  aTicket.attr("class", "a-ticket col s12");
  aTicket.attr("href", ticketsLink);
  aTicket.attr("target", "_blank");
  aTicket.text("Buy Tickets");

  row1.append(pDetails, pName);
  lDiv.append(row1);
  row2.append(pVenue, pDate, pCity);
  lDiv.append(row2);
  row3.append(aTicket);
  lDiv.append(row3);
}

// Google API Script

var map;
var place;

function findPlaces(place, city) {
  // added cors-anywhere in front of URL to allow googleMapsAPI to load     
  var queryURL = "//vast-shelf-03988.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?"
  // cleaning up URL by adding param    
  var queryParams = $.param({
    query: "airport near " + place,


    fields: [
      "photos",
      "formatted_address",
      "name",
      "rating",
      "opening_hours",
      "geometry"
    ].join(","),
    key: "AIzaSyBg8H-9S7JXehlh3z4iyqRWNHfbnbEE3ko"
  })

  $.ajax({
    url: queryURL + queryParams,
    method: "GET"
  }).then(function (response) {
    var places = response.results
    // console.log(places);
    for (var i = 0; i < places.length; i++) {
      var place = places[i];
      // Add a simple pin on the map       
      var marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name
      });
    }

  });
  

}

    function initMap() {
      var mapCenter = {lat: latitude1, lng: longitude1};
      map = new google.maps.Map(document.getElementById('map'), {
        center: mapCenter,
        zoom: 15
      });
        marker = new google.maps.Marker({
        position: mapCenter,
        map: map,
        title: 'Hello World!'
      });
    }



  // may not be used due to text populating in for loop
  //   function populate() {
  //     var topleft = $.left-button1;

  //     var topleft = $(p-name).text(var1);

  //     var topleft = $(p-date).text(var1);

  //     var topleft = $(p-location).text(var1);


  //     var bottomleft = $.left-button2;

  //     var bottomleft = $(p-name).text(var1)

  //     var bottomleft = $(p-date).text(var1);

  //     var bottomleft = $(p-location).text(var1);


  //     var topright = $.right-button1;

  //     var topright = $(p-name).text(var1);

  //     var topright = $(p-date).text(var1);

  //     var topright = $(p-location).text(var1);


  //     var bottomright = $.right-button2;

  //     var bottomright = $(p-name).text(var1);

  //      var bottomright = $(p-date).text(var1);

  //     var bottomright = $(p-location).text(var1);
  // }