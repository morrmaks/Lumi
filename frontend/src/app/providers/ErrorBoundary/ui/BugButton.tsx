import { Button } from '@/shared/ui/Button'
import { useEffect, useState } from 'react'
import { Placeholders } from '@/shared/consts'

export const BugButton = () => {
  const [error, setError] = useState<boolean>(false)
  useEffect(() => {
    if (error) {
      throw new Error()
    }
  }, [error])

  function onThrow() {
    setError(true)
  }

  return (
    <Button onClick={onThrow}>
      {Placeholders.app.errorBoundary.bugButtonText}
    </Button>
  )
}
