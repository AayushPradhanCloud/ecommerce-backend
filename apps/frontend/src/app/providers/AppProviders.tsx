import { QueryClientProvider } from './QueryClientProvider'
import { RouterProvider } from './RouterProvider'
import { ReactNode } from 'react'

interface AppProvidersProps {
  children: ReactNode
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <QueryClientProvider>
      <RouterProvider>{children}</RouterProvider>
    </QueryClientProvider>
  )
}