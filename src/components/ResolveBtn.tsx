import { AIResponse } from '../interfaces';

interface Props {
  userPrompt: string;
  onGenerateSolution: () => Promise<AIResponse | undefined>;
}

export const ResolveBtn = ({ userPrompt, onGenerateSolution }: Props) => (
  <div className='flex justify-center mt-6'>
    <button
      disabled={!userPrompt}
      onClick={onGenerateSolution}
      className='flex items-center justify-center px-8 py-2 mx-auto text-base text-black border-none rounded-full cursor-pointer bg-slate-200 hover:bg-slate-700 hover:text-white'
    >
      Resolver <span className='ml-2 transform rotate-45deg'>&#10148;</span>
    </button>
  </div>
);
