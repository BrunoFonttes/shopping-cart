import express from "express";
import { container } from "../../container";

const { controllers } = container;

export const cartRouter = express.Router();

cartRouter.post("/cart", controllers.cart.addOrUpdateItems);
cartRouter.delete("/cart/item/:itemId", controllers.cart.removeItem);
cartRouter.get("/cart", controllers.cart.get);
