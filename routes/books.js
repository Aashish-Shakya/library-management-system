const express = require("express");
const { books } = require('../data/books.json');
const { users } = require('../data/users.json');

const router = express.Router();



/** 
Route: /books
Method : GET
Description: Get all books
Access: Public
Parameters: None
*/

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        data: books,
    })
})


/** 
Route: /bookss/:id
Method : GET
Description: Get single book by its id
Access: Public
Parameters: id
*/

router.get("/:id", (req, res) => {

    const { id } = req.params;
    // console.log({ id })
    const book = books.find((each) => each.id === id);
    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book not found"
        });
    };

    res.status(200).json({
        success: true,
        data: book

    })
});





/** 
Route: /books/issued/by-user
Method : GET
Description: Get all issued books
Access: Public
Parameters: none
*/


router.get('/issued/by-user', (req, res) => {

    const usersWithIssuedBooks = users.filter((each) => {
        if (each.issuedBook) return each;
    });

    const issuedBooks = [];
    usersWithIssuedBooks.forEach((each) => {
        const book = books.find((book) => book.id === each.issuedBook);

        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;
        issuedBooks.push(book);

    });


    if (issuedBooks.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No books issued yet"
        });

    }
    return res.status(200).json({
        success: true,
        data: issuedBooks
    })
});













/** 
Route: /books 
Method : POST
Description: Add/create new book
Access: Public
Parameters: none
*/




router.post('/', (req, res) => {
    const { id, name, author, genre, price, publisher } = req.body;

    const book = books.find((each) => each.id === id);

    if (book) {
        return res.status(404).json({
            success: false,
            message: "book already exists with this id"
        });
    }
    books.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate
    });
    return res.status(201).json({
        success: true,
        message: "book created successfully",
        data: book,

    })
});



/** 
Route: /books/:id 
Method : PUT
Description: Updating a book
Access: Public
Parameters: id
*/


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    const book = books.find((each) => each.id === id);

    if (!book)
        return res.status(404).json({ success: false, message: "book not found with this id" });

    const updatedbook = books.map((each) => {
        if (each.id === id) {
            return {
                ...each,
                ...data,
            };
        }
        return each;
    });
    return res.status(200).json({
        success: true,
        data: updatedbook,
    })
});


/** 
Route: /books/:id 
Method : DELETE
Description: Delete a book by id
Access: Public
Parameters: id
*/

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const book = books.find((each) => each.id === id);

    if (!book) {
        return res.status(404).json({
            success: false,
            message: "book to be deletd was not found"
        });
    };

    const index = books.indexOf(book);
    books.splice(index, 1);

    res.status(202).json({
        success: true,
        data: books
    });
});


//default export
module.exports = router;
