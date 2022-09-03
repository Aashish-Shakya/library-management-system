# library-management-system
This is a book record managment API Backend for managment of records and books build with nodejs and express


# API Documentation link
https://documenter.getpostman.com/view/23027931/VUxPtSFH

# Routes and Endpoints

## /users
POST: Create a new user ✅
GET:  Get all list of users ✅

## /users/{id}
GET: Get a user by id ✅
PUT: Update a user by id ✅
DELETE: Delete a user by Id ✅ (only if user return all the books or not ...)(is there any fne need to pay?..)


## /users/subscription-details/{id}
GET: Get user subscription details
1. Date of subs.
2. Valid till
3. Fine if any
4. 

## /books
GET: Get list of all books ✅
POST: Create a new Book ✅

## /books/{id}
GET : Get book by id✅
PUT: Update a book by id✅
<!-- DELETE: Delete a book by id. -->

## /books/issued/by-user
GET: Get all issued books✅

## /books/issued/withFine  --> Hw
GET: Get all issued book with fine

# Subscription Types
NOTE: //date month day year
BASIC --> 3 Months
STAND. --> 6 Months
PREMIMUM --> 12 Months


If the subscription date is 01/08/22 and Type STAND. then valud date will be 01/02/23.
If he has a issued book and the issued book is to be returned at 01/01/23 and he missed the date of return, then he gets a fine of Rs. 100.

If he has an issued book and the issued book is to be returned at 01/01/23. If he missed the date of return and his subscription also expired the he will get a fine of 100+100 => Rs. 200


<!-- // npm i nodemon --save-dev to save it as a dev dependency means only install for devloping not in deploying-->