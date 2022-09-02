const express = require("express");
const { users } = require('../data/users.json');

const router = express.Router();


/** 
Route: /users
Method : GET
Description: Get all users
Access: Public
Parameters: None
*/

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        data: users,
    })
})


/** 
Route: /users/:id
Method : GET
Description: Get single user by its id
Access: Public
Parameters: id
*/

router.get("/:id", (req, res) => {

    const { id } = req.params;
    // console.log({ id })
    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    };

    res.status(200).json({
        success: true,
        data: user,
        // })
    })
});


/** 
Route: /users 
Method : POST
Description: Create new user
Access: Public
Parameters: none
*/

router.post('/', (req, res) => {
    const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;

    const user = users.find((each) => each.id === id);

    if (user) {
        return res.status(404).json({
            success: false,
            message: "User already exists with this id"
        });
    }
    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate
    });
    return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,

    })
});



/** 
Route: /users/:id 
Method : PUT
Description: Updating a user
Access: Public
Parameters: id
*/


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    const user = users.find((each) => each.id === id);

    if (!user)
        return res.status(404).json({ success: false, message: "User not found with this id" });

    const updatedUser = users.map((each) => {
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
        data: updatedUser,
    })
});


/** 
Route: /users/:id 
Method : DELETE
Description: Delete a user by id
Access: Public
Parameters: id
*/

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User to be deletd was not found"
        });
    };

    const index = users.indexOf(user);
    users.splice(index, 1);

    res.status(202).json({
        success: true,
        data: users
    });
});

module.exports = router;
