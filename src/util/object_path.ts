export function getValue(obj: any, path: string): any {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj)
}

export function setValue(obj: any, path: string, value: any): void {
  const parts = path.split('.')
  const lastPart = parts.pop()

  const lastObj = parts.reduce((acc, part) => {
    if (acc[part] === undefined) {
      acc[part] = {}
    }
    return acc[part]
  }, obj)

  if (lastPart) {
    lastObj[lastPart] = value
  }
}
