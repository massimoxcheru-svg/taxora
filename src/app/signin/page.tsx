"use client"
import { LoginScreen } from '@/src/pages_component/signIn_page_component/signIn'

export default function SigninPage() {
  const handleLogin = () => {
    console.log("Login");
  }
  return (
      <div>
          <LoginScreen onLogin={handleLogin} />
    </div>
  )
}
