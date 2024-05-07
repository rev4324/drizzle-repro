import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";
import { timestamps } from "./utils";
import { relations } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: text("id", {
    length: 21,
  })
    .primaryKey()
    .$defaultFn(nanoid),
  email: text("email", {
    length: 320,
  })
    .unique()
    .notNull(),
  password: text("password").notNull(),

  firstName: text("first_name", {
    length: 320,
  }),
  lastName: text("last_name", {
    length: 320,
  }),

  ...timestamps,
});

export const sessions = sqliteTable("sessions", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: text("expires_at").notNull(),
});

export const dishes = sqliteTable("dishes", {
  id: text("id").notNull().$defaultFn(nanoid).primaryKey(),
  slug: text("slug").notNull(),
  name: text("name").notNull(),
  recipe: text("recipe", {
    length: 256000,
  }),

  ...timestamps,
});

export const dishesRelations = relations(dishes, ({ many }) => ({
  purchasableItemsOnDishes: many(purchasableItemsOnDishes),
}));

export const mealDays = sqliteTable("meal_days", {
  id: text("id").notNull().$defaultFn(nanoid).primaryKey(),
  plannedOn: integer("planned_at", { mode: "timestamp" }).notNull(),
  dishId: text("dish_id")
    .notNull()
    .references(() => dishes.id),
  plannedBy: text("planned_by").references(() => users.id),

  ...timestamps,
});

export const purchasableItems = sqliteTable("purchasable_items", {
  id: text("id").notNull().$defaultFn(nanoid).primaryKey(),
  name: text("name").notNull(),
  isPresent: integer("is_present", { mode: "boolean" }),
});

export const purchasableItemsRelations = relations(
  purchasableItems,
  ({ many }) => ({
    purchasableItemsOnDishes: many(purchasableItemsOnDishes),
  })
);

export const shoppingLists = sqliteTable("shopping_lists", {
  id: text("id").notNull().$defaultFn(nanoid).primaryKey(),
});

export const purchasableItemsOnShoppingLists = sqliteTable(
  "purchasable_items_on_shopping_lists",
  {
    purchasableItemId: text("purchasable_item_id")
      .notNull()
      .references(() => purchasableItems.id),
    shoppingListId: text("shopping_list_id")
      .notNull()
      .references(() => shoppingLists.id),
    count: integer("count").notNull().default(1),
  }
);

export const purchasableItemsOnDishes = sqliteTable(
  "purchasable_items_on_dishes",
  {
    purchasableItemId: text("purchasable_item_id")
      .notNull()
      .references(() => purchasableItems.id),
    dishId: text("dish_id")
      .notNull()
      .references(() => dishes.id),
    count: integer("count").notNull().default(1),
  }
);

export const purchasableItemsOnDishesRelations = relations(
  purchasableItemsOnDishes,
  ({ one }) => ({
    dish: one(dishes, {
      fields: [purchasableItemsOnDishes.dishId],
      references: [dishes.id],
    }),
    purchasableItem: one(purchasableItems, {
      fields: [purchasableItemsOnDishes.purchasableItemId],
      references: [purchasableItems.id],
    }),
  })
);
