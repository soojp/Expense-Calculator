const CategoryController = require("../controllers/category.controller");

module.exports = (app) => {
  app.get("/api/categories", CategoryController.getCategories);
  app.get("/api/categories/:id", CategoryController.getCategoryById);
  app.get(
    "/api/categories-by-user/:username",
    CategoryController.getCategoriesByUser
  );
  app.post("/api/categories", CategoryController.createCategory);
  app.put("/api/categories/:id", CategoryController.updateCategory);
  app.delete("/api/categories/:id", CategoryController.deleteCategory);
};
