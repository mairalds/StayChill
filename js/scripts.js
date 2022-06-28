
/* var products = {
    'white': {
        
        'plain': {
            'unit_price': 5.12,
            'photo': 'v-white.jpg' 
        },
        'printed': {
            'unit_price': 8.95,
            'photo': 'v-white-personalized.jpg' 
        }
    },
    
    'colored': {
        'plain': {
            'unit_price': 6.04,
            'photo': 'v-color.jpg' 
        },
        'printed': {
            'unit_price': 9.47,
            'photo': 'v-color-personalized.png' 
        }
    }
} */


// Search params

/* var search_params = {
    "quantity": "",
    "color": "",
    "quality": "",
    "style": "",
} */

//Search params Maira test//
var search_params = {
    "accommodation-type": "",
    "guests": "",
    "nights": "",
    "meals": "",
}


// Additional pricing rules:

// 1. The prices above are for Basic quality (q150). 
// The high quality shirt (190g/m2) has a 12% increase in the unit price.

// 2. Apply the following discounts for higher quantities: 
    // 1: above 1.000 units - 20% discount
    // 2: above 500 units - 12% discount
    // 3: above 100 units - 5% discount


// Solution:

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

function loadNights(min, max) {
    $('#nights').empty();
    for (let i = min; i <= max; i++) {
        $('#nights').append($('<option>', {value:i, text:i}));
      }
}

function loadNights(min, max) {
    $('#nights').empty();
    for (let i = min; i <= max; i++) {
        $('#nights').append($('<option>', {value:i, text:i}));
      }
}

function loadMeal(mealName){
    $('#meals').append($('<option>', {value:mealName, text:mealName}));
}

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


function update_order_details() {
    loadBookingInfo();
    //Timer//
    window.setTimeout(function(){ 
        $(".refresh-loader").hide();
     },500);        
}


$(function(){

    //First time running
    update_order_details()


//Calculate the price//

    /* function calculate_total() {

        var unitPrice = products[search_params.color][search_params.style].unit_price;
        
        if (search_params.quality == "q190") {
            unitPrice *= 1.12;
        }

        var total = unitPrice * search_params.quantity;
        
        if (search_params.quantity >= 1000) {
            total *= 0.8;
        } else if (search_params.quantity >= 500) {
            total *= 0.88;
        } else if (search_params.quantity >= 100) {
            total *= 0.95;
        }

        return total.toLocaleString("en-US", {style: "currency",currency: "USD"});


    } */


    //Maira quantity>nights//
    $("#accommodation-type").change(function(){
        update_order_details();
    });

    $("#guests").change(function(){
        updateBookingDetails();
    });

    $("#nights").change(function(){
        updateBookingDetails();
    });

    $("#meals").change(function(){
        updateBookingDetails();
    });



    // $(".option-button").click(function(){
        
    //     var clickedParam = $(this).parent().attr("id");
    //     var childSelector = "#" + clickedParam + " .option-button";
    //     $(childSelector).removeClass("selected");
    //     $(this).addClass("selected");
    //     var selectedChild = "#" + clickedParam + " .option-button.selected";
    //     search_params[clickedParam] = $(selectedChild).attr('id');
    //     update_order_details();

    // });

    //Teste Maira
    $(".option-button").click(function(){
        
        var clickedParam = $(this).parent().attr("id");
        var childSelector = "#" + clickedParam + " .option-button";
        $(childSelector).removeClass("selected");
        $(this).addClass("selected");
        var selectedChild = "#" + clickedParam + " .option-button.selected";
        search_params[clickedParam] = $(selectedChild).attr('id');
        update_order_details();

    });    



    
});










