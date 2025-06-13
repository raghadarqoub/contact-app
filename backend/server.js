const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

const DATA_FILE = 'contacts.json';
let contacts = [];

// بحمل البيانات يلي انا ضفتها من قبل حتى إزا عملت ريفريش 
function loadContacts() {
  try {
    const data = fs.readFileSync(DATA_FILE);
    contacts = JSON.parse(data);
  } catch {
    contacts = [];
  }
}

//  بحفظ البيانات يلي بضيفها او هيا جهة الغتصال 
function saveContacts() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(contacts, null, 2));
}

loadContacts();

// هون بعرض كل الكونتاكت يلي عندي 
app.get('/contacts', (req, res) => {
  res.json(contacts);
});
// بالعمليه هاد بضيف كونتاكت 
app.post('/contacts', (req, res) => {
  const newContact = {
    id: Date.now(),
    name: req.body.name,
    phone: req.body.phone
  };
  contacts.push(newContact);
  saveContacts();
  res.status(201).json(newContact);
});
// بالعمليه هاد بعدل كونتاكت
app.put('/contacts/:id', (req, res) => {
  const contactId = parseInt(req.params.id);
  const { name, phone } = req.body;

  const contact = contacts.find(c => c.id === contactId);
  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }

  contact.name = name;
  contact.phone = phone;

  res.json(contact);
});
// عمليه الحذف 
app.delete('/contacts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  contacts = contacts.filter(c => c.id !== id);
  saveContacts();
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
