import { copyToClipboard } from './copyToClipboard'

describe('copyToClipboard', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(undefined),
      },
    })
  })

  it('вызывает navigator.clipboard.writeText с правильным текстом', async () => {
    const text = 'Hello, world!'
    await copyToClipboard(text)
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(text)
  })
})
