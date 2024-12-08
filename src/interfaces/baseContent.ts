export interface BasicEntity {
    id: string;
    createdOn: Date;
    modifiedOn: Date;
    releasedOn?: Date;
    state: 'Чернетка' | 'Опубліковано' | 'Заархівовано';
}
