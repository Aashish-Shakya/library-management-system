const { BookModel, UserModel } = require("../models");
const IssuedBook = require("./dtos/book-dto");

exports.getAllBooks = async (req, res) => {
    //Fire a query to find all books in database
    const books = await BookModel.find();

    if (books.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No book found"
        })
    }
    res.status(200).json({
        success: true,
        data: books
    })
};

exports.getSingleBookById = async (req, res) => {

    const { id } = req.params;
    // console.log({ id })
    // const book = books.find((each) => each.id === id);
    const book = await BookModel.findById(id);
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
};

exports.getAllIssuedBooks = async (req, res) => {
    //to find user having issued book parameter.
    const users = await UserModel.find({
        issuedBook: { $exist: true },
    }).populate("issuedBook")


    const issuedBooks = users.map((each) => new IssuedBook(each));
    // const usersWithIssuedBooks = users.filter((each) => {
    //     if (each.issuedBook) return each;
    // });

    // const issuedBooks = [];
    // usersWithIssuedBooks.forEach((each) => {
    //     const book = books.find((book) => book.id === each.issuedBook);

    //     book.issuedBy = each.name;
    //     book.issuedDate = each.issuedDate;
    //     book.returnDate = each.returnDate;
    //     issuedBooks.push(book);

    // });


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
}













