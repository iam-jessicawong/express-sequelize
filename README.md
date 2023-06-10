## HR SIMPLE REST API
This is a rest api learning practice for hr database using express and postgresql with sequelize.

## Endpoints

### Regions

| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| GET    | `/regions`       | Get all regions         |
| GET    | `/regions/:id`   | Get specific region     |
| POST   | `/regions/`      | Create new region       |
| PUT    | `/regions/:id`   | Update specific region  |
| DELETE | `/regions/:id`   | Delete specific region  |

**Request body example for POST and PUT**
```json
{
  "name": ""
}
```
<br>

### Countries

| Method | Endpoint           | Description               |
| ------ | -------------------| --------------------------|
| GET    | `/countries/`      | Get all countries         |
| GET    | `/countries/:id`   | Get specific country      |
| POST   | `/countries/`      | Create new countries      |
| PUT    | `/countries/:id`   | Update specific countries |
| DELETE | `/countries/:id`   | Delete specific countries |

**Request body example for POST**
```json
{
  "id": "",
  "name": "",
  "region_id": 3
}
```

**Request body example for PUT**
```json
{
  "name": "",
  "region_id": 3
}
```
<br>

### Locations

| Method | Endpoint             | Description               |
| ------ | ---------------------| --------------------------|
| GET    | `/locations/`        | Get all locations         |
| GET    | `/locations/:id`     | Get specific locations    |
| POST   | `/locations/`        | Create new location       |
| PUT    | `/locations/:id`     | Update specific locations |
| DELETE | `/locations/:id`     | Delete specific locations |

**Request body example for POST AND PUT**
```json
{
  "street_address": "",
  "postal_code": "",
  "city": "",
  "state_province": "",
  "country_id": ""
}
```
<br>

### Departments

| Method | Endpoint             | Description                |
| ------ | ---------------------| ---------------------------|
| GET    | `/departments/`      | Get all departments        |
| GET    | `/departments/:id`   | Get specific department    |
| POST   | `/departments/`      | Create new department      |
| PUT    | `/departments/:id`   | Update specific department |
| DELETE | `/departments/:id`   | Delete specific department |

**Request body example for POST AND PUT**
```json
{
  "name": "",
  "manager_id": 100,
  "location_id": 1700
}
```
<br>

### Jobs

| Method | Endpoint             | Description                |
| ------ | ---------------------| ---------------------------|
| GET    | `/jobs/`             | Get all jobs               |
| GET    | `/jobs/:id`          | Get specific job           |
| POST   | `/jobs/`             | Create new job             |
| PUT    | `/jobs/:id`          | Update specific job        |
| DELETE | `/jobs/:id`          | Delete specific job        |

**Request body example for POST**
```json
{
  "id": "",
  "title": "",
  "min_salary": 0.00,
  "max_salary": 0.00
}
```

**Request body example for PUT**
```json
{
  "title": "",
  "min_salary": 0.00,
  "max_salary": 0.00
}
```
<br>

### Employees

| Method | Endpoint             | Description              |
| ------ | ---------------------| -------------------------|
| GET    | `/employees/`        | Get all employees        |
| GET    | `/employees/:id`     | Get specific employee    |
| POST   | `/employees/`        | Create new employee      |
| PUT    | `/employees/:id`     | Update specific employee |
| DELETE | `/employees/:id`     | Delete specific employee |

**Request body example for POST AND PUT**
```json
{
  "first_name": "",
  "last_name": "",
  "email": "",
  "phone_number": "",
  "hire_date": "YYYY-MM-DD",
  "salary": 0.00,
  "commission_pct": null,
  "job_id": "",
  "manager_id": null,
  "department_id": 10
}
```
<br>

### Job-History

| Method | Endpoint                                 | Description                 |
| ------ | -----------------------------------------| ----------------------------|
| GET    | `/job-history/`                          | Get all job history         |
| GET    | `/job-history/:id`                       | Get specific job history    |
| POST   | `/job-history/`                          | Create new job history      |
| PUT    | `/job-history/:employee_id/:start_date`  | Update specific job history |
| DELETE | `/job-history/:employee_id/:start_date`  | Delete specific job history |

**Request body example for POST**
```json
{
  "employee_id": 4,
  "start_date": "YYYY-MM-DD",
  "job_id": "",
  "end_date": "YYYY-MM-DD",
  "department_id": 110
}
```

  **Request body example for PUT**
```json
{
  "end_date": "YYYY-MM-DD",
  "job_id": "",
  "department_id": 110
}
```


## Package or Library Used

- Express
- dotenv for environment variables
- pg for postgresql database
- sequelize orm for postgres
- nodemon
- babel

## How to Run

1. Clone this repository
2. Install all dependencies on package.json
3. Set up your port on env file
4. Run this project with `yarn start` or `npm start`
