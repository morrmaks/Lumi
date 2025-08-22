interface ErrorData {
  errors?: Record<string, string>
  message: string
}

export interface ApiError {
  status: number
  data: ErrorData
}
