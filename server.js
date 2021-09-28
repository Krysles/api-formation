const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const package = require('./package.json');

const port = process.env.PORT || 5000;
const apiRoot = '/api';

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({
    origin: /http:\/\/localhost/
}));
app.options('*', cors());

const db = {
    christophe: {
        user: 'christophe',
        currency: '€',
        description: "Christophe's account",
        balance: 10000,
        transactions: []
    },
    maryline: {
        user: 'maryline',
        currency: '€',
        description: "Maryline's account",
        balance: 5000,
        transactions: []
    }
};

const router = express.Router();

router.get('/', (req, res) => {
    res.send(`${package.name} - v${package.version}`);
});

router.get('/accounts/:user', (req, res) => {
    const user = req.params.user;
    const account = db[user];

    if (!account) {
        return res.status(404).json({error: 'User does not exist'});
    }
    return res.json(account);
});

app.use(apiRoot, router);

app.listen(port, () => {
    console.log('Server is up!');
});
