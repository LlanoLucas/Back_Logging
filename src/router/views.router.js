import { Router } from "express";
import ProductsModel from "../dao/models/products.models.js";
import MessageModel from "../dao/models/messages.models.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { limit = 3, page = 1, sort, filter } = req.query;
    console.log(sort);

    const sortOptions = sort ? { price: sort } : {};

    const options = {
      page,
      limit,
      lean: true,
      sort: sortOptions,
    };

    const products = await ProductsModel.paginate({ filter }, options);
    res.render("home", { products, sort });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Interno del Servidor" });
  }
});

router.get("/realTimeProducts", async (req, res) => {
  try {
    const products = await ProductsModel.find().lean().exec();
    res.render("realTimeProducts", { products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Interno del Servidor" });
  }
});

router.get("/chat", async (req, res) => {
  try {
    const messages = await MessageModel.find().lean().exec();
    res.render("chat", { messages });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", error: err.message });
  }
});

export default router;
