# mmaps
mind maps. to-do lists. notes.

### What is mmaps?
mmaps is a new way to organize your tasks and manage your data. It provides an interactive virtual bulletin board and sticky notes that you can use to list out your thoughts and tasks. 
It connects to a MongoDB database to store your information so that you can access them any time you load up. With the ability to group your tasks by title, it works basically like 
a database, without the hassle of remembering all those pesky NoSQL commands. 

### Start
To start, open two terminals. In the first, type:
```
cd mmaps/mind-maps
npm start
```

This will start the React development server. In the second, type:
```
cd mmaps/mmapi
npm start
```

This starts the API. The front-end server is located at `localhost:3000`, the API at `localhost:8000`, and the database connects to `localhost:27017`.
