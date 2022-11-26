import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken)
  .get("/", "newFuncion")
  .get("/:hotelRooms", "newFunction");

export { hotelsRouter };
