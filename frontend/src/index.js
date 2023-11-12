import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ExercisesContextProvider } from './context/ExercisesContext';
import { WorkoutsContextProvider } from './context/WorkoutsContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  /*ExerciseContextProvider has to wrap the whole app and it passes 
  app as a children property */
  
    <AuthContextProvider>
      <WorkoutsContextProvider>
        <ExercisesContextProvider>
          <App />
        </ExercisesContextProvider>
      </WorkoutsContextProvider>
    </AuthContextProvider>
    
 
);


