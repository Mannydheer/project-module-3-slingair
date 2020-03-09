
//THE LOGIN IN admin
const handleadminFlight = () => {

//REUSING FOR SECOND DROP DOWN MENU IN ADMIN - SAME AS SEAT SELECT DORP DWON.
fetch('/allflights', {
    method: "GET",
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    },
})
.then(array => {
    return (array.json())
})
.then(flightArray => {
    //add event listener on the select tag.
    let selectTag = document.getElementById('adminDrop')
    selectTag.addEventListener('change', passEvent);

    flightArray.forEach(flight => {
        let option = document.createElement('option')
        option.id = `${flight}`;
        document.getElementById('adminDrop').appendChild(option);
        option.innerText = `${flight}`;

    });
})

function passEvent(event) {

    let idValue = event.target.value
    console.log(idValue)


    fetch(`/getselectedFlight/${idValue}`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    })
    
    .then(receivedFlights => {
        return (receivedFlights.json())
    })
    .then(reservations => {
        
        reservations.forEach(reservation => {
            
            let mainDiv = document.getElementById('receivedFlights')
    
            let emailDiv = document.createElement('div');
            emailDiv.classList.add = 'divs';
            mainDiv.appendChild(emailDiv);
            emailDiv.innerText = reservation.email;
            
            let flightDiv = document.createElement('div');
            flightDiv.classList.add = 'divs';
            mainDiv.appendChild(flightDiv);
            flightDiv.innerText = reservation.flight;
    
            let nameDiv = document.createElement('div');
            nameDiv.classList.add = 'divs';
            mainDiv.appendChild(nameDiv);
            nameDiv.innerText = reservation.givenName;
    
            let surnameDiv = document.createElement('div');
            surnameDiv.classList.add = 'divs';
            mainDiv.appendChild(surnameDiv);
            surnameDiv.innerText = reservation.surname;
    
            let seatDiv = document.createElement('div');
            seatDiv.classList.add = 'divs';
            mainDiv.appendChild(seatDiv);
            seatDiv.innerText = reservation.seat;
    
            let idDiv = document.createElement('div');
            idDiv.classList.add = 'divs';
            idDiv.id = 'divId';
            mainDiv.appendChild(idDiv);
            idDiv.innerText = reservation.id;
    
           
            
        });
    })
    }
    
}

handleadminFlight();

//homepage
const handleHome = (event) => {
    event.preventDefault();
    window.location.href = '/seat-select/'
}


