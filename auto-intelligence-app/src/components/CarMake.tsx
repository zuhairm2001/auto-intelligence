import React, { useState } from 'react'

interface CarMakeProps {
  updateFormData: (field: string, value: string) => void
  nextStep: () => void
  prevStep: () => void
}

const carMakes = [
  'Toyota', 
  'Honda', 
  'Ford', 
  'Chevrolet', 
  'BMW', 
  'Mercedes-Benz', 
  'Audi', 
  'Volkswagen'
] as const

export function CarMake({ updateFormData, nextStep, prevStep }: CarMakeProps) {
  const [selectedMake, setSelectedMake] = useState('')

  const handleSubmit = () => {
    updateFormData('carMake', selectedMake)
    nextStep()
  }

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center md:text-left">
        Select the car make
      </h2>

      <div className="space-y-2">
        <label htmlFor="car-make" className="block text-sm font-medium text-gray-700">
          Car Make
        </label>
        <select
          id="car-make"
          value={selectedMake}
          onChange={(e) => setSelectedMake(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg
                   bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   focus:outline-none appearance-none cursor-pointer
                   disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value="" disabled>Select a car make</option>
          {carMakes.map((make) => (
            <option key={make} value={make} className="py-2">
              {make}
            </option>
          ))}
        </select>
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
          disabled={!selectedMake}
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

export default CarMake
