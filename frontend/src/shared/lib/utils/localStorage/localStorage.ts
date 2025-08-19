import { LocalStorage } from '@/shared/consts'

export const setAccessToken = (token: string) => {
  localStorage.setItem(LocalStorage.ACCESS_TOKEN, token)
}

export const removeAccessToken = () => {
  localStorage.removeItem(LocalStorage.ACCESS_TOKEN)
}
