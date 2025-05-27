import { useQuery } from "@tanstack/react-query";
import { api, Race } from "../../../api/client";
import { RaceData } from "./stintsAnalysis";
import { log } from "console";

export const useRaceData = (raceId: string) => {
  return useQuery<Race, Error, RaceData>({
    queryKey: ["race", raceId],
    queryFn: () => api.races.getById(raceId),
    select: (data) => {
      if (
        !data.details?.calculatedData ||
        !data.details?.results ||
        !data.details?.penalties ||
        !data.details?.settings
      ) {
        throw new Error("Race data is not calculated yet");
      }

      return {
        results: data.details.results,
        stintsAnalysis: data.details.calculatedData,
        penalties: data.details.penalties,
        settings: data.details.settings,
      };
    },
  });
};
