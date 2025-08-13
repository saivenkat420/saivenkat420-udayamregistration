import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { theme } from './theme';
import { udyamColors } from './theme/udyamColors';
import { UdyamHeader, AadhaarStep, UdyamFooter } from './components';
import { udyamApi } from './services/api';

// Global styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Arial', 'Helvetica', sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: ${udyamColors.text.primary};
    background: ${udyamColors.background.page};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button {
    font-family: inherit;
  }

  input, select, textarea {
    font-family: inherit;
  }

  a {
    color: ${udyamColors.primary.blue};
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${udyamColors.background.page};
  }

  ::-webkit-scrollbar-thumb {
    background: ${udyamColors.border.medium};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${udyamColors.border.primary};
  }

  /* Focus outline for accessibility */
  *:focus {
    outline: 2px solid ${udyamColors.primary.blue};
    outline-offset: 2px;
  }

  /* Hide default focus outline for mouse users */
  *:focus:not(:focus-visible) {
    outline: none;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const LoadingScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: 24px;
`;

const LoadingSpinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid ${udyamColors.border.light};
  border-top: 4px solid ${udyamColors.primary.blue};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  font-size: 18px;
  color: ${udyamColors.text.secondary};
  text-align: center;
`;

const ErrorMessage = styled.div`
  background: #fee;
  border: 1px solid #f00;
  border-radius: 6px;
  padding: 24px;
  margin: 32px auto;
  max-width: 600px;
  text-align: center;
  
  h3 {
    color: #f00;
    margin-bottom: 12px;
  }
  
  p {
    color: ${udyamColors.text.primary};
    margin-bottom: 16px;
  }
`;

const RetryButton = styled.button`
  background: ${udyamColors.primary.blue};
  color: ${udyamColors.text.white};
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${udyamColors.primary.darkBlue};
  }
`;

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize app
  useEffect(() => {
    const initializeApp = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate initialization
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (err) {
        setError(err.message);
        console.error('App initialization error:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppContainer>
          <UdyamHeader />
          <LoadingScreen>
            <LoadingSpinner />
            <LoadingText>
              Loading Udyam Registration Portal...
              <br />
              <small>Connecting to government servers</small>
            </LoadingText>
          </LoadingScreen>
        </AppContainer>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppContainer>
          <UdyamHeader />
          <ErrorMessage>
            <h3>Unable to Load Application</h3>
            <p>{error}</p>
            <p>Please check your internet connection and try again.</p>
            <RetryButton onClick={handleRetry}>
              Retry
            </RetryButton>
          </ErrorMessage>
        </AppContainer>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <UdyamHeader />
        <AadhaarStep />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;