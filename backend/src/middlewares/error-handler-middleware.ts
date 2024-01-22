import { Request, Response, NextFunction } from "express";
import { ValidationError } from "yup";

export const errorHandler = (
  error: Error,
  __: Request,
  res: Response,
  _: NextFunction
) => {
  if (error instanceof ValidationError) {
    const errorsMap: Record<string, string> = {};

    error.inner.forEach(({ path, message }) => {
      if (path) errorsMap[path] = message;
    });

    return res.status(400).send({ type: "Invalid fields", fields: errorsMap });
  }

  console.error(`Unexpected error: `, error);

  return res.status(500).send({ message: "Internal server error." });
};
