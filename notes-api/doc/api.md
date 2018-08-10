Notes Service API
===============
Service that provides CRUD services for managing notes.

**Version:** 1.0.0

## Introduction

### Authentication

There is no authentication requirement for the API. 

### Endpoints

The API can prefixed by a path.  This is typically **/api/** although can be configured on the server differently.

| HTTP METHOD | POST | GET              | PUT                 | DELETE              |
| ----------- | ---- | ---------------- | ------------------- | ------------------- |
| /notes      | n/a  | Get all notes.   | n/a                 | Deletes all notes.  |
| /notes/:id  | n/a  | Get single note. | Upsert single note. | Delete single note. |



## API Documentation



### /notes

------

#### ***GET***

**Description:** Returns all notes.

**Parameters**

None.

**Request Example:** 

```
GET /api/notes
```

**Responses**

| Code | Description          | Schema |
| ---- | -------------------- | ------ |
| 200  | Success              | Note   |
| 500  | Unknown server error |        |



### /notes/:id
---
#### ***GET***
**Description:**  Returns a note object for the given id.

**Parameters**

| Name | Located in | Required | Schema | Description                    |
| ---- | ---------- | -------- | ------ | ------------------------------ |
| `id` | Path       | Yes      | object | Integer identifier for a note. |

**Request Example:** 

```
GET /api/notes/1
```
**Responses**

| Code | Description             | Schema |
| ---- | ----------------------- | ------ |
| 200  | Success                 | Note   |
| 404  | `id` could not be found |        |
| 500  | Unknown server error    |        |



### /notes

------

#### ***PUT***

**Description:** Performs upsert of given note using id in note object.  If id does not exist it will created otherwise it will be updated.

**Parameters**

None.

**Request Example:** 

```
PUT /api/notes

{ 
    "id": 1
    "title": "This is a very interesting title",
    "text": "A very long and meaningless note ... blah blah ... ",
    "modified": "2018-08-09T22:02:19.729Z",
}
```

**Responses**

| Code | Description          | Schema |
| ---- | -------------------- | ------ |
| 200  | Success              |        |
| 500  | Unknown server error |        |



### /notes/:id

------

#### ***DELETE***

**Description:**  Removes the note for the given id.

**Parameters**

| Name | Located in | Required | Schema | Description                    |
| ---- | ---------- | -------- | ------ | ------------------------------ |
| `id` | Path       | Yes      | object | Integer identifier for a note. |

**Request Example:** 

```
DELETE /api/notes/1
```

**Responses**

| Code | Description             | Schema |
| ---- | ----------------------- | ------ |
| 200  | Success                 |        |
| 404  | `id` could not be found |        |
| 500  | Unknown server error    |        |



### /notes

------

#### ***DELETE***

**Description:**  Removes all notes and sets next id to 1. 

**Parameters**

None

**Request Example:** 

```
DELETE /api/notes
```

**Responses**

| Code | Description             | Schema |
| ---- | ----------------------- | ------ |
| 200  | Success                 |        |
| 500  | Unknown server error    |        |



## **Models**

---
## **Note**  


| Name     | Type    | Required | Description                                                  |
| -------- | ------- | -------- | ------------------------------------------------------------ |
| Id       | integer | Yes      | Note identifier                                              |
| title    | string  | No       | Note title                                                   |
| text     | string  | No       | Note body                                                    |
| modified | string  | No       | Last modified date in ISO date string format.                |

