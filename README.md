# Zoiko Public Plan Orchestrator API

## Overview

This project implements a simple backend service that converts publicly available Zoiko Mobile plan information into a structured API.

The API allows users to retrieve mobile plans, filter them by budget, search for specific plans, and sort them by price.

The goal of this project is to demonstrate the ability to transform unstructured public data into a usable backend service.

---

## Tech Stack

* Node.js
* Express.js
* Swagger UI (API documentation)

---

## Project Structure

```
zoiko-plan-orchestrator
│
├── plans.json        # Dataset of Zoiko mobile plans
├── server.js         # Main API server
├── swagger.js        # Swagger configuration
├── package.json
└── README.md
```

---

## Installation

Clone the repository:

```
git clone https://github.com/YOUR_USERNAME/zoiko-plan-orchestrator.git
```

Navigate into the project folder:

```
cd zoiko-plan-orchestrator
```

Install dependencies:

```
npm install
```

---

## Running the API

Start the server:

```
node server.js
```

The server will start on:

```
http://localhost:3000
```

---

## API Documentation

Swagger documentation is available at:

```
http://localhost:3000/api-docs
```

Swagger UI allows you to interactively test all API endpoints.

---

## API Endpoints

### Get All Plans

```
GET /plans
```

Returns all available mobile plans.

Example:

```
http://localhost:3000/plans
```

---

### Filter Plans by Budget

```
GET /plans?max_price=value
```

Returns plans with price less than or equal to the specified value.

Example:

```
http://localhost:3000/plans?max_price=40
```

---

### Search Plan by Name

```
GET /plans/search?name=planName
```

Returns plans matching the provided name.

Example:

```
http://localhost:3000/plans/search?name=zoiko
```

---

### Sort Plans by Price

```
GET /plans/sort?order=low-to-high
GET /plans/sort?order=high-to-low
```

Sorts plans by price.

Example:

```
http://localhost:3000/plans/sort?order=low-to-high
```

---

## Error Handling

The API includes validation and error handling for:

* Invalid price filters
* Missing search parameters
* Invalid sort parameters
* No matching plans found

Example error response:

```
{
  "success": false,
  "message": "Plan not found"
}
```

---

## Data Source

Plan data was extracted from the publicly available Zoiko Mobile website:

https://zoikomobile.com/

Only publicly accessible information was used in accordance with the assignment requirements.

---

## Author

Abhishek Kumar
