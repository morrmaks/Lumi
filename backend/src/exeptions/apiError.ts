class ApiError extends Error {
  status: number;
  errors: Record<string, string> = {};

  constructor(
    status: number,
    message: string,
    errors: Record<string, string> = {},
  ) {
    super(message);
    this.status = status;
    this.errors = errors ?? {};
  }

  static UnauthorizedError() {
    return new ApiError(401, "Пользователь не авторизован");
  }

  static BadRequest(message: string, errors: Record<string, string> = {}) {
    return new ApiError(400, message, errors);
  }
}

export { ApiError };
