import { memo, useCallback } from "react"
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { Button } from "./ui/buttons"
import { useCurrentError } from "../store"

interface ErrorModalImplProps {
  error: any
  onDismiss: () => void
}

const ErrorModalImpl = memo(({ error, onDismiss }: ErrorModalImplProps) => {
  return (
    <div className="flex flex-col items-center font-nunito space-y-2">
      <span className="font-bold">{`${error}`}</span>
      <Button
        className="px-2 py-1 rounded-md bg-gray-800"
        onClick={onDismiss}
      >
        <span className="font-bold">OK</span>
      </Button>
    </div>
  )
})

interface ErrorModalProps {
}

const ErrorModal = memo(({ }: ErrorModalProps) => {
  const { error, setError } = useCurrentError()
  const isOpen = error !== null
  const handleClose = useCallback(() => {
    setError(null)
  }, [setError])

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box>
        <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md p-4 bg-red-950 w-1/2`}>
          {isOpen &&
            <ErrorModalImpl
              error={error}
              onDismiss={handleClose} />
          }
        </div>
      </Box>
    </Modal>
  )
})

export default ErrorModal
