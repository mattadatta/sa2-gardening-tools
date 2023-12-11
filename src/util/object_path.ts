export function getValue(obj: any, path: string | any[]): any {
  const isPathString = typeof path === "string"
  return (isPathString ? path.split('.') : path).reduce((acc, part) => acc && acc[part], obj)
}

export function setValue(obj: any, path: string | any[], value: any): void {
  const isPathString = typeof path === "string"
  const parts = (isPathString ? path.split('.') : path.slice())
  const lastPart = parts.pop()

  const lastObj = parts.reduce((acc, part) => {
    if (acc[part] === undefined) {
      acc[part] = {}
    }
    return acc[part]
  }, obj)

  if (lastPart !== undefined) {
    lastObj[lastPart] = value
  }
}
