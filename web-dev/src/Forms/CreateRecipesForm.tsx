import { useMemo, useState } from "react";
import { Alert, Autocomplete, Box, Button, FormControl, TextField,Chip } from "@mui/material";
import { CardCustom } from "../Components/CardCustom";
import { Loader } from "../Components/Loader";
import { useMutationRecipeCreate } from "../Hooks/Mutation/RecipeMutation";
import { useQueryIngredientList } from "../Hooks/Query/IngredientQuery";
import { ErrorPage } from "../Pages/ErrorPage";
import { Ingredient } from "../Types/Ingredient";
import {IngredientTagType, OptionsMultiSelectType} from "../Types/OptionsMultiSelect";
import { TagChip } from "../Components/TagChip";


interface RecipeIngredient {
  id: number;
  label: string;
  tag: IngredientTagType;
}

interface ValidationError {
  message: string;
}

export function CreateRecipesForm(): JSX.Element {
  const [name, setName] = useState("");
  const [timeToCook, setTimeToCook] = useState<number>(0);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(0);
  const [selectedIngredients, setSelectedIngredients] = useState<OptionsMultiSelectType[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const { mutateAsync: createRecipe } = useMutationRecipeCreate();
  const { data: ingredients = [], status, isLoading } = useQueryIngredientList();

  const validateRecipeRules = useMemo(() => {
    if (!ingredients) return [];

    const selectedWithTags = selectedIngredients.map((si: OptionsMultiSelectType) => ({
      ...si,
      tag: ingredients.find((i: Ingredient) => i.id === si.id)?.tag
    }));

    const proteins = selectedWithTags.filter((i: RecipeIngredient) => i.tag === 'protein');
    const starchy = selectedWithTags.filter((i: RecipeIngredient) => i.tag === 'starchy');
    const errors: string[] = [];

    if (proteins.length > 1) {
      errors.push('Only one protein allowed per recipe');
    }

    if (starchy.length !== 1) {
      errors.push('Recipe must contain exactly one starchy food');
    }

    return errors;
  }, [selectedIngredients, ingredients]);

  const resetFields = () => {
    setName("");
    setTimeToCook(0);
    setNumberOfPeople(0);
    setSelectedIngredients([]);
  };

  const handlerSubmitNewRecipe = async () => {
    if (!name || !timeToCook || !numberOfPeople || !selectedIngredients.length) {
      setValidationErrors(['Please fill all fields']);
      return;
    }

    const errors = validateRecipeRules;
    if (errors.length) {
      setValidationErrors(errors);
      return;
    }

    await createRecipe({
      name,
      timeToCook,
      numberOfPeople,
      ingredients: selectedIngredients.map(e => e.id),
    });

    setValidationErrors([]);
    resetFields();
  };

  if (status === "error") return <ErrorPage />;
  if (isLoading) return <Loader />;

  return (
      <div id="create-recipes-form">
        <Box display="flex" justifyContent="space-between" className="MarginTop16Px">
          <CardCustom isSmall>
            <h2>New recipe</h2>

            <Box sx={{ mb: 2 }}>
              {validationErrors.map((error, index) => (
                  <Alert key={index} severity="error" sx={{ mb: 1 }}>{error}</Alert>
              ))}
            </Box>

            <FormControl fullWidth margin="normal">
              <TextField
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label="Name of the recipe"
                  variant="outlined"
                  fullWidth
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <Autocomplete
                  multiple
                  value={selectedIngredients}
                  onChange={(_e, value) => {
                    setSelectedIngredients(value);
                    setValidationErrors(validateRecipeRules);
                  }}
                  options={ingredients.map((e:any)=> ({
                    label: e.name,
                    id: e.id,
                    tag: e.tag
                  }))}
                  renderInput={(params) => <TextField {...params} label="Ingredients" />}
                  renderOption={(props, option) => (
                      <li {...props}>
                        {option.label}
                        <TagChip tag={option.tag} />
                      </li>
                  )}
                  renderTags={(tagValue, getTagProps) =>
                      tagValue.map((option, index) => (
                          <Chip
                              {...getTagProps({ index })}
                              label={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  {option.label}
                                  <TagChip tag={option.tag} />
                                </Box>
                              }
                          />
                      ))
                  }
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                  value={timeToCook}
                  onChange={(e) => e.target.value ? setTimeToCook(Number(e.target.value)) : setTimeToCook(0)}
                  label="Time to cook"
                  variant="outlined"
                  type="number"
                  fullWidth
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                  value={numberOfPeople}
                  onChange={(e) => e.target.value ? setNumberOfPeople(Number(e.target.value)) : setNumberOfPeople(0)}
                  label="Number of people"
                  variant="outlined"
                  type="number"
                  fullWidth
              />
            </FormControl>

            <FormControl margin="normal">
              <Button onClick={handlerSubmitNewRecipe} variant="contained">
                Submit
              </Button>
            </FormControl>
          </CardCustom>
        </Box>
      </div>
  );
}