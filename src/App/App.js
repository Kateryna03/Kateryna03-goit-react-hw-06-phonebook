import React, { Fragment } from 'react';
import { useState } from 'react';
import shortid from 'shortid';
import './App.css';
import useLocalStorage from '../hooks/useLocalStorage';
import ContactsForm from '../components/ContactsForm';
import ContactList from '../components/ContactList';
import Filter from '../components/Filter';

function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', [
    // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const handleSubmit = (name, number) => {
    //console.log(contacts);
    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };
    // const { contacts } = this.state;
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase(),
      )
    ) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }

    //console.log(contacts);
    setContacts(contacts => [newContact, ...contacts]);
  };

  const handleRemoveContact = id => {
    setContacts(contacts => contacts.filter(contact => contact.id !== id));
  };

  const onChangeFilter = e => {
    setFilter(e.currentTarget.value);
  };
  const onFilterName = () => {
    // const { filter, contacts } = this.state;
    const normolizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normolizedFilter),
    );
  };

  const contactsResults = onFilterName();

  return (
    <Fragment>
      <div>
        <h1>Phonebook</h1>
        <ContactsForm onSubmit={handleSubmit} />

        <h2>Contacts</h2>
        <Filter value={filter} onChangeFilter={onChangeFilter} />

        <ContactList
          contacts={contactsResults}
          handleDeleteContact={handleRemoveContact}
        />
      </div>
    </Fragment>
  );
}

export default App;
