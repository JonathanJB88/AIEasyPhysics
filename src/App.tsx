import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import TextareaAutosize from 'react-textarea-autosize';

import { AIResponse, Footer, Header, Loading, NumberItem, Panel, ResolveBtn, Selector, SubHeader } from './components';
import { useAI } from './hooks';

export const App = () => {
  //

  const { userPrompt, aiResponse, finalResponse, loading, handleSelection, setUserPrompt, generateSolution } = useAI();

  return (
    <div className='flex flex-col items-center justify-center w-full min-h-screen py-2 mx-auto'>
      <Header />
      <Toaster position='top-center' reverseOrder={false} toastOptions={{ duration: 2000 }} />
      <main className='flex flex-col items-center flex-1 w-full px-4 mt-12 text-center sm:mt-10'>
        <div className='justify-center'>
          <SubHeader />
        </div>

        <div className='flex flex-col justify-between w-full px-4 mt-4 max-w-7xl md:flex-row'>
          <div className='w-full max-w-xl md:pr-8'>
            <div className='flex items-center mt-10 space-x-3'>
              <NumberItem number={1} />
              <p className='flex font-medium text-left align-center'>Escribe el planteamiento del problema</p>
            </div>
            <TextareaAutosize
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              className='w-full px-4 py-2 my-6 text-sm text-gray-700 border border-slate-100 rounded-xl focus:outline-none focus:border-red-800'
              placeholder='Ejemplo: Un objeto de 2kg cae desde una altura de 10m. ¿Cuál es su velocidad final?'
            />
            <div className='flex items-center mt-2 space-x-3'>
              <NumberItem number={2} />
              <p className='flex font-medium text-left align-center'>Selecciona el grado</p>
            </div>
            <div className='flex justify-start w-full my-6'>
              <Selector onSelection={handleSelection} /> <span className='mx-2 mt-1'>de Educación Secundaria</span>
            </div>
            {!loading && <ResolveBtn userPrompt={userPrompt} onGenerateSolution={generateSolution} />}
            {loading && <Loading />}
          </div>

          <div className='w-full md:w-1/2'>
            <Panel>
              <AnimatePresence mode='wait'>
                <motion.div className='my-10 space-y-10'>
                  {aiResponse ? (
                    <AIResponse aiResponse={aiResponse} finalResponse={finalResponse} />
                  ) : (
                    <p className='text-lg font-medium md:ml-32 md:text-xl text-slate-200'>
                      ✨ Aquí tendrás la solución ✨
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </Panel>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
