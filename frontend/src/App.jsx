import React, { useState, useEffect } from 'react'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import InputSection from './components/Writer/InputSection'
import Controls from './components/Writer/Controls'
import OutputSection from './components/Writer/OutputSection'
import HistorySidebar from './components/Writer/HistorySidebar'
import './App.css'

function App() {
  const [inputText, setInputText] = useState('')
  const [tone, setTone] = useState('Professional')
  const [length, setLength] = useState('Medium')
  const [context, setContext] = useState('General')
  const [output, setOutput] = useState({ subject: '', content: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [history, setHistory] = useState([])
  const [activeHistoryId, setActiveHistoryId] = useState(null)

  // Load history from backend on mount
  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const response = await fetch('/api/ai/history')
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with ${response.status}`);
      }
      const data = await response.json()
      if (Array.isArray(data)) {
        setHistory(data)
      } else {
        console.error('Expected array from history API, got:', data)
        setHistory([])
      }
    } catch (error) {
      console.error('Error fetching history:', error)
      setHistory([])
    }
  }

  const handleRewrite = async () => {
    if (!inputText) return
    setIsLoading(true)
    try {
      const response = await fetch('/api/ai/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText, tone, context, length })
      })

      const data = await response.json().catch(() => ({ error: "Invalid server response" }))

      if (!response.ok || data.error) {
        throw new Error(data.error || `Request failed with status ${response.status}`)
      }

      setOutput({ subject: data.subject, content: data.content })

      // Refresh history from server
      fetchHistory()
      setActiveHistoryId(data._id)
    } catch (error) {
      console.error('Error rewriting:', error)
      alert(`Error: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoadHistory = (item) => {
    setInputText(item.inputText)
    setTone(item.tone)
    setLength(item.length)
    setContext(item.context)
    setOutput(item.output)
    setActiveHistoryId(item._id || item.id)
  }

  const handleClearHistory = async () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      try {
        await fetch('/api/ai/history', { method: 'DELETE' })
        setHistory([])
        setActiveHistoryId(null)
      } catch (error) {
        console.error('Error clearing history:', error)
      }
    }
  }

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <div className="writer-grid">
          <div className="history-column animate-fade-in">
            <HistorySidebar
              history={history}
              onLoadHistory={handleLoadHistory}
              onClearHistory={handleClearHistory}
              activeId={activeHistoryId}
            />
          </div>
          <div className="input-column animate-fade-in">
            <InputSection value={inputText} onChange={setInputText} />
            <Controls
              tone={tone} setTone={setTone}
              length={length} setLength={setLength}
              context={context} setContext={setContext}
              onRewrite={handleRewrite}
              isLoading={isLoading}
            />
          </div>
          <div className="output-column animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <OutputSection output={output} isLoading={isLoading} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
