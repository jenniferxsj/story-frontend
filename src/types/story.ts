export interface BookProfile {
    id: number;
    userId: string;
    title: string;
    author: string;
    userNote: string;
    tagsJson: string;
    styleSummary: string;
    appealSummary: string;
    createdAt: string;
}

export interface PageInfo {
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    offset: number;
}

export interface SortInfo {
    property: string;
    direction: 'DESC' | 'ASC';
}

export interface PageRsp<T> {
    content: T;
    pageable: PageInfo;
    last: boolean;
    totalElements: number;
    totalPages: number;
    first: boolean;
    size: number;
    number: number;
    sort: SortInfo[];
    numberOfElements: number;
    empty: boolean;
}

export interface Story {
    id: number;
    outlineId: number;
    userId: string;
    title: string;
    targetWords: number;
    currentWords: number;
    stateJson: {[key: string]: any};
    createdAt: string;
    updatedAt: string;
}