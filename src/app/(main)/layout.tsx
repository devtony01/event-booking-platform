import { Metadata } from "next"

import { siteConfig } from '@lib/config';
import Nav from '@modules/layout/templates/nav'
import Footer from '@modules/layout/templates/footer'


export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {props.children}
      <Footer />
    </>
  )
}