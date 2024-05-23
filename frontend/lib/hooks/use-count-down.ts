import { useEffect, useState, useCallback } from 'react';

const useCountdown = (initialCount: number, onFinish: () => void) => {
    const [countDown, setCountDown] = useState(initialCount);
    const [isActive, setIsActive] = useState(false);

    const startCountDown = useCallback(() => {
        setIsActive(true);
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isActive && countDown > 0) {
            interval = setInterval(() => {
                setCountDown((prevCountDown) => prevCountDown - 1);
            }, 1000);
        } else if (countDown === 0) {
            setIsActive(false);
            if (interval) clearInterval(interval);
            onFinish()
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, countDown]);

    return { countDown, startCountDown };
};

export { useCountdown };
