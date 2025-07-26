"use client"

import { useState } from "react"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState("sign-in")

  return (
      <>
        <img loading="lazy"
          src="images/media.png"
          alt=""
          className="object-contain shrink self-stretch my-auto aspect-[0.52] min-w-[240px] w-[425px] max-md:hidden max-md:max-w-full max-sm:hidden"
        />
        <div className="flex overflow-hidden flex-col w-fit shrink self-stretch my-auto bg-white min-w-[240px] max-md:max-w-full">

          <div className="flex flex-col w-full max-md:max-w-full">
            {currentView === "sign-in" ? (
              <Login setCurrentView={setCurrentView} />
            ) : (
              <Register setCurrentView={setCurrentView} />
            )}
          </div>

        </div>
      </>
  )
}

export default LoginTemplate