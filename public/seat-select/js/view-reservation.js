//get the whole url search string. 
let params = (new URL(document.location)).searchParams;


//get each data piece
let reservedName = params.get('givenName')
let reservedsurName = params.get('surName')
let reservedEmail = params.get('newEmail')
let reservedFlight = params.get('flightNumber')
let reservedId = params.get('idNumber')

//name
let getName = document.getElementById('reservedName')
getName.innerText = `${reservedName}`
let getsurName = document.getElementById('reservedsurName')
getsurName.innerText = `${reservedsurName}`
let getEmail = document.getElementById('reservedEmail')
getEmail.innerText = `${reservedEmail}`
let getFlight = document.getElementById('reservedFlight')
getFlight.innerText = `${reservedFlight}`
let getId = document.getElementById('reservedId')
getId.innerText = `${reservedId}`


//redirect

const handleMain = (event) => {
    event.preventDefault();
    window.location.href = '/seat-select/'
}