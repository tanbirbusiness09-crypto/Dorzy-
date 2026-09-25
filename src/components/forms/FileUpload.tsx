import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, X } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';

export interface FileUploadProps {
  label?: string;
  helperText?: string;
  accept?: string;
  maxSizeMb?: number;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label = 'Upload Measurement Sheet / Fabric Swatch',
  helperText = 'PDF, PNG, JPG up to 10MB',
  accept = '.pdf,.png,.jpg,.jpeg',
  maxSizeMb = 10,
  className = '',
}) => {
  const { isRtl } = useLanguage();
  const [file, setFile] = useState<{ name: string; size: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleSimulatedDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setFile({
      name: isRtl ? 'قياسات_ثوب_سعودي_معتمدة.pdf' : 'saudi_thobe_measurements.pdf',
      size: '1.4 MB',
    });
  };

  const handleSimulatedSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFile({
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
      });
    }
  };

  return (
    <div className={`w-full text-start ${className}`}>
      {label && <label className="block text-xs font-medium text-[#121316] mb-1.5">{label}</label>}

      {!file ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleSimulatedDrop}
          className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
            isDragging
              ? 'border-[#C5A880] bg-[#FBF8F3]'
              : 'border-[#D4D0C7] bg-[#FAF9F6] hover:border-[#B8935A] hover:bg-[#FFFFFF]'
          }`}
        >
          <input
            type="file"
            accept={accept}
            onChange={handleSimulatedSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="w-10 h-10 mx-auto rounded-full bg-[#F5F3EF] border border-[#E6E2DB] flex items-center justify-center text-[#916F3E] mb-2.5">
            <Upload className="w-5 h-5" />
          </div>
          <p className="text-xs sm:text-sm font-medium text-[#121316]">
            {isRtl ? 'اسحب الملف هنا أو انقر للتصفح' : 'Drag & drop file here or click to browse'}
          </p>
          <p className="text-[11px] text-[#8E8B85] mt-1">{helperText}</p>
        </div>
      ) : (
        <div className="p-3 bg-[#FFFFFF] rounded-lg border border-[#E6E2DB] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded bg-[#F2F7F4] text-[#1E5638] flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="truncate">
              <p className="text-xs font-medium text-[#121316] truncate">{file.name}</p>
              <p className="text-[10px] text-[#8E8B85]">{file.size}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setFile(null)}
            className="p-1 text-[#8E8B85] hover:text-red-600 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
