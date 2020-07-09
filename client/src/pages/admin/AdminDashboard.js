import React, {useEffect} from 'react'
import SideNav from '../../components/sidebar';
import { Button } from '@material-ui/core';
import QRCode from "qrcode.react";
import { functions } from '../../firebase/firebase.utils';


export default function AdminDashboard() {
    const handleClick = () =>{
       const func = functions.httpsCallable('createUUID')
       func().then((res) => console.log(res));
        
    }
    
    const arr = ["9f0c2ce1-ce97-4c8a-9807-28017daeb478","c340812c-b2c1-4b66-8891-20db9d909a56"]
    return (
        <div>
            <div>
                <SideNav activeNav="Dashboard">
                    admin Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                    facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                    gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                    <Button onClick={handleClick}>test uud</Button>
                    {arr.map(val => (<div><QRCode value={val} /></div>))}
                </SideNav>
               
                
            </div>
        </div>
    )
}
