import React, { useState } from 'react'

interface CarModelYearProps {
  updateFormData: (field: string, value: string) => void
  nextStep: () => void
  prevStep: () => void
}

export function CarModelYear({ updateFormData, nextStep, prevStep }: CarModelYearProps) {
  const [model, setModel] = useState('')
  const [year, setYear] = useState('')
  const currentYear = new Date().getFullYear()

  const handleSubmit = () => {
    updateFormData('carModel', model)
    updateFormData('carYear', year)
    nextStep()
  }

  const isValidYear = year ? parseInt(year) >= 1900 && parseInt(year) <= currentYear : true

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center md:text-left">
        Enter car model and year
      </h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="model" className="block text-sm font-medium text-gray-700">
            Car Model
          </label>
          <input
            id="model"
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Enter car model"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                     focus:ring-blue-500 focus:border-blue-500 focus:outline-none
                     placeholder:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">
            Year
          </label>
          <input
            id="year"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Enter year"
            min={1900}
            max={currentYear}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2
                     ${isValidYear 
                       ? 'border-gray-300 focus:ring-blue-500 focus:border-blue-500' 
                       : 'border-red-300 focus:ring-red-500 focus:border-red-500'
                     } placeholder:text-gray-400`}
          />
          {!isValidYear && (
            <p className="text-sm text-red-600">
              Please enter a year between 1900 and {currentYear}
            </p>
          )}
        </div>
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
          disabled={!model || !year || !isValidYear}
          className="px-6 py-2 bg-blue-600 rounded-lg
                   hover:bg-blue-700 transition-colors duration-200
                   text-white font-medium
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default CarModelYear
