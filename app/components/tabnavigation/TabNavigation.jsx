"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { cn } from "../../lib/utils"

export default function TabNavigation({ onTabChange, initialTab = 0 }) {
  const [activeTab, setActiveTab] = useState(initialTab)

  const tabs = [
    { id: "01", label: "Experiences" },
    { id: "02", label: "Confirm" },
    { id: "03", label: "Thanks" },
  ]

  const handleTabClick = (index) => {
    setActiveTab(index)
    if (onTabChange) {
      onTabChange(index)
    }
  }

  return (
    <div className="flex items-center justify-center w-full bg-[#004040] p-4">
      <div className="flex items-center max-w-6xl w-full">
        <button
          className="flex items-center justify-center h-12 w-12 rounded-md border border-[#b89d60]/50 mr-4"
          onClick={() => {
            if (activeTab > 0) {
              handleTabClick(activeTab - 1)
            }
          }}
        >
          <ArrowLeft className="h-5 w-5 text-white" />
        </button>

        <div className="flex items-center w-full">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(index)}
              className={cn(
                "relative flex items-center flex-1 h-16 px-6 border rounded-md transition-all",
                activeTab === index ? "border-[#b89d60] text-[#b89d60]" : "border-[#004040]/50 text-white/50",
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center h-10 w-10 rounded-full mr-4",
                  activeTab === index
                    ? "bg-[#b89d60] text-[#004040]"
                    : "bg-[#004040] border border-white/20 text-white/50",
                )}
              >
                {tab.id}
              </div>
              <span className={cn("text-xl font-medium", activeTab === index ? "text-[#b89d60]" : "text-white/50")}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

