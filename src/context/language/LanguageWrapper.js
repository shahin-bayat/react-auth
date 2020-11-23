import React, { useState } from 'react'
import { IntlProvider } from 'react-intl'
import German from '../../translations/de.json'
import English from '../../translations/en.json'

export const Context = React.createContext()

const local = navigator.language

let lang
switch (local) {
  case 'en':
    lang = English
    break
  case 'de':
    lang = German
    break
  default:
    break
}

const Wrapper = props => {
  const [locale, setLocale] = useState(local)

  const [messages, setMessages] = useState(lang)

  function selectLanguage(e) {
    const newLocale = e.target.value
    setLocale(newLocale)
    if (newLocale === 'en') {
      setMessages(English)
    } else if (newLocale === 'de') {
      setMessages(German)
    }
  }

  return (
    <Context.Provider value={{ locale, selectLanguage }}>
      <IntlProvider messages={messages} locale={locale}>
        {props.children}
      </IntlProvider>
    </Context.Provider>
  )
}

export default Wrapper
