const app = require("./api/app");

/* app.use("/api/", routes);  //for API backend*/

//start server locally
app.listen(3000,function () {
    console.log("Server started. Go to http://localhost:3000/");
});