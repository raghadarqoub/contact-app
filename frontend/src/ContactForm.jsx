import React, { useState, useEffect } from "react";
import "./App.css";

function ContactForm({ onAdd, editingContact, onUpdate }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (editingContact) {
      setName(editingContact.name);
      setPhone(editingContact.phone);
    } else {
      setName("");
      setPhone("");
    }
  }, [editingContact]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) return;

    if (editingContact) {
      onUpdate(editingContact.id, { name, phone });
    } else {
      onAdd({ name, phone });
    }

    setName("");
    setPhone("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button type="submit">
        {editingContact ? "Update Contact" : "Add Contact"}
      </button>
    </form>
  );
}

export default ContactForm;
