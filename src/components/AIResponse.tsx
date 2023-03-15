import { toast } from 'react-hot-toast';

interface Props {
  aiResponse: string;
  finalResponse: string[];
}

export const AIResponse = ({ aiResponse, finalResponse }: Props) => (
  <>
    <div>
      <h2 className='mx-auto font-normal text-slate-200 sm:text-1xl text-1xl'>Click para copiar la solución 👇</h2>
    </div>
    <div className='flex flex-col items-center justify-center mx-auto space-y-8 '>
      <div
        className='flex flex-col items-center justify-center p-4 text-black whitespace-normal transition bg-slate-100 rounded-xl hover:text-white hover:bg-black cursor-copy'
        onClick={() => {
          navigator.clipboard.writeText(aiResponse);
          toast('Copiado en el portapapeles', {
            icon: '✂️',
          });
        }}
      >
        {finalResponse.map((text, index) => {
          return (
            <p key={index} className='text-sm font-medium'>
              {text}
            </p>
          );
        })}
      </div>
    </div>
  </>
);
