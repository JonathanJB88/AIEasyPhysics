import { Link } from 'react-router-dom';

export const Header = () => (
  <header className='flex items-center justify-between w-full px-2 pb-3 mt-2 shadow-sm shadow-slate-600 show sm:px-4'>
    <Link to='/' className='flex space-x-3'>
      <h1 className='ml-1 font-normal tracking-tight sm:text-2xl text-1xl'>
        😁 Física Fácil |<span className='font-bold text-red-800'> chatGPT AI</span>
      </h1>
    </Link>

    <img src={require('../assets/logo.png')} alt='Logo' className='w-10 h-10 animate-spin' />
  </header>
);
