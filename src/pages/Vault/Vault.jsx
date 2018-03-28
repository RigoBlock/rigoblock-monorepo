import React from 'react'
import { Link } from 'react-router-dom'

export default function Vault() {
  return (
    <div>
      <h1>Vault</h1>
      <Link to="/" className="link">
        Dashboard
      </Link>
    </div>
  )
}
