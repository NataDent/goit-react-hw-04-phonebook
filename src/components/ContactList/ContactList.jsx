import { ContactListStyled, ListItem } from './ContactList.styled';

export const ContactList = ({ contacts, deleteContact }) => {
  return (
    <ContactListStyled>
      {contacts.map(({ id, name, number }) => (
        <ListItem key={id}>
          <p>
            {name}: {number}
          </p>
          <button type="button" onClick={e => deleteContact(id)}>
            Delete
          </button>
        </ListItem>
      ))}
    </ContactListStyled>
  );
};
