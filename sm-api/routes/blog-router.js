import express from "express";
import { add, deleteBlog, getAllBlogs, getBlogsByUserId, getById, update } from "../controllers/blog-controller";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", add);
blogRouter.put("/update/:id",update);
blogRouter.get("/:id",getById);
blogRouter.delete("/:id",deleteBlog);
blogRouter.get("/user/:id",getBlogsByUserId);

export default blogRouter;