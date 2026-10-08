import React from 'react';
import { X, Heart, ShieldCheck, Sparkles, GraduationCap } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface AboutModalProps {
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-pop">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border-4 border-rose-300 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🎒</span>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-rose-600">
                TENTANG GAME
              </h3>
              <p className="text-xs font-semibold text-slate-500">
                Misi Pintar untuk Siswa SD
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

        <div className="my-4 space-y-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div className="bg-rose-50 border border-rose-100 p-3.5 rounded-2xl flex items-start gap-3">
            <GraduationCap className="w-6 h-6 text-rose-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-800 text-sm mb-1">
                Tujuan Pembelajaran
              </h4>
              <p className="text-slate-600">
                Aplikasi ini dirancang khusus untuk membantu siswa Sekolah Dasar memahami materi Matematika BAB 2: Menentukan KPK dan FPB dengan Menggunakan Faktor Bilangan Prima secara interaktif, aktif, dan menyenangkan tanpa tekanan.
              </p>
            </div>
          </div>

          <div className="bg-sky-50 border border-sky-100 p-3.5 rounded-2xl flex items-start gap-3">
            <Sparkles className="w-6 h-6 text-sky-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-800 text-sm mb-1">
                Mekanisme Interaktif 2D
              </h4>
              <p className="text-slate-600">
                Menggunakan kontrol drag-and-drop responsif, audio umpan balik langsung, sistem leveling bertahap, serta lencana kehormatan untuk memotivasi anak belajar mandiri.
              </p>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 p-3.5 rounded-2xl flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-800 text-sm mb-1">
                Ramah Anak & Aman
              </h4>
              <p className="text-slate-600">
                100% aman untuk anak, tanpa iklan yang mengganggu, dan semua data kemajuan tersimpan rapi langsung di browser.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2 text-center text-xs text-slate-400 font-medium flex items-center justify-center gap-1">
          <span>Dibuat dengan</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          <span>untuk Generasi Pintar Indonesia</span>
        </div>
      </div>
    </div>
  );
};
