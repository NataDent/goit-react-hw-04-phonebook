import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { Section } from './Section/Section';
import { ContactList } from './ContactList/ContactList';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    if (contacts !== null) setContacts(JSON.parse(contacts));
  }, []);

  useEffect(() => {
    if (!contacts.length) return;
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    const existingNumber = contacts.find(
      contact => contact.number === newContact.number
    );
    if (existingContact) {
      alert(`Such name  already exists`);
      return;
    }
    if (existingNumber) {
      alert(`Such number already exists`);
      return;
    }
    setContacts(prevState => ({
      contacts: [
        ...prevState,
        {
          id: nanoid(),
          ...newContact,
        },
      ],
    }));
  };

  const deleteContact = contactId => {
    setContacts(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  const onChange = filter => setFilter(filter.toLowerCase());

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div>
      <Section title="Phonebook">
        <ContactForm addContact={addContact} />
      </Section>

      <Section title="Contacts">
        <Filter value={filter} onChange={onChange} />
        {contacts.length ? (
          <ContactList
            contacts={getFilteredContacts()}
            deleteContact={deleteContact}
          />
        ) : (
          <p>No contacts</p>
        )}
      </Section>
    </div>
  );
};
