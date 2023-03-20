const express = require("express");
const bookRouter = require("./routes/bookRouter")

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}))

const PORT = 5001;

// routes for CRUD operations on books
app.use("/books", bookRouter);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})
