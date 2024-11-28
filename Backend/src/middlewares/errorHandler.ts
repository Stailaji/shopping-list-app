import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message || "Ein unerwarteter Fehler ist aufgetreten.",
    details: err.details || null,
  });
};
