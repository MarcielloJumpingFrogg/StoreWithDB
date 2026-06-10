import { homePage } from "../routes/homePage";

export default async function(app: any) {
  app.use("/", homePage);

  app.use("{*splat}", (req, res) => {
    console.error("404 page not found")
    res.status(404).render("page404", { title: "404" })
  })

  app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).render("errorPage", { title: "Internal Server Error" })
  })
}



