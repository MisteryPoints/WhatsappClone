import Image from "next/image"
import { Circle } from 'better-react-spinkit'

function Loading() {
  return (
    <center style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
        <div>
            <Image src='https://es.logodownload.org/wp-content/uploads/2018/10/whatsapp-logo-11.png' alt='' height={200} width={200} style={{ marginBottom: '50px' }}/>
            <Circle  color='#3BCB28' size={60}/>
        </div>
    </center>
  )
}

export default Loading