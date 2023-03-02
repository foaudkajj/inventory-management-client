import { GenericListItem } from "./generic-list-item.model";

export class GenericList {
  id: string;
  name: string;
  description: string;
  items: GenericListItem[];
}
