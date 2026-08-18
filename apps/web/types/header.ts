

export interface IHeaderDto {

        url: string;
        method: string;
        isFormData: boolean;
        signal?: AbortSignal;
        cache?: RequestCache;
        revalidate?: number;
}