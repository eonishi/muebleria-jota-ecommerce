import { useState, useEffect } from "react";

export default function useAuth() {
  const [user, setUser] = useState(null)
  const [isAuth, setIsAuth] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch("/api/auth", {
      method: "GET",
      credentials: "same-origin"
    })
      .then((res) => {
        // Si expiro o es inválido
        if (!res.ok) {
          setUser(null)
          setIsAuth(false)
        }
        else { return res.json() }
      })
      .then((data) => {
        if (data) {
          setUser(data)
          setIsAuth(true)
        }
      })
      .catch((e) => {
        console.error(e.message)
        // Ante un problema "no logear" ningun usuario. Esta bien esto??
        setUser(null)
        setIsAuth(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])


  function login(userData) {
    setUser(userData)
    setIsAuth(true)
  }

  async function logout() {
    // Este fetch es para limpiar la cookie 🍪
    await fetch("/api/auth/logout", { method: "POST" })
    setUser(null)
    setIsAuth(false)
  }

  return {
    user,
    login,
    logout,
    isAuth,
    loading
  }
}
