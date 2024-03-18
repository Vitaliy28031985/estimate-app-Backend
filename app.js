const express = require('express');

const app = express();
const cors = require('cors');
const dotenv = require("dotenv");

const authRouter = require("./routes/api/auth");
const estimatesRouter = require("./routes/api/estimates");
const positionRouter = require("./routes/api/position");
const projectsRouter = require("./routes/api/projects");
const priceRouter = require("./routes/api/price");
const materialsRouter = require("./routes/api/materials");
const advancesRouter = require("./routes/api/advances");
const unitsRouter = require("./routes/api/units");

dotenv.config();

app.use(cors())
app.use(express.json());
app.use('/api/auth', authRouter)
app.use('/api/estimates', estimatesRouter);
app.use('/api/position', positionRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/price', priceRouter);
app.use('/api/materials', materialsRouter);
app.use('/api/advances', advancesRouter);
app.use('/api/units', unitsRouter);

app.use((req, res) => {
    res.status(404).json({
        message: "not found"
    })
})
module.exports = app;