const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let contacts = [
    { id: 1, name: "Ahmed", phone: "0566868418" },
    { id: 2, name: "Raghad", phone: "0592868418" }
];

app.get('/contacts', (req, res) => {
    res.json(contacts);
});

app.post('/contacts', (req, res) => {
    const newContact = {
        id: contacts.length + 1,
        name: req.body.name,
        phone: req.body.phone
    };
    contacts.push(newContact);
    res.status(201).json(newContact);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});