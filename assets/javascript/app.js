$(document).ready(function() {

    //array of topics
    var topics = ["cat", "dog", "squirell", "parrot", "monkey"];
            
    //function for display contect
    function dispalyContent(){

    //variables
    var APIKey = "91ORNGxd2FQ9rP75L2Mq9q9wwDoBtrMw";
    var topic = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + APIKey + "&limit=10";
    
    //ajax
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        
        var topicDiv = $("<div class = 'topic'>");
        var results = response.data;
        
        for (var i = 0; i < results.length; i++) {
            
            //vaiables for div, paragraph and image ...
            var imageStill = results[i].images.fixed_width_still.url;
            var imagePlay = results[i].images.fixed_width.url;
            var animalDiv = $("<div>")
            var p = $("<p>").text("Rating: " + results[i].rating);
            //still and play
            var animalImage = $("<img>").attr("src",imageStill)
            .addClass("gif").attr("data-state", "still")
            .attr("data-still",imageStill)
            .attr("data-animate", imagePlay);
            //animalImage.attr("src",imageStill);
            
            //appending image and paragraph
            animalDiv.append(p);
            animalDiv.append(animalImage);
            
            //display
            $("#gifs-appear-here").prepend(animalDiv);
        }
        //using image click to pause video
        $(".gif").on("click", function() {
                
            var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }

            })
        })    
    }

    //creating buttons
    function displayButtons() {

    // for nonrepeat buttons
    $("#buttons").empty();
    //looping throught the array
    for (var i = 0; i < topics.length; i++) {
        var addButton = $("<button>");
        //adding class to button
        addButton.addClass("topics");
        addButton.attr("data-name",topics[i]);
        addButton.text(topics[i]);
        $("#buttons").append(addButton);
        }
    }

//button is clicked
    $("#add-topic").on("click", function(event) {
        event.preventDefault();

        var topic = $("#topic-input").val().trim();
        topics.push(topic);
        displayButtons();
    });
    $(document).on("click", ".topics", dispalyContent);
    displayButtons();
});