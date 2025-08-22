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

  static BadRequest(message: string, errors: Record<string, string> = {}) {
    return new ApiError(400, message, errors);
  }

  static Unauthorized(message = "Пользователь не авторизован") {
    return new ApiError(401, message);
  }

  static Forbidden(message = "Доступ запрещен") {
    return new ApiError(403, message);
  }

  static NotFound(message = "Не найдено") {
    return new ApiError(404, message);
  }

  static Conflict(message = "Конфликт") {
    return new ApiError(409, message);
  }

  static Internal(message = "Внутренняя ошибка сервера") {
    return new ApiError(500, message);
  }
}

export { ApiError };
