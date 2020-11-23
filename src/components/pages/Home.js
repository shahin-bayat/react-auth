import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext'
import { FormattedMessage } from 'react-intl'
import { Context } from '../../context/language/LanguageWrapper'

const Home = () => {
  const languageContext = useContext(Context)
  const { selectLanguage, locale } = languageContext
  return (
    <div>
      <h1>Home</h1>
      <h2>This is a private page</h2>
      <code>
        <FormattedMessage
          id='app.header'
          defaultMessage='This is the default language'
        />
      </code>
      <select value={locale} onChange={selectLanguage} className='select-box'>
        <option value='en'>English</option>
        <option value='de'>German</option>
      </select>
    </div>
  )
}

export default Home
