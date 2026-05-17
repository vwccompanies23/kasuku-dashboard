import { useLanguage }
from '../LanguageContext';

export default function LanguageSwitcher() {

  const {
    lang,
    changeLang,
  } = useLanguage();

  return (

    <select
      value={lang}
      onChange={(e) =>
        changeLang(e.target.value)
      }
      style={styles.select}
    >

      <option value="en">
        EN 🇺🇸
      </option>

      <option value="fr">
        FR 🇫🇷
      </option>

      <option value="sw">
        Kiswahili 🇨🇩
      </option>

      <option value="ar">
        AR 🇸🇦
      </option>

      <option value="rn">
        Kirundi 🇧🇮
      </option>

      <option value="lg">
        Luganda 🇺🇬
      </option>

    </select>
  );
}

const styles = {

  select: {

    background: '#141414',

    color: '#fff',

    border:
      '1px solid #333',

    padding: '6px 10px',

    borderRadius: 8,

    cursor: 'pointer',
  },
};