use zz_products

db.products.insertOne({name: "A book", price: 12.99})
db.products.insertOne({name: "A T-Shirt", price: 19.99})
db.products.find().pretty()
db.products.insertOne({name: "A Computer", price: 1299, details:{cpu: "Core i7 8550U"}})
db.products.deleteMany({})

db.products.insertMany([
    {name: "A book", price: 12.99, details:null}, 
    {name: "A T-Shirt", price: 19.99, details:null},
    {name: "A Computer", price: 1299, details:{cpu: "Core i7 8550U"}}])

use zz_companyData

db.companies.insertOne({name: "Fresh Apples Inc", isStartup: true, employees: 33, funding: 12345678901234567890, details: {ceo: "Mark Super"}, tags: [{title: "super"}, {title: "perfect"}], foundingDate: new Date(), insertedAt: new Timestamp()});

db.companies.find().pretty();

db.numbers.insertOne({number: 1});
db.numbers.find()
db.stats()

db.numbers.deleteMany({})

db.numbers.insertOne({number: NumberInt(1)});
db.numbers.find()
db.stats()

typeof db.numbers.findOne().number

/*
Data Types & Limits
MongoDB has a couple of hard limits - most importantly, a single document in a collection (including all embedded documents it might have) must be <= 16mb. Additionally, you may only have 100 levels of embedded documents.

You can find all limits (in great detail) here: https://docs.mongodb.com/manual/reference/limits/

For the data types, MongoDB supports, you find a detailed overview on this page: https://docs.mongodb.com/manual/reference/bson-types/

Important data type limits are:

Normal integers (int32) can hold a maximum value of +-2,147,483,647

Long integers (int64) can hold a maximum value of +-9,223,372,036,854,775,807

Text can be as long as you want - the limit is the 16mb restriction for the overall document

It's also important to understand the difference between int32 (NumberInt), int64 (NumberLong) and a normal number as you can enter it in the shell. The same goes for a normal double and NumberDecimal.

NumberInt creates a int32 value => NumberInt(55)

NumberLong creates a int64 value => NumberLong(7489729384792)

If you just use a number (e.g. insertOne({a: 1}), this will get added as a normal double into the database. The reason for this is that the shell is based on JS which only knows float/ double values and doesn't differ between integers and floats.

NumberDecimal creates a high-precision double value => NumberDecimal("12.99") => This can be helpful for cases where you need (many) exact decimal places for calculations.

When not working with the shell but a MongoDB driver for your app programming language (e.g. PHP, .NET, Node.js, ...), you can use the driver to create these specific numbers.

Example for Node.js: http://mongodb.github.io/node-mongodb-native/3.1/api/Long.html

This will allow you to build a NumberLong value like this:

const Long = require('mongodb').Long;
 
db.collection('wealth').insert( {
    value: Long.fromString("121949898291")
});
By browsing the API docs for the driver you're using, you'll be able to identify the methods for building int32s, int64s etc.

*/

use zz_hospital
db.patients.insertOne({name:"KM", age: 24, diseaseSummary: "summary-max-1"})
db.diseaseSummaries.insertOne({_id: "summary-max-1", diseases:["cold", "broken leg", "fever"]})
let summaryId = db.patients.findOne().diseaseSummary
db.diseaseSummaries.findOne({_id: summaryId})

//one to one

//using embedded
db.patients.deleteMany({})
db.patients.insertOne({name:"KM", age: 24, diseaseSummary: {diseases:["cold", "broken leg", "fever"]}})
db.patients.find()

//using references
use zz_carData
db.person.insertOne({name: "Keshav", age: 24})
db.cars.insertOne({model: "mercedes", price: 50000, owner: ObjectId("5ee58f31801609ae9febf814")})

//one to Many

use zz_support
db.questionThreads.insertOne({creator: "Keshav", question: "How does that all work?", answers: ["q1a1", "q2a2"]})
db.questionThreads.findOne()
db.answers.insertMany([{_id: "q1a1", text: "It works like that"}, {_id: "q1a2", text: "thanks"}])

//using references
use zz_cityData
db.cities.insertOne({name: "New York City", coordinates:{lat: 21, long: 55}})

db.citizens.insertMany([
    {name: "Keshav", city: ObjectId("5ee5b605801609ae9febf817")},
    {name: "Aradhana", city: ObjectId("5ee5b605801609ae9febf817")}])

//Many to Many
use zz_shops2
db.products.insertOne({name: "A book", price: 300}) // ObjectId("5ee5b834801609ae9febf81a")
db.customers.insertOne({name: "Keshav", age: 24}) //ObjectId("5ee5b8a1801609ae9febf81b")
db.customers.updateOne({_id: ObjectId("5ee5b8a1801609ae9febf81b")}, {$set:{orders:[{productId: ObjectId("5ee5b834801609ae9febf81a"), quantity: 2}]}})
db.products.find()

//Lookup
use zz_booksRegistry
db.authors.insertMany([{name: "Keshav", age: 23, address:{street: "Baker Street"}}, {name:"Aradhana", age: 21, address:{street: "Merkle Street"}}]) //ObjectId("5ee5c1ba801609ae9febf81c")  ObjectId("5ee5c1ba801609ae9febf81d")

db.books.insertMany([{name: "Lord of the Rings", authors: []}, {name:"Harry Potter", authors:[]}]) //ObjectId("5ee5c230801609ae9febf81e") ObjectId("5ee5c230801609ae9febf81f")

db.books.updateOne({_id: ObjectId("5ee5c230801609ae9febf81e")}, {$set: {authors: [ObjectId("5ee5c1ba801609ae9febf81c"),ObjectId("5ee5c1ba801609ae9febf81d")]}})

db.books.aggregate([{$lookup: {from: "authors", localField: "authors", foreignField: "_id", as: "authors"}}]).pretty()

//Blog Database
use zz_blog
db.users.insertMany([
    {name: "Keshav", age: 23, email: "keshav37a@gmail.com"}, 
    {name: "Aradhana", age: 21, email: "aradhana@gmail.com"},
    {name: "Bharat", age: 55, email: "bharat@gmail.com"},
    {name: "Shalini", age: 48, email: "shalini@gmail.com"}])

    // ObjectId("5ee5db9b801609ae9febf820"),
    // ObjectId("5ee5db9b801609ae9febf821"),
    // ObjectId("5ee5db9b801609ae9febf822"),
    // ObjectId("5ee5db9b801609ae9febf823")

db.users.find().pretty()
db.posts.insertMany([
    {title: "First post", text: "Yoo Hooo! Whatupp", tags: ["tech", "mobile"], creator: ObjectId("5ee5db9b801609ae9febf820")}, 
    {title: "Second post", text: "Its me", tags: ["psychology", "life"], creator: ObjectId("5ee5db9b801609ae9febf821")}
])

    // ObjectId("5ee5e84b801609ae9febf824")
    // ObjectId("5ee5e84b801609ae9febf825")

db.comments.insertMany([
    {content: "any comment", postId: ObjectId("5ee5e84b801609ae9febf824"), userId: ObjectId("5ee5db9b801609ae9febf822")}, 
    {content: "another comment", postId: ObjectId("5ee5e84b801609ae9febf825"), userId: ObjectId("5ee5db9b801609ae9febf823")}])

//  ObjectId("5ee5ed87801609ae9febf826")
//  ObjectId("5ee5ed87801609ae9febf827")

db.posts.updateOne({_id: ObjectId("5ee5e84b801609ae9febf824")}, {$set:{comments:[ObjectId("5ee5ed87801609ae9febf826")]}})
db.posts.updateOne({_id: ObjectId("5ee5e84b801609ae9febf825")}, {$set:{comments:[ObjectId("5ee5ed87801609ae9febf827")]}})

db.posts.aggregate([
    {$lookup:{from: "users", localField: "creator", foreignField: "_id", as:"creator"}}, 
    {$lookup:{from: "comments", localField: "comments", foreignField: "_id", as:"comments"}}])

//collection document validation
db.posts.drop()

db.createCollection('posts', {
    validator: {
        $jsonSchema:{
            bsonType: "object",
            required: ["title", "text", "tags", "creator"],
            properties:{
                title:{
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                text:{
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                tags:{
                    bsonType: "array",
                    description: "must be an array and is required",
                    items:{
                        bsonType: "string",
                        description: "must be a string and is required",
                    }
                },
                creator:{
                    bsonType: "objectId",
                    description: "must be an objectId and is required",
                }              
            }          
        }
    }
})

//To test without title
db.posts.insertMany([
    {text: "Yoo Hooo! Whatupp", tags: ["tech", "mobile"], creator: ObjectId("5ee5db9b801609ae9febf820")}, 
    {title: "Second post", text: "Its me", tags: ["psychology", "life"], creator: ObjectId("5ee5db9b801609ae9febf821")}
])

//Edit properties of validation
db.runCommand({
    collMod: 'posts',
    validator: {
        $jsonSchema:{
            bsonType: "object",
            required: ["title", "text", "tags", "creator"],
            properties:{
                title:{
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                text:{
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                tags:{
                    bsonType: "array",
                    description: "must be an array and is required",
                    items:{
                        bsonType: "string",
                        description: "must be a string and is required",
                    }
                },
                creator:{
                    bsonType: "objectId",
                    description: "must be an objectId and is required",
                }              
            }          
        }
    },
    validationAction: 'warn'
})

//To test without title - working
db.posts.insertMany([
    {text: "Yoo Hooo! Whatupp", tags: ["tech", "mobile"], creator: ObjectId("5ee5db9b801609ae9febf820")}, 
    {title: "Second post", text: "Its me", tags: ["psychology", "life"], creator: ObjectId("5ee5db9b801609ae9febf821")}
])