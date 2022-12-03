import React from 'react'

export default function MainTesting ({ children, ...props }) {
  
  return (
    <div>
      <h2>This is Child Routes 02</h2>
      {children && children}
    </div>
  )
}