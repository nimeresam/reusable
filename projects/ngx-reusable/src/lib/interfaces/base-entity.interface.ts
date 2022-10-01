export interface IBase {
    id: number | string;
    creationDate: Date;
    modificationDate?: Date;
    createdBy: string;
    modifiedBy?: string;
}