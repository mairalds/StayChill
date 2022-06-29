//Start Pictures adding and price per night//

var accommodationkind = {
    "Hotel": {
        "nightPrice": 157.00,
        "photo": "hotel-picture.jpg"
    },

    "Hostel": {
        "nightPrice": 30.00,
        "photo": "hostel-picture.jpg"
    },

    "Motel": {
        "nightPrice": 90.00,
        "photo": "motel-picture.jpg"
    },

    "House": {
        "nightPrice": 240.00,
        "photo": "house-picture.jpg"
    }

}
//Function for creating data accomodation and min/max of guests//

function loadGuests(qtd, skipfirst) {
    $('#guests').empty();
    for (let i = 1; i <= qtd; i++) {
        if (skipfirst == false){
            $('#guests').append($('<option>', {value:i, text:i}));
        }else{
            skipfirst = false;
        }
      }
}

//Function for creating data accomodation and min/max of nights//

function loadNights(min, max) {
    $('#nights').empty();
    for (let i = min; i <= max; i++) {
        $('#nights').append($('<option>', {value:i, text:i}));
      }
}

//Function for creating data accomodation and meals options accordinly//

function loadMeal(mealName){
    $('#meals').append($('<option>', {value:mealName, text:mealName}));
}

//Function for displaying the description of booking after user selection//

function updateBookingDetails(){
    accommodationSelector = $("#accommodation-type .option-button.selected").attr('id');
    $("#accommodation-result").html(accommodationSelector);

    guestsSelector = $("#guests").val();
    $("#result-guests").html(guestsSelector);

    nightsSelector = $("#nights").val();
    $("#result-nights").html(nightsSelector);

    mealsSelector = $("#meals").val();
    $("#result-meals").html(mealsSelector);
}

//Function for loading number of guests and meals options in accordance with accomodation selected//

function loadBookingInfo() {
    $(".refresh-loader").show();

    accommodationSelector = $("#accommodation-type .option-button.selected").attr('id');

    if(accommodationSelector == "Hotel") {
        loadGuests(2, false);
        loadNights(1,5);
        $("#meals").empty();
        loadMeal("Breakfast");
        loadMeal("Lunch");
        loadMeal("Dinner");
        loadMeal("None");
        updateBookingDetails();
    }
    else if(accommodationSelector == "Hostel") {
        loadGuests(1, false);
        loadNights(1,10);
        $("#meals").empty();
        loadMeal("Breakfast");
        loadMeal("None");
        updateBookingDetails();
    }else if(accommodationSelector == "Motel") {
        loadGuests(4, true);
        loadNights(3,10);
        $("#meals").empty();
        loadMeal("Breakfast");
        loadMeal("None");
        updateBookingDetails();
    }else if(accommodationSelector == "House") {
        loadGuests(4, false);
        loadNights(2,15);
        $("#meals").empty();
        loadMeal("Breakfast");
        loadMeal("Dinner");
        loadMeal("None");
        updateBookingDetails();
    }

}

//Function for loading page and timer//

function update_order_details() {
    loadBookingInfo();
    //Timer//
    window.setTimeout(function(){ 
        $(".refresh-loader").hide();
     },500);        
}

//Function for displaying price per night in accordance with accomodation//

function calculateprice(selectedAccommodation) {

    nightpricecalc = accommodationkind[selectedAccommodation].nightPrice;
    nightsSelector = $("#nights").val();

    totalamount = (nightsSelector * nightpricecalc).toFixed(2);

    $("#price").html("NZD "+totalamount);
}

//Function for when user clicks on accomodation it updates the photo//

function updateacccommodationphoto(selectedAccommodation) {
    if (selectedAccommodation== "Hotel")  {   
        $("#photo-product").attr("src", "img/hotel-picture.jpg");
    } else if(selectedAccommodation== "Hostel")  {   
        $("#photo-product").attr("src", "img/hostel-picture.jpg");
    } else if(selectedAccommodation== "Motel")  {   
        $("#photo-product").attr("src", "img/motel-picture.jpg");
    } else if(selectedAccommodation== "House")  {   
        $("#photo-product").attr("src", "img/house-picture.jpg");
    }
}

//Function 'ready method' which will run once the page DOM is ready to execute JavaScript code//

$(document).ready(function() {

    $(".option-button").click(function(){
        //Changing the button color when clicking
        var clickedParam = $(this).parent().attr("id");
        var childSelector = "#" + clickedParam + " .option-button";
        $(childSelector).removeClass("selected");
        $(this).addClass("selected");
        update_order_details();
        selectedAccommodation = $(this).attr("id");
        calculateprice(selectedAccommodation);

        updateacccommodationphoto(selectedAccommodation);
        
    });

    $("#guests").change(function(){
        updateBookingDetails();
    });

    $("#nights").change(function(){
        updateBookingDetails();
        accommodationSelector = $("#accommodation-type .option-button.selected").attr("id");
        calculateprice(selectedAccommodation);
    });

    $("#meals").change(function(){
        updateBookingDetails();
    });

    $("#complete-order").click(function(){
        alert("Thank you! We will be in touch with you soon!");
    });

});