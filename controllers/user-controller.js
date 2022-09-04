const { BookModel, UserModel } = require("../models");

exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find();

    if (users.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No user found"
        })
    }

    res.status(200).json({
        success: true,
        data: users,
    })
};

exports.getSingleUserById = async (req, res) => {

    const { id } = req.params;

    const user = await UserModel.findById({ _id: id });
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "Book not found"
        });
    };

    res.status(200).json({
        success: true,
        data: user

    })
};

exports.createNewUser = async (req, res) => {
    const { data } = req.body;

    const newUser = await UserModel.create(data);

    // if (newUser) {
    //     return res.status(404).json({
    //         success: false,
    //         message: "User already exists with this id"
    //     });
    // }

    return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: newUser,

    })
};


exports.updateUserById = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    const updatedUserData = await UserModel.findOneAndUpdate({
        _id: id,
    }, {
        $set: {
            ...data,
        },
    }, {
        new: true,
    })

    if (!updatedUserData) {
        return res.status(404).json({ success: false, message: "User not found with this id" });
    }

    return res.status(200).json({
        success: true,
        data: updatedUserData,
    })
};




exports.deleteUserById = async (req, res) => {
    const { id } = req.params;
    const user = await UserModel.deleteOne({
        _id: id,
    });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User to be deletd was not found"
        });
    };


    res.status(202).json({
        success: true,
        messagae: "Deletd user successfully",
        data: user,
    });
};


exports.getSubscriptionDetailsById = async (req, res) => {
    const { id } = req.params;

    const user = await UserModel.findById(id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });

    }
    const getDateInDays = (data = "") => {
        let date;
        if (data === "") {
            //current date
            date = new Date();

        } else {

            //date which user pass
            date = new Date(data);
        }
        let days = Math.floor(date / (1000 * 60 * 60 * 24));
        return days;

    };

    const subscriptionType = (date) => {
        if (user.subscriptionType === "Basic") {
            date = date + 90;

        } else if (user.subscriptionType === "Standard") {
            date = date + 180;
        } else if (user.subscriptionType === "Premium") {
            date = date + 365;
        } return date;
    };

    //Subscription Expiration Calculation
    //January 1, 1970, UTC. // milliseconds

    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiry = subscriptionType(subscriptionDate);


    console.log("Return Date", returnDate);
    console.log("Current Date", currentDate);
    console.log("Subscription Date", subscriptionDate);
    console.log("SubscriptiomExpiry Date", subscriptionExpiry);
    const data = {
        ...user._doc,
        subscriptionExpired: subscriptionExpiry < currentDate,
        datysLeftForExpiry:
            subscriptionExpiry <= currentDate ? 0 : subscriptionExpiry - currentDate,
        fine:
            returnDate < currentDate ? subscriptionExpiry <= currentDate ? 200 : 100 : 0,
    }

    res.status(200).json({
        success: true,
        data
    })

};
