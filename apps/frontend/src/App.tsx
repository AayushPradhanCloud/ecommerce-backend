import { AppProviders } from '@/app/providers/AppProviders'
import { AppRoutes } from '@/app/router/routes'
import { Navbar } from '@/widgets/Navbar'
import { Footer } from '@/widgets/Footer'

function App() {
  return (
    <AppProviders>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </AppProviders>
  )
}

export default App