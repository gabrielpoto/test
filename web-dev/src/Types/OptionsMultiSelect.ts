export type IngredientTagType = 'vegetable' | 'protein' | 'starchy';

export interface OptionsMultiSelectType {
  id: number;
  label: string;
  tag: IngredientTagType
}
