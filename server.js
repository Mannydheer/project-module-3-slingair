'use strict';
const request = require('request-promise');

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const {
    flights,
    eachFlight,
    eachReservation,
    eachEmail,
    adminReservations
} = require('./test-data/flightSeating')

const PORT = process.env.PORT || 8000;

const handleConfirmation = async (req, res) => {
    const data = req.body;
    let reservation = await eachReservation(data)
    console.log(reservation.reservation)

    if (reservation.status === 201) {
        res.send(reservation.reservation)

    } else {
        console.log('ERROR');
    }
}

const handleallFlights = async (req, res) => {

    let flightsAll = await flights();
    let onlyFlights = flightsAll.flights

    res.send(onlyFlights)
}

const handleEachFlight = async (req, res) => {

    let currentFlightNumber = req.params.flightNum
    let eachFlightArray = await eachFlight(currentFlightNumber);
    //
    let flightKey = (Object.keys(eachFlightArray))
    let getflight = eachFlightArray[flightKey]

    res.send(getflight)

}
const handlegetReservation = async (req, res) => {

    let currentEmail = req.params.email
    let receivedEmails = await eachEmail(currentEmail);
    let userReservation = receivedEmails.data
    res.send(userReservation)

}
const handleReservationsForSelectedFlight = async (req,res) => {
    let getFlightInput = req.params.flightInput;

    let allreqReservations = await adminReservations();
    
    let storedFlights = [];

    allreqReservations.forEach(reservation => {
        if (reservation.flight == getFlightInput) {
            storedFlights.push(reservation)
        }

        
    });
    
    res.send(storedFlights)




}





express()
    .use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
    .use(morgan('dev'))
    .use(express.static('public'))
    .use(bodyParser.json())
    .use(express.urlencoded({
        extended: false
    }))
    .set('view engine', 'ejs')

    // endpoints
    .get('/seat-select/:flightNum', handleEachFlight)
    .post('/confirmation', handleConfirmation)
    .get('/allflights', handleallFlights)
    .get('/getReservation/:email', handlegetReservation)
    .get('/getselectedFlight/:flightInput', handleReservationsForSelectedFlight)

    .use((req, res) => res.send('Not Found'))
    .listen(PORT, () => console.log(`Listening on port ${PORT}`));