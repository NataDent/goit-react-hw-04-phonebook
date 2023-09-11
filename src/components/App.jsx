import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { Section } from './Section/Section';
import { ContactList } from './ContactList/ContactList';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) || []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
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
    setContacts(prevState => [
      ...prevState,
      {
        id: nanoid(),
        ...newContact,
      },
    ]);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      [...prevState].filter(contact => contact.id === contactId)
    );
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
