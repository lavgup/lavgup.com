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
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        const timerId = setInterval(() => setDate(new Date()), 10000);
        return () => clearInterval(timerId);
    }, []);

    const CurrentIcon = iconMap[weather.icon] ?? Icons.CloudIcon;

    return (
        <div className='flex flex-col gap-12 p-8 md:justify-center md:p-10 lg:flex-row lg:p-24 xl:p-32 max-w-3/4'>
            <div className='w-full text-left'>
                <h1 className='text-4xl font-bold'>Lav</h1>

                <h2 className='mt-4 font-medium rounded-md text-md w-fit'>links</h2>
                <div className='flex flex-row gap-2 mt-2 opacity-90'>
                    <Link href='https://github.com/lavgup'>
                        <Icons.GitHubIcon
                            className='p-1.5 w-9 rounded-2xl hover:scale-90 bg-neutral-300/70 dark:bg-stone-700' />
                    </Link>
                    <Link href='https://twitter.com/lavgup/likes'>
                        <Icons.TwitterIcon
                            className='p-1.5 w-9 rounded-2xl hover:scale-90 bg-sky-500/70 dark:bg-sky-400/40' />
                    </Link>
                    <Link href='mailto://contact@lavgup.com'>
                        <Icons.MailIcon
                            className='p-1.5 w-9 rounded-2xl hover:scale-90 bg-amber-400/70 dark:bg-amber-900/80' />
                    </Link>
                </div>

                <h2 className='mt-6 font-medium rounded-md md:mt-8 text-md w-fit'>newcastle, au</h2>
                <div className='flex flex-col gap-2 mt-2 text-sm font-medium opacity-80'>
                    <div className='flex flex-row gap-2'>
                        <div title='time'
                             className='flex flex-row gap-2 items-center py-1.5 px-4 rounded-xl bg-neutral-300/70 w-fit dark:bg-neutral-700/80'
                        >
                            <Icons.ClockIcon className='w-5' />
                            {date.toLocaleTimeString('en-AU', {
                                hour: 'numeric',
                                minute: '2-digit',
                                hourCycle: 'h12',
                                timeZone: 'Australia/Sydney'
                            })}
                        </div>
                        <div title='temperature'
                             className='flex gap-2 items-center py-2 px-4 rounded-xl flex-rows bg-neutral-300/70 w-fit dark:bg-neutral-700/80'>
                            <Icons.ThermometerIcon className='w-5' /> {weather.temp ? Math.round(weather.temp) : '20'}°
                        </div>
                    </div>
                    <div title='current conditions'
                         className='flex flex-row gap-2 items-center py-1.5 px-4 rounded-xl bg-neutral-300/70 w-fit dark:bg-neutral-700/80'>
                        <CurrentIcon className='w-5' /> <p
                        title='current conditions'>{weather.conditions.toLowerCase() || 'cloudy'}</p>
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

                <div className='mt-3 text-sm text-gray-700 dark:text-gray-400'>
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
        temp: json.currentConditions.temp,
        conditions: json.currentConditions.conditions,
        icon: json.currentConditions.icon as string
    };

    return {
        props: { weather },
        revalidate: 180
    };
}
