// Team logo registry.
// Convention to add a new team logo:
//   1. Drop the SVG file into src/assets/teamLogos/<key>.svg
//   2. Import it below and add one `key: importedUrl` entry to TEAM_LOGOS.
// The `wroomz` key is the fallback and points at the main product logo.

import wroomzLogo from '../../assets/teamLogos/wroomz.svg';
import noorracingLogo from '../../assets/teamLogos/noorracing.svg';

export const TEAM_LOGOS: Record<string, string> = {
    wroomz: wroomzLogo,
    noorracing: noorracingLogo,
};

export const LOGO_KEYS: string[] = Object.keys(TEAM_LOGOS);

export function getTeamLogo(key: string | null | undefined): string {
    if (!key) return TEAM_LOGOS.wroomz;
    return TEAM_LOGOS[key] ?? TEAM_LOGOS.wroomz;
}
