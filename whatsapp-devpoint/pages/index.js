import Head from 'next/head'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <>
      <Head>
        <title>Chats | DevPoint Messenger</title>  
      </Head>

      <Sidebar/>
    </>
  )
}
