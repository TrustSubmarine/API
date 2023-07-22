const express = require('express');
const amazonRouter = require('./src/amazon/routes')

const app = express();

// app.set('view engine', 'ejs')
app.use(express.json())

// middleware for access, check security for this
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.get('/', (req, res) => {
    res.send('hi zhi hong!')
})

app.use('/amazon', amazonRouter)

const port = process.env.PORT || 8080
app.listen(port)