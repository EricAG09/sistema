import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { colors } from '@nexus-ui/tokens';

describe('test infra', () => {
  it('renders into jsdom with jest-dom matchers', () => {
    render(React.createElement('span', null, 'hello'));
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('uses the PWR primary color', () => {
    expect(colors.primary).toBe('#FF5B00');
  });
});
