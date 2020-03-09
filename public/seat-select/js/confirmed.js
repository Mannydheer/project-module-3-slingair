//get the whole url search string. 
let params = (new URL(document.location)).searchParams;


//get each data piece
let returnedFlight = params.get('flight')
let returnedName = params.get('name')
let returnedsurName = params.get('surname')
let returnedEmail= params.get('email')
let returnedSeat = params.get('seat')

// console.log(returnedEmail,returnedName,returnedSeat,returnedsurName)

//now can inject into the HTML


let flightNum = document.getElementById('flight')
flightNum.innerText = returnedFlight


//NAME & Surname
let nameHtml = document.getElementById('name')
nameHtml.innerText = `${returnedName} ${returnedsurName}`

//SEAT
let seatHtml = document.getElementById('seat')
seatHtml.innerText = returnedSeat;

//EMAIL
let emailHtml = document.getElementById('email')
emailHtml.innerText = returnedEmail;



const handleHome = (event) => {
    event.preventDefault();
    window.location.href = '/seat-select/'
}


