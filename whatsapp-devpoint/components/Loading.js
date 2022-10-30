import Image from "next/image"
import PacmanLoader from 'react-spinners/PacmanLoader'

function Loading() {
  return (
    <center style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
        <div>
            <Image src='https://es.logodownload.org/wp-content/uploads/2018/10/whatsapp-logo-11.png' alt='' priority height={200} width={200} style={{ marginBottom: '50px' }}/>
            <PacmanLoader color="#3BCB28" size={ 25 }/>
        </div>
    </center>
  )
}

export default Loading