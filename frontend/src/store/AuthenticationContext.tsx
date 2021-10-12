import { createContext, Dispatch, ReactChild, useReducer } from "react"
import { loginReducer, LoginActionType } from "../module/authentication/login"
import { logoutReducer, LogoutActionType } from "../module/authentication/logout"

export const AuthenticationContext = createContext({ isLoading: false, login: false })

//@ts-ignore
export const LoginContext = createContext<Dispatch<LoginActionType>>(null)
//@ts-ignore
export const LogoutContext = createContext<Dispatch<LogoutActionType>>(null)

const initialAuthenticationState = { isLoading: false, login: false, error: null }

export function AuthenticationContextProvider({ children }: { children: ReactChild }) {
  const [authentication, login] = useReducer(loginReducer, initialAuthenticationState)
  const [_authentication2, logout] = useReducer(logoutReducer, initialAuthenticationState)

  return (
    <AuthenticationContext.Provider value={authentication}>
      <LoginContext.Provider value={login}>
        <LogoutContext.Provider value={logout}>
          {children}
        </LogoutContext.Provider>
      </LoginContext.Provider>
    </AuthenticationContext.Provider>
  )
}