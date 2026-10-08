import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface ResetConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-sm animate-pop">
      <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 text-center shadow-2xl border-4 border-rose-400">
        <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <h3 className="text-xl font-black text-slate-800 mb-1">
          HAPUS PROGRESS?
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
          Semua bintang, lencana, skor terbaik, dan status level yang terbuka akan direset kembali dari awal. Apakah kamu yakin?
        </p>

        <div className="flex flex-col gap-2.5">
          <button
            onClick={() => {
              soundEngine.playWrong();
              onConfirm();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-bold text-sm shadow-lg shadow-rose-500/25 transition-all cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>YA, RESET PROGRESS</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              onCancel();
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-bold text-sm transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>BATAL</span>
          </button>
        </div>
      </div>
    </div>
  );
};
