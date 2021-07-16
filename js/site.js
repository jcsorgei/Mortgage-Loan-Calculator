// get input values from user
function getValues() {
    let loanAmount = document.getElementById("loanAmount").value;
    let term = document.getElementById("term").value;
    let rate = document.getElementById("rate").value;

    //trying to convert values to float
    loanAmount = parseFloat(loanAmount);
    term = parseFloat(term);
    rate = parseFloat(rate);

    //checks if all values are numbers
    if (isNaN(loanAmount) || isNaN(term) || isNaN(rate)) {
        alert("Enter valid numbers!")
    } else {
        calculate(loanAmount, term, rate);
    }

}

// calculate totalMonthlyPayment,remainingBalance,totalInterest,interest,principal,totalCost,remaingBalance using formulas
function calculate(loanAmount, term, rate) {

    let totalMonthlyPayment = loanAmount * (rate / 1200) / (1 - (1 + rate / 1200) ** (-term));
    let remainingBalance = loanAmount;
    let totalInterest = 0;

    //calculate the values for each month
    for (let i = 1; i <= term; i++) {
        let interest = remainingBalance * rate / 1200;
        let principal = totalMonthlyPayment - interest;
        remainingBalance = remainingBalance - principal;
        totalInterest += interest;

        updateTable(i, totalMonthlyPayment, principal, interest, totalInterest, remainingBalance);
    }

    let totalCost = loanAmount + totalInterest;

    updateDisplay(totalMonthlyPayment, loanAmount, totalInterest, totalCost);
}

// create a table row with the calculated values and insert it to the table
function updateTable(month, totalMonthlyPayment, principal, interest, totalInterest, remainingBalance) {

    let templateRow = document.getElementById("templateRow");
    let tableRow = document.importNode(templateRow.content, true);

    let tableBody = document.getElementById("results");

    let rowcols = tableRow.querySelectorAll("td");
    rowcols[0].textContent = month;
    rowcols[1].textContent = totalMonthlyPayment.toFixed(2).toLocaleString();
    rowcols[2].textContent = principal.toFixed(2).toLocaleString();
    rowcols[3].textContent = interest.toFixed(2).toLocaleString();
    rowcols[4].textContent = totalInterest.toFixed(2).toLocaleString();
    rowcols[5].textContent = remainingBalance.toFixed(2).toLocaleString();

    tableBody.appendChild(tableRow);
}

// update the display with the calculated values
function updateDisplay(monthlyPayment, totalPrincipal, totalInterest, totalCost) {
    document.getElementById("monthlyPayment").textContent = "$" + monthlyPayment.toFixed(2);
    document.getElementById("totalPrincipal").textContent = "$" + totalPrincipal.toFixed(2);
    document.getElementById("totalInterest").textContent = "$" + totalInterest.toFixed(2);
    document.getElementById("totalCost").textContent = "$" + totalCost.toFixed(2);
}