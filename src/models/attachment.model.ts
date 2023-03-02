import { Type } from "./enums";

export class Attachment {
    id: string;
    name: string;
    uri: string;
    uploadedAt: Date;
    objectId: string;
    type: Type;
}
