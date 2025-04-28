import  express from "express"
import userRoute from "./routes/userRoutes.js"
import propertyRoute from "./routes/propertyRoute.js"
import cors from "cors"
import path  from "path"




const app = express()
app.use(cors())
app.use(express.json())
const port = 6001

app.use("/user",userRoute)

app.use("/property",propertyRoute)
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, 'uploads/')));
console.log("dirName&&&&&&",__dirname)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))