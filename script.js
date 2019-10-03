var apikey = "aGCZcahc2U4ciJp31qvGwHVQ6PrHkZ2U";
var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=cardib&apikey=" + apikey;

// textarea: clear the textarea content when clicked on
$("#textarea1").on("click", function () {
    $("#textareainfo").empty();
})


// submit button functions
$(".btn").on("click", function () {
    var eventInput = $("#textarea1").val();
    console.log(eventInput);
    // making the url 
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + eventInput + "&apikey=" + apikey;


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        // concert name & venue
        // console.log(response._embedded.events[0].name);
        // console.log(response._embedded.events[0]._embedded.venues[0].name);
        // console.log(response._embedded.events[0].dates.start.localDate);
        // iterate through the events array and check if priceRanges is present
        
        
        // add a check if the event exists or not
        



        // as long as the user searches an artist that exists with events this will execute
            var eventsTotal = response._embedded.events.length;
            console.log(eventsTotal);
            for (var i = 0; i < eventsTotal; i++) {
                // console log the event and the price range
                console.log(response._embedded.events[i]);
                var priceExist = response._embedded.events[i].priceRanges;
                var abcd;
                // console.log(abcd);
                console.log(priceExist);

                // if statements for if price range isnt there
                if (priceExist === undefined) {
                    console.log("no price range");
                } else {
                    console.log("price range");
                    console.log(response._embedded.events[i].priceRanges[0].min);
                }


            }
        
    });


});
