enum HTTPMethods {
  POST = "POST",
  GET = "GET",
  PATCH = "PATCH",
  PUT = "PUT",
  DELTE = "DELETE",
}

type HeadersOpt = Record<string, string>;

interface IRequestOptions {
  headers?: HeadersOpt;
  method?: HTTPMethods;
  body?: BodyInit;
}

interface IRequestBuilder {
  options: IRequestOptions;
  url: string;
  endpoint: string;

  addHeaders(headers: object): void;
  setMethod(method: string): void;
  setBody(body: object): void;
  sendRequest(): Promise<Response>;
}

class FetchRequestBuilder implements IRequestBuilder {
  options: IRequestOptions = {};
  url: string;
  endpoint: string;

  constructor(url: string) {
    this.url = url;
    this.endpoint = "";
  }

  addHeaders(headers: HeadersOpt): this {
    this.options.headers = headers;
    return this;
  }

  setMethod(method: HTTPMethods): this {
    this.options.method = method;
    return this;
  }

  setBody(body: object): this {
    this.options.body = typeof body === "string" ? body : JSON.stringify(body);
    return this;
  }

  appendToUrl(endpoint: string): this {
    this.url += endpoint;
    return this;
  }

  sendRequest(): Promise<Response> {
    return fetch(this.url, this.options);
  }
}

async function controller() {
  const jsonPlaceholderApi = new FetchRequestBuilder(
    "https://jsonplaceholder.typicode.com"
  );

  const response = await jsonPlaceholderApi
    .appendToUrl("/posts")
    .setMethod(HTTPMethods.GET)
    .sendRequest();

  const data = await response.json();

  console.log(data);
}

controller();
