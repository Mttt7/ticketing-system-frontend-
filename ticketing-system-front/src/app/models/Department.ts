import {Subcategory} from "./Subcategory";

export interface Department {
  id: number;
  name: string;
  subcategories: Subcategory[];
}
