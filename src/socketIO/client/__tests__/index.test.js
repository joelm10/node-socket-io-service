import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ExampleSocketIO } from '../index';
import getFeatures from '../common/socketIO/listener';
import { default as isFeatureEnabled } from '../common/generators/features';

// Mock the imports
jest.mock('../common/socketIO/listener');
jest.mock('../common/generators/features', () => ({
  __esModule: true,
  default: jest.fn()
}));
jest.mock('../../../config/', () => ({
  defaultConfig: {
    featureToggle: {
      features: [{ name: 'tabEnabled', enabled: true }]
    }
  },
  exampleProps: {
    delayTime: 1000
  }
}));
jest.mock('../../../reactComponents', () => ({
  HeaderWrapper: ({ appName }) => <header data-testid="header">{appName}</header>,
  tabWrapper: <div data-testid="tab-component">Tab Component</div>,
  listWrapper: <div data-testid="list-component">List Component</div>
}));

describe('ExampleSocketIO Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    
    // Default implementation for isFeatureEnabled
    isFeatureEnabled.mockImplementation((featureName, defaultValue) => {
      if (featureName === 'tabEnabled') return true;
      if (featureName === 'listWrapper') return false;
      return defaultValue;
    });
    
    // Default implementation for getFeatures - simulates Socket.IO response
    getFeatures.mockImplementation((event, callback, state) => {
      callback({
        ...state,
        isSubscribed: true,
        config: {
          featureToggle: {
            features: [
              { name: 'tabEnabled', enabled: true },
              { name: 'listWrapper', enabled: false }
            ]
          }
        }
      });
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders with default configuration before Socket.IO updates', () => {
    render(<ExampleSocketIO />);
    
    // Header should be present
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toHaveTextContent('Example of feature toggle setup');
    
    // Tab component should be visible by default
    expect(screen.getByTestId('tab-component')).toBeInTheDocument();
    
    // List component should be hidden by default
    expect(screen.queryByTestId('list-component')).not.toBeInTheDocument();
    
    // Should show loading state for features
    expect(screen.getByText(/features not loaded yet/i)).toBeInTheDocument();
  });

  test('updates features after the delay time', async () => {
    render(<ExampleSocketIO delayTime={1000} />);
    
    // Fast-forward timer to trigger the Socket.IO call
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    // Wait for the state update to complete
    await waitFor(() => {
      expect(getFeatures).toHaveBeenCalledWith(
        'featureToggleUpdate',
        expect.any(Function),
        expect.any(Object),
        expect.any(Object)
      );
    });
    
    // Tab should still be visible after update
    expect(screen.getByTestId('tab-component')).toBeInTheDocument();
    
    // List should still be hidden after update (as our mock keeps it disabled)
    expect(screen.queryByTestId('list-component')).not.toBeInTheDocument();
  });

  test('shows list component when feature is enabled', async () => {
    // Override the isFeatureEnabled mock for this test
    isFeatureEnabled.mockImplementation((featureName) => {
      return featureName === 'tabEnabled' || featureName === 'listWrapper';
    });
    
    // Override getFeatures to enable the list feature
    getFeatures.mockImplementation((event, callback, state) => {
      callback({
        ...state,
        isSubscribed: true,
        config: {
          featureToggle: {
            features: [
              { name: 'tabEnabled', enabled: true },
              { name: 'listWrapper', enabled: true }
            ]
          }
        }
      });
    });

    render(<ExampleSocketIO />);
    
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    
    await waitFor(() => {
      expect(screen.getByTestId('list-component')).toBeInTheDocument();
    });
    
    // Both components should now be visible
    expect(screen.getByTestId('tab-component')).toBeInTheDocument();
    expect(screen.getByTestId('list-component')).toBeInTheDocument();
  });

  test('handles errors during Socket.IO connection', async () => {
    // Spy on console.error
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    
    // Make getFeatures throw an error
    getFeatures.mockImplementation(() => {
      throw new Error('Socket connection error');
    });

    render(<ExampleSocketIO />);
    
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    
    // Should have logged the error
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error occurred:',
      expect.any(Error)
    );
    
    // Tab should still be visible as it's enabled by default
    expect(screen.getByTestId('tab-component')).toBeInTheDocument();
    
    // Restore console.error
    consoleErrorSpy.mockRestore();
  });

  test('uses custom delay time from props', () => {
    render(<ExampleSocketIO delayTime={2000} />);
    
    // getFeatures should not be called before the delay
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(getFeatures).not.toHaveBeenCalled();
    
    // getFeatures should be called after the delay
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(getFeatures).toHaveBeenCalled();
  });
  
  test('passes correct parameters to getFeatures', () => {
    const customProps = { delayTime: 3000, config: { customSetting: true } };
    render(<ExampleSocketIO {...customProps} />);
    
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    
    expect(getFeatures).toHaveBeenCalledWith(
      'featureToggleUpdate',
      expect.any(Function),
      expect.objectContaining({
        delayTime: 3000,
        isSubscribed: false
      }),
      customProps
    );
  });
});