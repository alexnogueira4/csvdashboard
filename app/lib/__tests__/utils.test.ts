import { formatCurrency, formatDateToLocal } from '../utils'

describe('Utility functions', () => {
  it('should format currency correctly', () => {
    const amount = 1500
    const formatted = formatCurrency(amount)
    expect(formatted).toBe('$15.00')
  })

  it('should format currency correctly with fractional values', () => {
    const amount = 1234
    const formatted = formatCurrency(amount)
    expect(formatted).toBe('$12.34')
  })

  it('should handle zero currency correctly', () => {
    const amount = 0
    const formatted = formatCurrency(amount)
    expect(formatted).toBe('$0.00')
  })

  it('should format date to local format correctly (en-US)', () => {
    const dateStr = '2024-11-05T00:00:00Z'
    const formatted = formatDateToLocal(dateStr, 'en-US')
    expect(formatted).toBe('Nov 5, 2024')
  })

  it('should handle invalid date input gracefully', () => {
    const invalidDateStr = 'invalid-date'
    const formatted = formatDateToLocal(invalidDateStr, 'en-US')
    expect(formatted).toBe('Invalid Date')
  })
})
