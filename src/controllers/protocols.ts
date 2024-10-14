export interface HttpResponse<T>{
    statusCode: number;
    body: T | string;
}

export interface HttpRequest<B> {
    params?: any;
    headers?: any;
    body: B;
}

export interface IController{
    handle(httrequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}