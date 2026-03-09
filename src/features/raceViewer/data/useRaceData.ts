import { useQuery } from "@tanstack/react-query";
import { api, Race } from '../../../api';
import { RaceData } from "./stintsAnalysis";

export const useRaceData = (raceId: string) => {
  return useQuery<Race, Error, RaceData>({
    queryKey: ["race", raceId],
    queryFn: () => api.races.getById(raceId),
    select: (data) => {
      if (
        !data.calculatedData ||
        !data.results ||
        !data.penalties ||
        !data.settings
      ) {
        throw new Error("Race data is not calculated yet");
      }

      return {
        results: data.results,
        stintsAnalysis: data.calculatedData,
        penalties: data.penalties,
        settings: data.settings,
        teamsAndPilots: data.teamsAndPilots,
      };
    },
  });
};
