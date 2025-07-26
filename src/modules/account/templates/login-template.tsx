"use client"

import { useState } from "react"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"
import SocialAuth from "@modules/account/components/social-auth"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState<LOGIN_VIEW>(LOGIN_VIEW.SIGN_IN)

  return (
      <>
        <img loading="lazy"
          src="images/media.png"
          alt=""
          className="object-contain shrink self-stretch my-auto aspect-[0.52] min-w-[240px] w-[425px] max-md:hidden max-md:max-w-full max-sm:hidden"
        />
        <div className="flex overflow-hidden flex-col w-fit shrink self-stretch my-auto bg-white min-w-[240px] max-md:max-w-full">

          <div className="flex flex-col w-full max-md:max-w-full">
            {currentView === LOGIN_VIEW.SIGN_IN ? (
              <Login setCurrentView={setCurrentView} />
            ) : (
              <Register setCurrentView={setCurrentView} />
            )}
            
            {/* Social Authentication - Shared between login and register */}
            <div className="px-8 pb-8">
              <SocialAuth />
            </div>
          </div>

        </div>
      </>
  )
}

export default LoginTemplate