import { IngredientService } from "../Services/IngredientService";
import { Request, Response, NextFunction } from 'express';

export class IngredientController {
  public static async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const ingredients = await IngredientService.list();
      res.send(ingredients);
    } catch (err) {
      console.error("[IngredientController.list] Error listing ingredients", err);
      res.status(500).send();
    }
  }

  public static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const ingredient = await IngredientService.create(req.body);
      res.send(ingredient);
    } catch (err) {
      console.error("[IngredientController.create] Error creating ingredient", err);
      res.status(500).send();
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const ingredient = await IngredientService.update({
        id: parseInt(req.params.id, 10),
        ...req.body
      });
      res.send(ingredient);
    } catch (err) {
      console.error("[IngredientController.update] Error updating ingredient", err);
      res.status(500).send();
    }
  }

  public static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await IngredientService.delete(parseInt(req.params.id, 10));
      res.send();
    } catch (err) {
      console.error("[IngredientController.delete] Error deleting ingredient", err);
      res.status(500).send();
    }
  }
}