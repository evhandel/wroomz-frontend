export interface StintAlalysisData {
    no: number;
    laps: { no: number; time: number; elapsedTime: number }[];
    startGap: number;
    startTime: number;
    endTime: number;
    duration: number;
    avgLapExcludingPitExitLap: number;
    bestLap: number;
    pilot: string;
    kart?: string;
}

export interface ResultsData {
    teamNumber: string;
    avgTimeTotal: number;
    laps: number;
    totalTimeWithGapWithoutPenalties: number;
    pilots: string[];
    penalty: number;
    stintsQuantity: number;
}

export interface RaceData {
    results: ResultsData[];
    stintsAnalysis: Record<string, StintAlalysisData[]>;
    penalties: {
        penaltiesManual: Record<string, number>;
        penaltiesByStintLimit: Record<string, number>;
        penaltiesByPilotLimit: Record<string, number>;
    };
    settings: {
        maxStint: number;
        minForPilotIfFour: number;
        minForPilotIfThree: number;
        minForPilotIfTwo: number;
        minPitStopLapTime: number;
        minStintsQuantity: number;
    };
}

export const raceData: RaceData = {
    settings: {
        maxStint: 40,
        minForPilotIfFour: 30,
        minForPilotIfThree: 30,
        minForPilotIfTwo: 30,
        minPitStopLapTime: 120,
        minStintsQuantity: 4,
    },
    results: [
        {
            avgTimeTotal: 43.811375757575746,
            teamNumber: '8',
            pilots: ['Tsimakuridze', 'Tavartkiladze', 'Gurgenidze'],
            laps: 165,
            totalTimeWithGapWithoutPenalties: 7206.877,
            penalty: 22,
            stintsQuantity: 4,
        },
        {
            avgTimeTotal: 44.078642424242425,
            teamNumber: '7',
            pilots: ['Kovziridze', 'Khmaladze'],
            laps: 165,
            totalTimeWithGapWithoutPenalties: 7225.976,
            penalty: 47,
            stintsQuantity: 4,
        },
        {
            avgTimeTotal: 44.36848466257669,
            teamNumber: '13',
            pilots: ['Petrov', 'Gendel'],
            laps: 163,
            totalTimeWithGapWithoutPenalties: 7229.063,
            penalty: 3,
            stintsQuantity: 4,
        },
        {
            avgTimeTotal: 44.56933128834354,
            teamNumber: '11',
            pilots: ['Krupotkin', 'Chadaev', 'Kuzovov'],
            laps: 163,
            totalTimeWithGapWithoutPenalties: 7205.801,
            penalty: 59,
            stintsQuantity: 4,
        },
        {
            avgTimeTotal: 44.589265432098756,
            teamNumber: '10',
            pilots: ['Shor', 'Samsonov'],
            laps: 162,
            totalTimeWithGapWithoutPenalties: 7223.461,
            penalty: 0,
            stintsQuantity: 4,
        },
        {
            avgTimeTotal: 45.916100628930806,
            teamNumber: '1',
            pilots: ['Golovachenko', 'Voskresenskii'],
            laps: 159,
            totalTimeWithGapWithoutPenalties: 7230.66,
            penalty: 70,
            stintsQuantity: 4,
        },
        {
            avgTimeTotal: 47.222577922077924,
            teamNumber: '16',
            pilots: ['Pasichenko', 'Chikiris', 'Pangaev'],
            laps: 154,
            totalTimeWithGapWithoutPenalties: 7242.277,
            penalty: 30,
            stintsQuantity: 6,
        },
        {
            avgTimeTotal: 47.773509933774804,
            teamNumber: '4',
            pilots: ['Berezina', 'Zhingalov', 'Travkin'],
            laps: 151,
            totalTimeWithGapWithoutPenalties: 7213.8,
            penalty: 0,
            stintsQuantity: 6,
        },
    ],
    penalties: {
        penaltiesManual: {
            '11': 3,
            '13': 3,
            '16': 30,
        },
        penaltiesByStintLimit: {
            '1': 70,
            '4': 0,
            '7': 47,
            '8': 22,
            '10': 0,
            '11': 56,
            '13': 0,
            '16': 0,
        },
        penaltiesByPilotLimit: {
            '1': 0,
            '4': 0,
            '7': 0,
            '8': 0,
            '10': 0,
            '11': 0,
            '13': 0,
            '16': 0,
        },
    },
    stintsAnalysis: {
        '1': [
            {
                no: 1,
                laps: [
                    {
                        no: 1,
                        time: 45.34,
                        elapsedTime: 46.587,
                    },
                    {
                        no: 2,
                        time: 42.142,
                        elapsedTime: 88.729,
                    },
                    {
                        no: 3,
                        time: 42.492,
                        elapsedTime: 131.221,
                    },
                    {
                        no: 4,
                        time: 42.332,
                        elapsedTime: 173.553,
                    },
                    {
                        no: 5,
                        time: 43.062,
                        elapsedTime: 216.615,
                    },
                    {
                        no: 6,
                        time: 42.934,
                        elapsedTime: 259.549,
                    },
                    {
                        no: 7,
                        time: 42.511,
                        elapsedTime: 302.06,
                    },
                    {
                        no: 8,
                        time: 42.303,
                        elapsedTime: 344.363,
                    },
                    {
                        no: 9,
                        time: 42.35,
                        elapsedTime: 386.713,
                    },
                    {
                        no: 10,
                        time: 42.233,
                        elapsedTime: 428.946,
                    },
                    {
                        no: 11,
                        time: 42.116,
                        elapsedTime: 471.062,
                    },
                    {
                        no: 12,
                        time: 42.072,
                        elapsedTime: 513.134,
                    },
                    {
                        no: 13,
                        time: 42.416,
                        elapsedTime: 555.55,
                    },
                    {
                        no: 14,
                        time: 42.892,
                        elapsedTime: 598.442,
                    },
                    {
                        no: 15,
                        time: 42.366,
                        elapsedTime: 640.808,
                    },
                    {
                        no: 16,
                        time: 42.284,
                        elapsedTime: 683.092,
                    },
                    {
                        no: 17,
                        time: 42.304,
                        elapsedTime: 725.396,
                    },
                    {
                        no: 18,
                        time: 42.161,
                        elapsedTime: 767.557,
                    },
                    {
                        no: 19,
                        time: 42.43,
                        elapsedTime: 809.987,
                    },
                    {
                        no: 20,
                        time: 42.641,
                        elapsedTime: 852.628,
                    },
                    {
                        no: 21,
                        time: 43.102,
                        elapsedTime: 895.73,
                    },
                    {
                        no: 22,
                        time: 42.332,
                        elapsedTime: 938.062,
                    },
                    {
                        no: 23,
                        time: 42.464,
                        elapsedTime: 980.526,
                    },
                    {
                        no: 24,
                        time: 42.841,
                        elapsedTime: 1023.367,
                    },
                    {
                        no: 25,
                        time: 42.894,
                        elapsedTime: 1066.261,
                    },
                    {
                        no: 26,
                        time: 42.32,
                        elapsedTime: 1108.581,
                    },
                    {
                        no: 27,
                        time: 42.49,
                        elapsedTime: 1151.071,
                    },
                    {
                        no: 28,
                        time: 42.654,
                        elapsedTime: 1193.725,
                    },
                    {
                        no: 29,
                        time: 42.533,
                        elapsedTime: 1236.258,
                    },
                    {
                        no: 30,
                        time: 42.379,
                        elapsedTime: 1278.637,
                    },
                    {
                        no: 31,
                        time: 42.203,
                        elapsedTime: 1320.84,
                    },
                    {
                        no: 32,
                        time: 42.568,
                        elapsedTime: 1363.408,
                    },
                    {
                        no: 33,
                        time: 42.388,
                        elapsedTime: 1405.796,
                    },
                    {
                        no: 34,
                        time: 43.236,
                        elapsedTime: 1449.032,
                    },
                    {
                        no: 35,
                        time: 42.163,
                        elapsedTime: 1491.195,
                    },
                    {
                        no: 36,
                        time: 42.873,
                        elapsedTime: 1534.068,
                    },
                    {
                        no: 37,
                        time: 42.595,
                        elapsedTime: 1576.663,
                    },
                    {
                        no: 38,
                        time: 42.487,
                        elapsedTime: 1619.15,
                    },
                    {
                        no: 39,
                        time: 42.287,
                        elapsedTime: 1661.437,
                    },
                    {
                        no: 40,
                        time: 42.575,
                        elapsedTime: 1704.012,
                    },
                    {
                        no: 41,
                        time: 42.986,
                        elapsedTime: 1746.998,
                    },
                    {
                        no: 42,
                        time: 42.592,
                        elapsedTime: 1789.59,
                    },
                    {
                        no: 43,
                        time: 43.143,
                        elapsedTime: 1832.733,
                    },
                    {
                        no: 44,
                        time: 42.559,
                        elapsedTime: 1875.292,
                    },
                    {
                        no: 45,
                        time: 42.502,
                        elapsedTime: 1917.794,
                    },
                    {
                        no: 46,
                        time: 42.388,
                        elapsedTime: 1960.182,
                    },
                    {
                        no: 47,
                        time: 43.04,
                        elapsedTime: 2003.222,
                    },
                    {
                        no: 48,
                        time: 42.742,
                        elapsedTime: 2045.964,
                    },
                    {
                        no: 49,
                        time: 42.375,
                        elapsedTime: 2088.339,
                    },
                    {
                        no: 50,
                        time: 42.834,
                        elapsedTime: 2131.173,
                    },
                    {
                        no: 51,
                        time: 42.981,
                        elapsedTime: 2174.154,
                    },
                    {
                        no: 52,
                        time: 43.025,
                        elapsedTime: 2217.179,
                    },
                ],
                startGap: 1.247,
                startTime: 0,
                endTime: 2217.1789999999996,
                duration: 2217.1789999999996,
                avgLapExcludingPitExitLap: 42.61407692307692,
                bestLap: 42.072,
                pilot: 'Golovachenko',
                kart: '1',
            },
            {
                no: 2,
                laps: [
                    {
                        no: 53,
                        time: 203.412,
                        elapsedTime: 2420.591,
                    },
                    {
                        no: 54,
                        time: 42.944,
                        elapsedTime: 2463.535,
                    },
                    {
                        no: 55,
                        time: 42.217,
                        elapsedTime: 2505.752,
                    },
                    {
                        no: 56,
                        time: 42.414,
                        elapsedTime: 2548.166,
                    },
                    {
                        no: 57,
                        time: 42.468,
                        elapsedTime: 2590.634,
                    },
                    {
                        no: 58,
                        time: 42.169,
                        elapsedTime: 2632.803,
                    },
                    {
                        no: 59,
                        time: 42.004,
                        elapsedTime: 2674.807,
                    },
                    {
                        no: 60,
                        time: 42.179,
                        elapsedTime: 2716.986,
                    },
                    {
                        no: 61,
                        time: 42.016,
                        elapsedTime: 2759.002,
                    },
                    {
                        no: 62,
                        time: 42.373,
                        elapsedTime: 2801.375,
                    },
                    {
                        no: 63,
                        time: 42.163,
                        elapsedTime: 2843.538,
                    },
                    {
                        no: 64,
                        time: 42.132,
                        elapsedTime: 2885.67,
                    },
                    {
                        no: 65,
                        time: 42.067,
                        elapsedTime: 2927.737,
                    },
                    {
                        no: 66,
                        time: 42.138,
                        elapsedTime: 2969.875,
                    },
                    {
                        no: 67,
                        time: 42.167,
                        elapsedTime: 3012.042,
                    },
                    {
                        no: 68,
                        time: 42.501,
                        elapsedTime: 3054.543,
                    },
                    {
                        no: 69,
                        time: 42.121,
                        elapsedTime: 3096.664,
                    },
                    {
                        no: 70,
                        time: 42.243,
                        elapsedTime: 3138.907,
                    },
                    {
                        no: 71,
                        time: 42.149,
                        elapsedTime: 3181.056,
                    },
                    {
                        no: 72,
                        time: 41.988,
                        elapsedTime: 3223.044,
                    },
                    {
                        no: 73,
                        time: 42.069,
                        elapsedTime: 3265.113,
                    },
                    {
                        no: 74,
                        time: 42.121,
                        elapsedTime: 3307.234,
                    },
                    {
                        no: 75,
                        time: 42.042,
                        elapsedTime: 3349.276,
                    },
                    {
                        no: 76,
                        time: 42.196,
                        elapsedTime: 3391.472,
                    },
                    {
                        no: 77,
                        time: 41.724,
                        elapsedTime: 3433.196,
                    },
                    {
                        no: 78,
                        time: 42.027,
                        elapsedTime: 3475.223,
                    },
                    {
                        no: 79,
                        time: 42.175,
                        elapsedTime: 3517.398,
                    },
                    {
                        no: 80,
                        time: 41.902,
                        elapsedTime: 3559.3,
                    },
                    {
                        no: 81,
                        time: 42.083,
                        elapsedTime: 3601.383,
                    },
                    {
                        no: 82,
                        time: 42.22,
                        elapsedTime: 3643.603,
                    },
                    {
                        no: 83,
                        time: 42.06,
                        elapsedTime: 3685.663,
                    },
                    {
                        no: 84,
                        time: 42.379,
                        elapsedTime: 3728.042,
                    },
                    {
                        no: 85,
                        time: 42.062,
                        elapsedTime: 3770.104,
                    },
                    {
                        no: 86,
                        time: 41.997,
                        elapsedTime: 3812.101,
                    },
                    {
                        no: 87,
                        time: 41.964,
                        elapsedTime: 3854.065,
                    },
                    {
                        no: 88,
                        time: 42.067,
                        elapsedTime: 3896.132,
                    },
                    {
                        no: 89,
                        time: 42.177,
                        elapsedTime: 3938.309,
                    },
                    {
                        no: 90,
                        time: 42.07,
                        elapsedTime: 3980.379,
                    },
                ],
                startGap: 0,
                startTime: 2217.1789999999996,
                endTime: 3980.378999999999,
                duration: 1763.1999999999996,
                avgLapExcludingPitExitLap: 42.15643243243242,
                bestLap: 41.724,
                pilot: 'Voskresenskii',
                kart: '7',
            },
            {
                no: 3,
                laps: [
                    {
                        no: 91,
                        time: 142.136,
                        elapsedTime: 4122.515,
                    },
                    {
                        no: 92,
                        time: 43.612,
                        elapsedTime: 4166.127,
                    },
                    {
                        no: 93,
                        time: 42.803,
                        elapsedTime: 4208.93,
                    },
                    {
                        no: 94,
                        time: 42.971,
                        elapsedTime: 4251.901,
                    },
                    {
                        no: 95,
                        time: 42.255,
                        elapsedTime: 4294.156,
                    },
                    {
                        no: 96,
                        time: 42.585,
                        elapsedTime: 4336.741,
                    },
                    {
                        no: 97,
                        time: 42.873,
                        elapsedTime: 4379.614,
                    },
                    {
                        no: 98,
                        time: 42.888,
                        elapsedTime: 4422.502,
                    },
                    {
                        no: 99,
                        time: 42.463,
                        elapsedTime: 4464.965,
                    },
                    {
                        no: 100,
                        time: 42.478,
                        elapsedTime: 4507.443,
                    },
                    {
                        no: 101,
                        time: 42.331,
                        elapsedTime: 4549.774,
                    },
                    {
                        no: 102,
                        time: 42.494,
                        elapsedTime: 4592.268,
                    },
                    {
                        no: 103,
                        time: 42.091,
                        elapsedTime: 4634.359,
                    },
                    {
                        no: 104,
                        time: 42.247,
                        elapsedTime: 4676.606,
                    },
                    {
                        no: 105,
                        time: 42.372,
                        elapsedTime: 4718.978,
                    },
                    {
                        no: 106,
                        time: 42.376,
                        elapsedTime: 4761.354,
                    },
                ],
                startGap: 0,
                startTime: 3980.378999999999,
                endTime: 4761.353999999999,
                duration: 780.9749999999999,
                avgLapExcludingPitExitLap: 42.58926666666666,
                bestLap: 42.091,
                pilot: 'Voskresenskii',
                kart: '13',
            },
            {
                no: 4,
                laps: [
                    {
                        no: 107,
                        time: 283.56600000000003,
                        elapsedTime: 5044.92,
                    },
                    {
                        no: 108,
                        time: 42.985,
                        elapsedTime: 5087.905,
                    },
                    {
                        no: 109,
                        time: 41.931,
                        elapsedTime: 5129.836,
                    },
                    {
                        no: 110,
                        time: 41.759,
                        elapsedTime: 5171.595,
                    },
                    {
                        no: 111,
                        time: 41.917,
                        elapsedTime: 5213.512,
                    },
                    {
                        no: 112,
                        time: 41.856,
                        elapsedTime: 5255.368,
                    },
                    {
                        no: 113,
                        time: 41.604,
                        elapsedTime: 5296.972,
                    },
                    {
                        no: 114,
                        time: 41.795,
                        elapsedTime: 5338.767,
                    },
                    {
                        no: 115,
                        time: 41.882,
                        elapsedTime: 5380.649,
                    },
                    {
                        no: 116,
                        time: 42.319,
                        elapsedTime: 5422.968,
                    },
                    {
                        no: 117,
                        time: 42.074,
                        elapsedTime: 5465.042,
                    },
                    {
                        no: 118,
                        time: 41.982,
                        elapsedTime: 5507.024,
                    },
                    {
                        no: 119,
                        time: 41.896,
                        elapsedTime: 5548.92,
                    },
                    {
                        no: 120,
                        time: 41.769,
                        elapsedTime: 5590.689,
                    },
                    {
                        no: 121,
                        time: 41.908,
                        elapsedTime: 5632.597,
                    },
                    {
                        no: 122,
                        time: 42.043,
                        elapsedTime: 5674.64,
                    },
                    {
                        no: 123,
                        time: 42.121,
                        elapsedTime: 5716.761,
                    },
                    {
                        no: 124,
                        time: 41.858,
                        elapsedTime: 5758.619,
                    },
                    {
                        no: 125,
                        time: 43.536,
                        elapsedTime: 5802.155,
                    },
                    {
                        no: 126,
                        time: 41.904,
                        elapsedTime: 5844.059,
                    },
                    {
                        no: 127,
                        time: 41.906,
                        elapsedTime: 5885.965,
                    },
                    {
                        no: 128,
                        time: 41.851,
                        elapsedTime: 5927.816,
                    },
                    {
                        no: 129,
                        time: 41.969,
                        elapsedTime: 5969.785,
                    },
                    {
                        no: 130,
                        time: 42.253,
                        elapsedTime: 6012.038,
                    },
                    {
                        no: 131,
                        time: 42.05,
                        elapsedTime: 6054.088,
                    },
                    {
                        no: 132,
                        time: 42.107,
                        elapsedTime: 6096.195,
                    },
                    {
                        no: 133,
                        time: 42.124,
                        elapsedTime: 6138.319,
                    },
                    {
                        no: 134,
                        time: 41.806,
                        elapsedTime: 6180.125,
                    },
                    {
                        no: 135,
                        time: 42.215,
                        elapsedTime: 6222.34,
                    },
                    {
                        no: 136,
                        time: 42.115,
                        elapsedTime: 6264.455,
                    },
                    {
                        no: 137,
                        time: 42.141,
                        elapsedTime: 6306.596,
                    },
                    {
                        no: 138,
                        time: 42.223,
                        elapsedTime: 6348.819,
                    },
                    {
                        no: 139,
                        time: 42.057,
                        elapsedTime: 6390.876,
                    },
                    {
                        no: 140,
                        time: 42.262,
                        elapsedTime: 6433.138,
                    },
                    {
                        no: 141,
                        time: 42.489,
                        elapsedTime: 6475.627,
                    },
                    {
                        no: 142,
                        time: 42.486,
                        elapsedTime: 6518.113,
                    },
                    {
                        no: 143,
                        time: 42.028,
                        elapsedTime: 6560.141,
                    },
                    {
                        no: 144,
                        time: 41.876,
                        elapsedTime: 6602.017,
                    },
                    {
                        no: 145,
                        time: 42.383,
                        elapsedTime: 6644.4,
                    },
                    {
                        no: 146,
                        time: 42.532,
                        elapsedTime: 6686.932,
                    },
                    {
                        no: 147,
                        time: 42.828,
                        elapsedTime: 6729.76,
                    },
                    {
                        no: 148,
                        time: 41.693,
                        elapsedTime: 6771.453,
                    },
                    {
                        no: 149,
                        time: 41.746,
                        elapsedTime: 6813.199,
                    },
                    {
                        no: 150,
                        time: 41.931,
                        elapsedTime: 6855.13,
                    },
                    {
                        no: 151,
                        time: 41.506,
                        elapsedTime: 6896.636,
                    },
                    {
                        no: 152,
                        time: 41.639,
                        elapsedTime: 6938.275,
                    },
                    {
                        no: 153,
                        time: 41.696,
                        elapsedTime: 6979.971,
                    },
                    {
                        no: 154,
                        time: 42.017,
                        elapsedTime: 7021.988,
                    },
                    {
                        no: 155,
                        time: 41.632,
                        elapsedTime: 7063.62,
                    },
                    {
                        no: 156,
                        time: 41.443,
                        elapsedTime: 7105.063,
                    },
                    {
                        no: 157,
                        time: 41.74,
                        elapsedTime: 7146.803,
                    },
                    {
                        no: 158,
                        time: 41.878,
                        elapsedTime: 7188.681,
                    },
                    {
                        no: 159,
                        time: 41.979,
                        elapsedTime: 7230.66,
                    },
                ],
                startGap: 0,
                startTime: 4761.353999999999,
                endTime: 7230.659999999998,
                duration: 2469.305999999999,
                avgLapExcludingPitExitLap: 42.033461538461516,
                bestLap: 41.443,
                pilot: 'Golovachenko',
                kart: '10',
            },
        ],
        '4': [
            {
                no: 1,
                laps: [
                    {
                        no: 1,
                        time: 47.085,
                        elapsedTime: 47.689,
                    },
                    {
                        no: 2,
                        time: 43.791,
                        elapsedTime: 91.48,
                    },
                    {
                        no: 3,
                        time: 43.977,
                        elapsedTime: 135.457,
                    },
                    {
                        no: 4,
                        time: 43.178,
                        elapsedTime: 178.635,
                    },
                    {
                        no: 5,
                        time: 42.729,
                        elapsedTime: 221.364,
                    },
                    {
                        no: 6,
                        time: 42.795,
                        elapsedTime: 264.159,
                    },
                    {
                        no: 7,
                        time: 42.534,
                        elapsedTime: 306.693,
                    },
                    {
                        no: 8,
                        time: 42.786,
                        elapsedTime: 349.479,
                    },
                    {
                        no: 9,
                        time: 42.914,
                        elapsedTime: 392.39300000000003,
                    },
                    {
                        no: 10,
                        time: 42.63,
                        elapsedTime: 435.023,
                    },
                    {
                        no: 11,
                        time: 42.442,
                        elapsedTime: 477.46500000000003,
                    },
                ],
                startGap: 0.604,
                startTime: 0,
                endTime: 477.465,
                duration: 477.465,
                avgLapExcludingPitExitLap: 43.351,
                bestLap: 42.442,
                pilot: 'Zhingalov',
                kart: '4',
            },
            {
                no: 2,
                laps: [
                    {
                        no: 12,
                        time: 141.951,
                        elapsedTime: 619.416,
                    },
                    {
                        no: 13,
                        time: 42.416,
                        elapsedTime: 661.832,
                    },
                    {
                        no: 14,
                        time: 42.511,
                        elapsedTime: 704.343,
                    },
                    {
                        no: 15,
                        time: 42.587,
                        elapsedTime: 746.93,
                    },
                    {
                        no: 16,
                        time: 42.123,
                        elapsedTime: 789.053,
                    },
                    {
                        no: 17,
                        time: 41.942,
                        elapsedTime: 830.995,
                    },
                    {
                        no: 18,
                        time: 42.017,
                        elapsedTime: 873.012,
                    },
                    {
                        no: 19,
                        time: 42.21,
                        elapsedTime: 915.222,
                    },
                    {
                        no: 20,
                        time: 42.488,
                        elapsedTime: 957.71,
                    },
                    {
                        no: 21,
                        time: 42.213,
                        elapsedTime: 999.923,
                    },
                    {
                        no: 22,
                        time: 42.24,
                        elapsedTime: 1042.163,
                    },
                    {
                        no: 23,
                        time: 42.708,
                        elapsedTime: 1084.871,
                    },
                    {
                        no: 24,
                        time: 42.375,
                        elapsedTime: 1127.246,
                    },
                    {
                        no: 25,
                        time: 42.388,
                        elapsedTime: 1169.634,
                    },
                    {
                        no: 26,
                        time: 42.627,
                        elapsedTime: 1212.261,
                    },
                    {
                        no: 27,
                        time: 42.364,
                        elapsedTime: 1254.625,
                    },
                    {
                        no: 28,
                        time: 43.009,
                        elapsedTime: 1297.634,
                    },
                    {
                        no: 29,
                        time: 42.412,
                        elapsedTime: 1340.046,
                    },
                    {
                        no: 30,
                        time: 42.157,
                        elapsedTime: 1382.203,
                    },
                    {
                        no: 31,
                        time: 42.225,
                        elapsedTime: 1424.4279999999999,
                    },
                    {
                        no: 32,
                        time: 42.285,
                        elapsedTime: 1466.713,
                    },
                    {
                        no: 33,
                        time: 42.339,
                        elapsedTime: 1509.052,
                    },
                    {
                        no: 34,
                        time: 42.166,
                        elapsedTime: 1551.218,
                    },
                    {
                        no: 35,
                        time: 42.344,
                        elapsedTime: 1593.562,
                    },
                    {
                        no: 36,
                        time: 42.072,
                        elapsedTime: 1635.634,
                    },
                    {
                        no: 37,
                        time: 41.945,
                        elapsedTime: 1677.579,
                    },
                    {
                        no: 38,
                        time: 42.406,
                        elapsedTime: 1719.985,
                    },
                    {
                        no: 39,
                        time: 42.395,
                        elapsedTime: 1762.38,
                    },
                    {
                        no: 40,
                        time: 42.348,
                        elapsedTime: 1804.728,
                    },
                    {
                        no: 41,
                        time: 42.069,
                        elapsedTime: 1846.797,
                    },
                    {
                        no: 42,
                        time: 42.209,
                        elapsedTime: 1889.006,
                    },
                    {
                        no: 43,
                        time: 42.279,
                        elapsedTime: 1931.285,
                    },
                    {
                        no: 44,
                        time: 41.846,
                        elapsedTime: 1973.131,
                    },
                    {
                        no: 45,
                        time: 41.904,
                        elapsedTime: 2015.035,
                    },
                    {
                        no: 46,
                        time: 41.958,
                        elapsedTime: 2056.993,
                    },
                    {
                        no: 47,
                        time: 41.988,
                        elapsedTime: 2098.981,
                    },
                    {
                        no: 48,
                        time: 41.97,
                        elapsedTime: 2140.951,
                    },
                    {
                        no: 49,
                        time: 41.643,
                        elapsedTime: 2182.594,
                    },
                    {
                        no: 50,
                        time: 41.971,
                        elapsedTime: 2224.565,
                    },
                    {
                        no: 51,
                        time: 41.738,
                        elapsedTime: 2266.303,
                    },
                    {
                        no: 52,
                        time: 41.944,
                        elapsedTime: 2308.247,
                    },
                    {
                        no: 53,
                        time: 42.093,
                        elapsedTime: 2350.34,
                    },
                    {
                        no: 54,
                        time: 42.546,
                        elapsedTime: 2392.886,
                    },
                    {
                        no: 55,
                        time: 41.821,
                        elapsedTime: 2434.707,
                    },
                    {
                        no: 56,
                        time: 41.986,
                        elapsedTime: 2476.693,
                    },
                    {
                        no: 57,
                        time: 41.941,
                        elapsedTime: 2518.634,
                    },
                ],
                startGap: 0,
                startTime: 477.465,
                endTime: 2518.634,
                duration: 2041.169,
                avgLapExcludingPitExitLap: 42.20484444444445,
                bestLap: 41.643,
                pilot: 'Zhingalov',
                kart: '14',
            },
            {
                no: 3,
                laps: [
                    {
                        no: 58,
                        time: 272.002,
                        elapsedTime: 2790.636,
                    },
                    {
                        no: 59,
                        time: 43.233,
                        elapsedTime: 2833.869,
                    },
                    {
                        no: 60,
                        time: 43.003,
                        elapsedTime: 2876.872,
                    },
                    {
                        no: 61,
                        time: 42.915,
                        elapsedTime: 2919.787,
                    },
                    {
                        no: 62,
                        time: 42.596,
                        elapsedTime: 2962.383,
                    },
                    {
                        no: 63,
                        time: 43.018,
                        elapsedTime: 3005.401,
                    },
                    {
                        no: 64,
                        time: 42.904,
                        elapsedTime: 3048.305,
                    },
                    {
                        no: 65,
                        time: 42.971,
                        elapsedTime: 3091.276,
                    },
                    {
                        no: 66,
                        time: 42.676,
                        elapsedTime: 3133.952,
                    },
                    {
                        no: 67,
                        time: 42.852,
                        elapsedTime: 3176.804,
                    },
                    {
                        no: 68,
                        time: 42.576,
                        elapsedTime: 3219.38,
                    },
                    {
                        no: 69,
                        time: 42.796,
                        elapsedTime: 3262.176,
                    },
                    {
                        no: 70,
                        time: 42.629,
                        elapsedTime: 3304.805,
                    },
                    {
                        no: 71,
                        time: 42.547,
                        elapsedTime: 3347.352,
                    },
                    {
                        no: 72,
                        time: 42.542,
                        elapsedTime: 3389.894,
                    },
                    {
                        no: 73,
                        time: 42.541,
                        elapsedTime: 3432.435,
                    },
                    {
                        no: 74,
                        time: 42.556,
                        elapsedTime: 3474.991,
                    },
                    {
                        no: 75,
                        time: 42.913,
                        elapsedTime: 3517.904,
                    },
                    {
                        no: 76,
                        time: 42.512,
                        elapsedTime: 3560.416,
                    },
                    {
                        no: 77,
                        time: 42.405,
                        elapsedTime: 3602.821,
                    },
                    {
                        no: 78,
                        time: 42.426,
                        elapsedTime: 3645.247,
                    },
                ],
                startGap: 0,
                startTime: 2518.634,
                endTime: 3645.2470000000003,
                duration: 1126.613,
                avgLapExcludingPitExitLap: 42.73055000000001,
                bestLap: 42.405,
                pilot: 'Travkin',
                kart: '13',
            },
            {
                no: 4,
                laps: [
                    {
                        no: 79,
                        time: 178.174,
                        elapsedTime: 3823.421,
                    },
                    {
                        no: 80,
                        time: 43.649,
                        elapsedTime: 3867.07,
                    },
                    {
                        no: 81,
                        time: 43.432,
                        elapsedTime: 3910.502,
                    },
                    {
                        no: 82,
                        time: 43.323,
                        elapsedTime: 3953.825,
                    },
                    {
                        no: 83,
                        time: 43.247,
                        elapsedTime: 3997.072,
                    },
                    {
                        no: 84,
                        time: 43.725,
                        elapsedTime: 4040.797,
                    },
                    {
                        no: 85,
                        time: 42.937,
                        elapsedTime: 4083.734,
                    },
                ],
                startGap: 0,
                startTime: 3645.2470000000003,
                endTime: 4083.7340000000004,
                duration: 438.487,
                avgLapExcludingPitExitLap: 43.3855,
                bestLap: 42.937,
                pilot: 'Travkin',
                kart: '14',
            },
            {
                no: 5,
                laps: [
                    {
                        no: 86,
                        time: 147.801,
                        elapsedTime: 4231.535,
                    },
                    {
                        no: 87,
                        time: 58.053,
                        elapsedTime: 4289.588,
                    },
                    {
                        no: 88,
                        time: 113.93,
                        elapsedTime: 4403.518,
                    },
                    {
                        no: 89,
                        time: 43.518,
                        elapsedTime: 4447.036,
                    },
                    {
                        no: 90,
                        time: 43.687,
                        elapsedTime: 4490.723,
                    },
                    {
                        no: 91,
                        time: 42.9,
                        elapsedTime: 4533.623,
                    },
                    {
                        no: 92,
                        time: 43.756,
                        elapsedTime: 4577.379,
                    },
                    {
                        no: 93,
                        time: 43.739,
                        elapsedTime: 4621.118,
                    },
                    {
                        no: 94,
                        time: 44.625,
                        elapsedTime: 4665.743,
                    },
                    {
                        no: 95,
                        time: 43.78,
                        elapsedTime: 4709.523,
                    },
                    {
                        no: 96,
                        time: 43.472,
                        elapsedTime: 4752.995,
                    },
                    {
                        no: 97,
                        time: 43.357,
                        elapsedTime: 4796.352,
                    },
                    {
                        no: 98,
                        time: 42.873,
                        elapsedTime: 4839.225,
                    },
                    {
                        no: 99,
                        time: 42.835,
                        elapsedTime: 4882.06,
                    },
                    {
                        no: 100,
                        time: 43.223,
                        elapsedTime: 4925.283,
                    },
                    {
                        no: 101,
                        time: 43.821,
                        elapsedTime: 4969.104,
                    },
                    {
                        no: 102,
                        time: 43.16,
                        elapsedTime: 5012.264,
                    },
                    {
                        no: 103,
                        time: 43.027,
                        elapsedTime: 5055.291,
                    },
                    {
                        no: 104,
                        time: 43.014,
                        elapsedTime: 5098.305,
                    },
                    {
                        no: 105,
                        time: 43.269,
                        elapsedTime: 5141.574,
                    },
                    {
                        no: 106,
                        time: 42.978,
                        elapsedTime: 5184.552,
                    },
                    {
                        no: 107,
                        time: 43,
                        elapsedTime: 5227.552,
                    },
                    {
                        no: 108,
                        time: 43.084,
                        elapsedTime: 5270.636,
                    },
                    {
                        no: 109,
                        time: 42.601,
                        elapsedTime: 5313.237,
                    },
                    {
                        no: 110,
                        time: 42.857,
                        elapsedTime: 5356.094,
                    },
                    {
                        no: 111,
                        time: 43.17,
                        elapsedTime: 5399.264,
                    },
                    {
                        no: 112,
                        time: 42.886,
                        elapsedTime: 5442.15,
                    },
                    {
                        no: 113,
                        time: 43.38,
                        elapsedTime: 5485.53,
                    },
                    {
                        no: 114,
                        time: 43.822,
                        elapsedTime: 5529.352,
                    },
                    {
                        no: 115,
                        time: 42.759,
                        elapsedTime: 5572.111,
                    },
                    {
                        no: 116,
                        time: 43.891,
                        elapsedTime: 5616.002,
                    },
                    {
                        no: 117,
                        time: 42.999,
                        elapsedTime: 5659.001,
                    },
                    {
                        no: 118,
                        time: 43.425,
                        elapsedTime: 5702.426,
                    },
                    {
                        no: 119,
                        time: 42.741,
                        elapsedTime: 5745.167,
                    },
                    {
                        no: 120,
                        time: 43.596,
                        elapsedTime: 5788.763,
                    },
                    {
                        no: 121,
                        time: 43.672,
                        elapsedTime: 5832.435,
                    },
                    {
                        no: 122,
                        time: 43.998,
                        elapsedTime: 5876.433,
                    },
                    {
                        no: 123,
                        time: 42.541,
                        elapsedTime: 5918.974,
                    },
                    {
                        no: 124,
                        time: 43.666,
                        elapsedTime: 5962.64,
                    },
                    {
                        no: 125,
                        time: 44.048,
                        elapsedTime: 6006.688,
                    },
                    {
                        no: 126,
                        time: 43.333,
                        elapsedTime: 6050.021,
                    },
                    {
                        no: 127,
                        time: 42.867,
                        elapsedTime: 6092.888,
                    },
                    {
                        no: 128,
                        time: 42.796,
                        elapsedTime: 6135.684,
                    },
                    {
                        no: 129,
                        time: 42.48,
                        elapsedTime: 6178.164,
                    },
                ],
                startGap: 0,
                startTime: 4083.7340000000004,
                endTime: 6178.164000000001,
                duration: 2094.4300000000003,
                avgLapExcludingPitExitLap: 45.27044186046513,
                bestLap: 42.48,
                pilot: 'Berezina',
                kart: '14',
            },
            {
                no: 6,
                laps: [
                    {
                        no: 130,
                        time: 141.633,
                        elapsedTime: 6319.797,
                    },
                    {
                        no: 131,
                        time: 42.819,
                        elapsedTime: 6362.616,
                    },
                    {
                        no: 132,
                        time: 42.632,
                        elapsedTime: 6405.248,
                    },
                    {
                        no: 133,
                        time: 42.686,
                        elapsedTime: 6447.934,
                    },
                    {
                        no: 134,
                        time: 42.772,
                        elapsedTime: 6490.706,
                    },
                    {
                        no: 135,
                        time: 42.614,
                        elapsedTime: 6533.32,
                    },
                    {
                        no: 136,
                        time: 42.733,
                        elapsedTime: 6576.053,
                    },
                    {
                        no: 137,
                        time: 42.759,
                        elapsedTime: 6618.812,
                    },
                    {
                        no: 138,
                        time: 42.681,
                        elapsedTime: 6661.493,
                    },
                    {
                        no: 139,
                        time: 42.341,
                        elapsedTime: 6703.834,
                    },
                    {
                        no: 140,
                        time: 42.954,
                        elapsedTime: 6746.788,
                    },
                    {
                        no: 141,
                        time: 42.129,
                        elapsedTime: 6788.917,
                    },
                    {
                        no: 142,
                        time: 42.192,
                        elapsedTime: 6831.109,
                    },
                    {
                        no: 143,
                        time: 42.359,
                        elapsedTime: 6873.468,
                    },
                    {
                        no: 144,
                        time: 42.389,
                        elapsedTime: 6915.857,
                    },
                    {
                        no: 145,
                        time: 42.661,
                        elapsedTime: 6958.518,
                    },
                    {
                        no: 146,
                        time: 42.708,
                        elapsedTime: 7001.226,
                    },
                    {
                        no: 147,
                        time: 42.715,
                        elapsedTime: 7043.941,
                    },
                    {
                        no: 148,
                        time: 42.403,
                        elapsedTime: 7086.344,
                    },
                    {
                        no: 149,
                        time: 42.461,
                        elapsedTime: 7128.805,
                    },
                    {
                        no: 150,
                        time: 42.508,
                        elapsedTime: 7171.313,
                    },
                    {
                        no: 151,
                        time: 42.487,
                        elapsedTime: 7213.8,
                    },
                ],
                startGap: 0,
                startTime: 6178.164000000001,
                endTime: 7213.800000000001,
                duration: 1035.6360000000002,
                avgLapExcludingPitExitLap: 42.57157142857144,
                bestLap: 42.129,
                pilot: 'Travkin',
                kart: '16',
            },
        ],
        '7': [
            {
                no: 1,
                laps: [
                    {
                        no: 1,
                        time: 44.938,
                        elapsedTime: 46.391,
                    },
                    {
                        no: 2,
                        time: 41.93,
                        elapsedTime: 88.321,
                    },
                    {
                        no: 3,
                        time: 42.496,
                        elapsedTime: 130.817,
                    },
                    {
                        no: 4,
                        time: 42.34,
                        elapsedTime: 173.15699999999998,
                    },
                    {
                        no: 5,
                        time: 42.313,
                        elapsedTime: 215.47,
                    },
                    {
                        no: 6,
                        time: 42.521,
                        elapsedTime: 257.991,
                    },
                    {
                        no: 7,
                        time: 42.432,
                        elapsedTime: 300.423,
                    },
                    {
                        no: 8,
                        time: 42.599,
                        elapsedTime: 343.022,
                    },
                    {
                        no: 9,
                        time: 41.828,
                        elapsedTime: 384.85,
                    },
                    {
                        no: 10,
                        time: 41.923,
                        elapsedTime: 426.773,
                    },
                    {
                        no: 11,
                        time: 41.834,
                        elapsedTime: 468.60699999999997,
                    },
                    {
                        no: 12,
                        time: 41.937,
                        elapsedTime: 510.544,
                    },
                    {
                        no: 13,
                        time: 42.052,
                        elapsedTime: 552.596,
                    },
                    {
                        no: 14,
                        time: 41.924,
                        elapsedTime: 594.52,
                    },
                    {
                        no: 15,
                        time: 41.839,
                        elapsedTime: 636.359,
                    },
                    {
                        no: 16,
                        time: 41.724,
                        elapsedTime: 678.083,
                    },
                    {
                        no: 17,
                        time: 41.817,
                        elapsedTime: 719.9,
                    },
                    {
                        no: 18,
                        time: 41.913,
                        elapsedTime: 761.813,
                    },
                    {
                        no: 19,
                        time: 41.893,
                        elapsedTime: 803.706,
                    },
                    {
                        no: 20,
                        time: 41.955,
                        elapsedTime: 845.661,
                    },
                    {
                        no: 21,
                        time: 41.811,
                        elapsedTime: 887.472,
                    },
                    {
                        no: 22,
                        time: 41.827,
                        elapsedTime: 929.299,
                    },
                    {
                        no: 23,
                        time: 41.947,
                        elapsedTime: 971.246,
                    },
                    {
                        no: 24,
                        time: 41.604,
                        elapsedTime: 1012.85,
                    },
                    {
                        no: 25,
                        time: 42.057,
                        elapsedTime: 1054.907,
                    },
                    {
                        no: 26,
                        time: 42.239,
                        elapsedTime: 1097.146,
                    },
                    {
                        no: 27,
                        time: 41.913,
                        elapsedTime: 1139.059,
                    },
                ],
                startGap: 1.453,
                startTime: 0,
                endTime: 1139.0590000000002,
                duration: 1139.0590000000002,
                avgLapExcludingPitExitLap: 42.13355555555557,
                bestLap: 41.604,
                pilot: 'Kovziridze',
                kart: '7',
            },
            {
                no: 2,
                laps: [
                    {
                        no: 28,
                        time: 141.088,
                        elapsedTime: 1280.147,
                    },
                    {
                        no: 29,
                        time: 42.046,
                        elapsedTime: 1322.193,
                    },
                    {
                        no: 30,
                        time: 41.939,
                        elapsedTime: 1364.132,
                    },
                    {
                        no: 31,
                        time: 41.707,
                        elapsedTime: 1405.839,
                    },
                    {
                        no: 32,
                        time: 42.352,
                        elapsedTime: 1448.191,
                    },
                    {
                        no: 33,
                        time: 41.931,
                        elapsedTime: 1490.122,
                    },
                    {
                        no: 34,
                        time: 42.07,
                        elapsedTime: 1532.192,
                    },
                    {
                        no: 35,
                        time: 41.873,
                        elapsedTime: 1574.065,
                    },
                    {
                        no: 36,
                        time: 41.842,
                        elapsedTime: 1615.907,
                    },
                    {
                        no: 37,
                        time: 41.958,
                        elapsedTime: 1657.865,
                    },
                    {
                        no: 38,
                        time: 41.95,
                        elapsedTime: 1699.815,
                    },
                    {
                        no: 39,
                        time: 41.882,
                        elapsedTime: 1741.697,
                    },
                    {
                        no: 40,
                        time: 41.77,
                        elapsedTime: 1783.467,
                    },
                    {
                        no: 41,
                        time: 41.794,
                        elapsedTime: 1825.261,
                    },
                    {
                        no: 42,
                        time: 41.657,
                        elapsedTime: 1866.918,
                    },
                    {
                        no: 43,
                        time: 41.79,
                        elapsedTime: 1908.708,
                    },
                    {
                        no: 44,
                        time: 42.073,
                        elapsedTime: 1950.781,
                    },
                    {
                        no: 45,
                        time: 41.845,
                        elapsedTime: 1992.626,
                    },
                    {
                        no: 46,
                        time: 41.665,
                        elapsedTime: 2034.291,
                    },
                    {
                        no: 47,
                        time: 41.639,
                        elapsedTime: 2075.93,
                    },
                    {
                        no: 48,
                        time: 41.644,
                        elapsedTime: 2117.574,
                    },
                    {
                        no: 49,
                        time: 41.667,
                        elapsedTime: 2159.241,
                    },
                    {
                        no: 50,
                        time: 41.703,
                        elapsedTime: 2200.944,
                    },
                    {
                        no: 51,
                        time: 41.704,
                        elapsedTime: 2242.648,
                    },
                    {
                        no: 52,
                        time: 41.604,
                        elapsedTime: 2284.252,
                    },
                    {
                        no: 53,
                        time: 41.761,
                        elapsedTime: 2326.013,
                    },
                    {
                        no: 54,
                        time: 41.798,
                        elapsedTime: 2367.811,
                    },
                    {
                        no: 55,
                        time: 41.64,
                        elapsedTime: 2409.451,
                    },
                    {
                        no: 56,
                        time: 41.56,
                        elapsedTime: 2451.011,
                    },
                    {
                        no: 57,
                        time: 42.234,
                        elapsedTime: 2493.245,
                    },
                    {
                        no: 58,
                        time: 41.724,
                        elapsedTime: 2534.969,
                    },
                    {
                        no: 59,
                        time: 41.763,
                        elapsedTime: 2576.732,
                    },
                    {
                        no: 60,
                        time: 41.638,
                        elapsedTime: 2618.37,
                    },
                    {
                        no: 61,
                        time: 41.759,
                        elapsedTime: 2660.129,
                    },
                    {
                        no: 62,
                        time: 41.685,
                        elapsedTime: 2701.814,
                    },
                    {
                        no: 63,
                        time: 42.265,
                        elapsedTime: 2744.079,
                    },
                    {
                        no: 64,
                        time: 41.688,
                        elapsedTime: 2785.767,
                    },
                    {
                        no: 65,
                        time: 41.696,
                        elapsedTime: 2827.463,
                    },
                    {
                        no: 66,
                        time: 41.654,
                        elapsedTime: 2869.117,
                    },
                    {
                        no: 67,
                        time: 41.714,
                        elapsedTime: 2910.831,
                    },
                    {
                        no: 68,
                        time: 41.597,
                        elapsedTime: 2952.428,
                    },
                    {
                        no: 69,
                        time: 41.662,
                        elapsedTime: 2994.09,
                    },
                    {
                        no: 70,
                        time: 41.563,
                        elapsedTime: 3035.653,
                    },
                    {
                        no: 71,
                        time: 41.851,
                        elapsedTime: 3077.504,
                    },
                    {
                        no: 72,
                        time: 42.418,
                        elapsedTime: 3119.922,
                    },
                    {
                        no: 73,
                        time: 43.732,
                        elapsedTime: 3163.654,
                    },
                    {
                        no: 74,
                        time: 42.678,
                        elapsedTime: 3206.332,
                    },
                    {
                        no: 75,
                        time: 42.996,
                        elapsedTime: 3249.328,
                    },
                    {
                        no: 76,
                        time: 43.408,
                        elapsedTime: 3292.736,
                    },
                    {
                        no: 77,
                        time: 42.331,
                        elapsedTime: 3335.067,
                    },
                    {
                        no: 78,
                        time: 42.546,
                        elapsedTime: 3377.613,
                    },
                    {
                        no: 79,
                        time: 41.601,
                        elapsedTime: 3419.214,
                    },
                    {
                        no: 80,
                        time: 41.477,
                        elapsedTime: 3460.691,
                    },
                    {
                        no: 81,
                        time: 41.626,
                        elapsedTime: 3502.317,
                    },
                    {
                        no: 82,
                        time: 41.596,
                        elapsedTime: 3543.913,
                    },
                    {
                        no: 83,
                        time: 41.862,
                        elapsedTime: 3585.775,
                    },
                ],
                startGap: 0,
                startTime: 1139.0590000000002,
                endTime: 3585.775,
                duration: 2446.716,
                avgLapExcludingPitExitLap: 41.920509090909086,
                bestLap: 41.477,
                pilot: 'Khmaladze',
                kart: '4',
            },
            {
                no: 3,
                laps: [
                    {
                        no: 84,
                        time: 143.03,
                        elapsedTime: 3728.805,
                    },
                    {
                        no: 85,
                        time: 42.166,
                        elapsedTime: 3770.971,
                    },
                    {
                        no: 86,
                        time: 41.888,
                        elapsedTime: 3812.859,
                    },
                    {
                        no: 87,
                        time: 41.978,
                        elapsedTime: 3854.837,
                    },
                    {
                        no: 88,
                        time: 41.887,
                        elapsedTime: 3896.724,
                    },
                    {
                        no: 89,
                        time: 42.029,
                        elapsedTime: 3938.753,
                    },
                    {
                        no: 90,
                        time: 41.726,
                        elapsedTime: 3980.479,
                    },
                    {
                        no: 91,
                        time: 41.984,
                        elapsedTime: 4022.463,
                    },
                    {
                        no: 92,
                        time: 41.815,
                        elapsedTime: 4064.278,
                    },
                    {
                        no: 93,
                        time: 41.836,
                        elapsedTime: 4106.114,
                    },
                    {
                        no: 94,
                        time: 41.892,
                        elapsedTime: 4148.006,
                    },
                    {
                        no: 95,
                        time: 41.778,
                        elapsedTime: 4189.784,
                    },
                    {
                        no: 96,
                        time: 41.866,
                        elapsedTime: 4231.65,
                    },
                    {
                        no: 97,
                        time: 41.8,
                        elapsedTime: 4273.45,
                    },
                    {
                        no: 98,
                        time: 41.789,
                        elapsedTime: 4315.239,
                    },
                    {
                        no: 99,
                        time: 41.806,
                        elapsedTime: 4357.045,
                    },
                    {
                        no: 100,
                        time: 41.695,
                        elapsedTime: 4398.74,
                    },
                    {
                        no: 101,
                        time: 41.738,
                        elapsedTime: 4440.478,
                    },
                    {
                        no: 102,
                        time: 41.859,
                        elapsedTime: 4482.337,
                    },
                    {
                        no: 103,
                        time: 41.818,
                        elapsedTime: 4524.155,
                    },
                    {
                        no: 104,
                        time: 41.737,
                        elapsedTime: 4565.892,
                    },
                    {
                        no: 105,
                        time: 43.059,
                        elapsedTime: 4608.951,
                    },
                    {
                        no: 106,
                        time: 41.673,
                        elapsedTime: 4650.624,
                    },
                    {
                        no: 107,
                        time: 41.844,
                        elapsedTime: 4692.468,
                    },
                    {
                        no: 108,
                        time: 41.867,
                        elapsedTime: 4734.335,
                    },
                    {
                        no: 109,
                        time: 41.841,
                        elapsedTime: 4776.176,
                    },
                    {
                        no: 110,
                        time: 41.847,
                        elapsedTime: 4818.023,
                    },
                    {
                        no: 111,
                        time: 41.751,
                        elapsedTime: 4859.774,
                    },
                    {
                        no: 112,
                        time: 41.803,
                        elapsedTime: 4901.577,
                    },
                    {
                        no: 113,
                        time: 41.62,
                        elapsedTime: 4943.197,
                    },
                    {
                        no: 114,
                        time: 41.807,
                        elapsedTime: 4985.004,
                    },
                    {
                        no: 115,
                        time: 41.794,
                        elapsedTime: 5026.798,
                    },
                    {
                        no: 116,
                        time: 41.697,
                        elapsedTime: 5068.495,
                    },
                    {
                        no: 117,
                        time: 41.852,
                        elapsedTime: 5110.347,
                    },
                    {
                        no: 118,
                        time: 41.848,
                        elapsedTime: 5152.195,
                    },
                    {
                        no: 119,
                        time: 41.678,
                        elapsedTime: 5193.873,
                    },
                    {
                        no: 120,
                        time: 41.533,
                        elapsedTime: 5235.406,
                    },
                    {
                        no: 121,
                        time: 41.682,
                        elapsedTime: 5277.088,
                    },
                    {
                        no: 122,
                        time: 42.018,
                        elapsedTime: 5319.106,
                    },
                    {
                        no: 123,
                        time: 41.626,
                        elapsedTime: 5360.732,
                    },
                    {
                        no: 124,
                        time: 41.605,
                        elapsedTime: 5402.337,
                    },
                    {
                        no: 125,
                        time: 41.619,
                        elapsedTime: 5443.956,
                    },
                    {
                        no: 126,
                        time: 41.799,
                        elapsedTime: 5485.755,
                    },
                    {
                        no: 127,
                        time: 42.666,
                        elapsedTime: 5528.421,
                    },
                    {
                        no: 128,
                        time: 41.678,
                        elapsedTime: 5570.099,
                    },
                    {
                        no: 129,
                        time: 41.628,
                        elapsedTime: 5611.727,
                    },
                    {
                        no: 130,
                        time: 41.687,
                        elapsedTime: 5653.414,
                    },
                    {
                        no: 131,
                        time: 41.842,
                        elapsedTime: 5695.256,
                    },
                    {
                        no: 132,
                        time: 41.655,
                        elapsedTime: 5736.911,
                    },
                    {
                        no: 133,
                        time: 41.695,
                        elapsedTime: 5778.606,
                    },
                    {
                        no: 134,
                        time: 41.74,
                        elapsedTime: 5820.346,
                    },
                    {
                        no: 135,
                        time: 41.784,
                        elapsedTime: 5862.13,
                    },
                    {
                        no: 136,
                        time: 41.725,
                        elapsedTime: 5903.855,
                    },
                ],
                startGap: 0,
                startTime: 3585.775,
                endTime: 5903.855,
                duration: 2318.08,
                avgLapExcludingPitExitLap: 41.82788461538461,
                bestLap: 41.533,
                pilot: 'Kovziridze',
                kart: '16',
            },
            {
                no: 4,
                laps: [
                    {
                        no: 137,
                        time: 142.452,
                        elapsedTime: 6046.307,
                    },
                    {
                        no: 138,
                        time: 42.977,
                        elapsedTime: 6089.284,
                    },
                    {
                        no: 139,
                        time: 42.184,
                        elapsedTime: 6131.468,
                    },
                    {
                        no: 140,
                        time: 42.324,
                        elapsedTime: 6173.792,
                    },
                    {
                        no: 141,
                        time: 42.039,
                        elapsedTime: 6215.831,
                    },
                    {
                        no: 142,
                        time: 42.167,
                        elapsedTime: 6257.998,
                    },
                    {
                        no: 143,
                        time: 42.094,
                        elapsedTime: 6300.092,
                    },
                    {
                        no: 144,
                        time: 41.971,
                        elapsedTime: 6342.063,
                    },
                    {
                        no: 145,
                        time: 41.987,
                        elapsedTime: 6384.05,
                    },
                    {
                        no: 146,
                        time: 41.965,
                        elapsedTime: 6426.015,
                    },
                    {
                        no: 147,
                        time: 42.136,
                        elapsedTime: 6468.151,
                    },
                    {
                        no: 148,
                        time: 42.07,
                        elapsedTime: 6510.221,
                    },
                    {
                        no: 149,
                        time: 42.126,
                        elapsedTime: 6552.347,
                    },
                    {
                        no: 150,
                        time: 42.108,
                        elapsedTime: 6594.455,
                    },
                    {
                        no: 151,
                        time: 42.174,
                        elapsedTime: 6636.629,
                    },
                    {
                        no: 152,
                        time: 42.199,
                        elapsedTime: 6678.828,
                    },
                    {
                        no: 153,
                        time: 42.328,
                        elapsedTime: 6721.156,
                    },
                    {
                        no: 154,
                        time: 42.127,
                        elapsedTime: 6763.283,
                    },
                    {
                        no: 155,
                        time: 41.897,
                        elapsedTime: 6805.18,
                    },
                    {
                        no: 156,
                        time: 42.165,
                        elapsedTime: 6847.345,
                    },
                    {
                        no: 157,
                        time: 42.013,
                        elapsedTime: 6889.358,
                    },
                    {
                        no: 158,
                        time: 42.073,
                        elapsedTime: 6931.431,
                    },
                    {
                        no: 159,
                        time: 42.217,
                        elapsedTime: 6973.648,
                    },
                    {
                        no: 160,
                        time: 42.066,
                        elapsedTime: 7015.714,
                    },
                    {
                        no: 161,
                        time: 41.995,
                        elapsedTime: 7057.709,
                    },
                    {
                        no: 162,
                        time: 42.095,
                        elapsedTime: 7099.804,
                    },
                    {
                        no: 163,
                        time: 41.939,
                        elapsedTime: 7141.743,
                    },
                    {
                        no: 164,
                        time: 42.024,
                        elapsedTime: 7183.767,
                    },
                    {
                        no: 165,
                        time: 42.209,
                        elapsedTime: 7225.976,
                    },
                ],
                startGap: 0,
                startTime: 5903.855,
                endTime: 7225.976,
                duration: 1322.1210000000003,
                avgLapExcludingPitExitLap: 42.13103571428572,
                bestLap: 41.897,
                pilot: 'Khmaladze',
                kart: '7',
            },
        ],
        '8': [
            {
                no: 1,
                laps: [
                    {
                        no: 1,
                        time: 44.568,
                        elapsedTime: 45.365,
                    },
                    {
                        no: 2,
                        time: 42.706,
                        elapsedTime: 88.071,
                    },
                    {
                        no: 3,
                        time: 42.897,
                        elapsedTime: 130.968,
                    },
                    {
                        no: 4,
                        time: 42.93,
                        elapsedTime: 173.898,
                    },
                    {
                        no: 5,
                        time: 42.343,
                        elapsedTime: 216.24099999999999,
                    },
                    {
                        no: 6,
                        time: 43.485,
                        elapsedTime: 259.726,
                    },
                    {
                        no: 7,
                        time: 42.496,
                        elapsedTime: 302.222,
                    },
                    {
                        no: 8,
                        time: 42.364,
                        elapsedTime: 344.586,
                    },
                ],
                startGap: 0.797,
                startTime: 0,
                endTime: 344.586,
                duration: 344.586,
                avgLapExcludingPitExitLap: 42.973625,
                bestLap: 42.343,
                pilot: 'Tsimakuridze',
                kart: '8',
            },
            {
                no: 2,
                laps: [
                    {
                        no: 9,
                        time: 139.029,
                        elapsedTime: 483.615,
                    },
                    {
                        no: 10,
                        time: 41.872,
                        elapsedTime: 525.487,
                    },
                    {
                        no: 11,
                        time: 41.572,
                        elapsedTime: 567.059,
                    },
                    {
                        no: 12,
                        time: 41.564,
                        elapsedTime: 608.623,
                    },
                    {
                        no: 13,
                        time: 41.596,
                        elapsedTime: 650.219,
                    },
                    {
                        no: 14,
                        time: 41.582,
                        elapsedTime: 691.801,
                    },
                    {
                        no: 15,
                        time: 41.439,
                        elapsedTime: 733.24,
                    },
                    {
                        no: 16,
                        time: 41.372,
                        elapsedTime: 774.612,
                    },
                    {
                        no: 17,
                        time: 41.577,
                        elapsedTime: 816.189,
                    },
                    {
                        no: 18,
                        time: 41.559,
                        elapsedTime: 857.748,
                    },
                    {
                        no: 19,
                        time: 41.414,
                        elapsedTime: 899.162,
                    },
                    {
                        no: 20,
                        time: 41.474,
                        elapsedTime: 940.636,
                    },
                    {
                        no: 21,
                        time: 41.491,
                        elapsedTime: 982.127,
                    },
                    {
                        no: 22,
                        time: 41.469,
                        elapsedTime: 1023.596,
                    },
                    {
                        no: 23,
                        time: 41.965,
                        elapsedTime: 1065.561,
                    },
                    {
                        no: 24,
                        time: 41.454,
                        elapsedTime: 1107.015,
                    },
                    {
                        no: 25,
                        time: 41.384,
                        elapsedTime: 1148.399,
                    },
                    {
                        no: 26,
                        time: 41.321,
                        elapsedTime: 1189.72,
                    },
                    {
                        no: 27,
                        time: 41.543,
                        elapsedTime: 1231.263,
                    },
                    {
                        no: 28,
                        time: 41.797,
                        elapsedTime: 1273.06,
                    },
                    {
                        no: 29,
                        time: 41.385,
                        elapsedTime: 1314.445,
                    },
                    {
                        no: 30,
                        time: 41.409,
                        elapsedTime: 1355.854,
                    },
                    {
                        no: 31,
                        time: 41.371,
                        elapsedTime: 1397.225,
                    },
                    {
                        no: 32,
                        time: 41.5,
                        elapsedTime: 1438.725,
                    },
                    {
                        no: 33,
                        time: 41.456,
                        elapsedTime: 1480.181,
                    },
                    {
                        no: 34,
                        time: 41.468,
                        elapsedTime: 1521.649,
                    },
                    {
                        no: 35,
                        time: 41.459,
                        elapsedTime: 1563.108,
                    },
                    {
                        no: 36,
                        time: 41.407,
                        elapsedTime: 1604.515,
                    },
                    {
                        no: 37,
                        time: 41.457,
                        elapsedTime: 1645.972,
                    },
                    {
                        no: 38,
                        time: 41.406,
                        elapsedTime: 1687.378,
                    },
                    {
                        no: 39,
                        time: 41.444,
                        elapsedTime: 1728.8220000000001,
                    },
                    {
                        no: 40,
                        time: 41.393,
                        elapsedTime: 1770.215,
                    },
                    {
                        no: 41,
                        time: 41.896,
                        elapsedTime: 1812.111,
                    },
                    {
                        no: 42,
                        time: 41.628,
                        elapsedTime: 1853.739,
                    },
                    {
                        no: 43,
                        time: 41.339,
                        elapsedTime: 1895.078,
                    },
                    {
                        no: 44,
                        time: 41.247,
                        elapsedTime: 1936.325,
                    },
                    {
                        no: 45,
                        time: 41.301,
                        elapsedTime: 1977.626,
                    },
                    {
                        no: 46,
                        time: 41.46,
                        elapsedTime: 2019.086,
                    },
                    {
                        no: 47,
                        time: 41.366,
                        elapsedTime: 2060.452,
                    },
                    {
                        no: 48,
                        time: 41.343,
                        elapsedTime: 2101.795,
                    },
                    {
                        no: 49,
                        time: 41.602,
                        elapsedTime: 2143.397,
                    },
                    {
                        no: 50,
                        time: 41.498,
                        elapsedTime: 2184.895,
                    },
                    {
                        no: 51,
                        time: 41.419,
                        elapsedTime: 2226.314,
                    },
                    {
                        no: 52,
                        time: 41.489,
                        elapsedTime: 2267.803,
                    },
                    {
                        no: 53,
                        time: 41.361,
                        elapsedTime: 2309.164,
                    },
                    {
                        no: 54,
                        time: 41.341,
                        elapsedTime: 2350.505,
                    },
                    {
                        no: 55,
                        time: 42.038,
                        elapsedTime: 2392.543,
                    },
                    {
                        no: 56,
                        time: 41.608,
                        elapsedTime: 2434.151,
                    },
                    {
                        no: 57,
                        time: 41.448,
                        elapsedTime: 2475.599,
                    },
                    {
                        no: 58,
                        time: 41.398,
                        elapsedTime: 2516.997,
                    },
                    {
                        no: 59,
                        time: 41.325,
                        elapsedTime: 2558.322,
                    },
                    {
                        no: 60,
                        time: 41.782,
                        elapsedTime: 2600.104,
                    },
                    {
                        no: 61,
                        time: 41.561,
                        elapsedTime: 2641.665,
                    },
                    {
                        no: 62,
                        time: 41.366,
                        elapsedTime: 2683.031,
                    },
                    {
                        no: 63,
                        time: 41.456,
                        elapsedTime: 2724.487,
                    },
                    {
                        no: 64,
                        time: 41.474,
                        elapsedTime: 2765.961,
                    },
                ],
                startGap: 0,
                startTime: 344.586,
                endTime: 2765.961000000001,
                duration: 2421.375000000001,
                avgLapExcludingPitExitLap: 41.497200000000014,
                bestLap: 41.247,
                pilot: 'Tsimakuridze',
                kart: '12',
            },
            {
                no: 3,
                laps: [
                    {
                        no: 65,
                        time: 140.09199999999998,
                        elapsedTime: 2906.053,
                    },
                    {
                        no: 66,
                        time: 42.945,
                        elapsedTime: 2948.998,
                    },
                    {
                        no: 67,
                        time: 42.642,
                        elapsedTime: 2991.64,
                    },
                    {
                        no: 68,
                        time: 42.751,
                        elapsedTime: 3034.391,
                    },
                    {
                        no: 69,
                        time: 42.67,
                        elapsedTime: 3077.061,
                    },
                    {
                        no: 70,
                        time: 42.641,
                        elapsedTime: 3119.702,
                    },
                    {
                        no: 71,
                        time: 43.645,
                        elapsedTime: 3163.347,
                    },
                    {
                        no: 72,
                        time: 42.765,
                        elapsedTime: 3206.112,
                    },
                    {
                        no: 73,
                        time: 43.057,
                        elapsedTime: 3249.169,
                    },
                    {
                        no: 74,
                        time: 43.299,
                        elapsedTime: 3292.468,
                    },
                    {
                        no: 75,
                        time: 42.452,
                        elapsedTime: 3334.92,
                    },
                    {
                        no: 76,
                        time: 43.02,
                        elapsedTime: 3377.94,
                    },
                    {
                        no: 77,
                        time: 42.368,
                        elapsedTime: 3420.308,
                    },
                    {
                        no: 78,
                        time: 42.22,
                        elapsedTime: 3462.528,
                    },
                    {
                        no: 79,
                        time: 42.376,
                        elapsedTime: 3504.904,
                    },
                    {
                        no: 80,
                        time: 42.415,
                        elapsedTime: 3547.319,
                    },
                    {
                        no: 81,
                        time: 42.218,
                        elapsedTime: 3589.537,
                    },
                    {
                        no: 82,
                        time: 42.403,
                        elapsedTime: 3631.94,
                    },
                    {
                        no: 83,
                        time: 42.439,
                        elapsedTime: 3674.379,
                    },
                    {
                        no: 84,
                        time: 42.483,
                        elapsedTime: 3716.862,
                    },
                    {
                        no: 85,
                        time: 42.442,
                        elapsedTime: 3759.304,
                    },
                    {
                        no: 86,
                        time: 42.418,
                        elapsedTime: 3801.722,
                    },
                    {
                        no: 87,
                        time: 42.307,
                        elapsedTime: 3844.029,
                    },
                    {
                        no: 88,
                        time: 42.503,
                        elapsedTime: 3886.532,
                    },
                    {
                        no: 89,
                        time: 42.485,
                        elapsedTime: 3929.017,
                    },
                    {
                        no: 90,
                        time: 42.232,
                        elapsedTime: 3971.249,
                    },
                    {
                        no: 91,
                        time: 42.448,
                        elapsedTime: 4013.697,
                    },
                    {
                        no: 92,
                        time: 42.273,
                        elapsedTime: 4055.97,
                    },
                    {
                        no: 93,
                        time: 42.455,
                        elapsedTime: 4098.425,
                    },
                    {
                        no: 94,
                        time: 42.584,
                        elapsedTime: 4141.009,
                    },
                    {
                        no: 95,
                        time: 42.329,
                        elapsedTime: 4183.338,
                    },
                    {
                        no: 96,
                        time: 42.691,
                        elapsedTime: 4226.029,
                    },
                    {
                        no: 97,
                        time: 42.341,
                        elapsedTime: 4268.37,
                    },
                    {
                        no: 98,
                        time: 42.393,
                        elapsedTime: 4310.763,
                    },
                    {
                        no: 99,
                        time: 42.503,
                        elapsedTime: 4353.266,
                    },
                    {
                        no: 100,
                        time: 42.244,
                        elapsedTime: 4395.51,
                    },
                    {
                        no: 101,
                        time: 42.322,
                        elapsedTime: 4437.832,
                    },
                    {
                        no: 102,
                        time: 42.537,
                        elapsedTime: 4480.369,
                    },
                    {
                        no: 103,
                        time: 42.54,
                        elapsedTime: 4522.909,
                    },
                    {
                        no: 104,
                        time: 42.467,
                        elapsedTime: 4565.376,
                    },
                    {
                        no: 105,
                        time: 51.522,
                        elapsedTime: 4616.898,
                    },
                    {
                        no: 106,
                        time: 42.449,
                        elapsedTime: 4659.347,
                    },
                    {
                        no: 107,
                        time: 42.089,
                        elapsedTime: 4701.436,
                    },
                    {
                        no: 108,
                        time: 42.559,
                        elapsedTime: 4743.995,
                    },
                    {
                        no: 109,
                        time: 42.135,
                        elapsedTime: 4786.13,
                    },
                    {
                        no: 110,
                        time: 42.311,
                        elapsedTime: 4828.441,
                    },
                    {
                        no: 111,
                        time: 42.688,
                        elapsedTime: 4871.129,
                    },
                    {
                        no: 112,
                        time: 42.124,
                        elapsedTime: 4913.253,
                    },
                    {
                        no: 113,
                        time: 42.27,
                        elapsedTime: 4955.523,
                    },
                    {
                        no: 114,
                        time: 42.343,
                        elapsedTime: 4997.866,
                    },
                ],
                startGap: 0,
                startTime: 2765.961000000001,
                endTime: 4997.866,
                duration: 2231.904999999999,
                avgLapExcludingPitExitLap: 42.69006122448977,
                bestLap: 42.089,
                pilot: 'Gurgenidze',
                kart: '8',
            },
            {
                no: 4,
                laps: [
                    {
                        no: 115,
                        time: 139.155,
                        elapsedTime: 5137.021,
                    },
                    {
                        no: 116,
                        time: 41.69,
                        elapsedTime: 5178.711,
                    },
                    {
                        no: 117,
                        time: 41.549,
                        elapsedTime: 5220.26,
                    },
                    {
                        no: 118,
                        time: 41.514,
                        elapsedTime: 5261.774,
                    },
                    {
                        no: 119,
                        time: 41.625,
                        elapsedTime: 5303.399,
                    },
                    {
                        no: 120,
                        time: 41.337,
                        elapsedTime: 5344.736,
                    },
                    {
                        no: 121,
                        time: 41.335,
                        elapsedTime: 5386.071,
                    },
                    {
                        no: 122,
                        time: 41.668,
                        elapsedTime: 5427.739,
                    },
                    {
                        no: 123,
                        time: 41.428,
                        elapsedTime: 5469.167,
                    },
                    {
                        no: 124,
                        time: 41.427,
                        elapsedTime: 5510.594,
                    },
                    {
                        no: 125,
                        time: 41.471,
                        elapsedTime: 5552.065,
                    },
                    {
                        no: 126,
                        time: 41.237,
                        elapsedTime: 5593.302,
                    },
                    {
                        no: 127,
                        time: 41.351,
                        elapsedTime: 5634.653,
                    },
                    {
                        no: 128,
                        time: 41.405,
                        elapsedTime: 5676.058,
                    },
                    {
                        no: 129,
                        time: 41.357,
                        elapsedTime: 5717.415,
                    },
                    {
                        no: 130,
                        time: 41.471,
                        elapsedTime: 5758.886,
                    },
                    {
                        no: 131,
                        time: 41.89,
                        elapsedTime: 5800.776,
                    },
                    {
                        no: 132,
                        time: 41.371,
                        elapsedTime: 5842.147,
                    },
                    {
                        no: 133,
                        time: 41.261,
                        elapsedTime: 5883.408,
                    },
                    {
                        no: 134,
                        time: 41.659,
                        elapsedTime: 5925.067,
                    },
                    {
                        no: 135,
                        time: 41.637,
                        elapsedTime: 5966.704,
                    },
                    {
                        no: 136,
                        time: 41.381,
                        elapsedTime: 6008.085,
                    },
                    {
                        no: 137,
                        time: 41.501,
                        elapsedTime: 6049.586,
                    },
                    {
                        no: 138,
                        time: 41.282,
                        elapsedTime: 6090.868,
                    },
                    {
                        no: 139,
                        time: 41.252,
                        elapsedTime: 6132.12,
                    },
                    {
                        no: 140,
                        time: 41.258,
                        elapsedTime: 6173.378,
                    },
                    {
                        no: 141,
                        time: 41.321,
                        elapsedTime: 6214.699,
                    },
                    {
                        no: 142,
                        time: 41.171,
                        elapsedTime: 6255.87,
                    },
                    {
                        no: 143,
                        time: 41.445,
                        elapsedTime: 6297.315,
                    },
                    {
                        no: 144,
                        time: 41.261,
                        elapsedTime: 6338.576,
                    },
                    {
                        no: 145,
                        time: 41.291,
                        elapsedTime: 6379.867,
                    },
                    {
                        no: 146,
                        time: 41.292,
                        elapsedTime: 6421.159,
                    },
                    {
                        no: 147,
                        time: 41.391,
                        elapsedTime: 6462.55,
                    },
                    {
                        no: 148,
                        time: 41.503,
                        elapsedTime: 6504.053,
                    },
                    {
                        no: 149,
                        time: 41.641,
                        elapsedTime: 6545.694,
                    },
                    {
                        no: 150,
                        time: 41.256,
                        elapsedTime: 6586.95,
                    },
                    {
                        no: 151,
                        time: 41.294,
                        elapsedTime: 6628.244,
                    },
                    {
                        no: 152,
                        time: 41.424,
                        elapsedTime: 6669.668,
                    },
                    {
                        no: 153,
                        time: 41.426,
                        elapsedTime: 6711.094,
                    },
                    {
                        no: 154,
                        time: 41.477,
                        elapsedTime: 6752.571,
                    },
                    {
                        no: 155,
                        time: 41.232,
                        elapsedTime: 6793.803,
                    },
                    {
                        no: 156,
                        time: 41.301,
                        elapsedTime: 6835.104,
                    },
                    {
                        no: 157,
                        time: 41.285,
                        elapsedTime: 6876.389,
                    },
                    {
                        no: 158,
                        time: 41.216,
                        elapsedTime: 6917.605,
                    },
                    {
                        no: 159,
                        time: 41.291,
                        elapsedTime: 6958.896,
                    },
                    {
                        no: 160,
                        time: 41.623,
                        elapsedTime: 7000.519,
                    },
                    {
                        no: 161,
                        time: 41.24,
                        elapsedTime: 7041.759,
                    },
                    {
                        no: 162,
                        time: 41.279,
                        elapsedTime: 7083.038,
                    },
                    {
                        no: 163,
                        time: 41.265,
                        elapsedTime: 7124.303,
                    },
                    {
                        no: 164,
                        time: 41.201,
                        elapsedTime: 7165.504,
                    },
                    {
                        no: 165,
                        time: 41.373,
                        elapsedTime: 7206.877,
                    },
                ],
                startGap: 0,
                startTime: 4997.866,
                endTime: 7206.8769999999995,
                duration: 2209.0109999999995,
                avgLapExcludingPitExitLap: 41.39711999999999,
                bestLap: 41.171,
                pilot: 'Tavartkiladze',
                kart: '12',
            },
        ],
        '10': [
            {
                no: 1,
                laps: [
                    {
                        no: 1,
                        time: 44.353,
                        elapsedTime: 44.353,
                    },
                    {
                        no: 2,
                        time: 42.128,
                        elapsedTime: 86.481,
                    },
                    {
                        no: 3,
                        time: 41.858,
                        elapsedTime: 128.339,
                    },
                    {
                        no: 4,
                        time: 41.755,
                        elapsedTime: 170.094,
                    },
                    {
                        no: 5,
                        time: 41.912,
                        elapsedTime: 212.006,
                    },
                    {
                        no: 6,
                        time: 41.993,
                        elapsedTime: 253.999,
                    },
                    {
                        no: 7,
                        time: 41.783,
                        elapsedTime: 295.782,
                    },
                    {
                        no: 8,
                        time: 41.727,
                        elapsedTime: 337.509,
                    },
                    {
                        no: 9,
                        time: 41.766,
                        elapsedTime: 379.275,
                    },
                    {
                        no: 10,
                        time: 41.824,
                        elapsedTime: 421.099,
                    },
                    {
                        no: 11,
                        time: 41.709,
                        elapsedTime: 462.808,
                    },
                    {
                        no: 12,
                        time: 41.858,
                        elapsedTime: 504.666,
                    },
                    {
                        no: 13,
                        time: 41.787,
                        elapsedTime: 546.453,
                    },
                    {
                        no: 14,
                        time: 41.835,
                        elapsedTime: 588.288,
                    },
                    {
                        no: 15,
                        time: 41.678,
                        elapsedTime: 629.966,
                    },
                    {
                        no: 16,
                        time: 41.652,
                        elapsedTime: 671.618,
                    },
                    {
                        no: 17,
                        time: 41.607,
                        elapsedTime: 713.225,
                    },
                    {
                        no: 18,
                        time: 41.643,
                        elapsedTime: 754.868,
                    },
                    {
                        no: 19,
                        time: 41.594,
                        elapsedTime: 796.462,
                    },
                    {
                        no: 20,
                        time: 42.302,
                        elapsedTime: 838.764,
                    },
                    {
                        no: 21,
                        time: 41.808,
                        elapsedTime: 880.572,
                    },
                    {
                        no: 22,
                        time: 41.716,
                        elapsedTime: 922.288,
                    },
                    {
                        no: 23,
                        time: 41.804,
                        elapsedTime: 964.092,
                    },
                    {
                        no: 24,
                        time: 41.619,
                        elapsedTime: 1005.711,
                    },
                    {
                        no: 25,
                        time: 41.707,
                        elapsedTime: 1047.418,
                    },
                    {
                        no: 26,
                        time: 41.8,
                        elapsedTime: 1089.218,
                    },
                    {
                        no: 27,
                        time: 41.674,
                        elapsedTime: 1130.892,
                    },
                    {
                        no: 28,
                        time: 41.659,
                        elapsedTime: 1172.551,
                    },
                    {
                        no: 29,
                        time: 41.638,
                        elapsedTime: 1214.189,
                    },
                    {
                        no: 30,
                        time: 41.572,
                        elapsedTime: 1255.761,
                    },
                    {
                        no: 31,
                        time: 42.116,
                        elapsedTime: 1297.877,
                    },
                    {
                        no: 32,
                        time: 48.838,
                        elapsedTime: 1346.715,
                    },
                    {
                        no: 33,
                        time: 41.527,
                        elapsedTime: 1388.242,
                    },
                    {
                        no: 34,
                        time: 41.623,
                        elapsedTime: 1429.865,
                    },
                    {
                        no: 35,
                        time: 41.854,
                        elapsedTime: 1471.719,
                    },
                    {
                        no: 36,
                        time: 41.612,
                        elapsedTime: 1513.331,
                    },
                    {
                        no: 37,
                        time: 41.686,
                        elapsedTime: 1555.017,
                    },
                    {
                        no: 38,
                        time: 41.716,
                        elapsedTime: 1596.733,
                    },
                    {
                        no: 39,
                        time: 41.732,
                        elapsedTime: 1638.465,
                    },
                    {
                        no: 40,
                        time: 41.589,
                        elapsedTime: 1680.054,
                    },
                    {
                        no: 41,
                        time: 41.738,
                        elapsedTime: 1721.792,
                    },
                    {
                        no: 42,
                        time: 41.799,
                        elapsedTime: 1763.591,
                    },
                    {
                        no: 43,
                        time: 41.617,
                        elapsedTime: 1805.208,
                    },
                    {
                        no: 44,
                        time: 41.98,
                        elapsedTime: 1847.188,
                    },
                    {
                        no: 45,
                        time: 42.023,
                        elapsedTime: 1889.211,
                    },
                    {
                        no: 46,
                        time: 41.987,
                        elapsedTime: 1931.198,
                    },
                    {
                        no: 47,
                        time: 41.634,
                        elapsedTime: 1972.832,
                    },
                    {
                        no: 48,
                        time: 41.577,
                        elapsedTime: 2014.409,
                    },
                    {
                        no: 49,
                        time: 42.204,
                        elapsedTime: 2056.613,
                    },
                    {
                        no: 50,
                        time: 41.701,
                        elapsedTime: 2098.314,
                    },
                    {
                        no: 51,
                        time: 41.786,
                        elapsedTime: 2140.1,
                    },
                    {
                        no: 52,
                        time: 41.75,
                        elapsedTime: 2181.85,
                    },
                    {
                        no: 53,
                        time: 42.023,
                        elapsedTime: 2223.873,
                    },
                    {
                        no: 54,
                        time: 41.713,
                        elapsedTime: 2265.586,
                    },
                    {
                        no: 55,
                        time: 41.746,
                        elapsedTime: 2307.332,
                    },
                    {
                        no: 56,
                        time: 41.654,
                        elapsedTime: 2348.986,
                    },
                ],
                startGap: 0,
                startTime: 0,
                endTime: 2348.9860000000003,
                duration: 2348.9860000000003,
                avgLapExcludingPitExitLap: 41.946178571428575,
                bestLap: 41.527,
                pilot: 'Shor',
                kart: '10',
            },
            {
                no: 2,
                laps: [
                    {
                        no: 57,
                        time: 165.708,
                        elapsedTime: 2514.694,
                    },
                    {
                        no: 58,
                        time: 43.386,
                        elapsedTime: 2558.08,
                    },
                    {
                        no: 59,
                        time: 42.581,
                        elapsedTime: 2600.661,
                    },
                    {
                        no: 60,
                        time: 41.985,
                        elapsedTime: 2642.646,
                    },
                    {
                        no: 61,
                        time: 42.114,
                        elapsedTime: 2684.76,
                    },
                    {
                        no: 62,
                        time: 42.342,
                        elapsedTime: 2727.102,
                    },
                    {
                        no: 63,
                        time: 42.195,
                        elapsedTime: 2769.297,
                    },
                    {
                        no: 64,
                        time: 42.308,
                        elapsedTime: 2811.605,
                    },
                    {
                        no: 65,
                        time: 41.926,
                        elapsedTime: 2853.531,
                    },
                    {
                        no: 66,
                        time: 42.252,
                        elapsedTime: 2895.783,
                    },
                    {
                        no: 67,
                        time: 42.168,
                        elapsedTime: 2937.951,
                    },
                    {
                        no: 68,
                        time: 41.923,
                        elapsedTime: 2979.874,
                    },
                    {
                        no: 69,
                        time: 42.271,
                        elapsedTime: 3022.145,
                    },
                    {
                        no: 70,
                        time: 42.316,
                        elapsedTime: 3064.461,
                    },
                    {
                        no: 71,
                        time: 41.814,
                        elapsedTime: 3106.275,
                    },
                    {
                        no: 72,
                        time: 41.782,
                        elapsedTime: 3148.057,
                    },
                    {
                        no: 73,
                        time: 41.991,
                        elapsedTime: 3190.048,
                    },
                    {
                        no: 74,
                        time: 41.765,
                        elapsedTime: 3231.813,
                    },
                    {
                        no: 75,
                        time: 42.09,
                        elapsedTime: 3273.903,
                    },
                    {
                        no: 76,
                        time: 41.692,
                        elapsedTime: 3315.595,
                    },
                    {
                        no: 77,
                        time: 41.961,
                        elapsedTime: 3357.556,
                    },
                    {
                        no: 78,
                        time: 41.699,
                        elapsedTime: 3399.255,
                    },
                    {
                        no: 79,
                        time: 41.616,
                        elapsedTime: 3440.871,
                    },
                    {
                        no: 80,
                        time: 41.85,
                        elapsedTime: 3482.721,
                    },
                    {
                        no: 81,
                        time: 41.82,
                        elapsedTime: 3524.541,
                    },
                    {
                        no: 82,
                        time: 42.012,
                        elapsedTime: 3566.553,
                    },
                    {
                        no: 83,
                        time: 41.811,
                        elapsedTime: 3608.364,
                    },
                    {
                        no: 84,
                        time: 41.728,
                        elapsedTime: 3650.092,
                    },
                    {
                        no: 85,
                        time: 41.905,
                        elapsedTime: 3691.997,
                    },
                    {
                        no: 86,
                        time: 41.714,
                        elapsedTime: 3733.711,
                    },
                    {
                        no: 87,
                        time: 41.598,
                        elapsedTime: 3775.309,
                    },
                    {
                        no: 88,
                        time: 41.807,
                        elapsedTime: 3817.116,
                    },
                    {
                        no: 89,
                        time: 42.769,
                        elapsedTime: 3859.885,
                    },
                    {
                        no: 90,
                        time: 42.132,
                        elapsedTime: 3902.017,
                    },
                    {
                        no: 91,
                        time: 42.112,
                        elapsedTime: 3944.129,
                    },
                    {
                        no: 92,
                        time: 42.03,
                        elapsedTime: 3986.159,
                    },
                    {
                        no: 93,
                        time: 42.274,
                        elapsedTime: 4028.433,
                    },
                    {
                        no: 94,
                        time: 42.144,
                        elapsedTime: 4070.577,
                    },
                    {
                        no: 95,
                        time: 42.045,
                        elapsedTime: 4112.622,
                    },
                    {
                        no: 96,
                        time: 42.073,
                        elapsedTime: 4154.695,
                    },
                    {
                        no: 97,
                        time: 41.997,
                        elapsedTime: 4196.692,
                    },
                    {
                        no: 98,
                        time: 42.224,
                        elapsedTime: 4238.916,
                    },
                    {
                        no: 99,
                        time: 43.271,
                        elapsedTime: 4282.187,
                    },
                    {
                        no: 100,
                        time: 42.134,
                        elapsedTime: 4324.321,
                    },
                    {
                        no: 101,
                        time: 42.315,
                        elapsedTime: 4366.636,
                    },
                    {
                        no: 102,
                        time: 42.109,
                        elapsedTime: 4408.745,
                    },
                    {
                        no: 103,
                        time: 42.059,
                        elapsedTime: 4450.804,
                    },
                    {
                        no: 104,
                        time: 42.066,
                        elapsedTime: 4492.87,
                    },
                    {
                        no: 105,
                        time: 42.287,
                        elapsedTime: 4535.157,
                    },
                    {
                        no: 106,
                        time: 42.51,
                        elapsedTime: 4577.667,
                    },
                    {
                        no: 107,
                        time: 42.443,
                        elapsedTime: 4620.11,
                    },
                ],
                startGap: 0,
                startTime: 2348.9860000000003,
                endTime: 4620.110000000001,
                duration: 2271.1240000000003,
                avgLapExcludingPitExitLap: 42.108320000000006,
                bestLap: 41.598,
                pilot: 'Samsonov',
                kart: '11',
            },
            {
                no: 3,
                laps: [
                    {
                        no: 108,
                        time: 147.297,
                        elapsedTime: 4767.407,
                    },
                    {
                        no: 109,
                        time: 43.145,
                        elapsedTime: 4810.552,
                    },
                    {
                        no: 110,
                        time: 42.553,
                        elapsedTime: 4853.105,
                    },
                    {
                        no: 111,
                        time: 42.284,
                        elapsedTime: 4895.389,
                    },
                    {
                        no: 112,
                        time: 42.238,
                        elapsedTime: 4937.627,
                    },
                    {
                        no: 113,
                        time: 42.397,
                        elapsedTime: 4980.024,
                    },
                    {
                        no: 114,
                        time: 42.112,
                        elapsedTime: 5022.136,
                    },
                ],
                startGap: 0,
                startTime: 4620.110000000001,
                endTime: 5022.136,
                duration: 402.026,
                avgLapExcludingPitExitLap: 42.45483333333333,
                bestLap: 42.112,
                pilot: 'Shor',
                kart: '5',
            },
            {
                no: 4,
                laps: [
                    {
                        no: 115,
                        time: 211.71699999999998,
                        elapsedTime: 5233.853,
                    },
                    {
                        no: 116,
                        time: 42.657,
                        elapsedTime: 5276.51,
                    },
                    {
                        no: 117,
                        time: 42.997,
                        elapsedTime: 5319.507,
                    },
                    {
                        no: 118,
                        time: 42.208,
                        elapsedTime: 5361.715,
                    },
                    {
                        no: 119,
                        time: 42.385,
                        elapsedTime: 5404.1,
                    },
                    {
                        no: 120,
                        time: 42.28,
                        elapsedTime: 5446.38,
                    },
                    {
                        no: 121,
                        time: 42.297,
                        elapsedTime: 5488.677,
                    },
                    {
                        no: 122,
                        time: 42.313,
                        elapsedTime: 5530.99,
                    },
                    {
                        no: 123,
                        time: 42.215,
                        elapsedTime: 5573.205,
                    },
                    {
                        no: 124,
                        time: 42.299,
                        elapsedTime: 5615.504,
                    },
                    {
                        no: 125,
                        time: 42.291,
                        elapsedTime: 5657.795,
                    },
                    {
                        no: 126,
                        time: 42.477,
                        elapsedTime: 5700.272,
                    },
                    {
                        no: 127,
                        time: 42.272,
                        elapsedTime: 5742.544,
                    },
                    {
                        no: 128,
                        time: 42.227,
                        elapsedTime: 5784.771,
                    },
                    {
                        no: 129,
                        time: 42.278,
                        elapsedTime: 5827.049,
                    },
                    {
                        no: 130,
                        time: 42.402,
                        elapsedTime: 5869.451,
                    },
                    {
                        no: 131,
                        time: 42.116,
                        elapsedTime: 5911.567,
                    },
                    {
                        no: 132,
                        time: 42.887,
                        elapsedTime: 5954.454,
                    },
                    {
                        no: 133,
                        time: 42.247,
                        elapsedTime: 5996.701,
                    },
                    {
                        no: 134,
                        time: 42.092,
                        elapsedTime: 6038.793,
                    },
                    {
                        no: 135,
                        time: 42.157,
                        elapsedTime: 6080.95,
                    },
                    {
                        no: 136,
                        time: 42.289,
                        elapsedTime: 6123.239,
                    },
                    {
                        no: 137,
                        time: 42.199,
                        elapsedTime: 6165.438,
                    },
                    {
                        no: 138,
                        time: 42.2,
                        elapsedTime: 6207.638,
                    },
                    {
                        no: 139,
                        time: 42.172,
                        elapsedTime: 6249.81,
                    },
                    {
                        no: 140,
                        time: 42.309,
                        elapsedTime: 6292.119,
                    },
                    {
                        no: 141,
                        time: 42.509,
                        elapsedTime: 6334.628,
                    },
                    {
                        no: 142,
                        time: 42.157,
                        elapsedTime: 6376.785,
                    },
                    {
                        no: 143,
                        time: 42.177,
                        elapsedTime: 6418.962,
                    },
                    {
                        no: 144,
                        time: 42.303,
                        elapsedTime: 6461.265,
                    },
                    {
                        no: 145,
                        time: 42.559,
                        elapsedTime: 6503.824,
                    },
                    {
                        no: 146,
                        time: 42.632,
                        elapsedTime: 6546.456,
                    },
                    {
                        no: 147,
                        time: 42.336,
                        elapsedTime: 6588.792,
                    },
                    {
                        no: 148,
                        time: 42.401,
                        elapsedTime: 6631.193,
                    },
                    {
                        no: 149,
                        time: 42.259,
                        elapsedTime: 6673.452,
                    },
                    {
                        no: 150,
                        time: 42.375,
                        elapsedTime: 6715.827,
                    },
                    {
                        no: 151,
                        time: 42.241,
                        elapsedTime: 6758.068,
                    },
                    {
                        no: 152,
                        time: 42.199,
                        elapsedTime: 6800.267,
                    },
                    {
                        no: 153,
                        time: 42.128,
                        elapsedTime: 6842.395,
                    },
                    {
                        no: 154,
                        time: 42.295,
                        elapsedTime: 6884.69,
                    },
                    {
                        no: 155,
                        time: 42.096,
                        elapsedTime: 6926.786,
                    },
                    {
                        no: 156,
                        time: 42.464,
                        elapsedTime: 6969.25,
                    },
                    {
                        no: 157,
                        time: 42.509,
                        elapsedTime: 7011.759,
                    },
                    {
                        no: 158,
                        time: 42.44,
                        elapsedTime: 7054.199,
                    },
                    {
                        no: 159,
                        time: 42.345,
                        elapsedTime: 7096.544,
                    },
                    {
                        no: 160,
                        time: 42.358,
                        elapsedTime: 7138.902,
                    },
                    {
                        no: 161,
                        time: 42.299,
                        elapsedTime: 7181.201,
                    },
                    {
                        no: 162,
                        time: 42.26,
                        elapsedTime: 7223.461,
                    },
                ],
                startGap: 0,
                startTime: 5022.136,
                endTime: 7223.461000000001,
                duration: 2201.3250000000003,
                avgLapExcludingPitExitLap: 42.33208510638298,
                bestLap: 42.092,
                pilot: 'Shor',
                kart: '13',
            },
        ],
        '11': [
            {
                no: 1,
                laps: [
                    {
                        no: 1,
                        time: 47.174,
                        elapsedTime: 48.581,
                    },
                    {
                        no: 2,
                        time: 43.24,
                        elapsedTime: 91.821,
                    },
                    {
                        no: 3,
                        time: 43.944,
                        elapsedTime: 135.765,
                    },
                    {
                        no: 4,
                        time: 42.538,
                        elapsedTime: 178.303,
                    },
                    {
                        no: 5,
                        time: 42.046,
                        elapsedTime: 220.349,
                    },
                    {
                        no: 6,
                        time: 41.934,
                        elapsedTime: 262.283,
                    },
                    {
                        no: 7,
                        time: 41.919,
                        elapsedTime: 304.202,
                    },
                    {
                        no: 8,
                        time: 41.986,
                        elapsedTime: 346.188,
                    },
                    {
                        no: 9,
                        time: 42.1,
                        elapsedTime: 388.288,
                    },
                    {
                        no: 10,
                        time: 41.681,
                        elapsedTime: 429.969,
                    },
                    {
                        no: 11,
                        time: 41.689,
                        elapsedTime: 471.658,
                    },
                    {
                        no: 12,
                        time: 41.62,
                        elapsedTime: 513.278,
                    },
                    {
                        no: 13,
                        time: 42.402,
                        elapsedTime: 555.68,
                    },
                    {
                        no: 14,
                        time: 42.486,
                        elapsedTime: 598.1659999999999,
                    },
                    {
                        no: 15,
                        time: 41.753,
                        elapsedTime: 639.919,
                    },
                    {
                        no: 16,
                        time: 41.66,
                        elapsedTime: 681.579,
                    },
                    {
                        no: 17,
                        time: 41.416,
                        elapsedTime: 722.995,
                    },
                    {
                        no: 18,
                        time: 41.806,
                        elapsedTime: 764.801,
                    },
                    {
                        no: 19,
                        time: 41.648,
                        elapsedTime: 806.449,
                    },
                    {
                        no: 20,
                        time: 41.599,
                        elapsedTime: 848.048,
                    },
                    {
                        no: 21,
                        time: 41.572,
                        elapsedTime: 889.62,
                    },
                    {
                        no: 22,
                        time: 41.465,
                        elapsedTime: 931.085,
                    },
                    {
                        no: 23,
                        time: 41.432,
                        elapsedTime: 972.517,
                    },
                    {
                        no: 24,
                        time: 41.659,
                        elapsedTime: 1014.176,
                    },
                    {
                        no: 25,
                        time: 42.303,
                        elapsedTime: 1056.479,
                    },
                    {
                        no: 26,
                        time: 41.794,
                        elapsedTime: 1098.273,
                    },
                    {
                        no: 27,
                        time: 41.877,
                        elapsedTime: 1140.15,
                    },
                    {
                        no: 28,
                        time: 41.487,
                        elapsedTime: 1181.637,
                    },
                    {
                        no: 29,
                        time: 42.411,
                        elapsedTime: 1224.048,
                    },
                    {
                        no: 30,
                        time: 41.818,
                        elapsedTime: 1265.866,
                    },
                    {
                        no: 31,
                        time: 41.769,
                        elapsedTime: 1307.635,
                    },
                    {
                        no: 32,
                        time: 41.913,
                        elapsedTime: 1349.548,
                    },
                    {
                        no: 33,
                        time: 41.457,
                        elapsedTime: 1391.005,
                    },
                    {
                        no: 34,
                        time: 41.577,
                        elapsedTime: 1432.582,
                    },
                    {
                        no: 35,
                        time: 41.627,
                        elapsedTime: 1474.209,
                    },
                    {
                        no: 36,
                        time: 41.717,
                        elapsedTime: 1515.926,
                    },
                    {
                        no: 37,
                        time: 41.438,
                        elapsedTime: 1557.364,
                    },
                    {
                        no: 38,
                        time: 41.747,
                        elapsedTime: 1599.111,
                    },
                    {
                        no: 39,
                        time: 41.538,
                        elapsedTime: 1640.649,
                    },
                    {
                        no: 40,
                        time: 41.818,
                        elapsedTime: 1682.467,
                    },
                    {
                        no: 41,
                        time: 41.955,
                        elapsedTime: 1724.422,
                    },
                    {
                        no: 42,
                        time: 41.864,
                        elapsedTime: 1766.286,
                    },
                    {
                        no: 43,
                        time: 41.898,
                        elapsedTime: 1808.184,
                    },
                    {
                        no: 44,
                        time: 41.815,
                        elapsedTime: 1849.999,
                    },
                    {
                        no: 45,
                        time: 41.711,
                        elapsedTime: 1891.71,
                    },
                    {
                        no: 46,
                        time: 41.736,
                        elapsedTime: 1933.446,
                    },
                    {
                        no: 47,
                        time: 41.428,
                        elapsedTime: 1974.874,
                    },
                    {
                        no: 48,
                        time: 41.814,
                        elapsedTime: 2016.688,
                    },
                    {
                        no: 49,
                        time: 41.299,
                        elapsedTime: 2057.987,
                    },
                    {
                        no: 50,
                        time: 41.939,
                        elapsedTime: 2099.926,
                    },
                    {
                        no: 51,
                        time: 41.686,
                        elapsedTime: 2141.612,
                    },
                    {
                        no: 52,
                        time: 41.406,
                        elapsedTime: 2183.018,
                    },
                ],
                startGap: 1.407,
                startTime: 0,
                endTime: 2183.018000000001,
                duration: 2183.018000000001,
                avgLapExcludingPitExitLap: 41.95405769230771,
                bestLap: 41.299,
                pilot: 'Kuzovov',
                kart: '11',
            },
            {
                no: 2,
                laps: [
                    {
                        no: 53,
                        time: 141.857,
                        elapsedTime: 2324.875,
                    },
                    {
                        no: 54,
                        time: 42.725,
                        elapsedTime: 2367.6,
                    },
                    {
                        no: 55,
                        time: 42.485,
                        elapsedTime: 2410.085,
                    },
                    {
                        no: 56,
                        time: 42.127,
                        elapsedTime: 2452.212,
                    },
                    {
                        no: 57,
                        time: 42.159,
                        elapsedTime: 2494.371,
                    },
                    {
                        no: 58,
                        time: 42.343,
                        elapsedTime: 2536.714,
                    },
                    {
                        no: 59,
                        time: 42.201,
                        elapsedTime: 2578.915,
                    },
                    {
                        no: 60,
                        time: 42.254,
                        elapsedTime: 2621.169,
                    },
                    {
                        no: 61,
                        time: 42.229,
                        elapsedTime: 2663.398,
                    },
                    {
                        no: 62,
                        time: 42.093,
                        elapsedTime: 2705.491,
                    },
                    {
                        no: 63,
                        time: 41.877,
                        elapsedTime: 2747.368,
                    },
                    {
                        no: 64,
                        time: 42.671,
                        elapsedTime: 2790.039,
                    },
                    {
                        no: 65,
                        time: 42.222,
                        elapsedTime: 2832.261,
                    },
                ],
                startGap: 0,
                startTime: 2183.018000000001,
                endTime: 2832.261000000001,
                duration: 649.243,
                avgLapExcludingPitExitLap: 42.282166666666676,
                bestLap: 41.877,
                pilot: 'Krupotkin',
                kart: '16',
            },
            {
                no: 3,
                laps: [
                    {
                        no: 66,
                        time: 163.691,
                        elapsedTime: 2995.952,
                    },
                    {
                        no: 67,
                        time: 41.588,
                        elapsedTime: 3037.54,
                    },
                    {
                        no: 68,
                        time: 41.705,
                        elapsedTime: 3079.245,
                    },
                    {
                        no: 69,
                        time: 41.751,
                        elapsedTime: 3120.996,
                    },
                    {
                        no: 70,
                        time: 42.822,
                        elapsedTime: 3163.818,
                    },
                    {
                        no: 71,
                        time: 42.845,
                        elapsedTime: 3206.663,
                    },
                    {
                        no: 72,
                        time: 42.594,
                        elapsedTime: 3249.257,
                    },
                    {
                        no: 73,
                        time: 42.944,
                        elapsedTime: 3292.201,
                    },
                    {
                        no: 74,
                        time: 41.745,
                        elapsedTime: 3333.946,
                    },
                    {
                        no: 75,
                        time: 41.669,
                        elapsedTime: 3375.615,
                    },
                    {
                        no: 76,
                        time: 41.652,
                        elapsedTime: 3417.267,
                    },
                    {
                        no: 77,
                        time: 41.634,
                        elapsedTime: 3458.901,
                    },
                    {
                        no: 78,
                        time: 41.731,
                        elapsedTime: 3500.632,
                    },
                    {
                        no: 79,
                        time: 41.738,
                        elapsedTime: 3542.37,
                    },
                    {
                        no: 80,
                        time: 41.563,
                        elapsedTime: 3583.933,
                    },
                    {
                        no: 81,
                        time: 41.493,
                        elapsedTime: 3625.426,
                    },
                    {
                        no: 82,
                        time: 41.639,
                        elapsedTime: 3667.065,
                    },
                    {
                        no: 83,
                        time: 41.526,
                        elapsedTime: 3708.591,
                    },
                    {
                        no: 84,
                        time: 41.517,
                        elapsedTime: 3750.108,
                    },
                    {
                        no: 85,
                        time: 41.589,
                        elapsedTime: 3791.697,
                    },
                    {
                        no: 86,
                        time: 41.713,
                        elapsedTime: 3833.41,
                    },
                    {
                        no: 87,
                        time: 41.644,
                        elapsedTime: 3875.054,
                    },
                    {
                        no: 88,
                        time: 41.516,
                        elapsedTime: 3916.57,
                    },
                    {
                        no: 89,
                        time: 41.707,
                        elapsedTime: 3958.277,
                    },
                    {
                        no: 90,
                        time: 41.531,
                        elapsedTime: 3999.808,
                    },
                    {
                        no: 91,
                        time: 41.579,
                        elapsedTime: 4041.387,
                    },
                    {
                        no: 92,
                        time: 41.611,
                        elapsedTime: 4082.998,
                    },
                    {
                        no: 93,
                        time: 41.38,
                        elapsedTime: 4124.378,
                    },
                    {
                        no: 94,
                        time: 41.974,
                        elapsedTime: 4166.352,
                    },
                    {
                        no: 95,
                        time: 42.683,
                        elapsedTime: 4209.035,
                    },
                    {
                        no: 96,
                        time: 42.253,
                        elapsedTime: 4251.288,
                    },
                    {
                        no: 97,
                        time: 41.368,
                        elapsedTime: 4292.656,
                    },
                    {
                        no: 98,
                        time: 41.526,
                        elapsedTime: 4334.182,
                    },
                    {
                        no: 99,
                        time: 41.557,
                        elapsedTime: 4375.739,
                    },
                    {
                        no: 100,
                        time: 41.517,
                        elapsedTime: 4417.256,
                    },
                    {
                        no: 101,
                        time: 41.618,
                        elapsedTime: 4458.874,
                    },
                    {
                        no: 102,
                        time: 41.651,
                        elapsedTime: 4500.525,
                    },
                    {
                        no: 103,
                        time: 41.64,
                        elapsedTime: 4542.165,
                    },
                    {
                        no: 104,
                        time: 41.482,
                        elapsedTime: 4583.647,
                    },
                    {
                        no: 105,
                        time: 41.455,
                        elapsedTime: 4625.102,
                    },
                    {
                        no: 106,
                        time: 41.455,
                        elapsedTime: 4666.557,
                    },
                    {
                        no: 107,
                        time: 42.074,
                        elapsedTime: 4708.631,
                    },
                    {
                        no: 108,
                        time: 41.623,
                        elapsedTime: 4750.254,
                    },
                ],
                startGap: 0,
                startTime: 2832.261000000001,
                endTime: 4750.254000000001,
                duration: 1917.9930000000002,
                avgLapExcludingPitExitLap: 41.76909523809524,
                bestLap: 41.368,
                pilot: 'Krupotkin',
                kart: '12',
            },
            {
                no: 4,
                laps: [
                    {
                        no: 109,
                        time: 199.659,
                        elapsedTime: 4949.913,
                    },
                    {
                        no: 110,
                        time: 42.205,
                        elapsedTime: 4992.118,
                    },
                    {
                        no: 111,
                        time: 41.998,
                        elapsedTime: 5034.116,
                    },
                    {
                        no: 112,
                        time: 41.777,
                        elapsedTime: 5075.893,
                    },
                    {
                        no: 113,
                        time: 41.754,
                        elapsedTime: 5117.647,
                    },
                    {
                        no: 114,
                        time: 41.759,
                        elapsedTime: 5159.406,
                    },
                    {
                        no: 115,
                        time: 41.716,
                        elapsedTime: 5201.122,
                    },
                    {
                        no: 116,
                        time: 42.114,
                        elapsedTime: 5243.236,
                    },
                    {
                        no: 117,
                        time: 41.914,
                        elapsedTime: 5285.15,
                    },
                    {
                        no: 118,
                        time: 41.737,
                        elapsedTime: 5326.887,
                    },
                    {
                        no: 119,
                        time: 41.615,
                        elapsedTime: 5368.502,
                    },
                    {
                        no: 120,
                        time: 41.716,
                        elapsedTime: 5410.218,
                    },
                    {
                        no: 121,
                        time: 41.873,
                        elapsedTime: 5452.091,
                    },
                    {
                        no: 122,
                        time: 41.874,
                        elapsedTime: 5493.965,
                    },
                    {
                        no: 123,
                        time: 41.768,
                        elapsedTime: 5535.733,
                    },
                    {
                        no: 124,
                        time: 41.761,
                        elapsedTime: 5577.494,
                    },
                    {
                        no: 125,
                        time: 41.505,
                        elapsedTime: 5618.999,
                    },
                    {
                        no: 126,
                        time: 41.793,
                        elapsedTime: 5660.792,
                    },
                    {
                        no: 127,
                        time: 42.333,
                        elapsedTime: 5703.125,
                    },
                    {
                        no: 128,
                        time: 42.314,
                        elapsedTime: 5745.439,
                    },
                    {
                        no: 129,
                        time: 41.903,
                        elapsedTime: 5787.342,
                    },
                    {
                        no: 130,
                        time: 41.63,
                        elapsedTime: 5828.972,
                    },
                    {
                        no: 131,
                        time: 41.517,
                        elapsedTime: 5870.489,
                    },
                    {
                        no: 132,
                        time: 41.374,
                        elapsedTime: 5911.863,
                    },
                    {
                        no: 133,
                        time: 42,
                        elapsedTime: 5953.863,
                    },
                    {
                        no: 134,
                        time: 41.598,
                        elapsedTime: 5995.461,
                    },
                    {
                        no: 135,
                        time: 41.613,
                        elapsedTime: 6037.074,
                    },
                    {
                        no: 136,
                        time: 41.788,
                        elapsedTime: 6078.862,
                    },
                    {
                        no: 137,
                        time: 41.608,
                        elapsedTime: 6120.47,
                    },
                    {
                        no: 138,
                        time: 41.817,
                        elapsedTime: 6162.287,
                    },
                    {
                        no: 139,
                        time: 41.57,
                        elapsedTime: 6203.857,
                    },
                    {
                        no: 140,
                        time: 41.839,
                        elapsedTime: 6245.696,
                    },
                    {
                        no: 141,
                        time: 41.603,
                        elapsedTime: 6287.299,
                    },
                    {
                        no: 142,
                        time: 41.615,
                        elapsedTime: 6328.914,
                    },
                    {
                        no: 143,
                        time: 41.687,
                        elapsedTime: 6370.601,
                    },
                    {
                        no: 144,
                        time: 41.719,
                        elapsedTime: 6412.32,
                    },
                    {
                        no: 145,
                        time: 41.84,
                        elapsedTime: 6454.16,
                    },
                    {
                        no: 146,
                        time: 41.706,
                        elapsedTime: 6495.866,
                    },
                    {
                        no: 147,
                        time: 41.705,
                        elapsedTime: 6537.571,
                    },
                    {
                        no: 148,
                        time: 41.792,
                        elapsedTime: 6579.363,
                    },
                    {
                        no: 149,
                        time: 41.75,
                        elapsedTime: 6621.113,
                    },
                    {
                        no: 150,
                        time: 41.674,
                        elapsedTime: 6662.787,
                    },
                    {
                        no: 151,
                        time: 41.625,
                        elapsedTime: 6704.412,
                    },
                    {
                        no: 152,
                        time: 41.956,
                        elapsedTime: 6746.368,
                    },
                    {
                        no: 153,
                        time: 41.635,
                        elapsedTime: 6788.003,
                    },
                    {
                        no: 154,
                        time: 41.752,
                        elapsedTime: 6829.755,
                    },
                    {
                        no: 155,
                        time: 41.991,
                        elapsedTime: 6871.746,
                    },
                    {
                        no: 156,
                        time: 41.846,
                        elapsedTime: 6913.592,
                    },
                    {
                        no: 157,
                        time: 41.84,
                        elapsedTime: 6955.432,
                    },
                    {
                        no: 158,
                        time: 41.721,
                        elapsedTime: 6997.153,
                    },
                    {
                        no: 159,
                        time: 41.668,
                        elapsedTime: 7038.821,
                    },
                    {
                        no: 160,
                        time: 41.568,
                        elapsedTime: 7080.389,
                    },
                    {
                        no: 161,
                        time: 41.849,
                        elapsedTime: 7122.238,
                    },
                    {
                        no: 162,
                        time: 41.624,
                        elapsedTime: 7163.862,
                    },
                    {
                        no: 163,
                        time: 41.939,
                        elapsedTime: 7205.801,
                    },
                ],
                startGap: 0,
                startTime: 4750.254000000001,
                endTime: 7205.801000000001,
                duration: 2455.547,
                avgLapExcludingPitExitLap: 41.775703703703705,
                bestLap: 41.374,
                pilot: 'Chadaev',
                kart: '11',
            },
        ],
        '13': [
            {
                no: 1,
                laps: [
                    {
                        no: 1,
                        time: 44.849,
                        elapsedTime: 45.121,
                    },
                    {
                        no: 2,
                        time: 42.658,
                        elapsedTime: 87.779,
                    },
                    {
                        no: 3,
                        time: 42.763,
                        elapsedTime: 130.542,
                    },
                    {
                        no: 4,
                        time: 42.409,
                        elapsedTime: 172.951,
                    },
                    {
                        no: 5,
                        time: 42.253,
                        elapsedTime: 215.204,
                    },
                    {
                        no: 6,
                        time: 42.542,
                        elapsedTime: 257.746,
                    },
                    {
                        no: 7,
                        time: 42.373,
                        elapsedTime: 300.119,
                    },
                    {
                        no: 8,
                        time: 43.189,
                        elapsedTime: 343.308,
                    },
                    {
                        no: 9,
                        time: 42.123,
                        elapsedTime: 385.431,
                    },
                    {
                        no: 10,
                        time: 42.068,
                        elapsedTime: 427.499,
                    },
                    {
                        no: 11,
                        time: 42.133,
                        elapsedTime: 469.632,
                    },
                    {
                        no: 12,
                        time: 41.866,
                        elapsedTime: 511.498,
                    },
                    {
                        no: 13,
                        time: 42.057,
                        elapsedTime: 553.555,
                    },
                    {
                        no: 14,
                        time: 41.959,
                        elapsedTime: 595.514,
                    },
                    {
                        no: 15,
                        time: 41.851,
                        elapsedTime: 637.365,
                    },
                    {
                        no: 16,
                        time: 41.748,
                        elapsedTime: 679.113,
                    },
                    {
                        no: 17,
                        time: 41.753,
                        elapsedTime: 720.866,
                    },
                    {
                        no: 18,
                        time: 41.82,
                        elapsedTime: 762.686,
                    },
                    {
                        no: 19,
                        time: 41.866,
                        elapsedTime: 804.552,
                    },
                    {
                        no: 20,
                        time: 41.804,
                        elapsedTime: 846.356,
                    },
                    {
                        no: 21,
                        time: 41.631,
                        elapsedTime: 887.987,
                    },
                    {
                        no: 22,
                        time: 41.784,
                        elapsedTime: 929.771,
                    },
                    {
                        no: 23,
                        time: 41.802,
                        elapsedTime: 971.573,
                    },
                    {
                        no: 24,
                        time: 41.787,
                        elapsedTime: 1013.36,
                    },
                    {
                        no: 25,
                        time: 41.802,
                        elapsedTime: 1055.162,
                    },
                    {
                        no: 26,
                        time: 42.277,
                        elapsedTime: 1097.439,
                    },
                    {
                        no: 27,
                        time: 41.866,
                        elapsedTime: 1139.305,
                    },
                    {
                        no: 28,
                        time: 41.997,
                        elapsedTime: 1181.302,
                    },
                    {
                        no: 29,
                        time: 43.071,
                        elapsedTime: 1224.373,
                    },
                    {
                        no: 30,
                        time: 41.891,
                        elapsedTime: 1266.264,
                    },
                    {
                        no: 31,
                        time: 41.675,
                        elapsedTime: 1307.939,
                    },
                    {
                        no: 32,
                        time: 41.781,
                        elapsedTime: 1349.72,
                    },
                    {
                        no: 33,
                        time: 41.839,
                        elapsedTime: 1391.559,
                    },
                    {
                        no: 34,
                        time: 41.802,
                        elapsedTime: 1433.361,
                    },
                    {
                        no: 35,
                        time: 41.982,
                        elapsedTime: 1475.343,
                    },
                    {
                        no: 36,
                        time: 41.975,
                        elapsedTime: 1517.318,
                    },
                    {
                        no: 37,
                        time: 42.057,
                        elapsedTime: 1559.375,
                    },
                    {
                        no: 38,
                        time: 42.126,
                        elapsedTime: 1601.501,
                    },
                    {
                        no: 39,
                        time: 42.172,
                        elapsedTime: 1643.673,
                    },
                    {
                        no: 40,
                        time: 42.207,
                        elapsedTime: 1685.88,
                    },
                    {
                        no: 41,
                        time: 42.303,
                        elapsedTime: 1728.183,
                    },
                    {
                        no: 42,
                        time: 41.927,
                        elapsedTime: 1770.11,
                    },
                    {
                        no: 43,
                        time: 41.764,
                        elapsedTime: 1811.874,
                    },
                    {
                        no: 44,
                        time: 42.359,
                        elapsedTime: 1854.233,
                    },
                    {
                        no: 45,
                        time: 41.731,
                        elapsedTime: 1895.964,
                    },
                    {
                        no: 46,
                        time: 41.712,
                        elapsedTime: 1937.676,
                    },
                    {
                        no: 47,
                        time: 41.822,
                        elapsedTime: 1979.498,
                    },
                    {
                        no: 48,
                        time: 41.978,
                        elapsedTime: 2021.476,
                    },
                    {
                        no: 49,
                        time: 41.966,
                        elapsedTime: 2063.442,
                    },
                    {
                        no: 50,
                        time: 42.03,
                        elapsedTime: 2105.472,
                    },
                    {
                        no: 51,
                        time: 41.952,
                        elapsedTime: 2147.424,
                    },
                    {
                        no: 52,
                        time: 42.08,
                        elapsedTime: 2189.504,
                    },
                    {
                        no: 53,
                        time: 42.618,
                        elapsedTime: 2232.122,
                    },
                    {
                        no: 54,
                        time: 42.012,
                        elapsedTime: 2274.134,
                    },
                    {
                        no: 55,
                        time: 41.931,
                        elapsedTime: 2316.065,
                    },
                    {
                        no: 56,
                        time: 41.969,
                        elapsedTime: 2358.034,
                    },
                ],
                startGap: 0.272,
                startTime: 0,
                endTime: 2358.034,
                duration: 2358.034,
                avgLapExcludingPitExitLap: 42.10289285714286,
                bestLap: 41.631,
                pilot: 'Petrov',
                kart: '13',
            },
            {
                no: 2,
                laps: [
                    {
                        no: 57,
                        time: 245.889,
                        elapsedTime: 2603.923,
                    },
                    {
                        no: 58,
                        time: 41.872,
                        elapsedTime: 2645.795,
                    },
                    {
                        no: 59,
                        time: 41.665,
                        elapsedTime: 2687.46,
                    },
                    {
                        no: 60,
                        time: 41.886,
                        elapsedTime: 2729.346,
                    },
                    {
                        no: 61,
                        time: 41.892,
                        elapsedTime: 2771.238,
                    },
                    {
                        no: 62,
                        time: 41.826,
                        elapsedTime: 2813.064,
                    },
                    {
                        no: 63,
                        time: 41.698,
                        elapsedTime: 2854.762,
                    },
                    {
                        no: 64,
                        time: 41.928,
                        elapsedTime: 2896.69,
                    },
                    {
                        no: 65,
                        time: 41.757,
                        elapsedTime: 2938.447,
                    },
                    {
                        no: 66,
                        time: 41.69,
                        elapsedTime: 2980.137,
                    },
                    {
                        no: 67,
                        time: 41.858,
                        elapsedTime: 3021.995,
                    },
                    {
                        no: 68,
                        time: 41.811,
                        elapsedTime: 3063.806,
                    },
                    {
                        no: 69,
                        time: 41.902,
                        elapsedTime: 3105.708,
                    },
                    {
                        no: 70,
                        time: 41.89,
                        elapsedTime: 3147.598,
                    },
                    {
                        no: 71,
                        time: 41.819,
                        elapsedTime: 3189.417,
                    },
                    {
                        no: 72,
                        time: 41.888,
                        elapsedTime: 3231.305,
                    },
                    {
                        no: 73,
                        time: 41.592,
                        elapsedTime: 3272.897,
                    },
                    {
                        no: 74,
                        time: 41.663,
                        elapsedTime: 3314.56,
                    },
                    {
                        no: 75,
                        time: 41.729,
                        elapsedTime: 3356.289,
                    },
                    {
                        no: 76,
                        time: 41.712,
                        elapsedTime: 3398.001,
                    },
                    {
                        no: 77,
                        time: 41.749,
                        elapsedTime: 3439.75,
                    },
                    {
                        no: 78,
                        time: 41.608,
                        elapsedTime: 3481.358,
                    },
                    {
                        no: 79,
                        time: 41.581,
                        elapsedTime: 3522.939,
                    },
                    {
                        no: 80,
                        time: 41.695,
                        elapsedTime: 3564.634,
                    },
                    {
                        no: 81,
                        time: 41.863,
                        elapsedTime: 3606.497,
                    },
                    {
                        no: 82,
                        time: 41.764,
                        elapsedTime: 3648.261,
                    },
                    {
                        no: 83,
                        time: 41.697,
                        elapsedTime: 3689.958,
                    },
                    {
                        no: 84,
                        time: 41.585,
                        elapsedTime: 3731.543,
                    },
                    {
                        no: 85,
                        time: 42.47,
                        elapsedTime: 3774.013,
                    },
                ],
                startGap: 0,
                startTime: 2358.034,
                endTime: 3774.013,
                duration: 1415.979,
                avgLapExcludingPitExitLap: 41.78892857142858,
                bestLap: 41.581,
                pilot: 'Gendel',
                kart: '1',
            },
            {
                no: 3,
                laps: [
                    {
                        no: 86,
                        time: 139.02,
                        elapsedTime: 3913.033,
                    },
                    {
                        no: 87,
                        time: 42.168,
                        elapsedTime: 3955.201,
                    },
                    {
                        no: 88,
                        time: 42.209,
                        elapsedTime: 3997.41,
                    },
                    {
                        no: 89,
                        time: 42.683,
                        elapsedTime: 4040.093,
                    },
                    {
                        no: 90,
                        time: 41.655,
                        elapsedTime: 4081.748,
                    },
                    {
                        no: 91,
                        time: 41.634,
                        elapsedTime: 4123.382,
                    },
                    {
                        no: 92,
                        time: 42.215,
                        elapsedTime: 4165.597,
                    },
                    {
                        no: 93,
                        time: 41.756,
                        elapsedTime: 4207.353,
                    },
                    {
                        no: 94,
                        time: 41.706,
                        elapsedTime: 4249.059,
                    },
                    {
                        no: 95,
                        time: 41.945,
                        elapsedTime: 4291.004,
                    },
                    {
                        no: 96,
                        time: 41.774,
                        elapsedTime: 4332.778,
                    },
                    {
                        no: 97,
                        time: 41.724,
                        elapsedTime: 4374.502,
                    },
                    {
                        no: 98,
                        time: 41.731,
                        elapsedTime: 4416.233,
                    },
                    {
                        no: 99,
                        time: 42.93,
                        elapsedTime: 4459.163,
                    },
                    {
                        no: 100,
                        time: 42.79,
                        elapsedTime: 4501.953,
                    },
                    {
                        no: 101,
                        time: 41.746,
                        elapsedTime: 4543.699,
                    },
                    {
                        no: 102,
                        time: 41.776,
                        elapsedTime: 4585.475,
                    },
                    {
                        no: 103,
                        time: 41.647,
                        elapsedTime: 4627.122,
                    },
                    {
                        no: 104,
                        time: 41.66,
                        elapsedTime: 4668.782,
                    },
                    {
                        no: 105,
                        time: 41.685,
                        elapsedTime: 4710.467,
                    },
                    {
                        no: 106,
                        time: 41.908,
                        elapsedTime: 4752.375,
                    },
                    {
                        no: 107,
                        time: 41.648,
                        elapsedTime: 4794.023,
                    },
                    {
                        no: 108,
                        time: 41.637,
                        elapsedTime: 4835.66,
                    },
                    {
                        no: 109,
                        time: 41.596,
                        elapsedTime: 4877.256,
                    },
                    {
                        no: 110,
                        time: 41.893,
                        elapsedTime: 4919.149,
                    },
                    {
                        no: 111,
                        time: 41.74,
                        elapsedTime: 4960.889,
                    },
                    {
                        no: 112,
                        time: 41.79,
                        elapsedTime: 5002.679,
                    },
                    {
                        no: 113,
                        time: 42.461,
                        elapsedTime: 5045.14,
                    },
                    {
                        no: 114,
                        time: 42.104,
                        elapsedTime: 5087.244,
                    },
                    {
                        no: 115,
                        time: 41.719,
                        elapsedTime: 5128.963,
                    },
                    {
                        no: 116,
                        time: 41.772,
                        elapsedTime: 5170.735,
                    },
                    {
                        no: 117,
                        time: 41.76,
                        elapsedTime: 5212.495,
                    },
                    {
                        no: 118,
                        time: 41.811,
                        elapsedTime: 5254.306,
                    },
                    {
                        no: 119,
                        time: 41.619,
                        elapsedTime: 5295.925,
                    },
                    {
                        no: 120,
                        time: 41.649,
                        elapsedTime: 5337.574,
                    },
                    {
                        no: 121,
                        time: 41.627,
                        elapsedTime: 5379.201,
                    },
                    {
                        no: 122,
                        time: 41.632,
                        elapsedTime: 5420.833,
                    },
                    {
                        no: 123,
                        time: 41.737,
                        elapsedTime: 5462.57,
                    },
                    {
                        no: 124,
                        time: 41.798,
                        elapsedTime: 5504.368,
                    },
                    {
                        no: 125,
                        time: 41.84,
                        elapsedTime: 5546.208,
                    },
                    {
                        no: 126,
                        time: 41.697,
                        elapsedTime: 5587.905,
                    },
                    {
                        no: 127,
                        time: 41.508,
                        elapsedTime: 5629.413,
                    },
                    {
                        no: 128,
                        time: 41.579,
                        elapsedTime: 5670.992,
                    },
                    {
                        no: 129,
                        time: 41.734,
                        elapsedTime: 5712.726,
                    },
                    {
                        no: 130,
                        time: 41.638,
                        elapsedTime: 5754.364,
                    },
                    {
                        no: 131,
                        time: 41.711,
                        elapsedTime: 5796.075,
                    },
                    {
                        no: 132,
                        time: 42.016,
                        elapsedTime: 5838.091,
                    },
                    {
                        no: 133,
                        time: 41.626,
                        elapsedTime: 5879.717,
                    },
                    {
                        no: 134,
                        time: 41.481,
                        elapsedTime: 5921.198,
                    },
                    {
                        no: 135,
                        time: 41.699,
                        elapsedTime: 5962.897,
                    },
                    {
                        no: 136,
                        time: 42.238,
                        elapsedTime: 6005.135,
                    },
                ],
                startGap: 0,
                startTime: 3774.013,
                endTime: 6005.135,
                duration: 2231.122,
                avgLapExcludingPitExitLap: 41.84204,
                bestLap: 41.481,
                pilot: 'Gendel',
                kart: '4',
            },
            {
                no: 4,
                laps: [
                    {
                        no: 137,
                        time: 139.452,
                        elapsedTime: 6144.587,
                    },
                    {
                        no: 138,
                        time: 42.033,
                        elapsedTime: 6186.62,
                    },
                    {
                        no: 139,
                        time: 41.758,
                        elapsedTime: 6228.378,
                    },
                    {
                        no: 140,
                        time: 41.701,
                        elapsedTime: 6270.079,
                    },
                    {
                        no: 141,
                        time: 41.676,
                        elapsedTime: 6311.755,
                    },
                    {
                        no: 142,
                        time: 41.588,
                        elapsedTime: 6353.343,
                    },
                    {
                        no: 143,
                        time: 41.714,
                        elapsedTime: 6395.057,
                    },
                    {
                        no: 144,
                        time: 41.473,
                        elapsedTime: 6436.53,
                    },
                    {
                        no: 145,
                        time: 41.511,
                        elapsedTime: 6478.041,
                    },
                    {
                        no: 146,
                        time: 41.608,
                        elapsedTime: 6519.649,
                    },
                    {
                        no: 147,
                        time: 41.6,
                        elapsedTime: 6561.249,
                    },
                    {
                        no: 148,
                        time: 41.636,
                        elapsedTime: 6602.885,
                    },
                    {
                        no: 149,
                        time: 41.802,
                        elapsedTime: 6644.687,
                    },
                    {
                        no: 150,
                        time: 42.405,
                        elapsedTime: 6687.092,
                    },
                    {
                        no: 151,
                        time: 42.064,
                        elapsedTime: 6729.156,
                    },
                    {
                        no: 152,
                        time: 41.711,
                        elapsedTime: 6770.867,
                    },
                    {
                        no: 153,
                        time: 41.598,
                        elapsedTime: 6812.465,
                    },
                    {
                        no: 154,
                        time: 41.857,
                        elapsedTime: 6854.322,
                    },
                    {
                        no: 155,
                        time: 41.86,
                        elapsedTime: 6896.182,
                    },
                    {
                        no: 156,
                        time: 41.723,
                        elapsedTime: 6937.905,
                    },
                    {
                        no: 157,
                        time: 41.823,
                        elapsedTime: 6979.728,
                    },
                    {
                        no: 158,
                        time: 41.795,
                        elapsedTime: 7021.523,
                    },
                    {
                        no: 159,
                        time: 41.584,
                        elapsedTime: 7063.107,
                    },
                    {
                        no: 160,
                        time: 41.423,
                        elapsedTime: 7104.53,
                    },
                    {
                        no: 161,
                        time: 41.441,
                        elapsedTime: 7145.971,
                    },
                    {
                        no: 162,
                        time: 41.536,
                        elapsedTime: 7187.507,
                    },
                    {
                        no: 163,
                        time: 41.556,
                        elapsedTime: 7229.063,
                    },
                ],
                startGap: 0,
                startTime: 6005.135,
                endTime: 7229.063,
                duration: 1223.9279999999999,
                avgLapExcludingPitExitLap: 41.71061538461538,
                bestLap: 41.423,
                pilot: 'Petrov',
                kart: '15',
            },
        ],
        '16': [
            {
                no: 1,
                laps: [
                    {
                        no: 1,
                        time: 47.93,
                        elapsedTime: 48.155,
                    },
                    {
                        no: 2,
                        time: 43.46,
                        elapsedTime: 91.615,
                    },
                    {
                        no: 3,
                        time: 44.122,
                        elapsedTime: 135.737,
                    },
                    {
                        no: 4,
                        time: 43.65,
                        elapsedTime: 179.387,
                    },
                    {
                        no: 5,
                        time: 42.707,
                        elapsedTime: 222.094,
                    },
                    {
                        no: 6,
                        time: 42.625,
                        elapsedTime: 264.719,
                    },
                    {
                        no: 7,
                        time: 42.487,
                        elapsedTime: 307.206,
                    },
                    {
                        no: 8,
                        time: 42.743,
                        elapsedTime: 349.949,
                    },
                    {
                        no: 9,
                        time: 43.212,
                        elapsedTime: 393.161,
                    },
                    {
                        no: 10,
                        time: 42.618,
                        elapsedTime: 435.779,
                    },
                    {
                        no: 11,
                        time: 42.667,
                        elapsedTime: 478.446,
                    },
                    {
                        no: 12,
                        time: 42.742,
                        elapsedTime: 521.188,
                    },
                    {
                        no: 13,
                        time: 42.663,
                        elapsedTime: 563.851,
                    },
                    {
                        no: 14,
                        time: 42.807,
                        elapsedTime: 606.658,
                    },
                ],
                startGap: 0.225,
                startTime: 0,
                endTime: 606.658,
                duration: 606.658,
                avgLapExcludingPitExitLap: 43.31664285714286,
                bestLap: 42.487,
                pilot: 'Pasichenko',
                kart: '16',
            },
            {
                no: 2,
                laps: [
                    {
                        no: 15,
                        time: 144.906,
                        elapsedTime: 751.564,
                    },
                    {
                        no: 16,
                        time: 43.424,
                        elapsedTime: 794.988,
                    },
                    {
                        no: 17,
                        time: 43.793,
                        elapsedTime: 838.781,
                    },
                    {
                        no: 18,
                        time: 43.347,
                        elapsedTime: 882.128,
                    },
                    {
                        no: 19,
                        time: 43.427,
                        elapsedTime: 925.555,
                    },
                    {
                        no: 20,
                        time: 43.366,
                        elapsedTime: 968.921,
                    },
                    {
                        no: 21,
                        time: 43.627,
                        elapsedTime: 1012.548,
                    },
                    {
                        no: 22,
                        time: 43.721,
                        elapsedTime: 1056.269,
                    },
                    {
                        no: 23,
                        time: 43.676,
                        elapsedTime: 1099.945,
                    },
                    {
                        no: 24,
                        time: 43.075,
                        elapsedTime: 1143.02,
                    },
                    {
                        no: 25,
                        time: 43.196,
                        elapsedTime: 1186.216,
                    },
                    {
                        no: 26,
                        time: 43.482,
                        elapsedTime: 1229.698,
                    },
                    {
                        no: 27,
                        time: 44.11,
                        elapsedTime: 1273.808,
                    },
                    {
                        no: 28,
                        time: 43.627,
                        elapsedTime: 1317.435,
                    },
                    {
                        no: 29,
                        time: 43.482,
                        elapsedTime: 1360.917,
                    },
                    {
                        no: 30,
                        time: 43.742,
                        elapsedTime: 1404.659,
                    },
                    {
                        no: 31,
                        time: 44.039,
                        elapsedTime: 1448.698,
                    },
                    {
                        no: 32,
                        time: 43.702,
                        elapsedTime: 1492.4,
                    },
                    {
                        no: 33,
                        time: 42.924,
                        elapsedTime: 1535.324,
                    },
                    {
                        no: 34,
                        time: 43.462,
                        elapsedTime: 1578.786,
                    },
                    {
                        no: 35,
                        time: 43.26,
                        elapsedTime: 1622.046,
                    },
                    {
                        no: 36,
                        time: 43.529,
                        elapsedTime: 1665.575,
                    },
                    {
                        no: 37,
                        time: 44.029,
                        elapsedTime: 1709.604,
                    },
                    {
                        no: 38,
                        time: 43.518,
                        elapsedTime: 1753.122,
                    },
                    {
                        no: 39,
                        time: 43.293,
                        elapsedTime: 1796.415,
                    },
                    {
                        no: 40,
                        time: 43.523,
                        elapsedTime: 1839.938,
                    },
                    {
                        no: 41,
                        time: 43.371,
                        elapsedTime: 1883.309,
                    },
                    {
                        no: 42,
                        time: 43.584,
                        elapsedTime: 1926.893,
                    },
                    {
                        no: 43,
                        time: 43.013,
                        elapsedTime: 1969.906,
                    },
                    {
                        no: 44,
                        time: 43.532,
                        elapsedTime: 2013.438,
                    },
                    {
                        no: 45,
                        time: 43.925,
                        elapsedTime: 2057.363,
                    },
                    {
                        no: 46,
                        time: 43.103,
                        elapsedTime: 2100.466,
                    },
                    {
                        no: 47,
                        time: 43.812,
                        elapsedTime: 2144.278,
                    },
                    {
                        no: 48,
                        time: 43.992,
                        elapsedTime: 2188.27,
                    },
                    {
                        no: 49,
                        time: 44.588,
                        elapsedTime: 2232.858,
                    },
                    {
                        no: 50,
                        time: 42.986,
                        elapsedTime: 2275.844,
                    },
                    {
                        no: 51,
                        time: 43.56,
                        elapsedTime: 2319.404,
                    },
                    {
                        no: 52,
                        time: 43.868,
                        elapsedTime: 2363.272,
                    },
                    {
                        no: 53,
                        time: 43.726,
                        elapsedTime: 2406.998,
                    },
                    {
                        no: 54,
                        time: 43.187,
                        elapsedTime: 2450.185,
                    },
                ],
                startGap: 0,
                startTime: 606.658,
                endTime: 2450.1849999999995,
                duration: 1843.5269999999996,
                avgLapExcludingPitExitLap: 43.554384615384606,
                bestLap: 42.924,
                pilot: 'Chikiris',
                kart: '8',
            },
            {
                no: 3,
                laps: [
                    {
                        no: 55,
                        time: 251.446,
                        elapsedTime: 2701.631,
                    },
                    {
                        no: 56,
                        time: 43.417,
                        elapsedTime: 2745.048,
                    },
                    {
                        no: 57,
                        time: 42.834,
                        elapsedTime: 2787.882,
                    },
                    {
                        no: 58,
                        time: 42.922,
                        elapsedTime: 2830.804,
                    },
                    {
                        no: 59,
                        time: 43.226,
                        elapsedTime: 2874.03,
                    },
                    {
                        no: 60,
                        time: 42.812,
                        elapsedTime: 2916.842,
                    },
                    {
                        no: 61,
                        time: 42.587,
                        elapsedTime: 2959.429,
                    },
                    {
                        no: 62,
                        time: 42.731,
                        elapsedTime: 3002.16,
                    },
                    {
                        no: 63,
                        time: 42.712,
                        elapsedTime: 3044.872,
                    },
                    {
                        no: 64,
                        time: 42.883,
                        elapsedTime: 3087.755,
                    },
                    {
                        no: 65,
                        time: 42.692,
                        elapsedTime: 3130.447,
                    },
                    {
                        no: 66,
                        time: 43.447,
                        elapsedTime: 3173.894,
                    },
                    {
                        no: 67,
                        time: 43.035,
                        elapsedTime: 3216.929,
                    },
                    {
                        no: 68,
                        time: 43.021,
                        elapsedTime: 3259.95,
                    },
                    {
                        no: 69,
                        time: 42.497,
                        elapsedTime: 3302.447,
                    },
                    {
                        no: 70,
                        time: 42.84,
                        elapsedTime: 3345.287,
                    },
                    {
                        no: 71,
                        time: 42.564,
                        elapsedTime: 3387.851,
                    },
                    {
                        no: 72,
                        time: 43.018,
                        elapsedTime: 3430.869,
                    },
                    {
                        no: 73,
                        time: 42.48,
                        elapsedTime: 3473.349,
                    },
                    {
                        no: 74,
                        time: 42.69,
                        elapsedTime: 3516.039,
                    },
                    {
                        no: 75,
                        time: 42.912,
                        elapsedTime: 3558.951,
                    },
                    {
                        no: 76,
                        time: 43.008,
                        elapsedTime: 3601.959,
                    },
                    {
                        no: 77,
                        time: 42.596,
                        elapsedTime: 3644.555,
                    },
                    {
                        no: 78,
                        time: 42.881,
                        elapsedTime: 3687.436,
                    },
                    {
                        no: 79,
                        time: 42.644,
                        elapsedTime: 3730.08,
                    },
                    {
                        no: 80,
                        time: 43.867,
                        elapsedTime: 3773.947,
                    },
                    {
                        no: 81,
                        time: 42.763,
                        elapsedTime: 3816.71,
                    },
                    {
                        no: 82,
                        time: 43.791,
                        elapsedTime: 3860.501,
                    },
                    {
                        no: 83,
                        time: 42.622,
                        elapsedTime: 3903.123,
                    },
                    {
                        no: 84,
                        time: 42.189,
                        elapsedTime: 3945.312,
                    },
                    {
                        no: 85,
                        time: 42.719,
                        elapsedTime: 3988.031,
                    },
                    {
                        no: 86,
                        time: 42.453,
                        elapsedTime: 4030.484,
                    },
                    {
                        no: 87,
                        time: 42.581,
                        elapsedTime: 4073.065,
                    },
                    {
                        no: 88,
                        time: 43.401,
                        elapsedTime: 4116.466,
                    },
                    {
                        no: 89,
                        time: 42.198,
                        elapsedTime: 4158.664,
                    },
                    {
                        no: 90,
                        time: 42.622,
                        elapsedTime: 4201.286,
                    },
                    {
                        no: 91,
                        time: 42.534,
                        elapsedTime: 4243.82,
                    },
                    {
                        no: 92,
                        time: 43.159,
                        elapsedTime: 4286.979,
                    },
                    {
                        no: 93,
                        time: 43.156,
                        elapsedTime: 4330.135,
                    },
                    {
                        no: 94,
                        time: 43.01,
                        elapsedTime: 4373.145,
                    },
                    {
                        no: 95,
                        time: 42.406,
                        elapsedTime: 4415.551,
                    },
                    {
                        no: 96,
                        time: 43.202,
                        elapsedTime: 4458.753,
                    },
                    {
                        no: 97,
                        time: 43.537,
                        elapsedTime: 4502.29,
                    },
                    {
                        no: 98,
                        time: 42.911,
                        elapsedTime: 4545.201,
                    },
                    {
                        no: 99,
                        time: 42.79,
                        elapsedTime: 4587.991,
                    },
                    {
                        no: 100,
                        time: 42.376,
                        elapsedTime: 4630.367,
                    },
                    {
                        no: 101,
                        time: 42.444,
                        elapsedTime: 4672.811,
                    },
                    {
                        no: 102,
                        time: 42.571,
                        elapsedTime: 4715.382,
                    },
                ],
                startGap: 0,
                startTime: 2450.1849999999995,
                endTime: 4715.382,
                duration: 2265.1970000000006,
                avgLapExcludingPitExitLap: 42.84576595744682,
                bestLap: 42.189,
                pilot: 'Pangaev',
                kart: '10',
            },
            {
                no: 4,
                laps: [
                    {
                        no: 103,
                        time: 149.904,
                        elapsedTime: 4865.286,
                    },
                    {
                        no: 104,
                        time: 43.406,
                        elapsedTime: 4908.692,
                    },
                    {
                        no: 105,
                        time: 43.066,
                        elapsedTime: 4951.758,
                    },
                    {
                        no: 106,
                        time: 42.813,
                        elapsedTime: 4994.571,
                    },
                    {
                        no: 107,
                        time: 42.412,
                        elapsedTime: 5036.983,
                    },
                    {
                        no: 108,
                        time: 42.49,
                        elapsedTime: 5079.473,
                    },
                    {
                        no: 109,
                        time: 42.371,
                        elapsedTime: 5121.844,
                    },
                    {
                        no: 110,
                        time: 42.524,
                        elapsedTime: 5164.368,
                    },
                    {
                        no: 111,
                        time: 42.194,
                        elapsedTime: 5206.562,
                    },
                    {
                        no: 112,
                        time: 42.571,
                        elapsedTime: 5249.133,
                    },
                    {
                        no: 113,
                        time: 42.195,
                        elapsedTime: 5291.328,
                    },
                    {
                        no: 114,
                        time: 42.6,
                        elapsedTime: 5333.928,
                    },
                    {
                        no: 115,
                        time: 42.57,
                        elapsedTime: 5376.498,
                    },
                    {
                        no: 116,
                        time: 42.49,
                        elapsedTime: 5418.988,
                    },
                ],
                startGap: 0,
                startTime: 4715.382,
                endTime: 5418.987999999999,
                duration: 703.6060000000001,
                avgLapExcludingPitExitLap: 42.59246153846155,
                bestLap: 42.194,
                pilot: 'Chikiris',
                kart: '7',
            },
            {
                no: 5,
                laps: [
                    {
                        no: 117,
                        time: 142.60399999999998,
                        elapsedTime: 5561.592,
                    },
                    {
                        no: 118,
                        time: 43.928,
                        elapsedTime: 5605.52,
                    },
                ],
                startGap: 0,
                startTime: 5418.987999999999,
                endTime: 5605.5199999999995,
                duration: 186.53199999999998,
                avgLapExcludingPitExitLap: 43.928,
                bestLap: 43.928,
                pilot: 'Pasichenko',
                kart: '16',
            },
            {
                no: 6,
                laps: [
                    {
                        no: 119,
                        time: 146.763,
                        elapsedTime: 5752.283,
                    },
                    {
                        no: 120,
                        time: 43.265,
                        elapsedTime: 5795.548,
                    },
                    {
                        no: 121,
                        time: 43.233,
                        elapsedTime: 5838.781,
                    },
                    {
                        no: 122,
                        time: 43.13,
                        elapsedTime: 5881.911,
                    },
                    {
                        no: 123,
                        time: 42.911,
                        elapsedTime: 5924.822,
                    },
                    {
                        no: 124,
                        time: 43.229,
                        elapsedTime: 5968.051,
                    },
                    {
                        no: 125,
                        time: 42.951,
                        elapsedTime: 6011.002,
                    },
                    {
                        no: 126,
                        time: 42.545,
                        elapsedTime: 6053.547,
                    },
                    {
                        no: 127,
                        time: 43.138,
                        elapsedTime: 6096.685,
                    },
                    {
                        no: 128,
                        time: 42.585,
                        elapsedTime: 6139.27,
                    },
                    {
                        no: 129,
                        time: 42.468,
                        elapsedTime: 6181.738,
                    },
                    {
                        no: 130,
                        time: 42.284,
                        elapsedTime: 6224.022,
                    },
                    {
                        no: 131,
                        time: 42.272,
                        elapsedTime: 6266.294,
                    },
                    {
                        no: 132,
                        time: 42.471,
                        elapsedTime: 6308.765,
                    },
                    {
                        no: 133,
                        time: 42.302,
                        elapsedTime: 6351.067,
                    },
                    {
                        no: 134,
                        time: 42.378,
                        elapsedTime: 6393.445,
                    },
                    {
                        no: 135,
                        time: 42.365,
                        elapsedTime: 6435.81,
                    },
                    {
                        no: 136,
                        time: 42.695,
                        elapsedTime: 6478.505,
                    },
                    {
                        no: 137,
                        time: 42.425,
                        elapsedTime: 6520.93,
                    },
                    {
                        no: 138,
                        time: 42.516,
                        elapsedTime: 6563.446,
                    },
                    {
                        no: 139,
                        time: 42.537,
                        elapsedTime: 6605.983,
                    },
                    {
                        no: 140,
                        time: 42.75,
                        elapsedTime: 6648.733,
                    },
                    {
                        no: 141,
                        time: 42.493,
                        elapsedTime: 6691.226,
                    },
                    {
                        no: 142,
                        time: 42.404,
                        elapsedTime: 6733.63,
                    },
                    {
                        no: 143,
                        time: 42.204,
                        elapsedTime: 6775.834,
                    },
                    {
                        no: 144,
                        time: 42.278,
                        elapsedTime: 6818.112,
                    },
                    {
                        no: 145,
                        time: 42.456,
                        elapsedTime: 6860.568,
                    },
                    {
                        no: 146,
                        time: 42.251,
                        elapsedTime: 6902.819,
                    },
                    {
                        no: 147,
                        time: 42.367,
                        elapsedTime: 6945.186,
                    },
                    {
                        no: 148,
                        time: 42.294,
                        elapsedTime: 6987.48,
                    },
                    {
                        no: 149,
                        time: 42.495,
                        elapsedTime: 7029.975,
                    },
                    {
                        no: 150,
                        time: 42.496,
                        elapsedTime: 7072.471,
                    },
                    {
                        no: 151,
                        time: 42.699,
                        elapsedTime: 7115.17,
                    },
                    {
                        no: 152,
                        time: 42.222,
                        elapsedTime: 7157.392,
                    },
                    {
                        no: 153,
                        time: 42.377,
                        elapsedTime: 7199.769,
                    },
                    {
                        no: 154,
                        time: 42.508,
                        elapsedTime: 7242.277,
                    },
                ],
                startGap: 0,
                startTime: 5605.5199999999995,
                endTime: 7242.277,
                duration: 1636.757,
                avgLapExcludingPitExitLap: 42.57125714285715,
                bestLap: 42.204,
                pilot: 'Pasichenko',
                kart: '1',
            },
        ],
    },
};
