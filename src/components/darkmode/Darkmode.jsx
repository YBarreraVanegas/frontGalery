import React, { useState, useEffect } from 'react'

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode)
  }

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        id="darkModeCheckbox"
        checked={darkMode}
        onChange={toggleDarkMode}
      />
      <label className="form-check-label" htmlFor="darkModeCheckbox">
        Modo Oscuro
      </label>
    </div>
  )
}

export default DarkModeToggle
