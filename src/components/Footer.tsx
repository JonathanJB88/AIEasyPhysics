import { Github, PayPalBtn } from './';

export const Footer = () => (
  <footer className='flex flex-col items-center justify-between w-full h-8 px-3 pt-2 mt-2 mb-2 space-y-3 text-center shadow-footer sm:h-16 sm:pt-1 sm:flex-row sm:mb-0'>
    <div className='ml-2'>
      Por{' '}
      <a
        href='https://www.linkedin.com/in/jonathanbracho/'
        target='_blank'
        rel='noreferrer'
        className='font-bold transition hover:underline underline-offset-2'
      >
        Jonathan Bracho
      </a>
    </div>

    <a
      className='flex items-center justify-center px-4 py-2 space-x-2 text-sm text-gray-600 align-bottom transition-colors bg-white border border-gray-300 rounded-full shadow-md max-w-fit hover:bg-gray-100 animate-bounce'
      href='https://github.com/JonathanJB88/AIEasyPhysics'
      target='_blank'
      rel='noopener noreferrer'
    >
      <Github />
      <p>Regálame un estrella en Github ⭐️</p>
    </a>

    <PayPalBtn />
  </footer>
);
