import { Request, Response, NextFunction } from 'express';

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        status: 'fail',
        message: `Route ${req.originalUrl} not found on this server`,
    });
};

export default notFoundHandler;
