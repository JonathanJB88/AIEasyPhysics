import { Footer, Github, Header } from './components';

export const App = () => {
  return (
    <>
      <Header />
      <main className='flex flex-col items-center flex-1 w-full px-4 mt-12 text-center sm:mt-10'>
        <a
          className='flex items-center justify-center px-4 py-2 mb-5 space-x-2 text-sm text-gray-600 transition-colors bg-white border border-gray-300 rounded-full shadow-md max-w-fit hover:bg-gray-100 animate-wobble'
          href='https://github.com/yuvalsuede/ai-component-generator'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Github />
          <p>Regálame un estrella en Github ⭐️</p>
        </a>

        <h1 className='text-2xl font-normal sm:text-3xl max-w-1xl text-slate-50'>
          Plantea el <span className='font-bold text-red-700'>- Problema -</span>
        </h1>
        <h2 className='text-xl font-light text-slate-100 sm:text-xl max-w-1xl sm:mt-2'>
          y la Inteligencia artificial lo resolverá por ti y te lo explicará paso a paso
        </h2>
      </main>

      <Footer />
    </>
  );
};
