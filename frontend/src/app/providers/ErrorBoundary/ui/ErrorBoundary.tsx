import { Component, ErrorInfo, ReactNode, Suspense } from 'react'
import { ErrorPage } from '@/widgets/ErrorPage'
import { Loader } from '@/shared/ui/Loader'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
    this.resetError = this.resetError.bind(this)
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo)
  }

  resetError() {
    this.setState({ hasError: false })
  }

  render() {
    const { hasError } = this.state
    const { children } = this.props

    if (hasError) {
      return (
        <Suspense fallback={<Loader />}>
          <ErrorPage onResetError={this.resetError} />
        </Suspense>
      )
    }

    return children
  }
}
