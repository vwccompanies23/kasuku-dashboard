import { useState } from 'react';
import { api } from '../api';

export default function Contact() {
  const [form, setForm] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    country: '',
    address: '',
  });

  const save = async () => {
    await api.post('/users/contact', form);
    alert('Saved ✅');
  };

  return (
    <div>
      <h1>Add Contact Information</h1>

      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
      <input placeholder="Phone" onChange={e => setForm({...form, phone: e.target.value})} />
      <input placeholder="First Name" onChange={e => setForm({...form, firstName: e.target.value})} />
      <input placeholder="Last Name" onChange={e => setForm({...form, lastName: e.target.value})} />
      <input placeholder="Country" onChange={e => setForm({...form, country: e.target.value})} />
      <input placeholder="Address" onChange={e => setForm({...form, address: e.target.value})} />

      <button onClick={save}>Save</button>
    </div>
  );
}