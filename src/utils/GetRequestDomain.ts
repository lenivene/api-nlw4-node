import { Request } from "express";

export const GetRequestDomain = (req: Request) => {
  const {protocol} = req;

  return `${(!protocol) ? 'http' : protocol}://${req.get('host')}`;
}