import React, {useEffect, useState, useRef} from 'react';
import {Button} from '@/components/ui/button';

interface SessionCaptureProps {
    onSessionEnd: (blob: Blob) => void;
}

const SessionCapture: React.FC<SessionCaptureProps> = ({onSessionEnd}) => {
    const [isSessionActive, setIsSessionActive] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
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
        try {
            const newStream = await navigator.mediaDevices.getUserMedia({video: true});
            streams.current.add(newStream);
            setVideoStream(newStream);
            console.log(`Camera enabled: ${newStream.id}`);
        } catch (error) {
            console.error("Error accessing camera: ", error);
        }
    };

    const setVideoStream = (stream: MediaStream) => {
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
        }
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
        const blob = new Blob(recordedChunks, {type: 'video/webm'});
        console.log(blob)
        onSessionEnd(blob);
    };

    return (
        <div className="relative w-full h-screen">
            <div className="w-full h-full flex flex-col items-center">
                {isSessionActive && (
                    <video ref={videoRef} autoPlay muted className="w-full h-full object-cover"/>
                )}
            </div>
            <div className="absolute bottom-0 w-full flex justify-center p-4 gap-5">
                {isSessionActive && (
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
                        <Button variant={"secondary"} size={"lg"} onClick={handleSessionEnd}>
                            End Session
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default SessionCapture;
