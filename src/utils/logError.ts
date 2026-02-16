const logError = (message: string, error?: any) => {
    if (import.meta.env.DEV) {
        console.error(`[AirHub Error] ${message}`, error);
    }
};

export default logError;
