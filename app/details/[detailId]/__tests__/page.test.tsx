import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Page from '../page'
import { resolvedComponent } from '@/utils/test-helpers'

describe('Details Page', () => {
  it('should render the Page and have the correct className', async () => {
    const PageResolved = await resolvedComponent(Page, {
      params: { detailId: 'test' },
    })
    render(<PageResolved />)

    const PageDiv = screen.getByTestId('inspection-page')

    expect(PageDiv).toBeInTheDocument()
    expect(PageDiv).toHaveClass('inspection-page')
  })
})
