import type { IncomingMessage, ServerResponse } from "node:http";

export type XDnsPrefetchControlOptions = {
  allow?: boolean;
};

function xDnsPrefetchControl(
  options: Readonly<XDnsPrefetchControlOptions> = {},
) {
  if (options.allow !== undefined && typeof options.allow !== "boolean") {
    throw new Error(
      `X-DNS-Prefetch-Control received an invalid allow ${JSON.stringify(options.allow)}. It must be a boolean.`,
    );
  }

  const headerValue = options.allow ? "on" : "off";

  return function xDnsPrefetchControlMiddleware(
    _req: IncomingMessage,
    res: ServerResponse,
    next: () => void,
  ): void {
    res.setHeader("X-DNS-Prefetch-Control", headerValue);
    next();
  };
}

export default xDnsPrefetchControl;
