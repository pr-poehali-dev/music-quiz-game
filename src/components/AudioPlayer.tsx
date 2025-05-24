import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

interface AudioPlayerProps {
  audioUrl: string;
  songTitle: string;
  artist: string;
}

export default function AudioPlayer({
  audioUrl,
  songTitle,
  artist,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);
    audio.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
      audio.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = (value[0] / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newVolume = value[0] / 100;
    audio.volume = newVolume;
    setVolume(newVolume);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-lg p-4 mb-6">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-purple-300 font-semibold">{artist}</h3>
          <p className="text-gray-400 text-sm">"{songTitle}"</p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Volume2" size={16} className="text-purple-400" />
          <div className="w-16">
            <Progress
              value={volume * 100}
              className="h-1 cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percentage = (x / rect.width) * 100;
                handleVolumeChange([percentage]);
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button
          onClick={togglePlayPause}
          size="icon"
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-full"
        >
          <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
        </Button>

        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <span className="text-xs text-gray-400 min-w-[35px]">
              {formatTime(currentTime)}
            </span>
            <div className="flex-1">
              <Progress
                value={progressPercentage}
                className="h-2 cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const percentage = (x / rect.width) * 100;
                  handleSeek([percentage]);
                }}
              />
            </div>
            <span className="text-xs text-gray-400 min-w-[35px]">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Icon name="Music" size={16} className="text-purple-400" />
          <span className="text-xs text-purple-300">Отрывок</span>
        </div>
      </div>
    </div>
  );
}
