import {Box, Button, FormControl, TextField, Select, MenuItem, InputLabel} from "@mui/material";
import { useState } from "react";
import { CardCustom } from "../Components/CardCustom";
import { useMutationIngredientCreate } from "../Hooks/Mutation/IngredientsMutation";
import { TagChip } from '../Components/TagChip';
import {IngredientTagType} from "../Types/Ingredient";


export function CreateIngredientForm(): JSX.Element {
  const { mutateAsync: createIngredient } = useMutationIngredientCreate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [tag, setTag] = useState<IngredientTagType>("vegetable")

  const resetFields = () => {
    setName("");
    setPrice(0);
    setTag("vegetable")
  };

  const handlerSubmitNewIngredient = async () => {
    if (name === undefined || name === "" || price === undefined || !tag) {
      alert("Please fill all the fields");
      return;
    }
    await createIngredient({
      name,
      price,
      tag
    });

    resetFields();
  };

  return (
      <div id="create-recipes-form">
        <Box
            display="flex"
            justifyContent="space-between"
            className="MarginTop16Px"
        >
          <CardCustom isSmall>
            <h2>New ingredient</h2>
            <FormControl fullWidth margin="normal">
              <TextField
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name-recipe"
                  label="Name of the ingredient"
                  variant="outlined"
                  fullWidth
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Tag type</InputLabel>
              <Select
                  value={tag}
                  label="Tag type"
                  onChange={(e) => setTag(e.target.value as IngredientTagType)}
                  displayEmpty
                  renderValue={(selected) => (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {selected} <TagChip tag={selected as IngredientTagType} />
                      </Box>
                  )}
              >
                <MenuItem value="vegetable">Vegetable <TagChip tag="vegetable" /></MenuItem>
                <MenuItem value="protein">Protein <TagChip tag="protein" /></MenuItem>
                <MenuItem value="starchy">Starchy <TagChip tag="starchy" /></MenuItem>
              </Select>
            </FormControl>


            <FormControl fullWidth margin="normal">
              <TextField
                  value={price}
                  onChange={(e) =>
                      e.target.value ? setPrice(Number(e.target.value)) : setPrice(0)
                  }
                  id="name-recipe"
                  label="price"
                  variant="outlined"
                  type="number"
                  fullWidth
              />
              <span className="SmallTextExplanation">
              *Keep in mind that the price is for one person. Prices are
              multiplied by the number of people in the recipe.
            </span>
            </FormControl>

            <FormControl margin="normal">
              <Button onClick={handlerSubmitNewIngredient} variant="contained">
                Submit
              </Button>
            </FormControl>
          </CardCustom>
        </Box>
      </div>
  );
}
