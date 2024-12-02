import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import axios from "../../Utils/axios";
import { Requests } from "../QueriesAndMutationList";
import {IngredientTagType} from "../../Types/Ingredient";
import {Recipe} from "../../Types/Recipe";

export const useMutationIngredientCreate = (): UseMutationResult<
  any,
  unknown,
    { name: string; price: number, tag:IngredientTagType }
> => {
  const clientQuery = useQueryClient();

  return useMutation(
    [Requests.createIngredient],
    async ({ name, price, tag }: { name: string; price: number,  tag:IngredientTagType }) => {
      return await axios.post(`/ingredient/create`, {
        name,
        price,
        tag
      });
    },
    {
      onSuccess: () => {
        clientQuery.invalidateQueries(Requests.listIngredient);
      },
    }
  );
};

export const useMutationIngredientDelete = (): UseMutationResult<
  any,
  unknown,
  number
> => {
  const clientQuery = useQueryClient();

  return useMutation(
    [Requests.deleteIngredient],
    async (id: number) => {
      return await axios.delete(`/ingredient/delete/${id}`);
    },
    {
      onSuccess: () => {
        clientQuery.invalidateQueries(Requests.listIngredient);
      },
    }
  );
};


export const useMutationIngredientUpdateTag = () => {
    const clientQuery = useQueryClient();

    return useMutation(
        [Requests.updateIngredient],
        async ({ id, tag }: { id: number; tag: IngredientTagType }) => {
            const response = await axios.patch(`/ingredient/update`, { id, tag });

            const recipes = await axios.get("/recipe/list").then(r => r.data);
            const invalidRecipes = validateRecipesAfterTagUpdate(recipes, id, tag);

            if (invalidRecipes.length > 0) {
                throw new Error(`Tag update makes following recipes invalid: ${invalidRecipes.map(r => r.name).join(', ')}`);
            }

            return response.data;
        },
        {
            onSuccess: () => {
                clientQuery.invalidateQueries(Requests.listIngredient);
            }
        }
    );
};


const validateRecipesAfterTagUpdate = (recipes: Recipe[], ingredientId: number, newTag: IngredientTagType) => {
    return recipes.filter(recipe => {
        const hasIngredient = recipe.ingredients.some(i => i.id === ingredientId);
        if (!hasIngredient) return false;

        const updatedIngredients = recipe.ingredients.map(ing =>
            ing.id === ingredientId ? { ...ing, tag: newTag } : ing
        );

        const proteins = updatedIngredients.filter(i => i.tag === 'protein');
        const starchy = updatedIngredients.filter(i => i.tag === 'starchy');

        return proteins.length > 1 || starchy.length !== 1;
    });
};
