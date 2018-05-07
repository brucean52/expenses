$(document).ready(initializeApp);

expenseObj = {};

function initializeApp() {
    addClickHandlersToElements();
    pullFromServer();
}

function addClickHandlersToElements() {
    $('.submit-btn').on('click', handleSubmitClicked);
}

function handleSubmitClicked(event) {
    event.preventDefault();
    addExpense();
}

function addExpense() {
    var date = $('#date').val();
    var description = $('#description').val();
    var amount = $('#amount').val();
    console.log('date', date);
    console.log('description', description);
    console.log('amount', amount);

//    if (!/\S/.test(firstName)) {
//        $( ".form-response" ).text( "Please enter a valid first name" );
//    } else if(!/\S/.test(lastName)){
//        $( ".form-response" ).text( "Please enter a valid last name" );
//    } else if(phone === "" && email === ""){
//        $( ".form-response" ).text( "Enter either a phone or email" );
//    } else if(phone !== "" && phoneRegex.test(phone) === false){
//        $( ".form-response" ).text( "Please enter a valid phone" );
//    } else if(email !== "" && emailRegex.test(email) === false){
//        $( ".form-response" ).text( "Please enter a valid email" );
//    } else {
        expenseObj = {
            date: date,
            description: description,
            amount: amount
        };
        addToServer(expenseObj);
        //$( ".form-response" ).text( "" );
    //}
}

function addToServer(expense) {
    $.ajax({
        dataType: 'json',
        url: 'php/create.php',
        data: {
            date: expense.date,
            description: expense.description,
            amount: expense.amount
        },
        method: 'post',
        success: successfulAdd,
        error: errorFromServer
    });
}