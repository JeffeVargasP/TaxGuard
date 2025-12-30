"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Upload, FileText, CheckCircle2, Loader2 } from "lucide-react";
import { useCallback, useState } from "react";

type UploadStatus = "idle" | "parsing" | "auditing" | "completed" | "error";

interface XMLDropzoneProps {
  onUploadComplete?: (files: File[]) => void;
}

export function XMLDropzone({ onUploadComplete }: XMLDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFiles = useCallback(async (files: File[]) => {
    setUploadedFiles(files);
    setUploadStatus("parsing");
    setProgress(0);

    // Simular parsing
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setProgress(i);
    }

    setUploadStatus("auditing");
    setProgress(0);

    // Simular auditoria
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setProgress(i);
    }

    setUploadStatus("completed");
    onUploadComplete?.(files);
  }, [onUploadComplete]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files).filter((file) =>
        file.name.endsWith(".xml")
      );

      if (files.length > 0) {
        processFiles(files);
      }
    },
    [processFiles]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []).filter((file) =>
        file.name.endsWith(".xml")
      );

      if (files.length > 0) {
        processFiles(files);
      }
    },
    [processFiles]
  );

  const getStatusText = () => {
    switch (uploadStatus) {
      case "parsing":
        return "Parsing XML...";
      case "auditing":
        return "Auditoria de Crédito...";
      case "completed":
        return "Upload concluído!";
      case "error":
        return "Erro no processamento";
      default:
        return "Arraste arquivos XML aqui ou clique para selecionar";
    }
  };

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case "parsing":
      case "auditing":
        return <Loader2 className="h-8 w-8 animate-spin text-indigo-600 dark:text-indigo-400" />;
      case "completed":
        return <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />;
      default:
        return <Upload className="h-8 w-8 text-slate-400" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload de Notas Fiscais (XML)</CardTitle>
        <CardDescription>
          Faça upload de arquivos XML de NF-e para auditoria de crédito tributário
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-colors ${
            isDragging
              ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/20"
              : "border-slate-300 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-600"
          }`}
        >
          <input
            type="file"
            id="xml-upload"
            className="hidden"
            accept=".xml"
            multiple
            onChange={handleFileInput}
            disabled={uploadStatus === "parsing" || uploadStatus === "auditing"}
          />
          <label
            htmlFor="xml-upload"
            className="flex cursor-pointer flex-col items-center gap-4"
          >
            {getStatusIcon()}
            <div className="text-center">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {getStatusText()}
              </p>
              {uploadStatus === "idle" && (
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  Suporte para múltiplos arquivos
                </p>
              )}
            </div>
          </label>

          {(uploadStatus === "parsing" || uploadStatus === "auditing") && (
            <div className="mt-4 w-full max-w-md">
              <div className="mb-2 flex justify-between text-xs text-slate-600 dark:text-slate-400">
                <span>{getStatusText()}</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <div
                  className="h-full bg-indigo-600 dark:bg-indigo-400 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {uploadStatus === "completed" && uploadedFiles.length > 0 && (
            <div className="mt-4 w-full max-w-md space-y-2">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Arquivos processados:
              </p>
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-md bg-slate-100 dark:bg-slate-800 p-2"
                >
                  <FileText className="h-4 w-4 text-slate-500" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    {file.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

