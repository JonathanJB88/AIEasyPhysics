import { PayPalBtn } from './';

export const Footer = () => {
  return (
    <footer className='flex flex-col items-center justify-between w-full h-8 px-3 pt-2 mt-2 mb-2 space-y-3 text-center shadow-footer sm:h-16 sm:pt-1 sm:flex-row sm:mb-0'>
      <div>
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
      <div className='sm:text-right '>
        <PayPalBtn />
      </div>
    </footer>
  );
};
