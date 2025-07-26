import React from "react"

import UnderlineLink from "@modules/common/components/localized-client-link"
import AccountNav from "../components/account-nav"
import { User } from "@lib/data"

interface AccountLayoutProps {
    user: Omit<User, "password"> | null
    children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
    user,
    children,
}) => {
    return (
        <>
            <div>{user && <AccountNav user={user} />}</div>
            <div className="flex justify-evenly overflow-hidden flex-wrap gap-10 items-center p-1.5 bg-white">
                {children}
            </div>
        </>
    )
}

export default AccountLayout

