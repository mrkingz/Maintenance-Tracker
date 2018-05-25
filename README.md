[![Build Status](https://travis-ci.org/mrkingz/Maintenance-Tracker.svg?branch=feature)](https://travis-ci.org/mrkingz/Maintenance-Tracker)
[![Coverage Status](https://coveralls.io/repos/github/mrkingz/Maintenance-Tracker/badge.svg?branch=feature)](https://coveralls.io/github/mrkingz/Maintenance-Tracker?branch=feature)
[![Maintainability](https://api.codeclimate.com/v1/badges/d9cead78664ad2731767/maintainability)](https://codeclimate.com/github/mrkingz/Maintenance-Tracker/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d9cead78664ad2731767/test_coverage)](https://codeclimate.com/github/mrkingz/Maintenance-Tracker/test_coverage)

# Maintenance-Tracker
Maintenance Tracker App is an application that provides users with the ability to reach out to
operations or repairs department regarding repair or maintenance requests and monitor the
status of their request.

Live at https://mrkingz.github.io/Maintenance-Tracker/ui/index.html

# Features
- Users can create an account and log in.
- The users should be able to make maintenance or repairs request.
- An admin should be able to approve/reject a repair/maintenance request.
- The admin should be able to mark request as resolved once it is done.
- The admin should be able to view all maintenance/repairs requests on the application
- The admin should be able to filter requests
- The user can view all his/her requests

## Application Features
- Users can sign up
- Users/Admin can sign in
- Users/Admin can edit thier password
- Users/Admin can Recover their lost password
- Users/Admin can create a maintenance request
- Users/Admin can view deatils of a signle maintenance request
- Users/Admin can view thier maintenance/repair request catalog
- Users can update his/her maintenance/repair request details except request status
- Only Admin can update maintenance/repair request status 
- Admin can filter request by status, priority and department when viewing request


## Technology Stack
* NodeJS
* Express
* JavaScript
* HTML
* CSS
* Postgresql Relational Database

## Getting Started
* Install **NodeJs** and **Postgresql** (PGAdmin 4 preferably) locally on your machine or signup to an online hosted database e.g ElephantSql
* Clone the repository from bash or windows command
```sh
> $ `git clone https://github.com/mrkingz/Maintenance-Tracker.git
```

* Change into the directory
```sh
> $ `cd /Maintenance-Tracker`

```
* Create your database schema using, and also create the following tables:
 #### Table: users
 ```sh
 > Fields:
 - userId
 - email
 - username
 - password
 - createAt
 - updateAt
 ```
 #### Table: requests
 ```sh
 > Fields:
 - requestId
 - subject
 - priority
 - status
 - description
 - department
 - userId
 - createAt
 - updateAt
 ```
 
* Install all required dependencies with
```sh
> $ `npm install`
```

```
* After successful installation, create a `.env` file which will be used to load environment variables 
 **see .env.example file as a sample**
* Create a databse to be used with application
```

## Testing
* Run Test `$ npm run tests`

## Application Limitations
* Only one admin can exist
* Only a user with admin privilege can update request status
* Users can only create account once with their username, email and password
* Users will have to obtain a fresh token after 72 hours when their session has expired
* Users will only be able to access the full application functionalities only if they are signed in

## How To Contribute
* Fork the repository
* Create a feature branch with a feature.md file
* Write tests and make them pass
* Open a pull request
