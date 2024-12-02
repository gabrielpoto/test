import {Chip} from "@mui/material";
import {IngredientTagType} from "../Types/Ingredient";

interface TagChipProps {
    tag: IngredientTagType
};


const tagColors: Record<IngredientTagType, string> = {
    'vegetable': '#4CAF50',
    'protein': '#F44336',
    'starchy': '#FFC107'
}

export function TagChip({ tag }: TagChipProps) {
    return (
        <Chip
            label={tag}
            size="small"
            sx={{
                backgroundColor: tagColors[tag],
                color: 'white',
                marginLeft: 1
            }}
        />
    );
}