export type IngredientTagType = 'vegetable' | 'protein' | 'starchy';


export interface Ingredient {
  id: number;
  name: string;
  price: number;
  tag: IngredientTagType;

}
