// BUILD YOUR SERVER HERE
const express = require('express')
const users = require('./users/model')
const server = express()

server.use(express.json())

server.get("/", (req, res)=> {
    res.json({
        message: "Hello World"
    })
})

server.get("/users", (req, res) => {
    users.find()
        .then((users)=> {
            res.status(200).json(users)
        })
        .catch((error)=> {
            console.log(error)
            res.status(500).json({
                message: "The users information could not be retrieved",
            })
        })
})

server.get("/users/:id", (req, res) => {
    users.findById(req.params.id)
            .then((user) => {
                if(user) {
                    res.status(200).json(user)
                }else {
                    res.status(404).json({
                        message: "The user with the specified ID does not exist" 
                    })
                }
            })
            .catch((error)=> {
                console.log(error)
                res.status(500).json({
                    message: "The user information could not be retrieved"
                })
            })
})

server.post("/users", (req, res) => {
        if(!req.body.name || !req.body.bio){
            return res.status(400).json({
                message: 'Please provide name and bio for user'
            })
        }
     users.insert(req.body)
            .then((user) => {
                res.status(201).json(user)
            })
            .catch((error) => {
                console.log(error)
                res.status(500).json({
                    message: "There was an error while saving the user to the database"
                })
            })
})

server.put("/users/:id", (req, res) => {
    if(!req.body.name) {
        return res.status(400).json({
            message: "No user name"
        })
    }

    users.update(req.params.id, req.body)
        .then((user) => {
            if(user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({
                    message: "User not found"
                })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: 'Prob updating User'
            })
        })
})

server.delete("/users/:id", (req, res) => {
    
    users.remove(req.params.id)
    .then((count) => {
        if (count > 0) {
            res.status(200).json({
                message: "The user has been nuked",
            })
        } else {
            res.status(404).json({
                message: "The user with the specified ID does not exist",
            })
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            message: "The user could not be removed" ,
        })
    })
})



module.exports = server; // EXPORT YOUR SERVER instead of {}
