from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, make_response
from flask_cors import CORS, cross_origin
from flask_mysqldb import MySQL
import numpy as np
import json
app = Flask(__name__)
CORS(app)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Chikku29!!'
app.config['MYSQL_DB'] = 'demo'

mysql = MySQL(app)

cors = CORS(app, resources = {
    r"/*" : {
        "origins" : "*"
    }
})

class RideResponse:
    def __init__(self, firstName, contactNumber):
        self.firstName = firstName
        self.contactNumber = contactNumber

    def printPersonDetail(self):
        print(self.firstName, self.contactNumber)

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)

class AccommodationResponse:
    def __init__(self, address, landlordName, landlordPhone):
        self.address = address
        self.landlordName = landlordName
        self.landlordPhone = landlordPhone

    def printPersonDetail(self):
        print(self.address, self.landlordName, self.landlordPhone)

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)

class TravelBuddyResponse:
    def __init__(self, firstName, lastName, email, phoneNumber):
        self.firstName = firstName
        self.lastName = lastName
        self.email = email
        self.phoneNumber = phoneNumber

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)

class AccommodationDetails:
    def __init__(self, city, rentalCategory, highestPrice, lowestPrice, bedrooms, bathrooms, utilities, parking,
               furnished, appliances, petFriendly, address, landlordName, landlordPhone):
        self.city = city
        self.rentalCategory = rentalCategory
        self.highestPrice = highestPrice
        self.lowestPrice = lowestPrice
        self.bedrooms = bedrooms
        self.bathrooms = bathrooms
        self.utilities = utilities
        self.parking = parking
        self.furnished = furnished
        self.appliances = appliances
        self.petFriendly = petFriendly
        self.address = address
        self.landlordName = landlordName
        self.landlordPhone = landlordPhone

    def printPersonDetail(self):
        print(self.address, self.landlordName, self.landlordPhone)

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)

class RidePlanDetails:
    def __init__(self, firstName, lastName, airportName, destination,
                 exitTerminalNumber, numberOfPassengers, numberOfLuggages, contactNumber, dateOfRide, timeOfRide):
        self.firstName = firstName
        self.lastName = lastName
        self.airportName = airportName
        self.destination = destination
        self.exitTerminalNumber = exitTerminalNumber
        self.numberOfPassengers = numberOfPassengers
        self.numberOfLuggages = numberOfLuggages
        self.contactNumber = contactNumber
        self.dateOfRide = dateOfRide
        self.timeOfRide = timeOfRide

    def printPersonDetail(self):
        print(self.firstName, self.contactNumber)

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)


@app.route('/getRideDetails', methods=['POST'])
def getRideDetails(methods=['POST']):
    data = request.json
    cur = mysql.connection.cursor()
    if request.method == "POST":

        destination = data.get('destination')
        dateOfRide = data.get('dateOfRide')
        numberOfPassengers = data.get('numberOfPassengers')
        numberOfLuggages = data.get('numberOfLuggages')

        cur = mysql.connection.cursor()

        query_string = "SELECT * FROM demo.RideDetails WHERE destination = %s and dateOfRide = %s and numberOfPassengers >= %s and numberOfLuggages >= %s"
        cur.execute(query_string, [destination, dateOfRide, numberOfPassengers, numberOfLuggages])
        data1 = cur.fetchall()
    # rides = []
    rideResponse = []

    for i in range(0, len(data1)):
        # if (data1[i][3] == data.get('destination')):
        ride_obj = RideResponse(data1[i][0], data1[i][7])
        rideResponse.append(ride_obj)
            # rides.append(data1[i][0])
            # rides.append(data1[i][7])


    json_payload =  json.dumps(rideResponse, default=lambda o: o.__dict__,
          sort_keys=True, indent=4)
    response = make_response(json_payload)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/addRideDetails', methods=['POST'])
def addRideDetails(methods=['POST']):
    data = request.json
    print(data.get('airportName'))
    firstName = data.get('firstName'),
    lastName = data.get('lastName'),

    airportName = data.get('airportName'),
    destination = data.get('destination'),
    exitTerminalNumber = data.get('exitTerminalNumber'),
    numberOfPassengers = data.get('numberOfPassengers'),
    numberOfLuggages = data.get('numberOfLuggages'),
    contactNumber = data.get('contactNumber'),
    timeOfRide = data.get('timeOfRide'),
    dateOfRide = data.get('dateOfRide')
    #timeOfRide = data['timeOfRide']
    cur = mysql.connection.cursor()


    ################## NEED TO REMOVE


    # firstName = "Steve";
    # lastName = "Jobs";
    cur.execute(
        "INSERT INTO ridedetails(firstName,lastName,airportName,destination,exitTerminalNumber,numberOfPassengers,numberOfLuggages,contactNumber,dateOfRide,timeOfRide) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",
        (firstName, lastName, airportName, destination, exitTerminalNumber, numberOfPassengers, numberOfLuggages, contactNumber, dateOfRide, timeOfRide))
    mysql.connection.commit()
    cur.close()
    successMessage = {}
    successMessage['message'] = 'Success!'
    response = make_response(json.dumps(successMessage))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


# TravelBuddy
@app.route('/addTravelPlan', methods=['POST'])
def addTravelPlan(methods=['POST']):
    data = request.json
    # travelPlan = TravelPlan(data.get('firstName'),
    #                 data.get('lastName'),
    #                 data.get('doj'),
    #                 data.get('email'),
    #                 data.get('origin'),
    #                 data.get('destination'),
    #                 data.get('flightNumber'))
    # travelPlans.append(travelPlan)
    # print(data)
    firstName = data.get('firstName'),
    lastName = data.get('lastName'),
    doj = data.get('doj'),
    email = data.get('email'),
    origin = data.get('origin'),
    destination = data.get('destination'),
    flightNumber = data.get('flightNumber'),
    phoneNumber = data.get('phoneNumber')

    # email="navamisubhash2222@gmail.com"
    # firstName="navami2222"
    # lastName="subhash2"
    #timeOfRide = data['timeOfRide']
    cur = mysql.connection.cursor()
    cur.execute(
        "INSERT INTO demo.travelplan(firstName,lastName,doj,origin,destination,email,flightNumber,phoneNumber) VALUES(%s,%s,%s,%s,%s,%s,%s,%s)",
        (firstName, lastName, doj, origin, destination, email, flightNumber, phoneNumber))
    mysql.connection.commit()
    cur.close()


    successMessage = {}
    successMessage['message'] = 'Success!'
    response = make_response(json.dumps(successMessage))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response



# Accommodation ADD


@app.route('/addAccommodations', methods=['POST'])
def addAccommodations(methods=['POST']):
    data = request.json
    print(data)
    city = data.get('city'),
    rentalCategory = data.get('rentalCategory'),
    highestPrice = data.get('highestPrice'),
    lowestPrice = data.get('lowestPrice'),
    bedrooms = data.get('bedrooms'),
    bathrooms = data.get('bathrooms'),
    utilities = data.get('utilities'),
    parking = data.get('parking'),
    furnished = data.get('furnished'),
    appliances = data.get('appliances'),
    petFriendly = data.get('petFriendly'),
    address = data.get('address'),
    landlordName = data.get('landlordName'),
    landlordPhone = data.get('landlordPhone')
    cur = mysql.connection.cursor()
    cur.execute(
    "INSERT INTO demo.accommodations(city, rentalCategory, highestPrice, lowestPrice, bedrooms, bathrooms, utilities,parking, furnished, appliances, petFriendly, address, landlordName, landlordPhone) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", (city, rentalCategory, highestPrice, lowestPrice, bedrooms, bathrooms, utilities, parking, furnished, appliances, petFriendly, address, landlordName, landlordPhone))
    mysql.connection.commit()
    cur.close()
    successMessage = {}
    successMessage['message'] = 'Success!'
    response = make_response(json.dumps(successMessage))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/getAccommodationDetails', methods=['POST'])
def getAccommodationDetails(methods=['POST']):
    data = request.json
    print(data)
    cur = mysql.connection.cursor()

    if (data.get('city') == "" or data.get('rentalCategory') == "" or data.get('highestPrice') == ""
            or data.get('lowestPrice') == "" or data.get('bedrooms') == "" or data.get('bathrooms') == ""
            or data.get('utilities') == "" or data.get('parking') == "" or data.get('furnished') == ""
            or data.get('appliances') == "" or data.get('petFriendly') == ""):
        return make_response('Bad Request')

    if request.method == "POST":
        city = data.get('city')
        rentalCategory = data.get('rentalCategory')
        highestPrice = data.get('highestPrice')
        lowestPrice = data.get('lowestPrice')
        bedrooms = data.get('bedrooms')
        bathrooms = data.get('bathrooms')
        utilities = data.get('utilities')
        parking = data.get('parking')
        furnished = data.get('furnished')
        appliances = data.get('appliances')
        petFriendly = data.get('petFriendly')

        print(city)
        print(rentalCategory)
        print(highestPrice)
        print(lowestPrice)

        cur = mysql.connection.cursor()

        query_string = "SELECT * FROM demo.accommodations WHERE city = %s and rentalCategory = %s and highestPrice = %s and lowestPrice = %s and bedrooms = %s and bathrooms = %s and utilities = %s and parking = %s and furnished = %s and appliances = %s and petFriendly = %s"
        cur.execute(query_string, [city, rentalCategory, highestPrice, lowestPrice, bedrooms, bathrooms, utilities,
                                   parking, furnished, appliances, petFriendly])

        data_1 = cur.fetchall()
        print(data_1)

    acc = []
    acc_response = []

    for i in range(0, len(data_1)):

        acc_response_obj = AccommodationResponse(data_1[i][11], data_1[i][12], data_1[i][13])
        acc_response.append(acc_response_obj)

    json_payload = json.dumps(acc_response, default=lambda o: o.__dict__,
                              sort_keys=True, indent=4)
    response = make_response(json_payload)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/getTravelBuddies', methods=['POST'])
def getTravelBuddies(methods=['POST']):
    data = request.json
    doj = data.get('doj')
    origin = data.get('origin')
    flightNumber = data.get('flightNumber')

    if(doj == "" or flightNumber == "" or origin == ""):
        return make_response('Bad Request')
    buddies = []
    cur = mysql.connection.cursor()

    query_string = "SELECT * FROM demo.travelplan WHERE origin = %s and flightNumber = %s and doj = %s"
    cur.execute(query_string, [origin, flightNumber, doj])
    data = cur.fetchall()
    print(data)
    travelBuddies = []
    for i in range(0, len(data)):
        travelBuddy = TravelBuddyResponse(data[i][0], data[i][1], data[i][5], data[i][7])
        travelBuddies.append(travelBuddy)




    json_payload =  json.dumps(travelBuddies, default=lambda o: o.__dict__,
          sort_keys=True, indent=4)
    response = make_response(json_payload)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == "__main__":
    app.run(debug=True)






