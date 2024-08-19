import React, { useState } from 'react';

interface ContactFormProps {
  onSubmit: (contact: { name: string; surname: string; email: string }) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ name, surname, email });
    setName('');
    setSurname('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Surname
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />``
      </label>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default ContactForm;
