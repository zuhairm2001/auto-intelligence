import React from 'react'

interface ExpertiseLevelProps {
  updateFormData: (field: string, value: string) => void
  nextStep: () => void
}

const levels = [
  { value: '1', label: 'Novice' },
  { value: '2', label: 'Beginner' },
  { value: '3', label: 'Intermediate' },
  { value: '4', label: 'Advanced' },
  { value: '5', label: 'Expert' },
] as const

export function ExpertiseLevel({ updateFormData, nextStep }: ExpertiseLevelProps) {
  const handleSelection = (value: string) => {
    updateFormData('expertiseLevel', value)
    nextStep()
  }

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center md:text-left">
        What's your level of expertise in cars?
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {levels.map((level) => (
          <button
            key={level.value}
            onClick={() => handleSelection(level.value)}
            className="px-6 py-3 border-2 border-gray-300 rounded-lg
                     hover:border-blue-500 hover:bg-blue-50 
                     transition-colors duration-200
                     text-gray-800 font-medium
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {level.label} ({level.value})
          </button>
        ))}
      </div>
    </div>
  )
}

export default ExpertiseLevel
