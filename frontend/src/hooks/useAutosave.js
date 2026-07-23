import { useEffect } from "react";

const useAutoSave = (values, saveFunction, delay = 1000) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            saveFunction(values);
        }, delay);
        return () => clearTimeout(timer);
    }, [values, saveFunction, delay]);
};
export default useAutoSave;