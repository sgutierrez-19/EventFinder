var apikey = "aGCZcahc2U4ciJp31qvGwHVQ6PrHkZ2U";
var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=cardib&apikey=" + apikey;

// textarea: clear the textarea content when clicked on
$("#textarea1").on("click", function(){
    $("#textareainfo").empty();
})


// submit button functions
$(".btn").on("click", function() {
    var eventInput = $("#textarea1").val();
    console.log(eventInput);
    // making the url 
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + eventInput + "&apikey=" + apikey;
    
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response;
        console.log(response);
        // concert name & venue
        console.log(response._embedded.events[0].name);
        console.log(response._embedded.events[0]._embedded.venues[0].name);
        console.log(response._embedded.events[0].dates.start.localDate);
        // iterate through the events array and check if priceRanges is present
        var eventsTotal = response._embedded.events.length;
        console.log(eventsTotal);
        
        for(var i = 0; i<eventsTotal; i++){
            console.log(response._embedded.events[i]);
            var findPrice = response.find("priceRanges");
            console.log(findPrice);
        }
        
        // console.log(response._embedded.events[0].priceRanges[0].min);
    });
})