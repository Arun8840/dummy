import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AlertDialog } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { JSX, useState } from "react"

type PopupPropType = {
  isPending: boolean
}
export const useConfirm = (
  title: string,
  message: string,
  variant:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
): [({ isPending }: PopupPropType) => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void
  } | null>(null)

  const [isOpen, setIsOpen] = useState(false) // Add a state to control dialog visibility

  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve })
      setIsOpen(true) // Open the dialog
    })
  }

  const handleClose = () => {
    setPromise(null)
    setIsOpen(false) // Close the dialog
  }

  const handleConfirm = () => {
    promise?.resolve(true)
    handleClose()
  }

  const handleCancel = () => {
    promise?.resolve(false)
    handleClose()
  }

  const ConfirmationDialog = ({ isPending }: PopupPropType) => {
    return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="font-sans">
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{message}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild onClick={handleConfirm}>
              <Button
                disabled={isPending}
                variant={variant}
                className="text-white"
              >
                {isPending ? (
                  <>
                    <Spinner />
                    Processing...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  return [ConfirmationDialog, confirm]
}
