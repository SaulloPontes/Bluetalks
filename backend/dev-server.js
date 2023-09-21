import { use, listen } from "./app";
import routes from "./routes/router";

use("/", routes);
/* app.use("/api/", routes);  //for API backend*/

//start server locally
listen(3000,function () {
    console.log("Server started. Go to http://localhost:3000/");
});