import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RunningMetricsState {
    distance: number;
    avgMileTime: string;
    currentPace: string;
    totalTime: string;
    elapsedTime: number;
    lastDistance: number;
    startTime: number | null;
    lastTime: number | null;
}

const initialState: RunningMetricsState = {
    distance: 0,
    avgMileTime: '00:00',
    currentPace: '00:00',
    totalTime: '00:00:00',
    elapsedTime: 0,
    lastDistance: 0,
    startTime: null,
    lastTime: null,
};

const runningMetricsSlice = createSlice({
    name: 'runningMetrics',
    initialState,
    reducers: {
        startRunning: (state) => {
            if (state.startTime === null) {
                state.startTime = Date.now();
            } else {
                state.lastTime = Date.now();
            }
        },
        stopRunning: (state) => {
            if (state.lastTime !== null) {
                const currentTime = Date.now();
                state.elapsedTime += (currentTime - state.lastTime) / 1000;
                state.lastTime = null;
            }
        },
        updateDistance: (state, action: PayloadAction<number>) => {
            state.distance += action.payload;
        },
        updateElapsedTime: (state, action: PayloadAction<number>) => {
            state.elapsedTime += action.payload;
        },
        updateMetrics: (state) => {
            const currentTime = Date.now();
            if (state.lastTime !== null) {
                const elapsed = (currentTime - state.lastTime) / 1000; // in seconds
                const pace = (elapsed / (state.distance - state.lastDistance)).toFixed(2); // time per mile
                state.currentPace = formatTime(parseFloat(pace));
            }
            if (state.distance >= 1) {
                const totalElapsedTime = state.elapsedTime; // in seconds
                const avgPace = (totalElapsedTime / state.distance).toFixed(2); // average time per mile
                state.avgMileTime = formatTime(parseFloat(avgPace));
            }
            state.lastDistance = state.distance;
            state.lastTime = currentTime;
        },
        updateTotalTime: (state) => {
            state.totalTime = formatTime(state.elapsedTime);
        },
    },
});

const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const {
    startRunning,
    stopRunning,
    updateDistance,
    updateElapsedTime,
    updateMetrics,
    updateTotalTime,
} = runningMetricsSlice.actions;

export default runningMetricsSlice.reducer;
