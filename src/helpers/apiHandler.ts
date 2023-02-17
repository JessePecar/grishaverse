import { basicAuthMiddleware } from "@/helpers/basicAuthMiddleware";

export function apiHandler(handler: any) {
  return async (request: any, response: any) => {
    const method = request.method.toLowerCase();

    if (!handler[method]) {
      return response.status(404).end(`Method ${request.method} Not Allowed`);
    }

    try {
      await basicAuthMiddleware(request, response);

      await handler[method](request, response);
    } catch (err) {
      console.error(err);
    }
  }
}