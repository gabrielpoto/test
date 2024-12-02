import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {Box, Button, MenuItem, Select,Alert} from "@mui/material";
import {Ingredient, IngredientTagType} from "../Types/Ingredient";
import {useMutationIngredientDelete, useMutationIngredientUpdateTag} from "../Hooks/Mutation/IngredientsMutation";
import {useState} from "react";

export function IngredientTable({
  ingredients,
}: {
  ingredients: Ingredient[];
}): JSX.Element {
  const { mutateAsync: deleteIngredient } = useMutationIngredientDelete();
  const { mutateAsync: updateIngredientTag } = useMutationIngredientUpdateTag();
  const [error, setError] = useState<string | null>(null);

  const handlerButtonDelete = async (ingredient: Ingredient) => {
    await deleteIngredient(ingredient.id);
  };

  const handleTagUpdate = async (ingredient: Ingredient, newTag: IngredientTagType) => {
    try {
      await updateIngredientTag({ id: ingredient.id, tag: newTag });
    } catch (err) {
      if (err instanceof Error && err.message.includes('invalid')) {
        setError(err.message);
      }
    }
  };

  return (
    <Box className="tableContainer">
      {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>My ingredients</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Tag</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredients.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.price} €</TableCell>
                <TableCell align="right">
                  <Select
                      value={row.tag}
                      onChange={(e) => handleTagUpdate(row, e.target.value as IngredientTagType)}
                      size="small"
                  >
                    <MenuItem value="vegetable">Vegetable</MenuItem>
                    <MenuItem value="protein">Protein</MenuItem>
                    <MenuItem value="starchy">Starchy</MenuItem>
                  </Select>
                </TableCell>
                <TableCell align="right">
                  <Button onClick={() => handlerButtonDelete(row)}>
                    DELETE
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
