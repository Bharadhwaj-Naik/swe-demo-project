import React from 'react';
import { FileText, Plus } from 'lucide-react';

const EmptyState = ({ onActionClick, title, description, buttonText }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-linear-to-b from-white to-slate-50/50">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-slate-100 to-slate-200 mb-6">
        <FileText className="w-8 h-8 text-slate-400" strokeWidth={2} />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 mb-8 max-w-sm">{description}</p>
      {buttonText && onActionClick && (
        <button
          onClick={onActionClick}
          className="group inline-flex items-center gap-2 px-6 h-12 bg-linear-to-r from-emerald-500 to-teal-500 text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/25 active:scale-95 hover:shadow-xl hover:shadow-emerald-500/30 overflow-hidden relative"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Plus className="w-4 h-4" strokeWidth={2.5} />
            {buttonText}
          </span>
          <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </button>
      )}
    </div>
  );
};

export default EmptyState;
