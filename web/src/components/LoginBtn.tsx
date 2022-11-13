import { useEffect, useState } from 'react'

import googleLogin from '../assets/google.png'
import avatar from '../assets/defaultUser.png'
import Image, { StaticImageData }  from 'next/image'
import { api } from '../services/axios'


export default function LoginBtn (){
    const [isLogged, setIsLogged] = useState(false)
    const [name, setName] = useState<string>("Login")
    const [email, setEmail] = useState<string>("Entre com sua conta Google")
    const [avatarUrl, setAvatarUrl] = useState<string>("")

    const loggin = async ()=>{
        try{
            const res = await api.get('login',{headers:{
                email: window.prompt("Email"),
                password: window.prompt("Senha")
            }})
            if (res.data.status == 200){
                let info = res.data
                setIsLogged(true)
                setEmail(info.email)
                setName(info.name)
                setAvatarUrl(info?.avatar ?? "")
            }
        }
        catch(err){
            alert("Usuario ou senha inválidos!")
        }
    }

    return(
        <>
            <LogginModel reqFunction={loggin} avatar={isLogged == true ? avatarUrl != ""? avatarUrl :avatar : googleLogin} name={name} email={email}/>
        </>
    )
}




interface LogginModel {
    reqFunction?: ()=>void;
    avatar: StaticImageData | string;
    name: string;
    email: string;
}

export function LogginModel(props:LogginModel){
    return (
                <div className='grid grid-flow-col mt-14 w-full pb-4 border-b-2 border-mblue-300'>
                    {
                        typeof props.avatar == 'string'? 
                        <img 
                            className='rounded-[50%] w-16 h-16 ml-2 cursor-pointer'
                            src={props.avatar} 
                            alt='fodo do usuario'onClick={props.reqFunction}/> 
                        : <Image 
                        className='rounded-[50%] w-16 h-16 ml-2 cursor-pointer'
                        src={props.avatar} 
                        alt='fodo do usuario'onClick={props.reqFunction}/>
                    }
                    <div className='mt-1 -ml-6 pl-8 cursor-pointer' onClick={props.reqFunction}>
                        <h2 className='text-white text-2xl font-bold'>{props.name}</h2>
                        <p className='text-mblue-300 mt-1'>{props.email}</p>
                    </div>                        
                </div>
    )
}