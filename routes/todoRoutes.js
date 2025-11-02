import express from "express";
import {
  getTodos,
  createTodo,
  toggleTodo,
  editTodo,
  deleteTodo,
} from "../controllers/todocontroller.js";

const router = express.Router();

router.get("/", getTodos);
router.post("/", createTodo);
router.patch("/:id/toggle", toggleTodo);
router.put("/:id", editTodo);
router.delete("/:id", deleteTodo);

export default router;


