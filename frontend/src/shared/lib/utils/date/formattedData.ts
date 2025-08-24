export const formattedDate = (date: string) => {
  const newDate = new Date(date)
  return newDate.toLocaleString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}