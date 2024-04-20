import { IonIcon } from '@ionic/react'
import React from 'react'
import Logo from './Logo.png'
import { heartOutline,sendOutline,chatbubbleOutline,notificationsOutline,chatbubbleEllipsesOutline} from 'ionicons/icons';
import { Link, useHistory } from 'react-router-dom';
const Header = () => {

  const history=useHistory();

const handelChatsPage=()=>{
  history.push('/chats')
}



  return (
    <>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"95%",margin:"auto"}}>
        <Link to="/mainhome">
        <div>
            <img src={Logo} alt=''/>
        </div>
        </Link>
        
        <div style={{display:"flex",justifyContent:"space-around",alignItems:"center",width:"15%"}}>
           <IonIcon   icon={notificationsOutline} size="small"></IonIcon>
           <IonIcon onClick={handelChatsPage} icon={chatbubbleEllipsesOutline} size="small"></IonIcon>
        </div>
    </div>
    </>
  )
}

export default Header
