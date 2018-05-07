$(document).ready(initializeApp);
var dataPull;
var expenseObj = {};
var expenseArr = [];

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
    var amount = parseInt($('#amount').val());
    var tax = amount * .2;
    var totalAmount = amount + tax;

    expenseObj = {
        date: date,
        description: description,
        amount: totalAmount
    };
    
    addToServer(expenseObj);
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

function successfulAdd(data) {
    if (data.success === true) {
        expenseArr.push(expenseObj);
        updateExpenseList('add');
    }
}


function renderContactOnDom(indexNum) {
    var newRow = $("<tr>", {
        class: "tr"
    });
    var newDate = $("<td>", {
        class: "td",
        text: expenseArr[indexNum].date
    });
    var newDescription = $("<td>", {
        class: "td",
        text: expenseArr[indexNum].description
    });
    var newAmount = $("<td>", {
        class: "td",
        text: expenseArr[indexNum].amount
    });



    $('tbody').append(newRow);
    $('tbody > tr:last-child').append(newDate);
    $('tbody > tr:last-child').append(newDescription);
    $('tbody > tr:last-child').append(newAmount);

}

function pullFromServer() {
    $.ajax({
        dataType: 'json',
        url: 'php/read.php',
        method: 'post',
        success: successfulPull,
        error: errorFromServer

    });

}

function successfulPull(data) {
    dataPull = data.data;
    console.log(dataPull);
    var pullObj = {};
    for (var j = 0; j < dataPull.length; j++) {

        pullObj = {
            date: dataPull[j].date,
            description: dataPull[j].description,
            amount: dataPull[j].amount
        };
        expenseArr.push(pullObj);
    }
    updateExpenseList();
}

function updateExpenseList(string) {
    var length = expenseArr.length - 1;
    if (expenseArr.length === 0) {
        $("tbody").text("No Contacts Available!");
    }

    switch (string) {
        case 'add':
            if (expenseArr.length === 1) {
                $("tbody").text("");
            }
            renderContactOnDom(length);
            break;
        default:
            for (var i = 0; i < expenseArr.length; i++) {
                renderContactOnDom(i);
            }
            break;
    }
}

function errorFromServer(error) {
    console.log('Error', error);
}
