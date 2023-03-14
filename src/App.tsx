import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';

import { Footer, Header, INIT_STATE, Loading, NumberItem, Panel, Selector, SubHeader } from './components';
import { AIResponse } from './interfaces';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY || '';

export const App = () => {
  //
  const [selection, setSelection] = useState<string>(INIT_STATE);
  const [userPrompt, setUserPrompt] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSelection = (selectedOption: string) => {
    setSelection(selectedOption);
  };

  const generateSolution = async (): Promise<AIResponse | undefined> => {
    setLoading(true);

    const prompt = `Simula que eres un profesor de física de educación secundaria o bachillerato y genera una solución para el siguiente problema: ${userPrompt}.\n Toma en cuenta que el problema es de ${selection} y preséntala con el siguiente esquema: Datos del problema, Solución, explicación. Además, el lenguaje utilizado debe estar acorde al grado ${selection} y utiliza variables para representar los datos.`;

    try {
      if (!apiKey) throw new Error('No se ha configurado la API KEY de OpenAI');

      const resp = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        body: JSON.stringify({
          prompt,
          model: 'text-davinci-003',
          max_tokens: 1024,
          temperature: 0.7,
          frequency_penalty: 0,
          presence_penalty: 0,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const data = await resp.json();
      if (!data.choices) {
        toast.error('No se pudo generar la solución');
        setLoading(false);
        return;
      }
      const { text } = data.choices[0];
      setAiResponse(text);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error('No se pudo generar la solución');
        setLoading(false);
        return;
      }
    }
  };

  return (
    <div className='flex flex-col items-center justify-center w-full min-h-screen py-2 mx-auto'>
      <Header />
      <main className='flex flex-col items-center flex-1 w-full px-4 mt-12 text-center sm:mt-10'>
        <SubHeader />
        <div className='w-full max-w-xl'>
          <div className='flex items-center mt-10 space-x-3'>
            <NumberItem number={1} />
            <p className='flex font-medium text-left align-center'>Escribe el planteamiento del problema</p>
          </div>
          <textarea
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            rows={4}
            className='w-full px-4 py-2 mt-2 text-sm text-gray-700 border border-slate-100 rounded-xl focus:outline-none focus:border-red-800'
            placeholder='Ejemplo: Un objeto de 2kg cae desde una altura de 10m. ¿Cuál es su velocidad final?'
          />
          <div className='flex items-center mt-2 space-x-3'>
            <NumberItem number={2} />
            <p className='flex font-medium text-left align-center'>Selecciona el grado</p>
          </div>

          <div className='flex justify-start w-full mt-4'>
            <Selector onSelection={handleSelection} /> <span className='mx-2 mt-1'>de Educación Secundaria</span>
          </div>

          {!loading && (
            <button
              disabled={!userPrompt}
              className='w-full px-4 py-2 mt-8 font-medium text-black bg-slate-200 rounded-xl sm:mt-10 hover:bg-black/ 80'
              onClick={generateSolution}
            >
              Genera la solución &rarr;
            </button>
          )}
          {loading && (
            <button
              className='w-full px-4 py-2 mt-8 font-medium text-white bg-black rounded-xl sm:mt-10 hover:bg-black/80'
              disabled
            >
              <Loading />
            </button>
          )}
        </div>
        <Toaster position='top-center' reverseOrder={false} toastOptions={{ duration: 2000 }} />
        <hr className='h-px bg-slate-200 border-1 dark:bg-slate-200' />
        <Panel>
          <AnimatePresence mode='wait'>
            <motion.div className='my-10 space-y-10'>
              {aiResponse && (
                <>
                  <div>
                    <h2 className='mx-auto font-normal text-slate-200 sm:text-1xl text-1xl'>
                      Click para copiar la solución 👇
                    </h2>
                  </div>
                  <div className='flex flex-col items-center justify-center w-full mx-auto space-y-8'>
                    <div
                      className='flex items-center justify-center w-full max-w-full p-4 whitespace-normal transition bg-slate-100 rounded-xl hover:bg-black cursor-copy'
                      onClick={() => {
                        navigator.clipboard.writeText(aiResponse);
                        toast('Copiado en el portapapeles', {
                          icon: '✂️',
                        });
                      }}
                    >
                      <div>
                        <p className='text-sm font-medium text-black hover:text-slate-100'>{aiResponse}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </Panel>
      </main>

      <Footer />
    </div>
  );
};
