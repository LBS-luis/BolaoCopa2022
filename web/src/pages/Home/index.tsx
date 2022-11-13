import Image  from 'next/image'
import { useState, useEffect, FormEvent } from 'react'
import { api } from '../../services/axios'
//assets
import logoImg from '../../assets/logo.svg'
import iconCheck from '../../assets/check.svg'
//components
import LateralMenu from '../../components/LateralMenu'

//interface
interface HomePorps {
  poolCount: number,
  guessesCount: number
}

export default function Home(props: HomePorps) {
  //params
  const [poolName, setPoolName] = useState<string>("")

  //effects
  

  const createPool = async (evet: FormEvent) => {
    event?.preventDefault()

    try {
      const res = await api.post('pools/create', {
        title: poolName
      })

      const { code } = res.data
      await navigator.clipboard.writeText(code)
      alert("Seu bolão foi criado com sucesso! seu código de compartilhamento é o: "+ code)
    }
    catch(err){
      console.log(err)
      alert('Falha ao criar o seu bolão!')
    }

    
  }


  return (
   <div className='max-w-[1124px] h-screen mx-auto grid grid-cols-1 ' id='main'>
    <LateralMenu />
    <main className='w-[700px] mx-auto mt-12'>

      <Image src={logoImg}
      className='mx-auto w-[400px]'
      alt="logo da aplicação escrito COPA2022"
      quality={100}/>

      <h1 className='text-white mt-14 text-5xl font-bold leading-tight text-center'>
        Crie seu próprio bolão da copa e compartilhe entre amigos!
      </h1>

      <div className='mt-10 flex items-center gap-2'>
        <strong className='text-gray-100 text-xl'> 
          <span className='text-ignite-500'>+100</span> pessoas já estão usando
        </strong>
      </div>

      <form className='mt-10 flex gap-2 px' onSubmit={createPool}>
        <input 
          className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-lg text-white'
          type="text" 
          required placeholder='Qual o nome do seu bolão?'
          value={poolName}
          onChange={event => setPoolName(event.target.value) }/>
        
        <button 
          className='bg-nlwYellow-500 px-6 py-4 rounded text-gray-900 font-bold text-lg uppercase hover:bg-nlwYellow-700 hover:text-white'
          type='submit'>
            Criar meu bolão
        </button>        
      </form>
      
      <p 
        className='m-4 text-lg color-gray-300 leading-relaxed text-gray-500'>
        Após criar seu bolão, você receberá um código único que <br/> poderá usar para convidar outras pessoas 🚀
      </p>

      <div className='mt-10 pt-10 border-t border-gray-600  text-gray-100 flex justify-between'>
        
        <div className='flex items-center gap-2'>
          <Image src={iconCheck} alt="icone de de correto na cor verde" />

          <div className='flex flex-col'>
            <span className='font-bold text-2xl'>{props.poolCount}</span>
            <span>Bolões criados</span>
          </div>
        </div>

        <div className='w-px h-14 bg-gray-600'></div>
        
        <div className='flex items-center gap-2'>
          <Image src={iconCheck} alt="icone de de correto na cor verde" />
        
          <div className='flex flex-col'>
            <span className='font-bold text-2xl'>{props.guessesCount}</span>
            <span>Palpites enviados</span>
          </div>
        </div>

      </div>


    </main>

   </div>
  )
}

export const getServerSideProps = async () => {

  const [poolCountResponse, guessesCountResponse] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count')
  ])


  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessesCount: guessesCountResponse.data.count
    }
  }
}