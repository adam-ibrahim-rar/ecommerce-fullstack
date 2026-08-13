import React from 'react'

export default function Arrow({icon, onClick}: {icon: React.ReactNode, onClick: () => void}) {
  return (
    <button onClick={onClick} 
    className="size-9 cursor-pointer flex
     items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400 transition-colors duration-300">
      <p className="text-2xl font-bold">{icon}</p>
    </button>
  )
}
