const express = require('express');
const cors = require('cors');
const router = express.Router()
const app = express();
const fs = require('fs');
const port = 8080;
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('CRUD - App Running'));
const schema = JSON.parse(fs.readFileSync("dataset/schema/schema.json"));
// schema Get
router.get('/schema', (req, res) => {
    try {
        const { code } = req.query;
        if (code) {
            res.status(200).json({
                schema: schema,
                status: 'success'
            });
        } else {
            res.status(400).json({
                message: "Missing 'code' parameter",
                status: 'error'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: 'unable to retrieve'
        });
    }
});


app.listen(port, () => {
    console.log(`app start port ${port}`);
});
console.log(`App is running in ${port}`)
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
  }));
