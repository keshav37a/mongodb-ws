use zz_shop

db.products.insertOne({ name: "A book", price: 12.99 })

db.products.find()

db.products.find().pretty()

db.products.insertOne({ name: "Witcher 3", price: 24.99, description: "A PC Game" })

db.products.insertOne({ name: "A Laptop", price: 499.99, description: "A high end gaming laptop", details: { CPU: "i7-8850-U", RAM: "32GB", Graphics: "6GB Nvidia 1650" } })

use zz_flights

db.flightData.find().pretty()

db.flightData.replaceOne({ _id: ObjectId("5ee04f89bdfba2baa2bacdbf") }, { departureAirport: "ABC" })

db.passengers.insertMany([
  {
    "name": "Max Schwarzmueller",
    "age": 29
  },
  {
    "name": "Manu Lorenz",
    "age": 30
  },
  {
    "name": "Chris Hayton",
    "age": 35
  },
  {
    "name": "Sandeep Kumar",
    "age": 28
  },
  {
    "name": "Maria Jones",
    "age": 30
  },
  {
    "name": "Alexandra Maier",
    "age": 27
  },
  {
    "name": "Dr. Phil Evans",
    "age": 47
  },
  {
    "name": "Sandra Brugge",
    "age": 33
  },
  {
    "name": "Elisabeth Mayr",
    "age": 29
  },
  {
    "name": "Frank Cube",
    "age": 41
  },
  {
    "name": "Karandeep Alun",
    "age": 48
  },
  {
    "name": "Michaela Drayer",
    "age": 39
  },
  {
    "name": "Bernd Hoftstadt",
    "age": 22
  },
  {
    "name": "Scott Tolib",
    "age": 44
  },
  {
    "name": "Freddy Melver",
    "age": 41
  },
  {
    "name": "Alexis Bohed",
    "age": 35
  },
  {
    "name": "Melanie Palace",
    "age": 27
  },
  {
    "name": "Armin Glutch",
    "age": 35
  },
  {
    "name": "Klaus Arber",
    "age": 53
  },
  {
    "name": "Albert Twostone",
    "age": 68
  },
  {
    "name": "Gordon Black",
    "age": 38
  }
])


db.passengers.find().forEach((passengerData) => { printjson(passengerData) })

//find gives us a cursor and not the element itself. You can use the cursor to iterate through the objects one by one so that you dont use a lot of bandwidth or memory if you load all of the objects at once.Whereas findOne() gives us an object and not a cursor

//Projection
//You filter out only that data which you want. You dont impact your bandwidth, and you can only work with what you need in this case

db.passengers.find({}, { name: 1, _id: 0 }).pretty()

//Embedded Documents
In mongodb you can have upto 100 levels of nesting

db.flightData.remove({})
db.flightData.insertMany([
  {
    "departureAirport": "MUC",
    "arrivalAirport": "SFO",
    "aircraft": "Airbus A380",
    "distance": 12000,
    "intercontinental": true
  },
  {
    "departureAirport": "LHR",
    "arrivalAirport": "TXL",
    "aircraft": "Airbus A320",
    "distance": 950,
    "intercontinental": false
  }
])

db.flightData.updateMany({}, { $set: { status: { description: "on-time", lastUpdated: "1 hour ago" } } })

db.flightData.updateMany({}, { $set: { status: { details: { responsible: "Keshav" } } } })

db.passengers.updateOne({ name: "Albert Twostone" }, { $set: { hobbies: ["cricket", "basketball", "football"] } })

db.passengers.findOne({ name: "Albert Twostone" }).hobbies

db.passengers.findOne({ hobbies: ["cricket", "basketball", "football"] })

db.flightData.find({ "status.details.responsible": "Keshav" })

use zz_patientDb
db.patientData.insertMany([
  {
    "firstName": "Keshav",
    "lastname": "Mathur",
    "age": 29,
    "history": [
      {
        "disease": "cold",
        "treatment": "hot soup"
      },
      {
        "disease": "corona",
        "treatment": "god"
      }
    ]
  },
  {
    "firstName": "Arnold",
    "lastname": "Schwarzenegger",
    "age": 68,
    "history": [
      {
        "disease": "muscle-pull",
        "treatment": "massage"
      },
      {
        "disease": "corona",
        "treatment": "god"
      }
    ]
  },
  {
    "firstName": "Sylvester",
    "lastname": "Stallone",
    "age": 68,
    "history": [
      {
        "disease": "muscle-pull",
        "treatment": "massage"
      },
      {
        "disease": "fever",
        "treatment": "pushups"
      }
    ]
  }])


db.patientData.updateOne(
  { firstName: "Pizza" },  
  {
    $push: {history:{"disease": "constipation", "treatment": "exercise"}},
    $set: {firstName: "Mario", lastname: "Puzo", age: 55}
  } 
)

db.patientData.find({age:{$gt: 10}})
db.patientData.find({"history.disease": "cold"})

db.patientData.deleteMany({"history.disease": "cold"})

