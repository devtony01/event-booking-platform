import { getUser } from "@lib/data"
import AccountLayout from "@modules/account/templates/account-layout"

export default async function AccountPageLayout({
  dashboard,
  login,
}: {
  dashboard?: React.ReactNode
  login?: React.ReactNode
}) {
  const user = await getUser().catch(() => null)

  return (
    <AccountLayout user={user}>
      {user ? dashboard : login}
    </AccountLayout>
  )
}