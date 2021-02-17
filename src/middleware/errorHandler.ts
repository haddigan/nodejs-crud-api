import express from "express";

export function errorHandler(
  error: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (res.headersSent) {
    next(error);
  } else {
    res.status(500);
    res.json({
      message: error.message,
      ...(process.env.NODE_ENV === "production"
        ? null
        : { stack: error.stack }),
    });
  }
}
