interface QRScannerSectionProps {
  isCameraInitializing: boolean;
  hasCameraPermission: boolean | null;
}

export function QRScannerSection({
  isCameraInitializing,
  hasCameraPermission,
}: QRScannerSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-textPrimary">Scan QR Code</h2>
        <p className="text-sm text-textSecondary/80">
          Point the camera at a participant&apos;s QR code to check them in
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-primary/20 bg-backgroundMuted/50 backdrop-blur-sm transition-colors duration-300">
        <div id="qr-reader" className="w-full" />
      </div>

      {isCameraInitializing && (
        <div className="rounded-lg bg-primary/10 p-4 text-center text-sm text-primary">
          Initializing camera...
        </div>
      )}

      {hasCameraPermission === false && (
        <div className="rounded-lg bg-red-500/10 p-4 text-center text-sm text-red-500">
          Camera access is required. Please allow camera access in your browser
          settings and refresh the page.
        </div>
      )}
    </div>
  );
}
