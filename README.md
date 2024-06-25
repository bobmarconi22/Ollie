![Ollie Logo](/react-vite/public/ollie.png)

##

Ollie, Inspired by Rover, is an interactive site where Pet Sitters can advertise their services and Pet Owners can find and compare Sitters based on their reviews.

- Users are able to easily create an account with the "Sign Up" functionality and can also view, edit, and delete their account/details.
- The user is able to Create, Review, Update, and Delete Pets to their Account.
- the same goes for Addresses that they can assign to pets OR their service (if they have a sitter account).
- Once a user adds a pet, that pet gets its own 'Pet Account" that can be used to leave Reviews, which can be created, edited, and even deleted by the user who owns the pet account, and are displayed on the appropriate Sitters account.
- Users can schedule bookings for their pets by creating a Booking Request, which must be accepted by the user, once accepted it becomes a full Booking.

[Ollie Site (Live Host)](https://ollie-05bo.onrender.com)

## Images:


## About The Creator:

Hi, I am Bob Marconi! Please follow or support my other projects below!

[![](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/bob-marconi-3656932a9/) ![](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)

## Used Languages:

![](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![AWS](https://img.shields.io/badge/aws-%23316192.svg?style=for-the-badge&logo=amazonwebservices&logoColor=white)
![AWS](https://img.shields.io/badge/docker-%23316192.svg?style=for-the-badge&logo=docker&logoColor=white)
![](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## Future Features:

- Update & Delete functionality for Bookings/Booking Requests.
- Google Maps API implementation.

## Getting started:

1. Clone this repository (only this branch).

2. Install dependencies.

   ```bash
   pipenv install -r requirements.txt
   ```

3. Create a **.env** file based on the example with proper settings for your
   development environment.

4. Make sure the SQLite3 database connection URL is in the **.env** file.

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable. Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention.**

6. Get into your pipenv, migrate your database, seed your database, and run your
   Flask app:

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. The React frontend has no styling applied. Copy the **.css** files from your
   Authenticate Me project into the corresponding locations in the
   **react-vite** folder to give your project a unique look.

8. To run the React frontend in development, `cd` into the **react-vite**
   directory and run `npm i` to install dependencies. Next, run `npm run build`
   to create the `dist` folder. The starter has modified the `npm run build`
   command to include the `--watch` flag. This flag will rebuild the **dist**
   folder whenever you change your code, keeping the production version up to
   date.

## Deployment through Render.com:

First, recall that Vite is a development dependency, so it will not be used in
production. This means that you must already have the **dist** folder located in
the root of your **react-vite** folder when you push to GitHub. This **dist**
folder contains your React code and all necessary dependencies minified and
bundled into a smaller footprint, ready to be served from your Python API.

Begin deployment by running `npm run build` in your **react-vite** folder and
pushing any changes to GitHub.

Refer to your Render.com deployment articles for more detailed instructions
about getting started with [Render.com], creating a production database, and
deployment debugging tips.

From the Render [Dashboard], click on the "New +" button in the navigation bar,
and click on "Web Service" to create the application that will be deployed.

Select that you want to "Build and deploy from a Git repository" and click
"Next". On the next page, find the name of the application repo you want to
deploy and click the "Connect" button to the right of the name.

Now you need to fill out the form to configure your app. Most of the setup will
be handled by the **Dockerfile**, but you do need to fill in a few fields.

Start by giving your application a name.

Make sure the Region is set to the location closest to you, the Branch is set to
"main", and Runtime is set to "Docker". You can leave the Root Directory field
blank. (By default, Render will run commands from the root directory.)

Select "Free" as your Instance Type.

### Add environment variables

In the development environment, you have been securing your environment
variables in a **.env** file, which has been removed from source control (i.e.,
the file is gitignored). In this step, you will need to input the keys and
values for the environment variables you need for production into the Render
GUI.

Add the following keys and values in the Render GUI form:

- SECRET_KEY (click "Generate" to generate a secure secret for production)
- FLASK_ENV production
- FLASK_APP app
- SCHEMA (your unique schema name, in snake_case)

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from the **External Database URL** field)

**Note:** Add any other keys and values that may be present in your local
**.env** file. As you work to further develop your project, you may need to add
more environment variables to your local **.env** file. Make sure you add these
environment variables to the Render GUI as well for the next deployment.

### Deploy

Now you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your Dockerfile
commands being executed and any errors that occur.

When deployment is complete, open your deployed site and check to see that you
have successfully deployed your Flask application to Render! You can find the
URL for your site just below the name of the Web Service at the top of the page.

**Note:** By default, Render will set Auto-Deploy for your project to true. This
setting will cause Render to re-deploy your application every time you push to
main, always keeping it up to date.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/

# Backend API-Routes

Ollie uses the following back-end routes

## USER & AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

- **Request:** Endpoints that require authentication
- **Error Response:** Authentication Required
  - **Status Code:** 401
  - **Headers:**
    - `Content-Type: application/json`
  - **Body:**
    ```json
    {
      "message": "Authentication required"
    }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the correct role(s) or permission(s).

- **Request:** Endpoints that require proper authorization
- **Error Response:** Forbidden
  - **Status Code:** 403
  - **Headers:**
    - `Content-Type: application/json`
  - **Body:**
    ```json
    {
      "message": "Forbidden"
    }
    ```

### Get the Current User

Returns the information about the current user that is logged in.

- **Require Authentication:** false
- **Request:**
  - **Method:** GET
  - **URL:** `/api/auth`
  - **Body:** none
- **Successful Response when there is a logged in user:**
  - **Status Code:** 200
  - **Headers:**
    - `Content-Type: application/json`
  - **Body:**
    ```json
    {
      "user": {
        "addresses": [
          {
            "address_line": "333 Meow Dr.",
            "city": "Chicago",
            "id": 8,
            "nickname": "Home",
            "postal_code": "60607",
            "sitting_address": true,
            "state": "Illinois",
            "user_id": 8
          }
        ],
        "at_home": true,
        "booking_requests": [],
        "bookings": [
          {
            "address": {
              "address_line": "123 Puppy Rd.",
              "city": "Philadelphia",
              "id": 1,
              "nickname": "Home",
              "postal_code": "19380"
            },
            "address_id": 1,
            "at_home": true,
            "end_date": "Mon, 24 Jun 2024 10:59:39 GMT",
            "id": 1,
            "overnight": true,
            "pet": {
              "birthday": "Fri, 22 Mar 2019 00:00:00 GMT",
              "breed": "Labrador",
              "home_address": null,
              "id": 3,
              "name": "Max",
              "owner_id": 2,
              "pet_pic": "https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png",
              "special_requests": "Special diet"
            },
            "pet_id": 3,
            "sitter_id": 8,
            "start_date": "Sat, 22 Jun 2024 10:59:39 GMT"
          }
        ],
        "email": "demo@aa.io",
        "first_name": "Demo",
        "id": 8,
        "last_name": "User",
        "overnight": true,
        "pets": [
          {
            "birthday": "Mon, 06 Oct 2014 00:00:00 GMT",
            "breed": "Beagle Mix",
            "home_address": {
              "address_line": "333 Meow Dr.",
              "city": "Chicago",
              "id": 8,
              "nickname": "Home",
              "postal_code": "60607",
              "sitting_address": true,
              "state": "Illinois",
              "user_id": 8
            },
            "id": 1,
            "name": "Louie",
            "owner_id": 8,
            "pet_pic": "https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png",
            "special_requests": ""
          }
        ],
        "phone": "555-555-5501",
        "profile_pic": "img.url",
        "reviews": [
          {
            "created_at": "Fri, 21 Jun 2024 10:59:39 GMT",
            "id": 1,
            "pet": {
              "birthday": "Mon, 15 Jun 2020 00:00:00 GMT",
              "breed": "Golden Retriever",
              "home_address": null,
              "id": 5,
              "name": "Charlie",
              "owner_id": 8,
              "pet_pic": "img.url",
              "special_requests": ""
            },
            "pet_id": 5,
            "rating": 5,
            "review": "Charlie had a great time!",
            "sitter_id": 8,
            "updated_at": "Fri, 21 Jun 2024 10:59:39 GMT"
          }
        ],
        "sitter": true,
        "username": "demo_user"
      }
    }
    ```
- **Successful Response when there is no logged in user:**
  - **Status Code:** 200
  - **Headers:**
    - `Content-Type: application/json`
  - **Body:**
    ```json
    {
      "user": null
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's information.

- **Require Authentication:** false
- **Request:**
  - **Method:** POST
  - **URL:** `/api/auth/login`
  - **Headers:**
    - `Content-Type: application/json`
  - **Body:**
    ```json
    {
      "credential": "demo@aa.io",
      "password": "password"
    }
    ```
- **Successful Response:**
  - **Status Code:** 200
  - **Headers:**
    - `Content-Type: application/json`
  - **Body:**
    ```json
    {
      "user": {
        "addresses": [{obj}, {obj}, ...],
        "at_home": true,
        "booking_requests": [],
        "bookings": [{obj}, {obj}, ...],
        "email": "demo@aa.io",
        "first_name": "Demo",
        "id": 8,
        "last_name": "User",
        "overnight": true,
        "pets": [{obj}, {obj}, ...],
        "phone": "555-555-5501",
        "profile_pic": "img.url",
        "reviews": [{obj}, {obj}, ...],
        "sitter": true,
        "username": "demo_user"
      }
    }
    ```
- **Error Response: Invalid credentials**
  - **Status Code:** 401
  - **Headers:**
    - `Content-Type: application/json`
  - **Body:**
    ```json
    {
      "message": "Invalid credentials"
    }
    ```
- **Error Response: Body validation errors**
  - **Status Code:** 400
  - **Headers:**
    - `Content-Type: application/json`
  - **Body:**
    ```json
    {
      "message": "Bad Request",
      "errors": {
        "credential": "Email or username is required",
        "password": "Password is required"
      }
    }
    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current user's information.

- **Require Authentication:** false
- **Request:**
  - **Method:** POST
  - **URL:** `/api/auth/signup`
  - **Headers:**
    - `Content-Type: application/json`
  - **Body:**
    ```json
    {
      "first_name": "Demo",
      "last_name": "User",
      "email": "demo@aa.io",
      "username": "Demo_user",
      "password": "password"
    }
    ```
- **Successful Response:**
  - **Status Code:** 200
  - **Headers:**
    - `Content-Type: application/json`
  - **Body:**
    ```json
    {
      "user": {
        "addresses": [{obj}, {obj}, ...],
        "at_home": true,
        "booking_requests": [],
        "bookings": [{obj}, {obj}, ...],
        "email": "demo@aa.io",
        "first_name": "Demo",
        "id": 8,
        "last_name": "User",
        "overnight": true,
        "pets": [{obj}, {obj}, ...],
        "phone": "555-555-5501",
        "profile_pic": "img.url",
        "reviews": [{obj}, {obj}, ...],
        "sitter": true,
        "username": "demo_user"
      }
    }
    ```
- **Error Response: User already exists with the specified email**
  - **Status Code:** 500
  - **Headers:**
    - `Content-Type: application/json`
  - **Body:**
    ```json
    {
      "message": "User already exists",
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```
- **Error Response: User already exists with the specified username**
  - **Status Code:** 500
  - **Headers:**
    - `Content-Type: application/json`
  - **Body:**
    ```json
    {
      "message": "User already exists",
      "errors": {
        "username": "User with that username already exists"
      }
    }
    ```
- **Error Response: Body validation errors**
  - **Status Code:** 400
  - **Headers:**
    - `Content-Type: application/json`
  - **Body:**
    ```json
    {
      "message": "Bad Request",
      "errors": {
        "email": "Invalid email",
        "username": "Username is required",
        "first_name": "First Name is required",
        "last_name": "Last Name is required"
      }
    }
    ```

## PETS

### Get all Pets

- **Require Authentication:** false
- **Request:**
  - **Method:** GET
  - **URL:** `/api/pets/all`
  - **Body:** none
- **Successful Response:**
  - Returns an array of all Pet objects
  - **Status Code:** 200

### Get all Pets owned by the Current User


- **Require Authentication:** true
- **Request:**
  - **Method:** GET
  - **URL:** `/api/auth`
  - **Body:** none
- **Successful Response:**
  - Returns an array of all the Pets owned by the current user (accessed through User.toDict() method).
  - **Status Code:** 200

### Get details of a Pet from an id


- **Require Authentication:** false
- **Request:**
  - **Method:** GET
  - **URL:** `/api/pet/:pet_id`
  - **Body:** none
- **Successful Response:**
  - **Status Code:** 200
- **Error Response: Couldn't find a Pet with the specified id**
  - Returns Pet details selected by pet id.
  - **Status Code:** 404

### Create a Pet


- **Require Authentication:** true
- **Request:**
  - **Method:** POST
  - **URL:** `/api/pet/create`
- **Successful Response:**
  - **Status Code:** 201
- **Error Response: Body validation errors**
  - Creates and adds new pet to user profile.
  - **Status Code:** 400

### Edit a Pet

- **Require Authentication:** true
- **Require proper authorization:** Pet must belong to the current user
- **Request:**
  - **Method:** PUT
  - **URL:** `/api/pet/:pet_id/update`
- **Successful Response:**
  - Updates details of an existing Pet.
  - **Status Code:** 200


- **Error Response: Body validation errors**
  - **Status Code:** 400
- **Error Response: Couldn't find a Pet with the specified id**
  - **Status Code:** 404

### Delete a Pet Account


- **Require Authentication:** true
- **Require proper authorization:** Pet must belong to the current user
- **Request:**
  - **Method:** DELETE
  - **URL:** `/api/pet/:pet_id/delete`
  - **Body:** none
- **Successful Response:**
  - Deletes an existing Pet Profile.
  - **Status Code:** 200
  - **Headers:**
    - `Content-Type: application/json`
  - **Body:**
    ```json
    {
      "message": "Successfully deleted"
    }
    ```

- **Error Response: Couldn't find a Business with the specified id**
  - **Status Code:** 404

## REVIEWS

### Create a Review

- **Require Authentication:** true
- **Request:**
  - **Method:** POST
  - **URL:** `/api/review/create`
- **Successful Response:**
  - Create and return a new review for a Sitter specified by their user id.
  - **Status Code:** 201
- **Error Response: Body validation errors**
  - **Status Code:** 400
- **Error Response: Couldn't find a Sitter with the specified id**
  - **Status Code:** 404
- **Error Response: Review from the current Pet already exists for the Sitter**
  - **Status Code:** 500

### Edit a Review

- **Require Authentication:** true
- **Require proper authorization:** Review must belong to the current user
- **Request:**
  - **Method:** PUT
  - **URL:** `/api/review/:review_id`
- **Successful Response:**
  - Update details of an existing review.
  - **Status Code:** 200

- **Error Response: Body validation errors**
  - **Status Code:** 400
- **Error Response: Couldn't find a Review with the specified id**
  - **Status Code:** 404

### Delete a Review


- **Require Authentication:** true
- **Require proper authorization:** Review must belong to the current user
- **Request:**
  - **Method:** DELETE
  - **URL:** `/api/review/:review_id/delete`
  - **Body:** none
- **Successful Response:**
  - Delete an existing review.
  - **Status Code:** 200

- **Error Response: Couldn't find a Review with the specified id**
  - **Status Code:** 404

## ADDRESSES

### Create an Address

- **Require Authentication:** true
- **Request:**
  - **Method:** POST
  - **URL:** `/api/address/create`
- **Successful Response:**
  - Create and adds new address to users account.
  - **Status Code:** 201
- **Error Response: Body validation errors**
  - **Status Code:** 400


### Edit an Address

- **Require Authentication:** true
- **Require proper authorization:** Address must belong to the current user
- **Request:**
  - **Method:** PUT
  - **URL:** `/api/address/:address_id`
- **Successful Response:**
  - Update details of an existing address.
  - **Status Code:** 200

- **Error Response: Body validation errors**
  - **Status Code:** 400
- **Error Response: Couldn't find an Address with the specified id**
  - **Status Code:** 404

### Delete an Address

- **Require Authentication:** true
- **Require proper authorization:** Address must belong to the current user
- **Request:**
  - **Method:** DELETE
  - **URL:** `/api/address/:address_id/delete`
  - **Body:** none
- **Successful Response:**
  - Delete an existing address.
  - **Status Code:** 200

- **Error Response: Couldn't find a Address with the specified id**
  - **Status Code:** 404

## BOOKINGS

### Create a Booking Request

- **Require Authentication:** true
- **Request:**
  - **Method:** POST
  - **URL:** `/api/booking/request/create`
- **Successful Response:**
  - Creates a new Booking Request, which must be accepted by the Sitter.
  - **Status Code:** 201
- **Error Response: Body validation errors**
  - **Status Code:** 400

### Create a Booking (Accept Request)

- **Require Authentication:** true
- **Request:**
  - **Method:** POST
  - **URL:** `/api/booking/create`
- **Successful Response:**
  - Creates a new Booking, updates both Pet Profile and Sitter associated with the initial request.
  - **Status Code:** 201
- **Error Response: Body validation errors**
  - **Status Code:** 400


### Edit a Booking (FUTURE IMPLEMENTATION)

- **Require Authentication:** true
- **Require proper authorization:** Booking must belong to the current user
- **Request:**
  - **Method:** PUT
  - **URL:** `/api/booking/:booking_id`
- **Successful Response:**
  - Update details of an existing Booking/Request.
  - **Status Code:** 200

- **Error Response: Body validation errors**
  - **Status Code:** 400
- **Error Response: Couldn't find an Booking with the specified id**
  - **Status Code:** 404

### Delete a Booking (FUTURE IMPLEMENTATION)

- **Require Authentication:** true
- **Require proper authorization:** Booking must belong to the current user
- **Request:**
  - **Method:** DELETE
  - **URL:** `/api/booking/:booking_id/delete`
  - **Body:** none
- **Successful Response:**
  - Delete an existing booking.
  - **Status Code:** 200

- **Error Response: Couldn't find a Booking with the specified id**
  - **Status Code:** 404

## Getting started

1. Clone this repository (only this branch).

2. Install dependencies.

   ```bash
   pipenv install -r requirements.txt
   ```

3. Create a **.env** file based on the example with proper settings for your
   development environment.

4. Make sure the SQLite3 database connection URL is in the **.env** file.

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable. Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention.**

6. Get into your pipenv, migrate your database, seed your database, and run your
   Flask app:

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. The React frontend has no styling applied. Copy the **.css** files from your
   Authenticate Me project into the corresponding locations in the
   **react-vite** folder to give your project a unique look.

8. To run the React frontend in development, `cd` into the **react-vite**
   directory and run `npm i` to install dependencies. Next, run `npm run build`
   to create the `dist` folder. The starter has modified the `npm run build`
   command to include the `--watch` flag. This flag will rebuild the **dist**
   folder whenever you change your code, keeping the production version up to
   date.

## Deployment through Render.com

First, recall that Vite is a development dependency, so it will not be used in
production. This means that you must already have the **dist** folder located in
the root of your **react-vite** folder when you push to GitHub. This **dist**
folder contains your React code and all necessary dependencies minified and
bundled into a smaller footprint, ready to be served from your Python API.

Begin deployment by running `npm run build` in your **react-vite** folder and
pushing any changes to GitHub.

Refer to your Render.com deployment articles for more detailed instructions
about getting started with [Render.com], creating a production database, and
deployment debugging tips.

From the Render [Dashboard], click on the "New +" button in the navigation bar,
and click on "Web Service" to create the application that will be deployed.

Select that you want to "Build and deploy from a Git repository" and click
"Next". On the next page, find the name of the application repo you want to
deploy and click the "Connect" button to the right of the name.

Now you need to fill out the form to configure your app. Most of the setup will
be handled by the **Dockerfile**, but you do need to fill in a few fields.

Start by giving your application a name.

Make sure the Region is set to the location closest to you, the Branch is set to
"main", and Runtime is set to "Docker". You can leave the Root Directory field
blank. (By default, Render will run commands from the root directory.)

Select "Free" as your Instance Type.

### Add environment variables

In the development environment, you have been securing your environment
variables in a **.env** file, which has been removed from source control (i.e.,
the file is gitignored). In this step, you will need to input the keys and
values for the environment variables you need for production into the Render
GUI.

Add the following keys and values in the Render GUI form:

- SECRET_KEY (click "Generate" to generate a secure secret for production)
- FLASK_ENV production
- FLASK_APP app
- SCHEMA (your unique schema name, in snake_case)

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from the **External Database URL** field)

**Note:** Add any other keys and values that may be present in your local
**.env** file. As you work to further develop your project, you may need to add
more environment variables to your local **.env** file. Make sure you add these
environment variables to the Render GUI as well for the next deployment.

### Deploy

Now you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your Dockerfile
commands being executed and any errors that occur.

When deployment is complete, open your deployed site and check to see that you
have successfully deployed your Flask application to Render! You can find the
URL for your site just below the name of the Web Service at the top of the page.

**Note:** By default, Render will set Auto-Deploy for your project to true. This
setting will cause Render to re-deploy your application every time you push to
main, always keeping it up to date.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/
