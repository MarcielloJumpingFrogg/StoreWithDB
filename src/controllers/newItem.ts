
import { body, validationResult, matchedData } from "express-validator";

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

const validateUser = [
  body("name").trim()
    .isAlpha().withMessage(`Name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`Name: ${lengthErr}`),
  body("price_cents").isNumeric().withMessage(`Should be a number btw`).optional({ values: "falsy" }),
  body("producer").trim()
    .isAlpha().withMessage(`Producer ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`Producer: ${lengthErr}`),
  body("amount").isNumeric().withMessage(`Should be a number btw`).optional({ values: "falsy" }),
  body("categories").trim()
    .isAlpha().withMessage(`Producer ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`categories: ${lengthErr}`),
];

// We can pass an entire array of middleware validations to our controller.
const userCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(400).render("errorPage", {
        title: "Create user",
      });
    }
    const { name, price_cents, producer, amount, categories } = matchedData(req);
    console.log(`Name: ${name}, price: ${price_cents} ,producer: ${producer}, amount: ${amount}, categories: ${categories}`)
    //usersStorage.addUser({ firstName, lastName });
    res.redirect("/");
  }
];

export { userCreatePost }
