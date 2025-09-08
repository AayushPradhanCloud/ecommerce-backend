import { QueryClient, QueryClientProvider as Provider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'

interface QueryClientProviderProps {
  children: ReactNode
}

export const QueryClientProvider = ({ children }: QueryClientProviderProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  )

  return <Provider client={queryClient}>{children}</Provider>
}