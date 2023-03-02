import { Country } from "./country.model";
import { EducationType } from "./enums";
import { GenericList } from "./generic-list.model";

export class Student {
  id: string;
  name: string;
  surname: string;
  age: number;
  fatherName: string;
  fatherNumber: string;
  motherName: string;
  motherNumber: string;
  gsm: string;
  identityNo: string;
  address: string;
  educationType: EducationType;
  nationalityId: string;
  documentTypeId: string;
  nationality: Country;
  documentType: GenericList;
}
