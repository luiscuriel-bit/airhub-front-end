import { useEffect, useRef } from "react";
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_BACKEND_SERVER_URL || 'http://localhost:3000';

export const useSocket = (onEvent?: (event: string, data: any) => void) => {
    const socketRef = useRef<Socket | null>(null);
    useEffect(() => {
        // Conectar al socket
        const socket = io(SOCKET_URL, {
            withCredentials: true,
        });
        socketRef.current = socket;
        // Escuchar todos los eventos (si se provee un callback)
        if (onEvent) {
            socket.onAny((event, data) => {
                onEvent(event, data);
            });
        }
        // Limpiar al desmontar el componente
        return () => {
            socket.disconnect();
        };
    }, [onEvent]);
    return socketRef.current;
};