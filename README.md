# CA2 Web Service

This is a backend REST API service built with Node.js, Express, and MySQL for the EcoSave React Native application. It manages data for green initiatives, allowing users to view, add, update, and delete items related to environmental activities.

## Features

- **Retrieve All Items**: Fetch a list of all green plan items.
- **Add Item**: create new records with details like category, item name, picture URL, savings, and date.
- **Update Item**: Modify existing records.
- **Delete Item**: Remove specific records from the database.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building the API.
- **MySQL**: Relational database management system.
- **mysql2**: MySQL client for Node.js.
- **dotenv**: Module to load environment variables.

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later recommended)
- [MySQL Server](https://dev.mysql.com/downloads/mysql/)

## Installation

1.  **Clone the repository** (if applicable) or navigate to the project directory.

2.  **Install dependencies**:
    ```bash
    npm install
    ```


## Database Schema

The application expects a table named `greenplan` with columns similar to:
- `id` (Primary Key, Auto-Increment, INT)
- `category` (ENUM('Reduce', 'Reuse', 'Recycle'))
- `item` (VARCHAR(60))
- `item_pic` (VARCHAR(200))
- `saved_in_g` (INT)
- `logged_on` (DATE)

## Running the Application

To start the server, run:

```bash
node server.js
```


The server will start on port **3000** (default).
`Server running on port 3000`
Github Web Service repo: https://github.com/24041225-kae/cA2WebService.git

## API Endpoints

### 1. Get All Items
*   **URL**: `/allitems`
*   **Method**: `GET`
*   **Description**: Retrieves all items from the database.
*   **Response**: JSON array of items.

### 2. Add New Item
*   **URL**: `/additem`
*   **Method**: `POST`
*   **Body** (JSON):
    ```json
    {
      "category": "Recycling",
      "item": "Plastic Bottles",
      "item_pic": "https://bernardlab.com/wp-content/uploads/2021/01/plastic-bottles.png",
      "saved_in_g": 500,
      "logged_on": "2023-10-27"
    }
    ```
*   **Response**: Success message.

### 3. Update Item
*   **URL**: `/updateitem`
*   **Method**: `PUT`
*   **Body** (JSON):
    ```json
    {
      "id": 1,
      "category": "Recycling",
      "item": "Glass Bottles",
      "item_pic": "https://m.media-amazon.com/images/I/711RCqyqpPL.jpg",
      "saved_in_g": 1000,
      "logged_on": "2023-11-01"
    }
    ```
*   **Response**: Success message.

### 4. Delete Item
*   **URL**: `/deleteitem/:id`
*   **Method**: `DELETE`
*   **Description**: Deletes the item with the specified ID.
*   **Response**: Success message.

### 5. Check Item (For Deletion)
*   **URL**: `/deleteitem/:id`
*   **Method**: `GET`
*   **Description**: Checks if an item exists before deletion.
*   **Response**: Item details or Not Found error.
