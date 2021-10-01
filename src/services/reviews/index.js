import express from "express";
import db from "../../db/models/index.js";
const router = express.Router();
const { Product,  Review } = db;
router
  .route("/")
  .get(async (req, res, next) => {
    try {
        const reviews = await Review.findAll({
            include:Product
        })
        res.send(reviews)
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
        const reviews = await Review.create(req.body)
        res.send(reviews)
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
  router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const reviews = await Review.findByPk(req.params.id);
      res.send(reviews);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
        const reviews = await Review.update(req.body, {
            where: {
                id: req.params.id
            },
            returning: true
        })
        res.send(reviews[1][0])
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .delete(async (req, res, next) => {
      try {
          const rows = await Review.destroy({
              where: {
                  id: req.params.id
              }
          })
          if (rows > 0) {
              res.send("done")
          } else {
              res.status(404).send("review not found")
          }
      } catch (error) {
        console.log(error);
        next(error);      
      }
  })
export default router;