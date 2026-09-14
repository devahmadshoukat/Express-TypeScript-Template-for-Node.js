export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface RouteHandler {
  GET?: (req: any, res: any) => void | Promise<void>;
  POST?: (req: any, res: any) => void | Promise<void>;
  PUT?: (req: any, res: any) => void | Promise<void>;
  PATCH?: (req: any, res: any) => void | Promise<void>;
  DELETE?: (req: any, res: any) => void | Promise<void>;
}
