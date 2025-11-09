import React, { useState, useRef, useEffect } from 'react';
import type { FC } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { IonicBondIcon } from './components/icons/IonicBondIcon';
import { CovalentBondIcon } from './components/icons/CovalentBondIcon';
import { MetallicBondIcon } from './components/icons/MetallicBondIcon';
import { SpeakerIcon } from './components/icons/SpeakerIcon';

// Helper functions for audio decoding, as per Gemini documentation
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}


type BondType = 'ionic' | 'covalent' | 'metallic';

interface BondInfo {
  title: string;
  howItForms: string;
  elementTypes: string;
  icon: FC;
}

const bondData: Record<BondType, BondInfo> = {
  ionic: {
    title: 'الرابطة الأيونية',
    howItForms: 'تتكون من خلال الانتقال الكامل لإلكترون واحد أو أكثر من ذرة فلز إلى ذرة لافلز. هذا الانتقال ينتج عنه أيونات موجبة (كاتيونات) وأيونات سالبة (أنيونات) تتجاذب كهربائيًا لتكوين مركب أيوني.',
    elementTypes: 'تنشأ بين الفلزات (التي تميل لفقد الإلكترونات) واللافلزات (التي تميل لاكتساب الإلكترونات).',
    icon: IonicBondIcon,
  },
  covalent: {
    title: 'الرابطة التساهمية',
    howItForms: 'تتكون عندما تتشارك ذرتان أو أكثر في أزواج من الإلكترونات. كل ذرة تساهم بإلكترون واحد لتكوين زوج إلكتروني مشترك يربط الذرتين معًا، مما يؤدي إلى تكوين جزيئات مستقرة.',
    elementTypes: 'تنشأ عادةً بين ذرات اللافلزات التي لها كهرسلبية متقاربة.',
    icon: CovalentBondIcon,
  },
  metallic: {
    title: 'الرابطة الفلزية',
    howItForms: 'تتكون نتيجة التجاذب بين أيونات الفلز الموجبة (الكاتيونات) و "بحر" من الإلكترونات غير المتمركزة (الحرة الحركة) التي تحيط بها. هذه الإلكترونات المشتركة بين جميع الذرات هي التي تربط الشبكة البلورية للفلز.',
    elementTypes: 'توجد بين ذرات عنصر فلزي واحد أو بين ذرات عناصر فلزية مختلفة في السبائك.',
    icon: MetallicBondIcon,
  },
};

const App: React.FC = () => {
  const [activeBond, setActiveBond] = useState<BondType>('ionic');
  const [audioCache, setAudioCache] = useState<Record<string, string>>({});
  const [loadingAudio, setLoadingAudio] = useState<string | null>(null);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    // Initialize AudioContext on client-side
    // FIX: Cast window to `any` to access `webkitAudioContext` for older browser compatibility, resolving TypeScript error.
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  const activeData = bondData[activeBond];
  const IconComponent = activeData.icon;
  
  const handlePlayAudio = async (id: string, text: string) => {
    if (sourceNodeRef.current) {
        sourceNodeRef.current.stop();
        sourceNodeRef.current = null;
    }

    if (playingAudio === id) {
        setPlayingAudio(null);
        return;
    }

    const play = async (base64Audio: string) => {
        if (!audioContextRef.current) return;
        try {
            const audioBuffer = await decodeAudioData(
                decode(base64Audio),
                audioContextRef.current,
                24000,
                1
            );
            const source = audioContextRef.current.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContextRef.current.destination);
            source.onended = () => {
                setPlayingAudio(null);
                sourceNodeRef.current = null;
            };
            source.start();
            sourceNodeRef.current = source;
            setPlayingAudio(id);
        } catch (error) {
            console.error('Error playing audio:', error);
            setPlayingAudio(null);
        }
    };
    
    if (audioCache[id]) {
        await play(audioCache[id]);
        return;
    }

    setLoadingAudio(id);
    setPlayingAudio(null);
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: `بصوت واضح وهادئ: ${text}` }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Kore' },
                    },
                },
            },
        });
        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

        if (base64Audio) {
            setAudioCache(prev => ({ ...prev, [id]: base64Audio }));
            await play(base64Audio);
        } else {
            console.error('No audio data received from API.');
        }
    } catch (error) {
        console.error("Error generating speech:", error);
    } finally {
        setLoadingAudio(null);
    }
  };

  const getButtonClass = (bondType: BondType) => {
    const baseClass = "w-full text-lg md:text-xl font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-opacity-50";
    if (activeBond === bondType) {
      if (bondType === 'ionic') return `${baseClass} bg-sky-500 text-white shadow-lg shadow-sky-500/30 ring-sky-400`;
      if (bondType === 'covalent') return `${baseClass} bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 ring-emerald-400`;
      if (bondType === 'metallic') return `${baseClass} bg-amber-500 text-white shadow-lg shadow-amber-500/30 ring-amber-400`;
    }
    return `${baseClass} bg-slate-700 hover:bg-slate-600 text-slate-300`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-emerald-400 to-amber-400 mb-2">
            مستكشف الروابط الكيميائية
          </h1>
          <p className="text-lg text-slate-400">
            فهم كيفية ترابط الذرات لتكوين العالم من حولنا
          </p>
        </header>

        <main>
          <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
            <button onClick={() => setActiveBond('ionic')} className={getButtonClass('ionic')}>
              أيونية
            </button>
            <button onClick={() => setActiveBond('covalent')} className={getButtonClass('covalent')}>
              تساهمية
            </button>
            <button onClick={() => setActiveBond('metallic')} className={getButtonClass('metallic')}>
              فلزية
            </button>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 md:p-8 shadow-2xl transition-all duration-500 ease-in-out">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">{activeData.title}</h2>
            
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="w-full lg:w-2/5 flex justify-center items-center p-4 bg-slate-900 rounded-xl border border-slate-700">
                  <IconComponent />
              </div>

              <div className="w-full lg:w-3/5 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-sky-400 mb-2 border-b-2 border-sky-400/30 pb-2 flex items-center justify-between">
                    <span>كيف تتكون؟</span>
                    <button
                      onClick={() => handlePlayAudio(`${activeBond}-how`, activeData.howItForms)}
                      className="p-2 rounded-full hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
                      aria-label="اقرأ الوصف"
                      disabled={loadingAudio !== null}
                    >
                      <SpeakerIcon
                        isLoading={loadingAudio === `${activeBond}-how`}
                        isPlaying={playingAudio === `${activeBond}-how`}
                      />
                    </button>
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-base md:text-lg">
                    {activeData.howItForms}
                  </p>
                </div>
                <div>
                   <h3 className="text-xl font-bold text-emerald-400 mb-2 border-b-2 border-emerald-400/30 pb-2 flex items-center justify-between">
                    <span>أنواع العناصر المشاركة</span>
                     <button
                      onClick={() => handlePlayAudio(`${activeBond}-elements`, activeData.elementTypes)}
                      className="p-2 rounded-full hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      aria-label="اقرأ الوصف"
                      disabled={loadingAudio !== null}
                    >
                      <SpeakerIcon
                        isLoading={loadingAudio === `${activeBond}-elements`}
                        isPlaying={playingAudio === `${activeBond}-elements`}
                      />
                    </button>
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-base md:text-lg">
                    {activeData.elementTypes}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="text-center mt-12 text-slate-500">
          <p>تطبيق تعليمي مبسط حول الروابط الكيميائية</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
