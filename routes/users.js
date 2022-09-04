const express = require("express");
const { getSingleBookById } = require("../controllers/book-controller");
const { getAllUsers, getSingleUserById, deleteUserById, updateUserById, createNewUser, getSubscriptionDetailsById } = require("../controllers/user-controller");
const { users } = require('../data/users.json');


const router = express.Router();


/** 
Route: /users
Method : GET
Description: Get all users
Access: Public
Parameters: None
*/

// router.get("/", (req, res) => {
//     res.status(200).json({
//         success: true,
//         data: users,
//     })
// })
router.get("/", getAllUsers);

/** 
Route: /users/:id
Method : GET
Description: Get single user by its id
Access: Public
Parameters: id
*/

// router.get("/:id", (req, res) => {

//     const { id } = req.params;
//     // console.log({ id })
//     const user = users.find((each) => each.id === id);
//     if (!user) {
//         return res.status(404).json({
//             success: false,
//             message: "User not found"
//         });
//     };

//     res.status(200).json({
//         success: true,
//         data: user,
//         // })
//     })
// });


router.get("/:id", getSingleUserById);
/** 
Route: /users 
Method : POST
Description: Create new user
Access: Public
Parameters: none
*/

// router.post('/', (req, res) => {
//     const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;

//     const user = users.find((each) => each.id === id);

//     if (user) {
//         return res.status(404).json({
//             success: false,
//             message: "User already exists with this id"
//         });
//     }
//     users.push({
//         id,
//         name,
//         surname,
//         email,
//         subscriptionType,
//         subscriptionDate
//     });
//     return res.status(201).json({
//         success: true,
//         message: "User created successfully",
//         data: user,

//     })
// });

router.post('/', createNewUser)


/** 
Route: /users/:id 
Method : PUT
Description: Updating a user
Access: Public
Parameters: id
*/


// router.put('/:id', (req, res) => {
//     const { id } = req.params;
//     const { data } = req.body;
//     const user = users.find((each) => each.id === id);

//     if (!user)
//         return res.status(404).json({ success: false, message: "User not found with this id" });

//     const updatedUser = users.map((each) => {
//         if (each.id === id) {
//             return {
//                 ...each,
//                 ...data,
//             };
//         }
//         return each;
//     });
//     return res.status(200).json({
//         success: true,
//         data: updatedUser,
//     })
// });

router.put('/:id', updateUserById);
/** 
Route: /users/:id 
Method : DELETE
Description: Delete a user by id
Access: Public
Parameters: id
*/

// router.delete('/:id', (req, res) => {
//     const { id } = req.params;
//     const user = users.find((each) => each.id === id);

//     if (!user) {
//         return res.status(404).json({
//             success: false,
//             message: "User to be deletd was not found"
//         });
//     };

//     const index = users.indexOf(user);
//     users.splice(index, 1);

//     res.status(202).json({
//         success: true,
//         data: users
//     });
// });

router.delete('/:id', deleteUserById);
/** 
Route: /users/subscription-details/:id
Method : GET
Description: Get all user subscription details by id
Access: Public
Parameters: id
*/


// router.get("/subscription-details/:id", (req, res) => {
//     const { id } = req.params;

//     const user = users.find((each) => each.id === id);

//     if (!user) {
//         return res.status(404).json({
//             success: false,
//             message: "User not found"
//         });

//     }
//     const getDateInDays = (data = "") => {
//         let date;
//         if (data === "") {
//             //current date
//             date = new Date();

//         } else {

//             //date which user pass
//             date = new Date(data);
//         }
//         let days = Math.floor(date / (1000 * 60 * 60 * 24));
//         return days;

//     };

//     const subscriptionType = (date) => {
//         if (user.subscriptionType === "Basic") {
//             date = date + 90;

//         } else if (user.subscriptionType === "Standard") {
//             date = date + 180;
//         } else if (user.subscriptionType === "Premium") {
//             date = date + 365;
//         } return date;
//     };

//     //Subscription Expiration Calculation
//     //January 1, 1970, UTC. // milliseconds

//     let returnDate = getDateInDays(user.returnDate);
//     let currentDate = getDateInDays();
//     let subscriptionDate = getDateInDays(user.subscriptionDate);
//     let subscriptionExpiry = subscriptionType(subscriptionDate);


//     console.log("Return Date", returnDate);
//     console.log("Current Date", currentDate);
//     console.log("Subscription Date", subscriptionDate);
//     console.log("SubscriptiomExpiry Date", subscriptionExpiry);
//     const data = {
//         ...user,
//         subscriptionExpired: subscriptionExpiry < currentDate,
//         datysLeftForExpiry:
//             subscriptionExpiry <= currentDate ? 0 : subscriptionExpiry - currentDate,
//         fine:
//             returnDate < currentDate ? subscriptionExpiry <= currentDate ? 200 : 100 : 0,
//     }

//     res.status(200).json({
//         success: true,
//         data
//     })

// });
router.get("/subscription-details/:id", getSubscriptionDetailsById);



module.exports = router;
