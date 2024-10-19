export interface IPagination {
    totalItems: number;

    currentPage: number;

    pageSize: number;

    totalPages: number;

    hasNextPage: boolean;

    hasPrevPage: boolean;
}
