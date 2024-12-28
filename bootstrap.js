import connection from "./database.js";
import cors from "cors";
import v1Router from "./v1.routes.js";

  /**
   * The Bootstrap function is used to initialize an express.js application.
   * The function takes an express.js app as argument and applies
   * necessary middlewares and configurations for the application.
   * The function also connects to the database and starts the server.
   * @param {Object} app - the express.js application
   * @returns {void}
   */
const Bootstrap=(app)=>{

  // intiat port
  const PORT=8080|| process.env.PORT;


  // apply cors for all origins
  app.use(cors());


  //  routes
  app.use("/api/v1",v1Router)

  // apply global error handler
  app.use((err,req,res,next)=>{
    return res.status(err.statusCode || 500).json({
      message:err.message || "something went wrong"
    })
  })

  const databaseConnection=connection();
  // listen to port
  databaseConnection && app.listen(PORT,()=>{
    console.log({
      server:`Server is running on port ${PORT}`,
      database:`Database is connected`
    });
  })
}


export default Bootstrap;