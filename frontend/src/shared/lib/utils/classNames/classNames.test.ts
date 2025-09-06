import { classNames, Mods } from './classNames'

describe('classNames', () => {
  it('возвращает только базовый класс, если нет модификаторов и дополнительных классов', () => {
    expect(classNames('base')).toBe('base')
  })

  it('добавляет модификаторы, если их значение true', () => {
    const mods: Mods = {
      active: true,
      disabled: false,
      hidden: undefined,
    }
    expect(classNames('base', mods)).toBe('base active')
  })

  it('добавляет дополнительные классы', () => {
    const additional = ['extra', undefined, 'another']
    expect(classNames('base', {}, additional)).toBe('base extra another')
  })

  it('сочетает базовый, модификаторы и дополнительные классы', () => {
    const mods: Mods = { active: true, disabled: false }
    const additional = ['extra', 'another']
    expect(classNames('base', mods, additional)).toBe(
      'base active extra another'
    )
  })

  it('игнорирует пустые, false и undefined модификаторы', () => {
    const mods: Mods = { active: false, hidden: undefined, visible: true }
    expect(classNames('base', mods)).toBe('base visible')
  })

  it('игнорирует falsy значения в additional', () => {
    const additional = [
      'extra',
      '',
      undefined,
      'another',
      false as unknown as string,
    ]
    expect(classNames('base', {}, additional)).toBe('base extra another')
  })
})
