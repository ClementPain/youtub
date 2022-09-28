import { stringLength } from "@firebase/util"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth"
import { useRouter } from "next/router"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { auth } from "../firebase"

interface IAuth {
  user: User | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logOut: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logOut: async () => {},
  loading: false
})

interface AuthProps {
  children: React.ReactNode
}

export const AuthProvider2 = ({ children }: AuthProps) => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [initialLoading, setInitialLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        setLoading(false)
      } else {
        setUser(null)
        setLoading(true)
        router.push('/login')
      }
    })

    setInitialLoading(false)
  }, [auth])
  
  const signUp = async (email: string, password: string) => {
    setLoading(true)

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
        router.push('/')
      })
      .catch((errors) => alert(errors))
      .finally(() => setLoading(false))
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
        router.push('/')
      })
      .catch((errors) => alert(errors))
      .finally(() => setLoading(false))
  }

  const logOut = async () => {
    setLoading(true)

    await signOut(auth)
      .then(() => setUser(null))
      .catch((errors) => alert(errors))
      .finally(() => setLoading(false))
  }

  const memoedValue = useMemo<IAuth>(() => ({
    user, signUp, signIn, logOut, loading
  }), [user, signUp, signIn, logOut, loading])

  return (
    <AuthContext.Provider value={ memoedValue }>
      { !initialLoading && children }
    </AuthContext.Provider>
  )
}

export default function useAuth2() {
  useContext(AuthContext)
}