import React from 'react'

const Card = ({ children,bg="bg-gray-100" }) => {
  return (
    <div className={`rounded-lg shadow-md p-6 ${bg}`}>
        {children}
    </div>
  )
}

export default Card