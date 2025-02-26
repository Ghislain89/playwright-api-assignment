import { z } from "zod";

export type Token = z.infer<typeof Token>;
export const Token = z.object({
  token: z.string().optional(),
});

export type Auth = z.infer<typeof Auth>;
export const Auth = z.object({
  username: z.string().optional(),
  password: z.string().optional(),
});

export type post_ValidateToken = typeof post_ValidateToken;
export const post_ValidateToken = {
  method: z.literal("POST"),
  path: z.literal("/validate"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: Token,
  }),
  response: z.unknown(),
};

export type post_ClearToken = typeof post_ClearToken;
export const post_ClearToken = {
  method: z.literal("POST"),
  path: z.literal("/logout"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: Token,
  }),
  response: z.unknown(),
};

export type post_CreateToken = typeof post_CreateToken;
export const post_CreateToken = {
  method: z.literal("POST"),
  path: z.literal("/login"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: Auth,
  }),
  response: z.unknown(),
};

// <EndpointByMethod>
export const EndpointByMethod = {
  post: {
    "/validate": post_ValidateToken,
    "/logout": post_ClearToken,
    "/login": post_CreateToken,
  },
};
export type EndpointByMethod = typeof EndpointByMethod;
// </EndpointByMethod>

// <EndpointByMethod.Shorthands>
export type PostEndpoints = EndpointByMethod["post"];
export type AllEndpoints = EndpointByMethod[keyof EndpointByMethod];
// </EndpointByMethod.Shorthands>

// <ApiClientTypes>
export type EndpointParameters = {
  body?: unknown;
  query?: Record<string, unknown>;
  header?: Record<string, unknown>;
  path?: Record<string, unknown>;
};

export type MutationMethod = "post" | "put" | "patch" | "delete";
export type Method = "get" | "head" | "options" | MutationMethod;

type RequestFormat = "json" | "form-data" | "form-url" | "binary" | "text";

export type DefaultEndpoint = {
  parameters?: EndpointParameters | undefined;
  response: unknown;
};

export type Endpoint<TConfig extends DefaultEndpoint = DefaultEndpoint> = {
  operationId: string;
  method: Method;
  path: string;
  requestFormat: RequestFormat;
  parameters?: TConfig["parameters"];
  meta: {
    alias: string;
    hasParameters: boolean;
    areParametersRequired: boolean;
  };
  response: TConfig["response"];
};

type Fetcher = (
  method: Method,
  url: string,
  parameters?: EndpointParameters | undefined,
) => Promise<Endpoint["response"]>;

type RequiredKeys<T> = {
  [P in keyof T]-?: undefined extends T[P] ? never : P;
}[keyof T];

type MaybeOptionalArg<T> = RequiredKeys<T> extends never ? [config?: T] : [config: T];

// </ApiClientTypes>

// <ApiClient>
export class ApiClient {
  baseUrl: string = "";

  constructor(public fetcher: Fetcher) {}

  setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
    return this;
  }

  // <ApiClient.post>
  post<Path extends keyof PostEndpoints, TEndpoint extends PostEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<z.infer<TEndpoint["parameters"]>>
  ): Promise<z.infer<TEndpoint["response"]>> {
    return this.fetcher("post", this.baseUrl + path, params[0]) as Promise<z.infer<TEndpoint["response"]>>;
  }
  // </ApiClient.post>
}

export function createApiClient(fetcher: Fetcher, baseUrl?: string) {
  return new ApiClient(fetcher).setBaseUrl(baseUrl ?? "");
}

/**
 Example usage:
 const api = createApiClient((method, url, params) =>
   fetch(url, { method, body: JSON.stringify(params) }).then((res) => res.json()),
 );
 api.get("/users").then((users) => console.log(users));
 api.post("/users", { body: { name: "John" } }).then((user) => console.log(user));
 api.put("/users/:id", { path: { id: 1 }, body: { name: "John" } }).then((user) => console.log(user));
*/

// </ApiClient
