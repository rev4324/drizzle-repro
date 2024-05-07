import { eq } from "drizzle-orm";
import { dishes, purchasableItemsOnDishes, purchasableItems } from "../schema";
import { bunDb } from "./db";

const result = await bunDb
  .select()
  .from(dishes)
  .leftJoin(
    purchasableItemsOnDishes,
    eq(dishes.id, purchasableItemsOnDishes.dishId)
  )
  .leftJoin(
    purchasableItems,
    eq(purchasableItems.id, purchasableItemsOnDishes.purchasableItemId)
  )
  .execute();

console.log(result);
