import React from "react";
import "./App.css";

function ContactList({ contacts }) {
  return (
    <ul className="contact-list">
      {contacts.map((c) => (
        <li key={c.id}> 
          <span>{c.name}</span>  ({c.phone}) 
        </li>
      ))}
    </ul>
  );
}

export default ContactList;
