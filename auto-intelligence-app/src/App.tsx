import { useState } from 'react'
import { ExpertiseLevel } from './components/ExpertiseLevel'
import { CarMake } from './components/CarMake'
import { CarModelYear } from './components/CarModelYear'
import { AdditionalNotes } from './components/AdditionalNotes'
import { AdviceReport } from './components/AdviceReport'
import { ThemeToggle } from './components/theme-toggle'
import { 
  Alert,
  Button,
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Snackbar
} from '@mui/material'
import './index.css'

interface FormData {
  expertiseLevel: string;
  carMake: string;
  carModel: string;
  carYear: string;
  additionalNotes: string;
}

// Define the JsonAdvice interface here or import it from a shared types file
interface JsonAdvice {
  vehicle_details: {
    make: string;
    model: string;
    year: string;
    buyer_expertise: string;
  };
  common_issues: Array<{
    issue: string;
    description: string;
    severity: string;
  }>;
  price_information: {
    expected_range: {
      low: number;
      high: number;
      currency: string;
    };
    price_factors: Array<{
      factor: string;
      impact: string;
    }>;
  };
  inspection_checklist: Array<{
    area: string;
    details: string;
    priority: string;
  }>;
  pre_purchase_checks: Array<{
    check: string;
    importance: string;
    estimated_cost: string;
  }>;
  negotiation_tips: Array<{
    tip: string;
    explanation: string;
  }>;
  alternative_vehicles: Array<{
    make: string;
    model: string;
    year_range: string;
    reason: string;
  }>;
}

interface ApiResponse {
  success: boolean;
  advice?: JsonAdvice;  // Changed from data to advice to match backend
  error?: string;
}

export default function AutoIntelligence() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    expertiseLevel: '',
    carMake: '',
    carModel: '',
    carYear: '',
    additionalNotes: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [advice, setAdvice] = useState<JsonAdvice | null>(null)
  const [showReport, setShowReport] = useState(false)

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => setStep(prev => prev + 1)
  const prevStep = () => setStep(prev => prev - 1)

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    setAdvice(null)

    try {
      const response = await fetch('http://localhost:5000/api/car-advice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data: ApiResponse = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get advice')
      }

      if (data.advice) {  // Changed from data.data to data.advice
        setAdvice(data.advice)
        setShowReport(true)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setStep(1)
    setFormData({
      expertiseLevel: '',
      carMake: '',
      carModel: '',
      carYear: '',
      additionalNotes: ''
    })
    setAdvice(null)
    setShowReport(false)
    setError(null)
  }

  const handleCloseError = () => {
    setError(null)
  }

  return (
    <Container maxWidth={false} sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #bbdefb 0%, #ffffff 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      p: 4
    }}>
      <Box sx={{ 
        width: '100%',
        maxWidth: 'lg',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4
      }}>
        <Typography variant="h3" component="h1" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
          AutoIntelligence
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <ThemeToggle />
          <Button variant="contained" color="primary">
            Sign Up
          </Button>
          <Button variant="contained" color="success">
            Login
          </Button>
        </Box>
      </Box>

      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Paper elevation={3} sx={{ 
        width: '100%',
        maxWidth: 'sm',
        p: 4,
        borderRadius: 2
      }}>
        {!showReport ? (
          <>
            {step === 1 && <ExpertiseLevel updateFormData={updateFormData} nextStep={nextStep} />}
            {step === 2 && <CarMake updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />}
            {step === 3 && <CarModelYear updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />}
            {step === 4 && <AdditionalNotes updateFormData={updateFormData} prevStep={prevStep} />}
            
            {step === 4 && (
              <Button 
                onClick={handleSubmit}
                disabled={loading}
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                startIcon={loading && <CircularProgress size={20} color="inherit" />}
              >
                {loading ? 'Generating Report...' : 'Generate Report'}
              </Button>
            )}
          </>
        ) : (
          <AdviceReport 
            advice={advice}
            formData={formData}
            onReset={resetForm}
          />
        )}
      </Paper>
    </Container>
  )
}
