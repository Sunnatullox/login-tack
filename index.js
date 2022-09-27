const app = require("express")()
const PORT = process.env.PORT || 5000
app.use(require("express").json())



app.use("/api",require("./routes/login"))

app.listen(PORT ,() => {
    console.log("Server listen on port : " + PORT);
})


