import { getAll } from "./getAll"
import type { itemInStore } from '../custom.d.ts'

async function getAllCategories() {
  const listOfCategories: Array<string> = []
  const { result, error } = await getAll()

  if (error) {
    console.error(error.code, error.message)
    throw new Error
  }

  result.forEach((element: itemInStore) => {
    element.categories.forEach((e: string) => {
      if (!listOfCategories.includes(e)) {
        listOfCategories.push(e)
      }
    })
  })

  return listOfCategories
}

export { getAllCategories }

getAllCategories();
