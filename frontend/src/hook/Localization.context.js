import { createContext, useState } from 'react'
import localization_EN_US from '../assets/localization/en_US.json'

export const LocalizationContext = createContext()

export const LANGUAGES = {
  EN_US: {
    name: 'Inglês (Estados Unidos)',
    localization: localization_EN_US
  },
}

function LocalizationProvider({ children }) {
  const [currentLocalization, setCurrentLocalization] = useState(LANGUAGES.EN_US.localization)
  const [currentLanguage, setCurrentLanguage] = useState('EN_US')

  function changeLanguage(language) {
    setCurrentLocalization(LANGUAGES[language].localization)
    setCurrentLanguage(language)
  }

  function getText(path) {
    let x = path.split('.')
    if (currentLocalization) {
      let current = currentLocalization
      x.map((value) => {
        if (current[value]) {
          current = current[value]
        }
        return value
      })
      return current
    }
    return null
  }

  return (
    <LocalizationContext.Provider value={{ currentLocalization, setCurrentLocalization, getText, changeLanguage, currentLanguage, setCurrentLanguage }}>
      {children}
    </LocalizationContext.Provider>
  )
}

export default LocalizationProvider
