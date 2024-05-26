import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface SessionCaptureProps {
    onSessionEnd: (blob: Blob) => void;
}

const SessionCapture: React.FC<SessionCaptureProps> = ({ onSessionEnd }) => {
    const [isSessionActive, setIsSessionActive] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const streams = useRef<Set<MediaStream>>(new Set());
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    useEffect(() => {
        handleSessionStart();
    }, []);

    const enableCamera = async () => {
        if (streams.current.size > 0) {
            console.log("Camera already enabled");
            return;
        }
        setIsLoading(true);
        setProgress(0);

        const minLoadingTime = new Promise(resolve => setTimeout(resolve, 1000));

        try {
            let progressValue = 0;
            const interval = setInterval(() => {
                if (progressValue < 100) {
                    progressValue += 25;
                    setProgress(progressValue);
                } else {
                    clearInterval(interval);
                }
            }, 200);

            await Promise.all([minLoadingTime, setVideoStream()]);
        } catch (error) {
            console.error("Error accessing camera: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    const setVideoStream = async () => {
        const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
        streams.current.add(newStream);
        if (videoRef.current) {
            videoRef.current.srcObject = newStream;
        }
        console.log(`Camera enabled: ${newStream.id}`);
    };

    const disableAllCameras = () => {
        streams.current.forEach(stream => {
            console.log(`Disabling camera: ${stream.id}`);
            stream.getTracks().forEach(track => track.stop());
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
        });
        streams.current.clear();
    };

    const handleSessionStart = () => {
        setIsSessionActive(true);
        enableCamera();
        setRecordedChunks([]);
    };

    const handleSessionEnd = () => {
        setIsSessionActive(false);
        combineClips();
        disableAllCameras();
    };

    const handleMouseDown = () => {
        if (streams.current.size > 0) {
            const stream = Array.from(streams.current)[0];
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    addChunk(event.data);
                }
            };
            mediaRecorder.start();
            mediaRecorderRef.current = mediaRecorder;
            setIsRecording(true);
        }
    };

    const handleMouseUp = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current = null;
            setIsRecording(false);
        }
    };

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
    };

    const addChunk = (chunk: Blob) => {
        const existingBlob = new Blob(recordedChunks);
        const newBlob = new Blob([existingBlob, chunk], { type: 'video/webm' });
        setRecordedChunks([newBlob]);
    };

    const combineClips = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        console.log(blob);
        onSessionEnd(blob);
    };

    return (
        <div className="relative w-full h-screen">
            <div className="w-full h-full flex flex-col items-center relative">
                {isSessionActive && (
                    <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
                )}
                {(isLoading || isRecording) && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-50">
                        {isLoading ? <Progress value={progress} className="w-[60%] h-[.5%]" /> : null}
                    </div>
                )}
            </div>

            <div className="absolute top-0 left-0 m-4">
                {isSessionActive && !isLoading && (
                    <Button size={"sm"} variant={"ghost"} onClick={handleSessionEnd}>
                        <span className={"text-3xl text-white font-extralight"}>x</span>
                    </Button>
                )}
            </div>

            <div className="absolute bottom-0 w-full flex justify-center p-4 gap-5 py-6">
                {isSessionActive && !isLoading && (
                    <>
                        <Button
                            variant={"secondary"}
                            size={"lg"}
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                            onTouchStart={handleMouseDown}
                            onTouchEnd={handleMouseUp}
                            onContextMenu={handleContextMenu}
                        >
                            {isRecording ? "Recording..." : "Capture this moment"}
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default SessionCapture;
