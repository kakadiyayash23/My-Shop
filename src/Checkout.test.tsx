/// <reference types="jest" />
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Checkout from './Checkout';
import { getStoreItems } from './getDataService';

// Mock the getStoreItems function
vi.mock('./getDataService', () => ({
  getStoreItems: vi.fn()
}));

describe('Checkout Component', () => {
  const mockProducts = [
    {
      id: 1,
      name: 'Product 1',
      price: 100,
      availableCount: 5
    },
    {
      id: 2,
      name: 'Product 2',
      price: 200,
      availableCount: 3
    }
  ];

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
    // Setup default mock implementation
    (getStoreItems as any).mockResolvedValue(mockProducts);
  });

  it('shows loading state initially', () => {
    render(<Checkout />);
    expect(screen.getByText('Loading products...')).toBeInTheDocument();
  });

  it('loads and displays products after initial load', async () => {
    render(<Checkout />);
    
    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });

    // Check if prices are displayed correctly
    expect(screen.getByText('₹100.00')).toBeInTheDocument();
    expect(screen.getByText('₹200.00')).toBeInTheDocument();
  });

  it('disables increment button when max quantity is reached', async () => {
    render(<Checkout />);
    
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    const incrementButton = screen.getAllByText('+')[0];
    
    // Click increment button 5 times (max available count)
    for (let i = 0; i < 5; i++) {
      fireEvent.click(incrementButton);
    }

    // Button should be disabled
    expect(incrementButton).toBeDisabled();
  });

  it('disables decrement button when quantity is 0', async () => {
    render(<Checkout />);
    
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    const decrementButton = screen.getAllByText('-')[0];
    expect(decrementButton).toBeDisabled();
  });

  it('does not apply GST when total is below ₹1000', async () => {
    render(<Checkout />);
    
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    // Add 2 units of Product 1 (price: 100) to stay below ₹1000
    const incrementButton = screen.getAllByText('+')[0];
    for (let i = 0; i < 2; i++) {
      fireEvent.click(incrementButton);
    }

    // GST should not be displayed
    expect(screen.queryByText('GST (18%):')).not.toBeInTheDocument();
    
    // Check total without GST (200)
    expect(screen.getByText('₹ 200.00')).toBeInTheDocument();
  });

  it('handles error when loading products fails', async () => {
    // Mock getStoreItems to reject
    (getStoreItems as any).mockRejectedValue(new Error('Failed to load products'));
    
    // Spy on console.error
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    render(<Checkout />);
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error loading products:', expect.any(Error));
    });

    // Loading message should disappear
    expect(screen.queryByText('Loading products...')).not.toBeInTheDocument();
    
    consoleSpy.mockRestore();
  });
});
