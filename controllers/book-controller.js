const { BookModel, UserModel } = require("../models");
const IssuedBook = require("../dtos/book-dto");

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
        issuedBook: { $exists: true },
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



exports.addNewBook = async (req, res) => {

    const { data } = req.body;

    if (!data) {
        return res.status(400).json({
            success: false,
            message: "No data Provided;"
        });
    }

    await BookModel.create(data);

    // if (book) {
    //     return res.status(404).json({
    //         success: false,
    //         message: "book already exists with this id"
    //     });
    // }


    const allBooks = await BookModel.find();

    return res.status(201).json({
        success: true,
        message: "book created successfully",
        data: allBooks,

    })
};


exports.updateBookById = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    // const book = books.find((each) => each.id === id);


    const updatedBook = await BookModel.findOneAndUpdate(
        {
            _id: id
        }, data,
        { new: true, });

    // if (!book)
    //     return res.status(404).json({ success: false, message: "book not found with this id" });

    // const updatedbook = books.map((each) => {
    //     if (each.id === id) {
    //         return {
    //             ...each,
    //             ...data,
    //         };
    //     }
    //     return each;
    // });
    return res.status(200).json({
        success: true,
        data: updatedBook,
    })
};









// Additional Route
exports.getSingleBookByName = async (req, res) => {

    const { name } = req.params;
    // console.log({ id })
    // const book = books.find((each) => each.id === id);
    const book = await BookModel.findOne({
        name: name
    });
    console.log(name);
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
