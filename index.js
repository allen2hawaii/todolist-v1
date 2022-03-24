//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

// create a date object that requires the date.js file
const date = require(__dirname + "/date.js");

const app = express();

// array for to-do-list items
let items = ["Buy Food", "Prepare Food", "Cook Food", "Eat Food"];
// set an empty array for new work items
let workItems = ["Print Workload", "Inventory"];

// array for /fun and /weekend
let funItems = ["Surf", "Hiking", "Walking"];
let weekendItems = ["Homework", "Sleep"];

// set EJS as the viewing engine to display html
app.set('view engine', 'ejs');

// use body parser to parse html file
app.use(bodyParser.urlencoded({extended: true}));

// use Express to serve or display static files such as images, CSS, JS files etc.
app.use(express.static("public"));

// default html file in web server
app.get("/", function(req, res) {

    // getDate function from date.js 
    let day = date.getDate();
    
    // use EJS render to display the day and the To Do List
    res.render("list", {listTitle: day, newListItems: items});
    
});

// display default to do list on the default root folder
app.post("/", function(req, res) {
    
    let item = req.body.newItem;
    
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } 
    
    else if (req.body.list === "Fun") {
        funItems.push(item);
        res.redirect("/fun");
    } 

    else if (req.body.list === "Weekend") {
        weekendItems.push(item);
        res.redirect("/weekend");
    }

    else {
        items.push(item);
        res.redirect("/");
    }
});

// displays lists
app.get("/work", function(req, res){

  let day = date.getDate();
    res.render("list", {listTitle: "Work To Do List", newListItems: workItems})
});

app.get("/fun", function(req, res){

  let day = date.getDate();
    res.render("list", {listTitle: "Fun To Do List", newListItems: funItems})
});

app.get("/weekend", function(req, res){
    res.render("list", {listTitle: "Weekend To Do List", newListItems: weekendItems})
});

app.listen(3000, function() {
console.log ("Server is running on port 3000")
});