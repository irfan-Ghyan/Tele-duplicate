"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"

export default function InfoPopup({ object, position, onClose }) {
  const popupRef = useRef(null)

  useEffect(() => {
    // Adjust position to ensure popup stays within viewport
    if (popupRef.current) {
      const rect = popupRef.current.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      let x = position.x
      let y = position.y

      // Adjust horizontal position if needed
      if (x + rect.width > viewportWidth) {
        x = viewportWidth - rect.width - 20
      }

      // Adjust vertical position if needed
      if (y + rect.height > viewportHeight) {
        y = viewportHeight - rect.height - 20
      }

      popupRef.current.style.left = `${x}px`
      popupRef.current.style.top = `${y}px`
    }

    // Close popup when clicking outside
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [position, onClose])

  return (
    <div
      ref={popupRef}
      className="fixed z-50 bg-white rounded-lg shadow-lg p-4 w-72 transform -translate-x-1/2 -translate-y-1/2"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg" style={{ color: object.color }}>
          {object.title}
        </h3>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
          <X className="h-4 w-4" />
        </button>
      </div>
      <p className="text-gray-700">{object.description}</p>
    </div>
  )
}

