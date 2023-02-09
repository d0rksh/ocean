const express = require('express');
const cors = require('cors');
const app = express();
const {json} = require('body-parser');
const productRouter = require('./Router/router');
app.use(cors())
app.use(json());
app.use('/api',productRouter)
app.listen(8080,()=>{
    console.log('server is running on port *:8080')
})