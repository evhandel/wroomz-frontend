import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { posthog, isAnalyticsEnabled } from './posthog';

// Sends a $pageview on every route change (SPA history has no page reloads).
export const usePageviewTracking = () => {
    const location = useLocation();

    useEffect(() => {
        if (!isAnalyticsEnabled()) {
            return;
        }
        posthog.capture('$pageview');
    }, [location.pathname, location.search]);
};

// Associates events with the logged-in user; resets the identity on logout.
export const useIdentifyUser = () => {
    const { user } = useAuth();

    useEffect(() => {
        if (!isAnalyticsEnabled()) {
            return;
        }
        if (user) {
            posthog.identify(String(user.id), {
                email: user.email,
                name: `${user.firstName} ${user.lastName}`.trim(),
                role: user.role,
                teamName: user.teamName ?? undefined,
            });
        } else {
            posthog.reset();
        }
    }, [user]);
};

// Drop-in component: mount inside the Router + AuthProvider to wire up both.
export const AnalyticsTracker = () => {
    usePageviewTracking();
    useIdentifyUser();
    return null;
};
