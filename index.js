const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;
const BusinessCard = require('./models/BusinessCard')

app.use(bodyParser());
app.use(cors());

app.get('/random', (req, res) => {
    let card = new BusinessCard()
    res.send(card);
})

app.post('/', (req, res) => {
    if(!req.body) return res.status(400).send({error: "No details provided."})
    let userInput = req.body;
    try {
        if(typeof userInput == 'string') userInput = JSON.parse(userInput)
        else if(typeof userInput != 'object' || userInput == null) throw new Error({error: `Invalid details provided. Expected object, got ${typeof userInput}`})
        let cardOptions = BusinessCard.sanitizeUserProvidedOptions(req.body) 
        let card = new BusinessCard(cardOptions)
        res.send(card);
    }catch(err) {
        return res.status(400).send(err);
    }
})

app.listen(port, ()=> console.log(`listening at port ${port}`));