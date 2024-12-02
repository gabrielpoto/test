import { Ingredient } from "./Ingredient";
import {IngredientTagType} from "./OptionsMultiSelect";

export interface Recipe {
  id: number;
  name: string;
  numberOfPeople: number;
  timeToCook: number;
  ingredients: Ingredient[];
}

interface RecipeIngredient {
  id: number;
  label: string;
  tag: IngredientTagType;
}
