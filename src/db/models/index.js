import Product from "./products.js";
import Review from "./reviews.js";
import User from "./users.js";

Product.hasMany(Review)
Review.belongsTo(Product)

User.hasMany(Product)
Product.belongsTo(User)

export default {
 Review,
 Product,
 User
}