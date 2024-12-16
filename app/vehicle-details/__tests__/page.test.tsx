import { render } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import Page from '../page'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('Vehicle Details Main Page component', () => {
  it('should redirect to "/" when rendered', () => {
    const pushMock = jest.fn()
    ;(useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    })

    render(<Page />)

    expect(pushMock).toHaveBeenCalledWith('/')
  })
})
