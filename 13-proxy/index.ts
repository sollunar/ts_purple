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

interface IGetProductsAPI {
  getProducts(id: number): any;
}

class GetProductsAPI implements IGetProductsAPI {
  constructor(private api: FetchRequestBuilder) {}
  getProducts(id: number) {
    return this.api
      .appendToUrl(`/products/${id}`)
      .setMethod(HTTPMethods.GET)
      .sendRequest();
  }
}

class GetProductsAPIProxy implements IGetProductsAPI {
  constructor(private api: GetProductsAPI) {}
  getProducts(id: number): Promise<Response> | undefined {
    if (id < 10) {
      return this.api.getProducts(id);
    }
    console.log("id продукта должно быть меньше 10");
  }
}

async function controller() {
  const dummyJsonApi = new FetchRequestBuilder("https://dummyjson.com");
  const getProductsService = new GetProductsAPI(dummyJsonApi);
  const getProductsServiceProxy = new GetProductsAPIProxy(getProductsService);
  const response = await getProductsServiceProxy.getProducts(2);
  const data = await response?.json();
  const response2 = await getProductsServiceProxy.getProducts(10);
  const data2 = await response2?.json();

  console.log(data);
  console.log(data2);
}

controller();
