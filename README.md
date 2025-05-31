<p align="center">
  <img src="https://raw.githubusercontent.com/axd3r/axd3r/main/assets/images/ts.png" alt="TypeScript" width="100"/>
  &nbsp;&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/axd3r/axd3r/main/assets/images/nodejs.png" alt="Node.js" width="100"/>
</p>

### Author: Joaquín Orihuela

# 📱 Social Network REST API

A RESTful API built with **Node.js** and **Express**, using **JWT-based authentication**, that allows users to securely manage their social media links.

## 🛠 Technologies Used

- TypeScript.js
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT)
- dotenv

## 🔐 Authentication & Authorization

- Users must authenticate via JWT to access protected endpoints.
- Only the **owner** of a social media entry can **edit or delete** it.
- Only the **authenticated user** can **create** social media entries, regardless of superadmin status.

## 📦 Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/axd3r/dev-tree.git
   cd dev-tree
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and configure the required environment variables:
   ```env
   MONGO_HOST=localhost
   MONGO_USER=mongo-user
   MONGO_PASSWORD=mongo-password
   MONGO_DB_NAME=dev_tree

   JWT_SECRET=secrete_password
   JWT_EXPIRES_IN=30d
   ```

4. Start the server:
   ```bash
   npm start
   or
   npm run dev
   ```

## 📘 Main Endpoints

### Authentication

| Method | Endpoint         | Description                      |
|--------|------------------|----------------------------------|
| POST   | `/api/auth/login`| Log in and return a JWT token    |
| POST   | `/api/user/save` | Register a new user     ```

## 📘 User Endpoints

| Method | Endpoint         | Description                                  | Auth Required      | Auth Level  |
| ------ | ---------------- | -------------------------------------------- | ------------------ | ----------- | 
| POST   | `/api/users/save`    | Create a new user                        |    ❌ No                 | Any user  |
| GET    | `/api/users/get-all` | Get all users                                | ❌ No                | Any user |
| GET    | `/api/users/:userId` | Get a user by ID                             | ❌ No                 | Any user |
| PUT    | `/api/users/:userId` | Update a user (only the owner or superadmin) | ✅ Yes | Only authenticated users|
| DELETE | `/api/users/:userId` | Delete a user (only the owner or superadmin) | ✅ Yes | Only authenticated users|

## 📘 Social Base Endpoints

| Method | Endpoint                 | Description                      | Auth Required | Access Level    |
| ------ | ------------------------ | -------------------------------- | ------------- | --------------- |
| POST   | `/api/social-base`           | Create a new social base         | ✅ Yes         | Superadmin only |
| GET    | `/api/social-base`           | Get all social bases             | ✅ Yes         | Any user        |
| GET    | `/api/social-base/:socialId` | Get a specific social base by ID | ✅ Yes         | Any user        |
| PUT    | `/api/social-base/:socialId` | Update a social base             | ✅ Yes         | Superadmin only |
| DELETE | `/api/social-base/:socialId` | Delete a social base             | ✅ Yes         | Superadmin only |

## Social Media

| Method | Endpoint                | Description                                             | Auth Required | Access Level             |
| ------ | ----------------------- | ------------------------------------------------------- | ------------- | ------------------------ |
| POST   | `/api/socials`              | Create a new social network                             | ✅ Yes         | Only authenticated users |
| GET    | `/api/socials`              | Get all social networks                                 | ❌ No          | Public access            |
| GET    | `/api/socials/:socialId`    | Get a specific social network by ID                     | ❌ No          | Public access            |
| PUT    | `/api/socials/:socialId`    | Update a social network                                 | ✅ Yes         | Owner or superadmin only |
| DELETE | `/api/socials/:socialId`    | Delete a social network                                 | ✅ Yes         | Owner or superadmin only |
| GET    | `/api/socials/user/:userId` | Get all social networks associated with a specific user | ❌ No          | Public access            |

## 🧪 Usage Example (with JWT)

1. Authenticate:
   ```bash
   curl -X POST http://localhost:3000/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email": "user@example.com", "password": "123456"}'
   ```

   This will return a JWT token.

2. Use the token to create a social media entry:
   ```bash
   curl -X POST http://localhost:3000/socials \
     -H "Authorization: Bearer <your_jwt_token>" \
     -H "Content-Type: application/json" \
     -d '{"name": "Twitter", "url": "https://twitter.com/user"}'
   ```

## ⚠️ Security Notes

- Never expose your `JWT_SECRET` in public.
- Protected routes are secured with authentication and authorization middlewares.

## 📄 License

This project is licensed under the MIT License.