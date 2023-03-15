import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { INIT_STATE } from '../components';
import { AIResponse } from '../interfaces';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY || '';

export const useAI = () => {
  const [selection, setSelection] = useState<string>(INIT_STATE);
  const [userPrompt, setUserPrompt] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSelection = (selectedOption: string) => {
    setSelection(selectedOption);
  };

  const generateSolution = async (): Promise<AIResponse | undefined> => {
    setLoading(true);
    setAiResponse('');

    const prompt = `Simula que eres un profesor de física de educación secundaria o bachillerato y genera una solución para el siguiente problema: ${userPrompt}.\n Toma en cuenta que el problema es de ${selection} y preséntala con el siguiente esquema: Datos del problema, Solución, Explicación. Además, el lenguaje utilizado debe estar acorde al grado ${selection} y utiliza variables para representar los datos. Considera la transformación de unidades cuando sea necesario`;

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

  const textTransform = (text: string) => {
    const textArray = text.trim().split('\n');

    const textArrayTransformed = textArray.map((text) => {
      const textTransformed = text.trim().replace(/\s\s+/g, ' ');
      return textTransformed;
    });

    return textArrayTransformed;
  };

  const finalResponse = textTransform(aiResponse);

  return {
    selection,
    userPrompt,
    aiResponse,
    loading,
    finalResponse,
    handleSelection,
    setUserPrompt,
    generateSolution,
  };
};
