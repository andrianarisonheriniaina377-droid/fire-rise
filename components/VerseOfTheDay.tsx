import React, { useEffect, useState } from 'react';
import { QuoteIcon, FlameIcon } from './Icons';
import { verseController } from '../backend/verse';
import { Verse } from '../types';

const VerseOfTheDay = () => {
  const [verse, setVerse] = useState<Verse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getVerse = async () => {
      setLoading(true);
      try {
        const data = await verseController.getVerseOfTheDay();
        setVerse(data);
      } catch (error) {
        console.error("Error loading verse", error);
      } finally {
        setLoading(false);
      }
    };
    getVerse();
  }, []);

  return (
    <section id="verse" className="py-20 relative bg-dark-800 border-y border-gray-800">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-dark-900 p-4 rounded-full border border-gray-800 shadow-xl">
            <FlameIcon className="w-8 h-8 text-orange-500 animate-pulse" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-8">
          Parole de vie (24h)
        </h2>
        
        {loading ? (
          <div className="animate-pulse space-y-4">
             <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto"></div>
             <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto"></div>
          </div>
        ) : verse ? (
          <div className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-br from-dark-700 to-dark-900 border border-gray-700 shadow-2xl">
            <QuoteIcon className="absolute top-6 left-6 w-10 h-10 text-gray-600 opacity-20" />
            
            <blockquote className="relative z-10">
              <p className="text-2xl md:text-3xl font-serif text-gray-100 italic leading-relaxed">
                "{verse.text}"
              </p>
              <footer className="mt-8">
                <p className="text-xl font-bold fire-gradient">{verse.reference}</p>
              </footer>
            </blockquote>

            <QuoteIcon className="absolute bottom-6 right-6 w-10 h-10 text-gray-600 opacity-20 transform rotate-180" />
          </div>
        ) : (
          <p className="text-gray-400">Le verset arrive...</p>
        )}
      </div>
    </section>
  );
};

export default VerseOfTheDay;