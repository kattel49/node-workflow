const express = require("express");
const request = require("supertest");
const bookRouter = require("../routes/bookRouter");

const app = express();

app.use("/books", bookRouter);


describe("Test for the books route", () => {
    it("GET request on /books route", async() => {
        const {status, body} = await request(app).get("/books");
        // test status code
        expect(status).toBe(200);
        // test the array to contain objects
        expect(body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                "id": expect.any(Number),
                "author": expect.any(String),
                "co-author": expect.any(String),
                "type": expect.any(String),
                "contact": expect.any(String)
            })
        ]))
    })

    it("GET request on /books/<id>", async () => {
        const book_id = 5;
        const {status, body} = await request(app).get(`/books/${book_id}`);
        // test status code
        expect(status).toBe(200);
        // test id of the body to be the same
        expect(body["id"]).toBe(book_id);
        // test that the object has all the properties
        expect(body).toEqual(expect.objectContaining({
            "author": expect.any(String),
            "co-author": expect.any(String),
            "type": expect.any(String),
            "contact": expect.any(String)
        }))
    })

    it("POST request on /books", async () => {
        const book = {
            "id" : 10,
            "author": "shubhushan",
            "co-author": "x",
            "type": "fiction",
            "contact": "x"
        }

        const {status, body} = await request(app)
                                .post("/books")
                                .send(book)
                                .set("Content-Type", "application/json")
                                .set("Accept", "application/json");
        // shallow check
        expect(status).toBe(201);
        // deep equals
        expect(body).toEqual(book);
    })

    it("GET request on a /books/test", async () => {1
        let tmp_book = {
            "id": 100,
            "author": "shubhushan",
            "co-author": "shubhushan",
            "type": "fiction",
            "contact": "shubhushan"
        };

        const {status, body} = await request(app).get("/books/test");

        expect(status).toBe(200);
        expect(body).toEqual(tmp_book);
    })


    it("PUT request on a /book/<book_id>", async () => {
        let book_id = 10;
        let book = {
            "author": "shubhushan",
            "type": "fiction"
        }

        const {status, body} = await request(app)
                                .put(`/books/${book_id}`)
                                .send(book)
                                .set("Content-Type", "application/json")
                                .set("Accept", "application/json")
        // test status code
        expect(status).toBe(200);

        // test the attributes of the changed object
        expect(body["id"]).toEqual(book_id);
        expect(body['author']).toEqual(book["author"]);
        expect(body["type"]).toEqual(book["type"]);
        
        // test if the response has any missing fields
        expect(body).toEqual(expect.objectContaining({
            "co-author": expect.any(String),
            "contact": expect.any(String)
        }))
    })
});