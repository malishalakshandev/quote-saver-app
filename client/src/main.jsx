import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import NavigationBar from './components/NavigationBar'
import { BrowserRouter, Route, Routes } from 'react-router'
import AddQuotePage from './pages/add-quote.page'
import MyQuotesPage from './pages/my-quotes.page'
import PublicQuotesPage from './pages/public-quotes.page'
import RootLayout from './layouts/root.layout'
import { ClerkProvider } from '@clerk/clerk-react'
import SignInPage from './pages/sign-in.page'
import SignUpPage from './pages/sign-up.page'
import { store } from './lib/store'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import ProtectedLayout from './layouts/protected.layout'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')).render(
  <ClerkProvider
    appearance={{
      cssLayerName: 'clerk',
    }}
    publishableKey={PUBLISHABLE_KEY}>

    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path='/' element={<PublicQuotesPage />} />
            <Route element={<ProtectedLayout />}>
              <Route path='/add-quote' element={<AddQuotePage />} />
            </Route>
            <Route element={<ProtectedLayout />}>
              <Route path='/my-quotes' element={<MyQuotesPage />} />
            </Route>
          </Route>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position='bottom-center' />
    </Provider>
  </ClerkProvider>
)
