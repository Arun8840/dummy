export const getDate = (value: string | number | undefined | null) => {
  if (value === undefined || value === null) {
    return ""
  }
  const date =
    typeof value === "number" ? new Date(value) : new Date(value as string)

  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

export const toCamelCase = (value: string) => {
  return value
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, "") // remove special chars
    .replace(/\s+([a-zA-Z0-9])/g, (_, char) => char.toUpperCase()) // capitalize after space
    .replace(/\s/g, "") // remove remaining spaces
}
