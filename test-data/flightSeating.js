const request = require('request-promise');


//must be async as we are waiting for a response. 
const flights = async () => {

    try {
        let allFlights = await request({
            uri: 'https://journeyedu.herokuapp.com/slingair/flights',
            headers: {
                "Accept": "application/json"
            }

        })
        //must parse it beforehand?

        const actualFlights = JSON.parse(allFlights);
        // console.log(parsedJoke)
        return actualFlights
    } catch (err) {
        return err

    }
}
//get each flight by targeting the url endpoint. 
const eachFlight = async (currentFlightNumber) => {

    try {
        let eachFlight = await request({
            uri: `https://journeyedu.herokuapp.com/slingair/flights/${currentFlightNumber}`,
            headers: {
                "Accept": "application/json"
            }

        })
        const currentFlightArray = JSON.parse(eachFlight);
        return currentFlightArray;
    } catch (err) {
        return err
    }

}
const eachReservation = async (data) => {

    try {
        let eachFlight = await request({
            uri: `https://journeyedu.herokuapp.com/slingair/users`,
            headers: {
                //when it's POST
                'Content-Type': 'application/json'
            },
            json: true,
            method: 'POST',
            body: data
        })

        return eachFlight;

        
    } catch (err) {
        return err
    }


}
const eachEmail = async (email) => {

    
    try {
        let allEmails = await request({
            uri: `https://journeyedu.herokuapp.com/slingair/users/${email}`,
            headers: {
                "Accept": "application/json"
            }

        })
        const emailData = JSON.parse(allEmails);
        return emailData;
    } catch (err) {
        return err
    }

}
const adminReservations = async () => {
    
    try {
        let allreservations = await request({
            uri: `https://journeyedu.herokuapp.com/slingair/users`,
            headers: {
                "Accept": "application/json"
            }
        })
        const allreqReservations = JSON.parse(allreservations);
        return allreqReservations;
    } catch (err) {
        return err
    }

}
// module.exports = { seats };
module.exports = {
    flights,
    eachFlight,
    eachReservation,
    eachEmail,
    adminReservations
};