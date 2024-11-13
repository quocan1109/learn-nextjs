import httpProxy from "http-proxy";
import { NextApiRequest, NextApiResponse } from "next";

// type Data = {
//   name: string;
// };

export const config = {
  api: {
    bodyParser: false,
  },
};

export const proxy = httpProxy.createProxyServer();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // don't send cookies to API server
  req.headers.cookie = "";

  proxy.web(req, res, {
    target: process.env.API_URL,
    changeOrigin: true,
    selfHandleResponse: false,
  });
}
