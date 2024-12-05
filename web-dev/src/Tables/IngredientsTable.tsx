import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Alert, Chip, Stack } from "@mui/material";
import { Ingredient, IngredientTagType } from "../Types/Ingredient";
import {useMutationIngredientDelete, useMutationIngredientUpdateTag} from "../Hooks/Mutation/IngredientsMutation";
import {useState} from "react";

const TAG_OPTIONS = [
  { value: 'vegetable', label: 'Vegetable', color: 'success' },
  { value: 'protein', label: 'Protein', color: 'primary' },
  { value: 'starchy', label: 'Starchy', color: 'warning' }
] as const;

export function IngredientTable({ ingredients }: { ingredients: Ingredient[] }): JSX.Element {
  const { mutateAsync: deleteIngredient } = useMutationIngredientDelete();
  const { mutateAsync: updateIngredientTag } = useMutationIngredientUpdateTag();
  const [error, setError] = useState<string | null>(null);

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
          <Table sx={{ minWidth: 650 }} aria-label="ingredients table">
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
                  <TableRow key={row.name}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="right">{row.price} €</TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        {TAG_OPTIONS.map((option) => (
                            <Chip
                                key={option.value}
                                label={option.label}
                                color={option.value === row.tag ? option.color : 'default'}
                                variant={option.value === row.tag ? 'filled' : 'outlined'}
                                onClick={() => handleTagUpdate(row, option.value)}
                                sx={{ cursor: 'pointer' }}
                            />
                        ))}
                      </Stack>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                          onClick={() => deleteIngredient(row.id)}
                          color="error"
                          variant="outlined"
                      >
                        Delete
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