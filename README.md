# NodeJS Coding Challenge

## Running in development mode:

```sh
npm i
npm run dev
```

## Running in production mode:

```sh
npm start
```

## Run automated tests:

```sh
npm i
npm t
```

## Usage

### GET /users

Get all available users

#### Response

Returns a JSON array of all users

```json
[
  {
    "name": "<string>",
    "email": "<string>",
    "dateOfBirth": "<string>",
    "phoneNumber": "<string>",
    "address": {
      "street": "<string>",
      "city": "<string>",
      "state": "<string>",
      "zipCode": "<string>",
      "country": "<string>"
    }
  }
]
```

### GET /users?\<options\>

Get sorted or paginated users

#### Request

Sorting:

```
/users?sortBy=<email | name>&sortDirection=<ascending | descending>
```

Pagination:

```
/users?page=<number>&limit=<number>
```

### POST /users

Create a new user record. Returns all users with new record included.

#### Request

```json
{
  "name": "<string>",
  "email": "<string>",
  "dateOfBirth": "<string>",
  "phoneNumber": "<string>",
  "address": {
    "street": "<string>",
    "city": "<string>",
    "state": "<string>",
    "zipCode": "<string>",
    "country": "<string>"
  }
}
```

#### Response

```json
[
  {
    "name": "<string>",
    "email": "<string>",
    "dateOfBirth": "<string>",
    "phoneNumber": "<string>",
    "address": {
      "street": "<string>",
      "city": "<string>",
      "state": "<string>",
      "zipCode": "<string>",
      "country": "<string>"
    }
  }
]
```

### PUT /user/:emailAddress

Update an existing user record, uses email as unique identifier. Returns updated user data.

#### Request

```json
{
  "name": "<string>",
  "email": "<string>",
  "dateOfBirth": "<string>",
  "phoneNumber": "<string>",
  "address": {
    "street": "<string>",
    "city": "<string>",
    "state": "<string>",
    "zipCode": "<string>",
    "country": "<string>"
  }
}
```

#### Response

```json
{
  "name": "<string>",
  "email": "<string>",
  "dateOfBirth": "<string>",
  "phoneNumber": "<string>",
  "address": {
    "street": "<string>",
    "city": "<string>",
    "state": "<string>",
    "zipCode": "<string>",
    "country": "<string>"
  }
}
```

### DELETE /user/:emailAddress

Delete an existing user record, uses email as unique identifier. Returns true if user was successfully deleted or false otherwise.

#### Response

```
boolean
```
