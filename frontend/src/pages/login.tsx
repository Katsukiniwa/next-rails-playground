import { FormEvent, ReactElement, useContext, useEffect, useState } from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import React from 'react'
import Head from 'next/head'
import { AuthenticationContext, LoginContext } from '../store/AuthenticationContext'
import { actions } from '../module/authentication/login'
import { useSignInUserMutation } from '../types/generated/types.d'
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()
  const loginState = useContext(AuthenticationContext)
  const loginDispatch = useContext(LoginContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('password')

  const [signInUser, { loading }] = useSignInUserMutation({
    variables: {
      email,
      password,
    },
    onCompleted: (result) => {
      loginDispatch(actions.successLoginAction())
      localStorage.setItem('profile', JSON.stringify(result.signInUser?.user))
      router.push('/')
      setTimeout(() => {
        alert('ログインしました')
      }, 1000)
    },
    onError(error) {
      alert(error.message)
    },
  })

  useEffect(() => {
    if (loginState.login) {
      router.push('/')
    }
  }, [loginState.login, router])

  const submitLoginForm = async (e: FormEvent) => {
    e.preventDefault()
    loginDispatch(actions.startLoginAction())
    await signInUser()
  }

  return (
    <React.Fragment>
      <Head>
        <title>ログイン</title>
        <meta name="description" content="ログイン" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-1/2 mx-auto p-8">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={(e) => submitLoginForm(e)}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="account@example.com"
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="**********"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {loading ? 'ログイン中...' : 'ログイン'}
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800"
              href="#"
            >
              パスワードを忘れた場合
            </a>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2022 Katsukiniwa. All rights reserved.
        </p>
      </div>
    </React.Fragment>
  )
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>
}
