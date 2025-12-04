import React, { useEffect, useState } from 'react';
import { NewsItem } from '../types';
import { homeController } from '../backend/home';
import { ArrowRightIcon } from './Icons';

const NewsSection = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const data = await homeController.getLatestNews(3);
      setNews(data);
    };
    fetchNews();
  }, []);

  if (news.length === 0) return null;

  return (
    <section className="py-20 bg-dark-800 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
             <h2 className="text-3xl font-heading font-bold text-white mb-2">
              Dernières <span className="text-orange-500">Actualités</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-red-600 rounded"></div>
          </div>
          <button className="hidden md:flex items-center text-sm font-bold text-gray-400 hover:text-white transition-colors">
            VOIR TOUT LE BLOG <ArrowRightIcon className="ml-2 w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <article key={item.id} className="bg-dark-900 rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:border-orange-500/30 transition-all group">
              <div className="h-48 overflow-hidden relative">
                <div className="absolute top-3 left-3 z-10">
                   <span className="px-3 py-1 bg-orange-600 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-md">
                     {item.category}
                   </span>
                </div>
                <img 
                  src={item.mediaUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {item.mediaType === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/50">
                       <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="text-gray-500 text-xs mb-3 flex items-center">
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-orange-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                  {item.summary}
                </p>
                <a href="#" className="inline-block text-orange-500 text-sm font-semibold hover:text-orange-400">
                  Lire la suite
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;