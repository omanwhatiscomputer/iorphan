# MERN stack project `Orphanage Management System`

**A part of CSE470 final project**

## Progress so far:
- full fledged implementation of the backend
- frontend: Completion - 5% ~ in progress


## Available Scripts

In the project root directory, you can run:

### `npm start`

starts the backend server in development mode.\
Utilizes port 3000 and the environment variables `JWT_PRIVATE_KEY`, `COST` and `MONGO_URI`.


### `npm test`

Launches the test runner in the interactive watch mode.\
Currently implemented for *Organization* and *BlogPost* only.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Documentation

#### blogPostController: `./src/controller/blogPostController`:

```
function: validateBlogPost 
@params: blogpost ~ JSON
```

```
middleware: createBlogPost 
@HTTP method: POST
@params: 
    body parameters: BlogPost Object ~ JSON
@return: BlogPost object ~ JSON
```

```
middleware: getAllBlogPosts
@HTTP method: GET
@params: none
@headers: JWT
@return: Array of BlogPost objects ~ JSON array
```

```
middleware: updateBlogPost
@HTTP method: PUT
@params: 
    body parameters: _id  ~ JSON
@headers: JWT
@return: BlogPost object ~ JSON
```

```
middleware: deleteCurrentBlogPost
@HTTP method: DELETE
@params: 
    body parameters: _id  ~ JSON
@headers: JWT
@return: BlogPost object ~ JSON
```

```
middleware: getCurrentBlogPost
@HTTP method: GET
@params: 
    body parameters: _id  ~ JSON
@headers: JWT
@return: BlogPost objects ~ JSON
```