import * as Panelbear from '@panelbear/panelbear-js';
import { NextRouter } from 'next/router';
import { useEffect } from 'react';

export const useAnalytics = (router: NextRouter) => {
	useEffect(() => {
		Panelbear.load(process.env.NEXT_PUBLIC_PANELBEAR_SITE_ID as string, {
			scriptSrc: '/bear.js',
			enabled: process.env.NODE_ENV === 'production'
		});

		// Trigger initial page view
		Panelbear.trackPageview();

		// Add on route change handler for client-side navigation
		const handleRouteChange = () => Panelbear.trackPageview();
		router.events.on('routeChangeComplete', handleRouteChange);

		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, [router.events]);
};
