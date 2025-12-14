# 🍬 Sweet Shop Management System

A full-stack web application designed to digitize and streamline the daily operations of a Sweet Shop. This system helps shop owners manage their inventory (sweets), track prices, and maintain stock levels efficiently.

## 🎯 Objective
The primary objective of this project is to replace manual record-keeping with a digital solution that:
* Reduces errors in pricing and stock management.
* Provides a clear, real-time view of available sweet items.
* Simplifies the process of adding, updating, and removing items from the menu.

## ❓ Problem Statement
Traditional sweet shops often rely on paper-based registers or memory to track inventory and sales. This leads to several issues:
* **Stock Mismatches:** Difficulty in tracking how much of a specific sweet (e.g., Kaju Katli) is left in the kitchen.
* **Pricing Errors:** Manual billing can lead to calculation mistakes.
* **Data Loss:** Paper records can be lost or damaged.
* **Inefficiency:** Updating the menu price requires manual changes across multiple lists.

This project solves these problems by providing a centralized database and a user-friendly interface for management.

## 🛠️ Technology Used
This project is built using the **MERN** stack concepts (excluding React for now) and follows the **MVC (Model-View-Controller)** architecture.

* **Runtime Environment:** [Node.js](https://nodejs.org/) (JavaScript runtime)
* **Backend Framework:** [Express.js](https://expressjs.com/) (For REST API and Routing)
* **Database:** [MongoDB](https://www.mongodb.com/) (NoSQL database for flexible data storage)
* **ODM:** [Mongoose](https://mongoosejs.com/) (For modeling application data)
* **Frontend/Templating:** [EJS](https://ejs.co/) (Embedded JavaScript for server-side rendering of HTML)
* **Tools:**
    * **Postman / Thunder Client:** For API testing.
    * **Nodemon:** For development workflow.
    * **Git & GitHub:** For version control.

## 📝 Detailed Description
The application is structured into three main layers:

### 1. The Backend (API Layer)
* **Server:** Built with Express.js to handle HTTP requests.
* **Controllers:** Contains the business logic for:
    * Fetching all sweets.
    * Adding a new sweet.
    * Updating price or stock.
    * Deleting an item.
* **Routes:** RESTful endpoints (e.g., `/api/sweets`) that direct traffic to the correct controller.

### 2. The Database (Data Layer)
* Uses **MongoDB** to store sweet details.
* **Data Model:** Each sweet item has the following attributes:
    * `Name` (e.g., Rasgulla)
    * `Price` (Per kg/unit)
    * `Category` (e.g., Bengali, Dry Fruit)
    * `Stock` (Quantity available)

### 3. The Frontend (Presentation Layer)
* Uses **EJS** templates to dynamically render the data fetched from the backend.
* Provides a responsive HTML interface where the shop owner can view the current menu and stock status in a table format.
