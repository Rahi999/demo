const express = require("express")
const {connection} = require("./config/db")
const cors = require("cors")
const app = express()
require('dotenv').config()
const {userRouter} = require("./routes/userAuth")
const {profileRouter} = require("./routes/userProfile")
const {followRouter} = require("./routes/Follow");
const {postRouter} = require("./routes/Post")
const {storyRouter} = require("./routes/story")
const { chatRouter } = require("./routes/Chat")
app.use(express.json())
app.use(cors({
    origin: "*"
}))
app.use(express.json({limit:"100mb"}));
app.use('/public/uploads' , express.static(__dirname + '/public/uploads'));

app.get("/", ( req, res ) => {
    res.send("Welcome to FB home route")
})
app.use("/users", userRouter)
app.use("/profile", profileRouter)
app.use("/user", followRouter)
app.use("/post", postRouter)
app.use("/chat", chatRouter)
app.use("/story", storyRouter)

app.listen(process.env.PORT, async() => {
    try{
        await connection
        console.log("SUCCESSFULLY connected to FaceBook DataBase")
    }
    catch(error){
            console.log("Something went wrong",error);
    }
    console.log(`Server running at port ${process.env.PORT}`)
})