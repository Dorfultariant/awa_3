var express = require('express');
var router = express.Router();

let db = {};

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'TODO APP',
        my_todos: 'My todos',
        author: "Teemu Hiltunen",
        addBtn: "Add",
        findBtn: "Find",
        deleteBtn: "Delete",
        status: "Status",
        itemshead: "Items Found"
    });
});

router.get("/user/:id", function(req, res, next) {
    try {
        const usr = req.params.id;

        console.log("params: ", req.params);
        console.log("Params ID: ", req.params.id);

        // Send back the information of corresponding user to the client
        if (db.hasOwnProperty(usr)) {
            console.log(`User '${usr}' found.`);
            res.status(200).json({ user: usr, tasks: db[usr].tasks });
        } else {
            console.log(`User '${usr}' NOT found.`);
            res.status(200).json({ msg: "User not found" });
        }

        console.log({
            user: usr,
            tasks: db[usr].tasks
        });
    } catch (error) {
        console.error("Error fetching user: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    next();
});

router.post("/todo", function(req, res, next) {
    const name = req.body.name;
    const task = req.body.task;

    if (name in db) {
        db[name].tasks.push(task);
        res.status(200).json({ msg: "Todo added" });

    } else {
        db[name] = {
            tasks: [task]
        };
        res.status(200).json({ msg: "User added" });
    }

    console.log(db);
});

module.exports = router;

