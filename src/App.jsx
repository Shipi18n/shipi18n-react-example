import { useState } from 'react'
import BasicExample from './components/BasicExample'
import MultiLangExample from './components/MultiLangExample'
import JSONExample from './components/JSONExample'
import PlaceholderExample from './components/PlaceholderExample'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('basic')

  const tabs = [
    { id: 'basic', label: 'Basic Translation', component: BasicExample },
    { id: 'multi', label: 'Multi-Language', component: MultiLangExample },
    { id: 'json', label: 'JSON Translation', component: JSONExample },
    { id: 'placeholder', label: 'Placeholders', component: PlaceholderExample }
  ]

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component

  return (
    <div className="app">
      <header className="header">
        <h1>Shipi18n React Example</h1>
        <p>Integrate translation into your React application</p>
        <a
          href="https://shipi18n.com"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-link"
        >
          Get Your API Key →
        </a>
      </header>

      <nav className="tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="main">
        {ActiveComponent && <ActiveComponent />}
      </main>

      <footer className="footer">
        <p>
          Built with <a href="https://shipi18n.com" target="_blank" rel="noopener noreferrer">Shipi18n</a>
          {' '}&middot;{' '}
          <a href="https://github.com/shipi18n/shipi18n-react-example" target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
          {' '}&middot;{' '}
          <a href="https://shipi18n.com/docs" target="_blank" rel="noopener noreferrer">
            Documentation
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App
