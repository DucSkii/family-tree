export const findById = (array, id) => {
  for (const item of array) {
    if (item.id === id) return item
    if (item.children?.length) {
      const innerResult = findById(item.children, id)
      if (innerResult) return innerResult
    }
  }
}
