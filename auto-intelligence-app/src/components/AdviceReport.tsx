import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Chip, 
  List,
  ListItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import WarningIcon from '@mui/icons-material/Warning';
import ChatIcon from '@mui/icons-material/Chat';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

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

interface AdviceReportProps {
  advice: JsonAdvice | null;
  formData: {
    expertiseLevel: string;
    carMake: string;
    carModel: string;
    carYear: string;
    additionalNotes: string;
  };
  onReset: () => void;
}

export const AdviceReport = ({ advice, formData, onReset }: AdviceReportProps) => {
  // If no advice is available, show error state
  if (!advice || !advice.vehicle_details) {
    return (
      <Box sx={{ textAlign: 'center', p: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Unable to load report data. Please try again.
        </Alert>
        <Button
          onClick={onReset}
          variant="contained"
          sx={{ mt: 2 }}
        >
          Start New Report
        </Button>
      </Box>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 1 }}>
          Your Personalized Car Buying Report
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Expert Analysis for {advice.vehicle_details.year} {advice.vehicle_details.make} {advice.vehicle_details.model}
        </Typography>
      </Box>

      {/* Vehicle Details Card */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <DirectionsCarIcon sx={{ color: 'primary.main', mr: 1 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Vehicle Overview
          </Typography>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {advice.vehicle_details.year} {advice.vehicle_details.make} {advice.vehicle_details.model}
            </Typography>
            <Chip 
              label={`Experience Level: ${advice.vehicle_details.buyer_expertise}`}
              color="primary"
              sx={{ mr: 1, mb: 1 }}
            />
          </Box>
          {advice.price_information?.expected_range && (
            <Box>
              <Typography variant="subtitle2" sx={{ 
                color: 'text.secondary', 
                display: 'flex', 
                alignItems: 'center' 
              }}>
                <AttachMoneyIcon sx={{ mr: 0.5, fontSize: 20 }} />
                Price Range:
              </Typography>
              <Typography variant="h6" sx={{ color: 'success.main' }}>
                {advice.price_information.expected_range.currency} {' '}
                {advice.price_information.expected_range.low.toLocaleString()} - {' '}
                {advice.price_information.expected_range.high.toLocaleString()}
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>

      {/* Common Issues */}
      {advice.common_issues?.length > 0 && (
        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ bgcolor: 'grey.50' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <WarningIcon sx={{ color: 'error.main', mr: 1 }} />
              <Typography variant="h6">Common Issues to Watch For</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {advice.common_issues.map((issue, index) => (
                <ListItem key={index} sx={{ mb: 2, flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 0.5 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                      {issue.issue}
                    </Typography>
                    <Chip 
                      size="small"
                      label={issue.severity}
                      color={getSeverityColor(issue.severity)}
                      sx={{ ml: 1 }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {issue.description}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Inspection Checklist */}
      {advice.inspection_checklist?.length > 0 && (
        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ bgcolor: 'grey.50' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CheckBoxIcon sx={{ color: 'primary.main', mr: 1 }} />
              <Typography variant="h6">Inspection Checklist</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {advice.inspection_checklist.map((item, index) => (
                <ListItem key={index} sx={{ mb: 2, flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 0.5 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                      {item.area}
                    </Typography>
                    <Chip 
                      size="small"
                      label={item.priority}
                      color="primary"
                      variant="outlined"
                      sx={{ ml: 1 }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {item.details}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Negotiation Tips */}
      {advice.negotiation_tips?.length > 0 && (
        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ bgcolor: 'grey.50' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ChatIcon sx={{ color: 'success.main', mr: 1 }} />
              <Typography variant="h6">Negotiation Tips</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {advice.negotiation_tips.map((tip, index) => (
                <ListItem key={index} sx={{ mb: 2, flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                    {tip.tip}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {tip.explanation}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Alternative Vehicles */}
      {advice.alternative_vehicles?.length > 0 && (
        <Accordion sx={{ mb: 3 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ bgcolor: 'grey.50' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CompareArrowsIcon sx={{ color: 'secondary.main', mr: 1 }} />
              <Typography variant="h6">Alternative Vehicles to Consider</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {advice.alternative_vehicles.map((vehicle, index) => (
                <ListItem key={index} sx={{ mb: 2, flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                    {vehicle.make} {vehicle.model} ({vehicle.year_range})
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {vehicle.reason}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      )}

      <Button
        onClick={onReset}
        variant="contained"
        fullWidth
        sx={{ 
          py: 2, 
          fontSize: '1.1rem', 
          fontWeight: 'bold',
          mt: 3,
          mb: 2
        }}
      >
        Start New Report
      </Button>
    </Box>
  );
};

export default AdviceReport;
