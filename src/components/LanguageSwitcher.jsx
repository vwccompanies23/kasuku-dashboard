import { useState } from 'react';

export default function LanguageSwitcher() {
  const [lang, setLang] = useState(
    localStorage.getItem('lang') || 'en'
  );

  const changeLang = (e) => {
    const value = e.target.value;
    setLang(value);
    localStorage.setItem('lang', value);

    // optional reload
    window.location.reload();
  };

  return (
    <select value={lang} onChange={changeLang} style={styles.select}>
      <option value="en">EN</option>
      <option value="fr">FR</option>
      <option value="sw">SW</option>
    </select>
  );
}

const styles = {
  select: {
    background: '#141414',
    color: '#fff',
    border: '1px solid #333',
    padding: '6px 10px',
    borderRadius: 8,
    cursor: 'pointer',
  },
};