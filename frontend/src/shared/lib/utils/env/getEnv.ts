export const getEnv = (name: string) => {
  if (typeof import.meta.env !== 'undefined' && import.meta.env)
    return import.meta.env[`VITE_${name}`]
  if (typeof process.env !== 'undefined' && process.env)
    return process.env[name]
  throw new Error(
    `Переменная окружения ${name} не установлена. Попытка поиска "VITE_${name}" (Vite), "${name}" (Webpack)`
  )
}
