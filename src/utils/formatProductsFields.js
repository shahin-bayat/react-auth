export function formatProductsList(productsList) {
  // we can use "reselect" in combination with "redux" as state manager instead of redux to optimize this process
  return productsList.map(entry => ({
    title: entry.name,
    picture: entry.picture.id,
    category: entry.category.name,
    created_at: entry.created_at,
    id: entry.id,
  }))
}
