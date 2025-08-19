import { Result, ValidationError } from "express-validator";

export const formattedValidateErrors = (errors: Result<ValidationError>) => {
  const acc: Record<string, string> = {};

  const flatten = (err: ValidationError) => {
    switch (err.type) {
      case "field":
        acc[err.path] = err.msg;
        break;
      case "unknown_fields":
        err.fields.forEach((f) => (acc[f.path] = err.msg));
        break;
      case "alternative":
        err.nestedErrors.forEach(flatten);
        break;
      case "alternative_grouped":
        err.nestedErrors.flat().forEach(flatten);
        break;
      default: {
      }
    }
  };

  errors.array().forEach(flatten);

  return acc;
};
