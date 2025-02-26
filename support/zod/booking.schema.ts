import { z } from "zod";

export type BookingDates = z.infer<typeof BookingDates>;
export const BookingDates = z.object({
  checkin: z.string(),
  checkout: z.string(),
});

export type Booking = z.infer<typeof Booking>;
export const Booking = z.object({
  bookingid: z.union([z.number(), z.undefined()]).optional(),
  roomid: z.union([z.number(), z.undefined()]).optional(),
  firstname: z.string(),
  lastname: z.string(),
  depositpaid: z.boolean(),
  email: z.string(),
  phone: z.string(),
  bookingdates: z.union([BookingDates, z.undefined()]).optional(),
});

export type CreatedBooking = z.infer<typeof CreatedBooking>;
export const CreatedBooking = z.object({
  bookingid: z.number().optional(),
  booking: Booking.optional(),
});

export type get_GetBooking = typeof get_GetBooking;
export const get_GetBooking = {
  method: z.literal("GET"),
  path: z.literal("/{id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      id: z.number(),
    }),
  }),
  response: z.unknown(),
};

export type put_UpdateBooking = typeof put_UpdateBooking;
export const put_UpdateBooking = {
  method: z.literal("PUT"),
  path: z.literal("/{id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      id: z.number(),
    }),
    body: Booking,
  }),
  response: z.unknown(),
};

export type delete_DeleteBooking = typeof delete_DeleteBooking;
export const delete_DeleteBooking = {
  method: z.literal("DELETE"),
  path: z.literal("/{id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      id: z.number(),
    }),
  }),
  response: z.unknown(),
};

export type get_GetBookings = typeof get_GetBookings;
export const get_GetBookings = {
  method: z.literal("GET"),
  path: z.literal("/"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      roomid: z.string().optional(),
    }),
  }),
  response: z.unknown(),
};

export type post_CreateBooking = typeof post_CreateBooking;
export const post_CreateBooking = {
  method: z.literal("POST"),
  path: z.literal("/"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: Booking,
  }),
  response: z.unknown(),
};

export type get_GetSummaries = typeof get_GetSummaries;
export const get_GetSummaries = {
  method: z.literal("GET"),
  path: z.literal("/summary"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      roomid: z.string(),
    }),
  }),
  response: z.unknown(),
};

// <EndpointByMethod>
export const EndpointByMethod = {
  get: {
    "/{id}": get_GetBooking,
    "/": get_GetBookings,
    "/summary": get_GetSummaries,
  },
  put: {
    "/{id}": put_UpdateBooking,
  },
  delete: {
    "/{id}": delete_DeleteBooking,
  },
  post: {
    "/": post_CreateBooking,
  },
};
export type EndpointByMethod = typeof EndpointByMethod;
// </EndpointByMethod>

// <EndpointByMethod.Shorthands>
export type GetEndpoints = EndpointByMethod["get"];
export type PutEndpoints = EndpointByMethod["put"];
export type DeleteEndpoints = EndpointByMethod["delete"];
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

  // <ApiClient.get>
  get<Path extends keyof GetEndpoints, TEndpoint extends GetEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<z.infer<TEndpoint["parameters"]>>
  ): Promise<z.infer<TEndpoint["response"]>> {
    return this.fetcher("get", this.baseUrl + path, params[0]) as Promise<z.infer<TEndpoint["response"]>>;
  }
  // </ApiClient.get>

  // <ApiClient.put>
  put<Path extends keyof PutEndpoints, TEndpoint extends PutEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<z.infer<TEndpoint["parameters"]>>
  ): Promise<z.infer<TEndpoint["response"]>> {
    return this.fetcher("put", this.baseUrl + path, params[0]) as Promise<z.infer<TEndpoint["response"]>>;
  }
  // </ApiClient.put>

  // <ApiClient.delete>
  delete<Path extends keyof DeleteEndpoints, TEndpoint extends DeleteEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<z.infer<TEndpoint["parameters"]>>
  ): Promise<z.infer<TEndpoint["response"]>> {
    return this.fetcher("delete", this.baseUrl + path, params[0]) as Promise<z.infer<TEndpoint["response"]>>;
  }
  // </ApiClient.delete>

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
