import { useLanguage } from '../LanguageContext';

export default function LanguageSwitcher() {
  const { lang, changeLang } = useLanguage();

  return (
    <div style={styles.wrapper}>
      <select
        value={lang}
        onChange={(e) => changeLang(e.target.value)}
        style={styles.select}
      >
        <option value="en">EN</option>
        <option value="fr">FR</option>
        <option value="sw">SW</option>
      </select>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: 3,
    borderRadius: 12,
    background: 'linear-gradient(135deg,#ff003c,#7c3aed)',
    boxShadow: '0 0 15px rgba(124,58,237,0.4)',
  },

  select: {
    background: '#0a0a0a',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: 10,
    outline: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};