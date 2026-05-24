import {
  useLanguage,
} from '../LanguageContext';

export default function LanguageSwitcher() {

  const {
    lang,
    setLang,
  } = useLanguage();

  return (

    <select
      value={lang}
      onChange={(e) =>
        setLang(
          e.target.value
        )
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

    padding: '10px 14px',

    borderRadius: 10,

    cursor: 'pointer',

    width: '100%',

    fontSize: 14,

    outline: 'none',

    marginTop: 12,

    boxSizing:
      'border-box',
  },

};