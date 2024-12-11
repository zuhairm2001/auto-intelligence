import React from 'react'

interface FormData {
  expertiseLevel: string
  carMake: string
  carModel: string
  carYear: string
  additionalNotes: string
}

interface SummaryProps {
  formData: FormData
  prevStep: () => void
}

export function Summary({ formData, prevStep }: SummaryProps) {
  const handleSubmit = async () => {
    try {
      // Here you would typically send the data to your backend or LLM
      console.log('Submitting data:', formData)
      alert('Thank you for your submission! We\'ll generate your report shortly.')
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error submitting your form. Please try again.')
    }
  }

  const summaryItems = [
    { label: 'Expertise Level', value: formData.expertiseLevel },
    { label: 'Car Make', value: formData.carMake },
    { label: 'Car Model', value: formData.carModel },
    { label: 'Year', value: formData.carYear },
    { label: 'Additional Notes', value: formData.additionalNotes || 'None' }
  ]

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center md:text-left">
        Summary
      </h2>

      <div className="space-y-4 bg-gray-50 rounded-lg p-6">
        {summaryItems.map(({ label, value }) => (
          <div 
            key={label}
            className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 border-b border-gray-200 pb-4 last:border-0 last:pb-0"
          >
            <div className="font-semibold text-gray-700">{label}:</div>
            <div className="text-gray-900">{value}</div>
          </div>
        ))}
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

export default Summary
