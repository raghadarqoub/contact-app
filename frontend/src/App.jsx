import React, { useEffect, useState } from "react";
import axios from "axios";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);

  const fetchContacts = async () => {
    const res = await axios.get("http://localhost:3000/contacts");
    setContacts(res.data);
  };

  const addContact = async (contact) => {
    const res = await axios.post("http://localhost:3000/contacts", contact);
    setContacts([...contacts, res.data]);
  };

  const deleteContact = async (id) => {
    await axios.delete(`http://localhost:3000/contacts/${id}`);
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const updateContact = async (id, updatedContact) => {
    const res = await axios.put(`http://localhost:3000/contacts/${id}`, updatedContact);
    setContacts(
      contacts.map((contact) =>
        contact.id === id ? res.data : contact
      )
    );
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="app-container">
      <div className="app-card">
        <h1>My Contact Manager</h1>
        <ContactForm
          onAdd={addContact}
          editingContact={editingContact}
          onUpdate={(id, data) => {
            updateContact(id, data);
            setEditingContact(null);
          }}
        />
        <ContactList
          contacts={contacts}
          onDelete={deleteContact}
          onEdit={(contact) => setEditingContact(contact)}
        />
      </div>
    </div>
  );
}

export default App;