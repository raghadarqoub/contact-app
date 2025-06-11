import React, { useEffect, useState } from "react";
import axios from "axios";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const res = await axios.get("http://localhost:3001/contacts");
    setContacts(res.data);
  };

  const addContact = async (contact) => {
    const res = await axios.post("http://localhost:3001/contacts", contact);
    setContacts([...contacts, res.data]);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="app-container">
      <div className="app-card">
        <h1>My Contact Manager</h1>
        <ContactForm onAdd={addContact} />
        <ContactList contacts={contacts} />
      </div>
    </div>
  );
}

export default App;
