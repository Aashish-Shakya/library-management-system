const { application } = require("express");
const express = require("express");
const dotenv = require("dotenv")
//database connection
const DbConnection = require("./databaseConnection");
// Imported JSOn Data
const { users } = require('./data/users.json')

// Importing Routes

const usersRouter = require("./routes/users")
const booksRouter = require("./routes/books")

dotenv.config();

const app = express();
//calling that DbConnection fn
DbConnection();
const PORT = 8081;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is up and running"
    });
});

//If there any request if '/this' , then take to this,,)
app.use('/users', usersRouter);
app.use('/books', booksRouter);


app.get("*", (req, res) => {
    res.status(404).json({
        message: "This route does not exist"
    });
})

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})

// https://documenter.getpostman.com/view/23027931/VUxPtSFH


//Now we are going to break our codes in multiple files for high readbility