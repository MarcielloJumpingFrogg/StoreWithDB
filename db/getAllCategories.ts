import { getAll } from "./getAll"
import type { itemInStore } from '../custom.d.ts'

async function getAllCategories() {
  const listOfCategories: Array<string> = []
  try {
    const all: Array<itemInStore> | boolean = await getAll()
    if (all === true) {
      throw new Error("error 500 server could not be reached")
    }
    all.forEach((element: itemInStore) => {
      element.categories.forEach((e: string) => {
        if (!listOfCategories.includes(e)) {
          listOfCategories.push(e)
        }
      })
    })

  }
  catch (e) {
    console.error(e)
  }

  return listOfCategories
}

export { getAllCategories }

getAllCategories();
