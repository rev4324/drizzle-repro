import { eq } from "drizzle-orm";
import { dishes, purchasableItemsOnDishes, purchasableItems } from "../schema";
import { betterSqlite3Db } from "./db";

const result = await betterSqlite3Db
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
