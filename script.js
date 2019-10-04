var order = [1, 2, 3, 4]

function populate() {

    var first = date1[0];
    var topleft = $.left-button1;
   
    var topleft = $(p-name).text(var1);

    var topleft = $(p-date).text(var1);

    var topleft = $(p-location).text(var1);

    var second = date2[1];
    var bottomleft = $.left-button2;
  
    var bottomleft = $(p-name).text(var1)

    var bottomleft = $(p-date).text(var1);

    var bottomleft = $(p-location).text(var1);

    var third = date3[2];
    var topright = $.right-button1;
  
    var topright = $(p-name).text(var1);

    var topright = $(p-date).text(var1);

    var topright = $(p-location).text(var1);

    var fourth = date4[3];
    var bottomright = $.right-button2;
 
    var bottomright = $(p-name).text(var1);
   
     var bottomright = $(p-date).text(var1);

    var bottomright = $(p-location).text(var1);
}
var apikey = "aGCZcahc2U4ciJp31qvGwHVQ6PrHkZ2U";
var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=cardib&apikey=" + apikey;

// i need help with getting the preventDefault() to work when we switch this to input and not the button
// $("#textarea1").on("submit", function(event){
//     event.preventDefault();
// })

// i tried using the input tag and when user hits enter it runs the ajax but it wasnt working


// submit button functions *****NEED TO CHANGE EVENT TO SUBMIT ON INPUT*****
$(".search-bar-form").on("submit", function (){
    event.preventDefault();
    $(".left-div").html('');
    $(".right-div").html('');

    var eventInput = $("#textarea1").val();
    console.log(eventInput);
    // making the url 
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + eventInput + "&apikey=" + apikey;


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console log for the artist that the user searches for 
        console.log(response);   
        
        
        
        // add a check if the event exists or not  
        
             
        // as long as the user searches an artist that exists with events this will execute
            var eventsTotal = response._embedded.events;
            // for loop will create as many divs as there are events, so need to figure out how to limit number of divs 
            for (var i = 0; i < eventsTotal.length; i++) {
                // console log the event 
                console.log(response._embedded.events[i]);
                
                // there should always be a name,venue and local date for each event so we can go ahead and append those to the new div
                var eventName = response._embedded.events[i].name;
                var eventVenue = response._embedded.events[i]._embedded.venues[0].name;
                var eventDate = response._embedded.events[i].dates.start.localDate;
                
                // Making variables that create divs and ps
                var buttonDiv = $("<div>");
                buttonDiv.attr("class", "col s8 offset-s2 Btn" + order[i]);
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
                pLocation.text("Venue: " + eventVenue);

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
            }
        
    });


});



// Google API Script

var map;
var place = "the forum"
      function findPlaces(place) {
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
          console.log(places);
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
        // map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });

      }
      findPlaces(place);

    


    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 12
      });
      
    
    

    }

