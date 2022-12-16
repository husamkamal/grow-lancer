import { useState } from 'react';
import {
  Box, Step, Stepper, StepLabel, Button,
} from '@mui/material';
import './style.css';
import { FirstStep, Signup, FreelancerSignUp } from '../../components';

function SignupPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [userRole, setUserRole] = useState('');
  const [userInfo, setUserInfo] = useState<{
    userID: number;
    name: string; photoURL: string | null;
  }>({ userID: 0, name: '', photoURL: null });

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  // const handleReset = () => {
  //   setActiveStep(0);
  // };
  const steps = [
    {
      label: 'freelancer or client',
      component: (<FirstStep setUserRole={setUserRole} setActiveStep={setActiveStep} />),
    },
    {
      label: 'Basic info',
      component: (<Signup setActiveStep={setActiveStep} userRole={userRole} setUserInfo={setUserInfo} />),
    },
    {
      label: 'major and experience',
      component: (<FreelancerSignUp userInfo={userInfo} />),
    },
  ];

  return (
    <div className="signup-page">
      <Box>
        <Stepper activeStep={activeStep}>
          {steps.map(({ label }) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {/* {activeStep === 3 ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : ( */}
        <>
          <div className="steps">
            {steps[activeStep].component}
          </div>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
          </Box>
        </>
        {/* )} */}
      </Box>
    </div>
  );
}

export default SignupPage;
