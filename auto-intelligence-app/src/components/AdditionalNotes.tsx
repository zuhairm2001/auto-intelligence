import React, { useState } from 'react'

interface AdditionalNotesProps {
  updateFormData: (field: string, value: string) => void
  prevStep: () => void
}

export function AdditionalNotes({ updateFormData, prevStep }: AdditionalNotesProps) {
  const [notes, setNotes] = useState('')

  const handleSubmit = () => {
    updateFormData('additionalNotes', notes)
  }

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center md:text-left">
        Any additional notes or concerns?
      </h2>

      <div className="space-y-2">
        <label 
          htmlFor="notes" 
          className="block text-sm font-medium text-gray-700"
        >
          Additional Notes
        </label>
        <textarea
          id="notes"
          rows={5}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Enter any additional information or specific concerns here..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   focus:outline-none resize-none
                   placeholder:text-gray-400"
        />
      </div>

      <div className="flex justify-between items-center pt-4">
        <button
          onClick={prevStep}
          className="px-6 py-2 border-2 border-gray-300 rounded-lg
                   hover:bg-gray-50 transition-colors duration-200
                   text-gray-700 font-medium
                   focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Previous
        </button>
        
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 rounded-lg
                   hover:bg-blue-700 transition-colors duration-200
                   text-white font-medium
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default AdditionalNotes
