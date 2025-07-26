"use client"

import { User } from "@lib/data"
import { useParams, usePathname } from "next/navigation"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const AccountNav = ({
  user,
}: {
  user: Omit<User, "password"> | null
}) => {
  const route = usePathname()

  const handleLogout = async () => {
    // await signOut()
  }

  return (
    <div>
      <div className="text-xl-semi mb-4">
        Hello, {user?.email}
      </div>
      <div className="small:hidden" data-testid="mobile-account-nav">

        <div className="text-base-regular">
          <ul>
            <li>
              <LocalizedClientLink
                href="/account/profile"
                className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
              >
                <>
                  <div className="flex items-center gap-x-2">
                    <span>Profile</span>
                  </div>
                </>
              </LocalizedClientLink>
            </li>
            <li>
              <button
                type="button"
                className="flex items-center justify-between py-4 border-b border-gray-200 px-8 w-full"
                onClick={handleLogout}
                data-testid="logout-button"
              >
                <div className="flex items-center gap-x-2">
                  <span>Log out</span>
                </div>
              </button>
            </li>
          </ul>
        </div>

      </div>
      <div className="hidden small:block" data-testid="account-nav">
        <div>
          <div className="pb-4">
            <h3 className="text-base-semi">Account</h3>
          </div>
          <div className="text-base-regular">
            <ul className="flex mb-0 justify-start items-start flex-col gap-y-4">
              <li>
                <AccountNavLink
                  href="/account"
                >
                  Overview
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/profile"
                >
                  Profile
                </AccountNavLink>
              </li>
              <li className="text-grey-700">
                <button
                  type="button"
                  onClick={handleLogout}
                  data-testid="logout-button"
                >
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

type AccountNavLinkProps = {
  href: string
  children: React.ReactNode
}

const AccountNavLink = ({ href, children }: AccountNavLinkProps) => {
  return (
    <LocalizedClientLink
      href={href}
    >
      {children}
    </LocalizedClientLink>
  )
}

export default AccountNav
