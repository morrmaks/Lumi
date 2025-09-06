import { getIconTheme } from './getIconTheme'
import { IconTheme } from '@/shared/consts/iconTheme'
import { IconsMap } from '@/shared/consts/icons'

describe('getIconTheme', () => {
  it('возвращает тему иконки из IconTheme, если она существует', () => {
    const iconKey = Object.keys(IconTheme)[0] as keyof typeof IconTheme
    expect(getIconTheme(iconKey)).toBe(IconTheme[iconKey])
  })

  it('возвращает PRIMARY, если темы для иконки нет', () => {
    expect(getIconTheme('NON_EXISTENT_ICON' as keyof typeof IconsMap)).toBe(
      IconTheme.PRIMARY
    )
  })

  it('работает с ключами из IconsMap', () => {
    const iconKey = Object.keys(IconsMap)[0] as keyof typeof IconsMap
    const theme = getIconTheme(iconKey)
    expect([IconTheme.PRIMARY, ...Object.values(IconTheme)]).toContain(theme)
  })
})
