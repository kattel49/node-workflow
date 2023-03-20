const express = require("express");
const randomString = require("randomstring")

const bookRouter = express.Router();

bookRouter.use(express.json())

bookRouter.get("/", (req, res) => {
    let book_array = []

    for(let i = 0; i<10; i++){
        let tmp_book = {
            "id": Math.floor(Math.random()*100),
            "author": randomString.generate(10),
            "type": randomString.generate(5),
            "contact": randomString.generate(7),
            "co-author": randomString.generate(8)
        }

        book_array.push(tmp_book);
    }

    res.json(book_array);
})

bookRouter.get("/test", (req, res) => {
    let tmp_book = {
        "id": 100,
        "author": "shubhushan",
        "co-author": "shubhushan",
        "type": "fiction",
        "contact": "shubhushan"
    };
    res.json(tmp_book);
})

bookRouter.get("/:book_id", (req, res) => {
    let book_id = req.params.book_id;
    let tmp_book = {
        "id": Number(book_id),
        "author": randomString.generate(10),
        "type": randomString.generate(5),
        "contact": randomString.generate(7),
        "co-author": randomString.generate(8)
    };
    res.json(tmp_book);
})

bookRouter.post("/", (req, res) => {
    let book = req.body;
    // implementation for saving to the database
    console.log(book);
    res.status(201)
    res.json(book)
})

bookRouter.put("/:book_id", (req, res) => {
    let book_id = req.params.book_id;
    let body = req.body;
    body["id"] = Number(book_id);
    if(!Object.hasOwn(body, "author")){
        body["author"] = randomString.generate(10);
    }
    if(!Object.hasOwn(body, "co-author")){
        body["co-author"] = randomString.generate(10);
    }
    if(!Object.hasOwn(body, "type")){
        body["type"] = randomString.generate(5);
    }
    if(!Object.hasOwn(body, "contact")){
        body["contact"] = randomString.generate(10);
    }
    res.json(body)
})


module.exports = bookRouter