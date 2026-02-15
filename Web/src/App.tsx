import { Toaster } from 'sonner'
import { UserSearchPage } from './components/UserSearchPage'

function App() {
  return (
    <>
      <UserSearchPage />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#ed4264',
            color: 'white',
            border: 'none',
          },
          classNames: {
            closeButton: 'toast-close-btn',
          },
        }}
      />
    </>
  )
}

export default App
