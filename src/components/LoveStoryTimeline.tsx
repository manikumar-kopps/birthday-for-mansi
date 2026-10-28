import React from 'react';
import { TimelineEvent } from '../config';
import { Heart } from 'lucide-react';

interface TimelineProps {
  title: string;
  subtitle: string;
  events: TimelineEvent[];
}

export const LoveStoryTimeline: React.FC<TimelineProps> = ({
  title,
  subtitle,
  events,
}) => {
  return (
    <section className="relative py-24 px-4 max-w-5xl mx-auto">
      {/* Title */}
      <div className="text-center mb-16">
        <span className="text-sm font-semibold tracking-widest text-pink-500 uppercase bg-pink-100/80 px-4 py-1.5 rounded-full border border-pink-200">
          Our Chapters
        </span>
        <h2 className="font-cursive text-4xl sm:text-6xl font-bold text-slate-800 mt-3 mb-2">
          {title}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-medium max-w-xl mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Central Vertical Line */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-pink-300 via-rose-300 to-purple-300 transform md:-translate-x-1/2 rounded-full shadow-xs"></div>

        {/* Timeline Items */}
        <div className="space-y-12">
          {events.map((event, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={event.id}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Node Icon on the line */}
                <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-white border-4 border-pink-300 shadow-md text-xl animate-floatSlow">
                  {event.icon}
                </div>

                {/* Content Card */}
                <div className="ml-16 md:ml-0 md:w-1/2 md:px-8 w-full">
                  <div className="group relative bg-white/85 backdrop-blur-md p-6 sm:p-7 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-pink-200 hover:-translate-y-1">
                    {/* Badge & Date */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-pink-600 bg-pink-100 px-3 py-1 rounded-full">
                        <Heart className="w-3 h-3 fill-pink-500" />
                        {event.badge}
                      </span>
                      <span className="text-xs font-semibold text-slate-400 font-sans">
                        {event.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-cursive text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
                      {event.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
