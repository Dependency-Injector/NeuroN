export interface IPredicate<T> {
    (item: T): boolean;
}

export interface IBlogPost {
    id: number,
    title: string,
    content: string,
    dateCreated: Date
}