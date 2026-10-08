import React from 'react';
import { X, Hand, CheckCircle2, ArrowRight } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface InstructionModalProps {
  onClose: () => void;
  onStartPlaying?: () => void;
}

export const InstructionModal: React.FC<InstructionModalProps> = ({ onClose, onStartPlaying }) => {
  const steps = [
    { number: '1', title: 'Baca Soal & Instruksi', desc: 'Perhatikan kartu soal dan narasi misi dengan cermat.' },
    { number: '2', title: 'Pilih Objek Jawaban', desc: 'Lihat pilihan kartu jawaban di sebelah kiri.' },
    { number: '3', title: 'Seret / Ketuk Objek', desc: 'Seret kartu menuju kotak tujuan (atau ketuk kartu lalu ketuk kotak).' },
    { number: '4', title: 'Lepaskan Pada Tempatnya', desc: 'Lepaskan di kotak tujuan yang bergaris putus-putus.' },
    { number: '5', title: 'Dapatkan +20 Poin', desc: 'Jika tepat, kamu akan mendapat 20 poin dan feedback seru!' },
    { number: '6', title: 'Selesaikan 5 Soal', desc: 'Tiap level terdiri dari 5 soal bertahap yang menarik.' },
    { number: '7', title: 'Raih Min. 80 Poin', desc: 'Kumpulkan minimal 80 poin untuk membuka level berikutnya!' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-pop">
      <div className="relative w-full max-w-xl bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border-4 border-sky-400 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🧭</span>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-sky-600">
                PETUNJUK BERMAIN
              </h3>
              <p className="text-xs font-semibold text-slate-500">
                Cara seru menaklukkan Misi Pintar!
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Animated Drag and Drop Visual Simulation */}
        <div className="my-4 p-4 rounded-2xl bg-sky-50 border-2 border-dashed border-sky-300">
          <div className="text-xs font-bold text-sky-800 mb-2 flex items-center gap-1.5">
            <Hand className="w-4 h-4 text-sky-600 animate-wiggle" />
            <span>Simulasi Mekanisme Drag & Drop</span>
          </div>

          <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
            {/* Draggable sample */}
            <div className="flex-1 bg-white border-2 border-emerald-400 p-2.5 rounded-xl text-center shadow-sm font-bold text-slate-800 flex items-center justify-center gap-1.5 animate-pulse">
              <span>🔢</span>
              <span>2² × 3</span>
            </div>

            <div className="flex flex-col items-center justify-center text-sky-500 font-extrabold animate-wiggle">
              <span className="text-xs">Seret ke</span>
              <ArrowRight className="w-5 h-5" />
            </div>

            {/* Target sample */}
            <div className="flex-1 border-2 border-dashed border-emerald-500 bg-emerald-50/50 p-2.5 rounded-xl text-center font-semibold text-emerald-800 flex items-center justify-center gap-1">
              <span>🎯</span>
              <span className="text-[11px] leading-tight">Faktorisasi 12</span>
            </div>
          </div>
          <div className="text-[11px] text-slate-500 text-center mt-2 font-medium">
            💡 <em>Di layar sentuh, kamu juga bisa cukup ketuk kartu, lalu ketuk kotak tujuannya!</em>
          </div>
        </div>

        {/* Step by step instructions */}
        <div className="space-y-2 mb-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100"
            >
              <div className="w-6 h-6 rounded-full bg-sky-500 text-white font-extrabold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                {step.number}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                  {step.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-500">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            if (onStartPlaying) {
              onStartPlaying();
            } else {
              onClose();
            }
          }}
          className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-sky-500 hover:bg-sky-600 active:scale-95 text-white font-bold text-base shadow-lg shadow-sky-500/25 transition-all cursor-pointer"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>SAYA SUDAH PAHAM, AYO MAIN!</span>
        </button>
      </div>
    </div>
  );
};
