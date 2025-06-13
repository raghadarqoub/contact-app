import React from "react";
import "./App.css";

function ContactList({ contacts, onDelete, onEdit }) {
  return (
    <ul className="contact-list">
      {contacts.map((contact) => (
        <li key={contact.id} className="contact-item">
          <div>
            <strong>{contact.name}</strong> - {contact.phone}
          </div>
          <div className="actions">
            <button onClick={() => onEdit(contact)}>Edit</button>
            <button onClick={() => onDelete(contact.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ContactList;
