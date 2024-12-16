import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Page from '../page'
import { resolvedComponent } from '@/utils/test-helpers'

describe('Vehicle Details Page', () => {
  it('should render the Page and have the correct className', async () => {
    const PageResolved = await resolvedComponent(Page, {
      params: { vehicleId: 'test' },
    })
    render(<PageResolved />)

    const PageDiv = screen.getByTestId('vehicle-details')

    expect(PageDiv).toBeInTheDocument()
    expect(PageDiv).toHaveClass('vehicle-details')
  })
})
