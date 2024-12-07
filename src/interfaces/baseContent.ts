export interface BaseContent {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    status: 'Чорновик' | 'Опубліковано' | 'Заархівовано';
}