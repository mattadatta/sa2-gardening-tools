import { memo, useCallback, useEffect, useState } from "react"
import { useChao } from "./ChaoContext"
import { chaoBytesToString, chaoStringToBytes } from "../../util/chao/name"
import { Input } from "../ui/inputs"
import { IconButton } from "../ui/buttons"
import { Checkmark, Crossmark, Pencil, Tag } from "../ui/icons"

const ChaoName = memo(() => {
  const { chaoData, updateChao, index } = useChao((c) => c.name as number[])
  const [isEditing, setEditing] = useState(false)
  const [name, setName] = useState("")

  useEffect(() => {
    setEditing(false)
    setName(chaoBytesToString(chaoData))
  }, [index, chaoData])

  const onTextChange = useCallback((text: string) => {
    // TODO: maybe inline validation
    setName(text)
  }, [])

  const onConfirm = useCallback(() => {
    const bytes = chaoStringToBytes(name)
    updateChao((c) => {
      c.name = bytes
    })
    setEditing(false)
  }, [name, updateChao])

  const onCancel = useCallback(() => {
    setEditing(false)
    setName(chaoBytesToString(chaoData))
  }, [chaoData])

  const onBeginEditing = useCallback(() => {
    setEditing(true)
  }, [])

  const editingElement = (
    <>
      <Input
        value={name}
        onChange={onTextChange}
        placeholder={name}
      />
      <IconButton
        className="text-red-300"
        Icon={Crossmark}
        onClick={onCancel} />
      <IconButton
        className="text-green-300"
        Icon={Checkmark}
        onClick={onConfirm} />
    </>
  )

  const sealedElement = (
    <>
      <span className="text-white border border-gray-800 rounded-md px-2 py-1">{name}</span>
      <IconButton
        iconProps={{ className: "w-6 h-6" }}
        Icon={Pencil}
        onClick={onBeginEditing} />
    </>
  )

  const childElement = isEditing ? editingElement : sealedElement

  return (
    <div className="flex items-center space-x-2">
      <Tag className="fill-current text-gray-400 w-4 h-4" />
      {childElement}
    </div>
  )
})

export default ChaoName