import express from "express";
import { add, deleteBlog, getAllBlogs, getBlogsByUserId, getById, update } from "../controllers/blogsController.js";
import checkToken from "../middlewares/auth-middleware.js";

const blogRouter = express.Router();

//middleware
blogRouter.use("/", checkToken);
blogRouter.use("/add", checkToken);
blogRouter.use("/update/:id",checkToken);
blogRouter.use("/:id",checkToken);
blogRouter.use("/:id",checkToken);
blogRouter.use("/user/:id",checkToken);

//private
blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", add);
blogRouter.put("/update/:id",update);
blogRouter.get("/:id",getById);
blogRouter.delete("/:id",deleteBlog);
blogRouter.get("/user/:id",getBlogsByUserId);

export default blogRouter;