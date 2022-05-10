import Link from 'next/link'
import { MouseEventHandler, useContext, useState } from 'react'
import Image from 'next/image'
import { AuthenticationContext, LoginContext } from '../../store/AuthenticationContext'
import { actions } from '../../module/authentication/login'

export const NavigationHeader = () => {
  const loginState = useContext(AuthenticationContext)
  const loginDispatch = useContext(LoginContext)
  const imageSrc = 'https://mdbcdn.b-cdn.net/img/new/avatars/8.webp'

  const [openMenu, setOpenMenu] = useState(false)

  const handleSignOut: MouseEventHandler<HTMLButtonElement> = () => {
    setOpenMenu(false)
    loginDispatch(actions.logOutAction())
    localStorage.removeItem('profile')
    setTimeout(() => {
      alert('ログアウトしました')
    }, 1000)
  }

  return (
    <div className="flex justify-between sm: px-2 md:px-8 sm: py-2 py-1 items-center border-b-2 border-sky-200">
      <Link href={{ pathname: '/' }} passHref>
        <a className="text-3xl font-bold">Sortie</a>
      </Link>

      <div>
        {loginState.login ? (
          <div className="flex row justify-center">
            <div className="">
              <div className="relative">
                <button
                  onClick={() => setOpenMenu(!openMenu)}
                  className="rounded-md bg-white focus:outline-none"
                >
                  <div className="mr-4">
                    <Image
                      width={40}
                      height={40}
                      src={imageSrc}
                      alt="sample"
                      className="rounded-full"
                    />
                  </div>
                </button>

                {openMenu && (
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-2xl z-20">
                    <Link href={{ pathname: '/dashboard' }} passHref>
                      <a
                        onClick={() => setOpenMenu(false)}
                        className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-green-100"
                      >
                        Dashboard
                      </a>
                    </Link>
                    <a
                      onClick={() => setOpenMenu(false)}
                      className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-green-100"
                    >
                      Your likes
                    </a>
                    <a
                      onClick={() => setOpenMenu(false)}
                      className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-green-100"
                    >
                      Help
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-green-100"
                    >
                      Settings
                    </a>
                    <div className="border-t-2 border-gray-200">
                      <button
                        onClick={handleSignOut}
                        className="w-full flex px-4 py-2 text-sm capitalize text-gray-700 hover:bg-green-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <Link href={{ pathname: '/questions/new' }} passHref>
                <button className="px-4 font-semibold rounded shadow-md text-white bg-green-500 hover:bg-green-700 h-4/5">
                  質問する
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <Link href={{ pathname: '/login' }} passHref>
            <button className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700">
              ログイン
            </button>
          </Link>
        )}
      </div>
    </div>
  )
}
