// const flightInput = document.getElementById('flight');
const seatsDiv = document.getElementById('seats-section');
const confirmButton = document.getElementById('confirm-button');
//all confirmation values
const givenName = document.getElementById('givenName');
const givensurName = document.getElementById('surname');
const givenEmail = document.getElementById('email');
const seatNum = document.getElementById('seat-number');


let selection = '';


const renderSeats = (arrayFlights) => {
    document.querySelector('.form-container').style.display = 'block';
    console.log(document.querySelector('.form-container'))

    const alpha = ['A', 'B', 'C', 'D', 'E', 'F'];
    for (let r = 1; r < 11; r++) {
        const row = document.createElement('ol');
        row.classList.add('row');
        row.classList.add('fuselage');
        seatsDiv.appendChild(row);
        for (let s = 1; s < 7; s++) {
            const seatNumber = `${r}${alpha[s-1]}`;
            const seat = document.createElement('li')
            const seatOccupied = `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`;
            const seatAvailable = `<li><label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label></li>`;

            const realSeat = arrayFlights.find(seat => seat.id === seatNumber);
            // seat.innerHTML = realSeat.isAvailable ? seatAvailable : seatOccupied;
            //if true, then get Seat Available else seat occupied. 
            if (realSeat.isAvailable) {
                seat.innerHTML = seatAvailable
            } else {
                seat.innerHTML = seatOccupied
            }
            row.appendChild(seat);
        }
    }

    let seatMap = document.forms['seats'].elements['seat'];
    seatMap.forEach(seat => {
        seat.onclick = () => {
            selection = seat.value;
            seatMap.forEach(x => {
                if (x.value !== seat.value) {
                    document.getElementById(x.value).classList.remove('selected');
                }
            })
            document.getElementById(seat.value).classList.add('selected');
            document.getElementById('seat-number').innerText = `(${selection})`;
            confirmButton.disabled = false;
        }
    });
}
// -------------------
var flightKeys = [];

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
        let selectTag = document.getElementById('dropDown')
        selectTag.addEventListener('change', passEvent);

        flightArray.forEach(flight => {
            flightKeys.push(flight)
            let option = document.createElement('option')
            option.id = `${flight}`;
            document.getElementById('dropDown').appendChild(option);
            option.innerText = `${flight}`;

        });
    })
// -------------------


//let 
const handlefindReservation = (event) => {
    event.preventDefault();

    let emailInput = document.getElementById('emailFinder');
    let emailValue = emailInput.value; //send as string?
    // let emailEntered = JSON.stringify(emailValue)

    fetch(`/getReservation/${emailValue}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
        .then(userInfo => {
            return (userInfo.json());
        })
        .then(newData => {

            window.location.href = `/seat-select/view-reservation.html?givenName=${newData.givenName}&surName=${newData.surname}&newEmail=${newData.email}&flightNumber=${newData.flight}&idNumber=${newData.id}`


        })

}

function passEvent(event) {
    toggleFormContent(event)
}
//declare globally so you can pass to hangleConfirmSeat
let flightValue;
const toggleFormContent = (event) => {
    //get flight value number entered.
    flightValue = event.target.value

    fetch(`/seat-select/${flightValue}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
        })
        .then(arrayFlights => {
            return (arrayFlights.json())
        })
        // TODO: Pass the response data to renderSeats to create the appropriate seat-type.
        .then(arrayFlights => {
            //the chosen flights data (array)
            renderSeats(arrayFlights);
        })

}

const handleConfirmSeat = (event) => {
    event.preventDefault();
    let seatBrackets = seatNum.innerText;
    let removeBrackets = seatBrackets.replace(')', "");
    let seatValue = removeBrackets.replace('(', "");

    // TODO: everything in here!
    const data = {
        //remove brackets from seatNum
        flight: flightValue,
        seat: seatValue,
        givenName: givensurName.value,
        surname: givensurName.value,
        email: givenEmail.value,

    };


    fetch(`/confirmation`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)

        })
        .then(data => {
            return (data.json())

        })
        .then(info => {
            console.log(info)
            let newInfo = JSON.stringify(info)
            console.log(info)
            window.location.href = `/seat-select/confirmed.html?name=${info.givenName}&surname=${info.surname}&email=${info.email}&seat=${info.seat}&flight=${info.flight}`


        })
}

///ADMIN

const handleAdmin = (event) => {
    event.preventDefault();

    let getadminEle = document.getElementById('admin');
    let adminLogin = getadminEle.value;

    if (adminLogin === 'admin') {
        window.location.href = `/seat-select/admin.html`;



    }

}