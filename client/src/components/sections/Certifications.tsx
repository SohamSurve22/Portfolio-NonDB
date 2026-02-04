import { useState, useEffect } from "react";
import { useCertifications } from "@/hooks/use-portfolio";
import { Loader2, Award, ChevronLeft, ChevronRight, ExternalLink, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Certification } from "@shared/schema";

export function CertificationsSection() {
  const { data: certifications, isLoading, error } = useCertifications();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [fullCert, setFullCert] = useState<Certification | null>(null);

  const loadCertPdf = async (cert: Certification) => {
    setPdfLoading(true);
    setPdfBlobUrl(null);

    try {
      // In local mode, we already have the full cert data
      const fullCertData = cert;
      setFullCert(fullCertData);

      // Check for static PDF URL first
      if (fullCertData.pdfUrl) {
        setPdfBlobUrl(fullCertData.pdfUrl);
      } else if (fullCertData.pdfData) {
        // Convert Base64 to Blob
        const byteCharacters = atob(fullCertData.pdfData.split(',')[1] || fullCertData.pdfData);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setPdfBlobUrl(url);
      }
    } catch (err) {
      console.error("Error loading PDF:", err);
    } finally {
      setPdfLoading(false);
    }
  };

  useEffect(() => {
    if (certifications && certifications.length > 0) {
      loadCertPdf(certifications[currentIndex]);
    }

    return () => {
      // Cleanup blob URLs
      if (pdfBlobUrl && pdfBlobUrl.startsWith('blob:')) {
        URL.revokeObjectURL(pdfBlobUrl);
      }
    };
  }, [currentIndex, certifications]);

  const goToPrevious = () => {
    if (!certifications) return;
    setCurrentIndex((prev) => (prev === 0 ? certifications.length - 1 : prev - 1));
  };

  const goToNext = () => {
    if (!certifications) return;
    setCurrentIndex((prev) => (prev === certifications.length - 1 ? 0 : prev + 1));
  };

  if (isLoading) {
    return (
      <div className="flex gap-2 items-center text-cyan-400 py-10 justify-center">
        <Loader2 className="animate-spin w-6 h-6" /> VERIFYING_CREDENTIALS...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-400 p-4">ERR_CERT_DB: Integrity check failed.</div>;
  }

  if (!certifications?.length) {
    return <div className="text-cyan-400/50 p-4">No validated credentials found.</div>;
  }

  const currentCert = certifications[currentIndex];

  return (
    <div className="space-y-6 py-4 font-mono">
      {/* Carousel Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
        <div className="flex items-center gap-3">
          <Award className="text-purple-400" size={24} />
          <div>
            <h2 className="text-cyan-300 font-bold text-lg uppercase tracking-wider">
              CREDENTIAL_ARCHIVE
            </h2>
            <p className="text-cyan-500/40 text-xs">
              {currentIndex + 1} / {certifications.length} VERIFIED_CERTIFICATES
            </p>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex gap-2">
          {certifications.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex
                ? 'bg-cyan-400 w-8'
                : 'bg-cyan-500/20 hover:bg-cyan-500/40'
                }`}
              aria-label={`Go to certificate ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Main Carousel Container */}
      <div className="relative border border-cyan-500/20 bg-black/40 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Certificate Info Header */}
            <div className="bg-cyan-500/10 border-b border-cyan-500/20 p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-cyan-200 font-bold text-xl mb-2 flex items-center gap-2">
                    <FileText size={20} className="text-purple-400" />
                    {currentCert.name}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-cyan-500/60">ISSUER:</span>{' '}
                      <span className="text-cyan-300">{currentCert.issuer}</span>
                    </div>
                    <div>
                      <span className="text-cyan-500/60">DATE:</span>{' '}
                      <span className="text-cyan-300">{currentCert.date}</span>
                    </div>
                  </div>
                  {currentCert.description && (
                    <p className="mt-3 text-cyan-400/70 text-sm leading-relaxed">
                      {currentCert.description}
                    </p>
                  )}
                </div>

                {currentCert.url && (
                  <a
                    href={currentCert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400 text-cyan-400 p-2 rounded transition-all"
                    title="Verify Certificate"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="relative bg-zinc-900" style={{ height: '600px' }}>
              {pdfLoading ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-cyan-400">
                  <Loader2 className="animate-spin w-12 h-12 mb-4" />
                  <p className="font-techno tracking-widest text-sm animate-pulse">
                    DECRYPTING_SECURE_PAYLOAD...
                  </p>
                  <div className="mt-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                </div>
              ) : pdfBlobUrl ? (
                <iframe
                  src={pdfBlobUrl}
                  className="w-full h-full border-none"
                  title={`${currentCert.name} Certificate`}
                />
              ) : fullCert?.imageUrl ? (
                <div className="w-full h-full flex items-center justify-center p-8 overflow-auto">
                  <img
                    src={fullCert.imageUrl}
                    alt={currentCert.name}
                    className="max-w-full h-auto shadow-2xl"
                  />
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-cyan-500/20">
                  <FileText size={100} strokeWidth={0.5} />
                  <p className="mt-4 font-techno tracking-[0.5em] text-xs">NO_PDF_AVAILABLE</p>
                  <div className="max-w-md mt-10 p-6 border border-cyan-500/10 bg-black/40 text-cyan-400/60 font-mono text-xs leading-relaxed">
                    <p className="text-cyan-300 font-bold mb-4">ISSUER: {currentCert.issuer}</p>
                    <p className="mb-2">
                      This credential verifies expertise in {currentCert.name}.
                    </p>
                    <p>ID: {currentCert.id} // VERIFIED: {currentCert.date}</p>
                  </div>
                </div>
              )}

              {/* Navigation Arrows Overlay */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400 text-cyan-400 p-3 rounded-full transition-all hover:scale-110 backdrop-blur-sm"
                aria-label="Previous certificate"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400 text-cyan-400 p-3 rounded-full transition-all hover:scale-110 backdrop-blur-sm"
                aria-label="Next certificate"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Footer Status Bar */}
            <div className="bg-black/60 border-t border-cyan-500/20 p-3 flex justify-between items-center text-[10px]">
              <div className="flex items-center gap-4">
                <span className="text-green-500/60">
                  ● ENCRYPTION: AES-256-V2
                </span>
                <span className="text-cyan-500/40">
                  HASH: {currentCert.id.slice(0, 12)}...
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={goToPrevious}
                  className="px-3 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded uppercase tracking-widest text-[9px] font-bold transition-all"
                >
                  ← PREV
                </button>
                <button
                  onClick={goToNext}
                  className="px-3 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded uppercase tracking-widest text-[9px] font-bold transition-all"
                >
                  NEXT →
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Keyboard Navigation Hint */}
      <div className="text-center text-cyan-500/30 text-xs font-mono">
        <p>USE_ARROWS_TO_NAVIGATE // TOTAL_CREDENTIALS: {certifications.length}</p>
      </div>
    </div>
  );
}
