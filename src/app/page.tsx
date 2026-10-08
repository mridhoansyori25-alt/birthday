"use client";

import React, { useState, useRef } from "react";
import confetti from "canvas-confetti";
import {
  Heart,
  Sparkles,
  Camera,
  VolumeX,
  Volume2,
  Cake,
  Stars,
  Flame,
  Share2,
  Upload,
} from "lucide-react";

// Web Audio synthesizer for cute chime sounds & birthday tune
class SoundPlayer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playPop() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  playChime() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        this.ctx.currentTime + idx * 0.08 + 0.4
      );
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + idx * 0.08);
      osc.stop(this.ctx.currentTime + idx * 0.08 + 0.4);
    });
  }

  playBirthdayJingle() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    const melody = [
      { f: 392, d: 0.25 },
      { f: 392, d: 0.25 },
      { f: 440, d: 0.5 },
      { f: 392, d: 0.5 },
      { f: 523.25, d: 0.5 },
      { f: 493.88, d: 0.8 },
    ];
    let time = this.ctx.currentTime;
    melody.forEach((note) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(note.f, time);
      gain.gain.setValueAtTime(0.25, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + note.d);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(time);
      osc.stop(time + note.d);
      time += note.d + 0.08;
    });
  }

  toggleMute(muted: boolean) {
    this.isMuted = muted;
  }
}

const sounds = new SoundPlayer();

export default function BirthdayPage() {
  const [isCandleBlown, setIsCandleBlown] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>("/foto_lutfiah.jpeg");
  const [copiedLink, setCopiedLink] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBlowCandle = () => {
    if (!isCandleBlown) {
      setIsCandleBlown(true);
      sounds.playChime();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ["#bae3fd", "#fecddb", "#fff2b2", "#fba0ba", "#7dd1fc"],
      });
    } else {
      setIsCandleBlown(false);
      sounds.playPop();
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotoUrl(event.target.result as string);
          sounds.playPop();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      sounds.playPop();
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#f0f7ff] via-[#fff1f5] to-[#e4f2fe] text-slate-700 overflow-x-hidden pb-16">
      {/* Floating Pastel Balloons & Decor */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft pastel balloon 1 (Pink) */}
        <div className="absolute top-12 left-6 md:left-16 w-20 h-28 bg-gradient-to-b from-[#ffd1df] to-[#fba0ba] rounded-[50%_50%_45%_45%] opacity-70 animate-float shadow-lg shadow-pink-200/50">
          <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-2 h-3 bg-pink-300 rounded-sm"></div>
          <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-[1px] h-8 bg-pink-300"></div>
        </div>

        {/* Soft pastel balloon 2 (Blue) */}
        <div className="absolute top-28 right-8 md:right-24 w-24 h-32 bg-gradient-to-b from-[#cce9ff] to-[#9ad5ff] rounded-[50%_50%_45%_45%] opacity-70 animate-float-delayed shadow-lg shadow-sky-200/50">
          <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-2 h-3 bg-sky-300 rounded-sm"></div>
          <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-[1px] h-8 bg-sky-300"></div>
        </div>

        {/* Soft pastel balloon 3 (Pink small) */}
        <div className="hidden lg:block absolute bottom-32 left-20 w-16 h-22 bg-gradient-to-b from-[#ffe4ec] to-[#fca5be] rounded-[50%_50%_45%_45%] opacity-60 animate-float"></div>

        {/* Soft pastel balloon 4 (Blue small) */}
        <div className="hidden lg:block absolute bottom-40 right-20 w-18 h-24 bg-gradient-to-b from-[#d9efff] to-[#aee0fc] rounded-[50%_50%_45%_45%] opacity-60 animate-float-delayed"></div>

        {/* Floating Sparkles & Hearts */}
        <div className="absolute top-1/4 left-1/3 text-pink-300 animate-shimmer">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="absolute top-2/3 right-1/4 text-sky-300 animate-shimmer delay-700">
          <Stars className="w-7 h-7" />
        </div>
        <div className="absolute top-1/2 left-10 text-pink-300 animate-pulse-heart">
          <Heart className="w-5 h-5 fill-pink-200" />
        </div>
      </div>

      {/* Top Navbar Bar / Controls */}
      <header className="relative z-10 max-w-4xl mx-auto pt-6 px-4 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-pink-200/60 shadow-sm text-xs md:text-sm font-medium text-pink-600">
          <Sparkles
            className="w-4 h-4 text-pink-400 animate-spin"
            style={{ animationDuration: "6s" }}
          />
         
        </div>

        <div className="flex items-center gap-2">
          {/* Audio Chime Toggle Button */}
          <button
            onClick={() => {
              const nextMute = !isMuted;
              setIsMuted(nextMute);
              sounds.toggleMute(nextMute);
              if (!nextMute) sounds.playBirthdayJingle();
            }}
            className="p-2.5 rounded-full bg-white/80 backdrop-blur-md border border-sky-200/70 text-sky-600 hover:bg-sky-50 transition shadow-sm"
            title={isMuted ? "Aktifkan Musik" : "Matikan Suara"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/80 backdrop-blur-md border border-pink-200/70 text-xs font-medium text-pink-600 hover:bg-pink-50 transition shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? "Link Tersalin! ✨" : "Bagikan"}</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 mt-8 flex flex-col items-center text-center">
        {/* Cute Birthday Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-sky-100 to-pink-100 border border-pink-200 text-xs md:text-sm font-semibold text-slate-700 mb-4 shadow-sm animate-bounce"
          style={{ animationDuration: "3s" }}
        >
          
          <span>barakallah fi umrik!</span>
          
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-sky-400 via-pink-400 to-sky-500 bg-clip-text text-transparent">
            Wish you all the best,
          </span>
          <br />
          <span className="relative inline-block mt-1 font-black text-pink-500 drop-shadow-sm">
            Lutfiah!
            <span
              className="absolute -top-3 -right-6 text-2xl animate-spin"
              style={{ animationDuration: "5s" }}
            >
              ✨
            </span>
          </span>
        </h1>

        <p className="mt-4 max-w-lg text-slate-600 text-sm md:text-base leading-relaxed">
         gabisa ngasih apa-apa, aku lagi di Balikpapan soalnya ehe -Ridho
        </p>

        {/* Interactive Candle Section */}
        <div className="mt-8 p-5 bg-white/80 backdrop-blur-md rounded-2xl border border-sky-100 shadow-md max-w-xs w-full flex flex-col items-center">
          <div className="relative mb-3 flex items-center justify-center">
            <Cake className="w-16 h-16 text-pink-400" />
            <div
              onClick={handleBlowCandle}
              className={`absolute -top-2 cursor-pointer transition-transform duration-300 ${
                isCandleBlown ? "scale-0 opacity-0" : "scale-100 opacity-100"
              }`}
              title="Klik untuk tiup lilin!"
            >
              <Flame className="w-6 h-6 text-amber-400 fill-amber-300 animate-pulse" />
            </div>
          </div>

          <p className="text-xs font-medium text-slate-500 mb-3">
            {isCandleBlown
              ? "yeeyyyyy ✨"
              : "pencet aja"}
          </p>

          <button
            onClick={handleBlowCandle}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 shadow-sm ${
              isCandleBlown
                ? "bg-sky-100 text-sky-700 hover:bg-sky-200"
                : "bg-gradient-to-r from-pink-400 to-sky-400 text-white hover:opacity-90 active:scale-95"
            }`}
          >
            {isCandleBlown ? "Nyalakan Lilin Lagi 🔥" : "Tiup Lilin 🎂"}
          </button>
        </div>

        {/* Polaroid Photo Section */}
        <div className="mt-12 w-full flex flex-col items-center">
          <div className="text-center mb-5">
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
              <Camera className="w-5 h-5 text-sky-400" />
              <span>ntah, gada foto yg bagus di hp ku</span>
            
            </h2>
      
          </div>

          {/* Polaroid Frame */}
          <div className="group relative bg-white p-4 pb-6 rounded-xl shadow-xl border border-pink-100/80 max-w-sm w-full transform rotate-[-1.5deg] hover:rotate-0 transition-all duration-300 hover:shadow-2xl">
            {/* Washi Tape Accent */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-pink-200/70 border border-pink-300/40 rounded-sm opacity-90 transform -rotate-2"></div>

            {/* Photo Container */}
            <div className="relative aspect-[4/3] w-full rounded-lg bg-gradient-to-tr from-sky-100 via-pink-50 to-sky-50 overflow-hidden flex items-center justify-center border border-slate-100">
              {photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photoUrl}
                  alt="Foto bersama Lutfiah"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center text-slate-400">
                  <div className="w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center text-pink-400 mb-2 shadow-inner">
                    <Camera className="w-7 h-7" />
                  </div>
                  
                </div>
              )}

              
              
            </div>

            {/* Polaroid Handwritten Caption */}
            
          </div>
        </div>
      </div>

    
    </main>
  );
}
