import { useEffect, useState } from 'react'
//assets
import Image  from 'next/image'
import bola from '../assets/bola.svg'
import calendario from '../assets/calendario.svg'
import bolao from '../assets/bolao.svg'
import lupa from '../assets/lupa.svg'

import LoginBtn from './LoginBtn'

export default function LateralMenu(){
    //states
    const [isOpen, setIsOpen] = useState(false)

    const menu = ()=>{
        let menuLateral:any = document.getElementById('menuLateral')
        menuLateral.style.marginLeft = isOpen ? '-24rem' : '0px'
        setIsOpen(!isOpen)
    }

    //useEffect(()=>{ 
    //    menu()
    //},[isOpen])

    return(
        <div 
        className='absolute float-left left-0 transition-all duration-700 -ml-[24rem]' 
        id='menuLateral'>
            
            <Image 
            src={bola} 
            alt="Icone de Bola de futebol amarela" 
            className='absolute float-left left-[22.5rem] z-10 w-[80px] h-[80px] mt-12 cursor-pointer hover:animate-spin-slow '
            onClick={menu}
            />
            <div className="h-screen w-96 bg-mblue-500 opacity-90 flex flex-col">
                <div className='h-screen w-72 mx-auto bg-transparent'>
                    
                    <LoginBtn />

                    <div className='grid grid-flow-col pl-5 mt-4 cursor-pointer pb-4 border-b-2 border-mblue-300'>
                        <Image src={calendario} alt='Icone de um calendário' className='pointer-events-none'/>
                        <h1 className='text-xl text-mblue-300 mt-4 pl-7 -ml-9 pointer-events-none'>Calendario de jogos</h1>
                    </div>
                    <div className='grid grid-flow-col pl-5 mt-4 cursor-pointer pb-4 border-b-2 border-mblue-300'>
                        <Image src={bolao} alt='Icone de uma folha de papel' className='pointer-events-none'/>
                        <h1 className='text-xl text-mblue-300 mt-4 pl-7 -ml-24 pointer-events-none'>Meus Bolões</h1>
                    </div>
                    <div className='grid grid-flow-col pl-5 mt-4 cursor-pointer pb-4 border-b-2 border-mblue-300'>
                        <Image src={lupa} alt='Icone de uma lupa' className='pointer-events-none'/>
                        <h1 className='text-xl text-mblue-300 mt-4 pl-7 -ml-24 pointer-events-none'>Buscar bolão</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
