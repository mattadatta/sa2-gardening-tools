import { memo, useCallback, useState } from "react"
import { useChao } from "./ChaoContext"
import { chaoBytesToString, chaoStringToBytes } from "../../util/chao/name"
import { Input } from "../ui/inputs"
import { Checkmark, Crossmark, Pencil } from "../icons"
import { IconButton } from "../ui/buttons"

const ChaoName = memo(() => {
  const { chaoData, updateChao } = useChao((c) => c.name as number[])
  const [isEditing, setEditing] = useState(true)
  const name = chaoBytesToString(chaoData);

  const onTextChange = useCallback((text: string) => {
    const bytes = chaoStringToBytes(text)
    updateChao((c) => {
      c.name = bytes
    })
  }, [])

  if (isEditing) {
    return (
      <div className="flex items-center space-x-2">
        <Input
          value={name}
          onChange={onTextChange}
          placeholder={name}
        />
        <IconButton Icon={Crossmark} onClick={() => setEditing(false)} />
        <IconButton Icon={Checkmark} onClick={() => setEditing(false)} />
      </div>
    );
  } else {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-white">{name}</span>
        <IconButton Icon={Pencil} onClick={() => setEditing(true)} />
      </div>
    );
  }
})

export default ChaoName