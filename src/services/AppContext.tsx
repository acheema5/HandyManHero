import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, Job, AppState } from '../types';

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'CLEAR_USER' }
  | { type: 'ADD_JOB'; payload: Job }
  | { type: 'UPDATE_JOB'; payload: Job }
  | { type: 'SET_JOBS'; payload: Job[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: AppState = {
  auth: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
  jobs: {
    jobs: [],
    currentJob: null,
    isLoading: false,
    error: null,
  },
  chat: {
    messages: [],
    isLoading: false,
    error: null,
  },
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        auth: {
          ...state.auth,
          user: action.payload,
          isAuthenticated: true,
          error: null,
        },
      };
    case 'CLEAR_USER':
      return {
        ...state,
        auth: {
          ...state.auth,
          user: null,
          isAuthenticated: false,
        },
      };
    case 'ADD_JOB':
      return {
        ...state,
        jobs: {
          ...state.jobs,
          jobs: [action.payload, ...state.jobs.jobs],
        },
      };
    case 'UPDATE_JOB':
      return {
        ...state,
        jobs: {
          ...state.jobs,
          jobs: state.jobs.jobs.map(job =>
            job.id === action.payload.id ? action.payload : job
          ),
        },
      };
    case 'SET_JOBS':
      return {
        ...state,
        jobs: {
          ...state.jobs,
          jobs: action.payload,
        },
      };
    case 'SET_LOADING':
      return {
        ...state,
        jobs: {
          ...state.jobs,
          isLoading: action.payload,
        },
      };
    case 'SET_ERROR':
      return {
        ...state,
        jobs: {
          ...state.jobs,
          error: action.payload,
        },
      };
    default:
      return state;
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}; 