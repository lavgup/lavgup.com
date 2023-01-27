import Image from 'next/image';
import { InferGetStaticPropsType } from 'next';
import * as Icons from '../icons';
import React, { useEffect, useState } from 'react';
import Nageshvar from '../public/static/images/Nageshvar.jpeg';
import Link from 'next/link';
import Atropos from 'atropos/react';

const iconMap: { [k: string]: React.FC<{ className: string }> } = {
    'rain': Icons.RainIcon,
    'wind': Icons.WindIcon,
    'cloudy': Icons.CloudIcon,
    'fog': Icons.FogIcon,
    'partly-cloudy-day': Icons.CloudSunIcon,
    'partly-cloudy-night': Icons.CloudMoonIcon,
    'clear-day': Icons.SunIcon,
    'clear-night': Icons.MoonIcon
};

export default function Home({ weather }: { weather: InferGetStaticPropsType<typeof getStaticProps>['weather'] }) {
    let sunrise = weather.sunrise, sunset = weather.sunset;
    [sunrise, sunset].forEach(s => {
        const time = new Date(s * 1000).toLocaleTimeString('en-AU', {
            hour: 'numeric',
            minute: '2-digit',
            hourCycle: 'h12',
            timeZone: 'Australia/Sydney'
        });

        if (!isNaN(sunrise)) sunrise = time;
        else sunset = time;
    });

    const [date, setDate] = useState(new Date());
    useEffect(() => {
        const timerId = setInterval(() => setDate(new Date()), 10000);
        return () => clearInterval(timerId)
    }, []);

    const CurrentIcon = iconMap[weather.icon] ?? Icons.CloudIcon;

    return (
        <div className='flex flex-col lg:flex-row gap-12 max-w-3/4 md:justify-center p-8 md:p-10 lg:p-24 xl:p-32'>
            <div className='w-full text-left'>
                <h1 className='text-4xl font-bold'>Lav</h1>

                <h2 className='text-md font-medium w-fit mt-4 rounded-md'>links</h2>
                <div className='flex flex-row gap-2 mt-2 opacity-90'>
                    <Link href='https://github.com/lavgup'>
                        <Icons.GitHubIcon className='w-9 bg-neutral-300/70 dark:bg-stone-700 rounded-2xl p-1.5 hover:scale-90' />
                    </Link>
                    <Link href='https://twitter.com/lavgup/likes'>
                        <Icons.TwitterIcon className='w-9 bg-sky-500/70 dark:bg-sky-400/40 rounded-2xl p-1.5 hover:scale-90' />
                    </Link>
                    <Link href='mailto://contact@lavgup.com'>
                        <Icons.MailIcon className='w-9 bg-amber-400/70 dark:bg-amber-900/80 rounded-2xl p-1.5 hover:scale-90' />
                    </Link>
                </div>

                <h2 className='text-md font-medium w-fit mt-6 md:mt-8 rounded-md'>newcastle, au</h2>
                <div className='flex flex-col gap-2 mt-2 text-sm font-medium opacity-80'>
                    <div title="time"
                         className="flex flex-row items-center gap-2 rounded-xl py-1.5 px-4 bg-neutral-300/70 dark:bg-neutral-700/80 w-fit"
                    >
                        <Icons.ClockIcon className="w-5" />
                        {date.toLocaleTimeString('en-AU', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hourCycle: 'h12',
                            timeZone: 'Australia/Sydney'
                        })}
                    </div>
                    <div title='current conditions'
                         className='flex flex-row items-center gap-2 rounded-xl py-1.5 px-4 bg-neutral-300/70 dark:bg-neutral-700/80 w-fit'>
                        <CurrentIcon className='w-5' /> <p
                        title='current conditions'>{weather.conditions.toLowerCase() || 'cloudy'}</p>
                    </div>
                    <div title='temperature'
                         className='flex flex-rows items-center gap-2 rounded-xl py-2 px-4 bg-neutral-300/70 dark:bg-neutral-700/80 w-fit'>
                        <Icons.ThermometerIcon className='w-5' /> {weather.temp ? Math.round(weather.temp) : '20'}°
                    </div>
                    <div className='flex flex-row gap-2'>
                        <div title='sunrise'
                             className='flex flex-col justify-center items-center px-3 py-2 bg-neutral-300/70 dark:bg-neutral-700/80 rounded-2xl w-fit'>
                            <Icons.SunriseIcon className='w-5 rounded-2xl' />
                            {sunrise || '6:03am'}
                        </div>
                        <div className='w-20 h-3 border-neutral-400/70 rounded-tl-full rounded-tr-full border-b-0 border-2 border-dashed' />
                        <div title='sunset'
                             className='flex flex-col justify-center items-center px-3 py-2 bg-neutral-300/70 dark:bg-neutral-700/80 rounded-2xl w-fit'>
                            <Icons.SunsetIcon className='w-5 rounded-2xl mb-0.5' />
                            {sunset || '7:45pm'}
                        </div>
                    </div>
                </div>

            </div>
            <div>
                <Atropos highlight={false} shadow={false} activeOffset={-5} rotateXMax={10} rotateYMax={10}>
                    <div className='rounded-2xl w-fit h-f-fit'>
                        <Image
                            className='rounded-2xl'
                            alt='Shri Nageshvar Jyotirlinga'
                            src={Nageshvar}
                            width={756}
                            height={1008}
                            placeholder='blur'
                        />
                    </div>
                </Atropos>

                <div className='text-sm text-gray-700 dark:text-gray-400 mt-3'>
                    <p className='italic'>Shri Nageshvar Jyotirlinga</p>
                    <p>Dwarka, Gujarat - December 27, 2022</p>
                </div>
            </div>
        </div>
    );
}

export async function getStaticProps() {
    const data = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/newcastle%2C%20australia?unitGroup=uk&key=${process.env.VISUAL_CROSSING_WEATHER_KEY}&contentType=json`);
    const json = await data.json();

    const weather = {
        sunrise: json.currentConditions.sunriseEpoch,
        sunset: json.currentConditions.sunsetEpoch,
        temp: json.currentConditions.temp,
        conditions: json.currentConditions.conditions,
        icon: json.currentConditions.icon as string
    };

    return {
        props: { weather },
        revalidate: 180
    };
}
