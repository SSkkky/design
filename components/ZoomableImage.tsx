import { useRef, useState, useEffect } from "react";

export default function ZoomableImage({ src }: { src: string }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isZoomable, setIsZoomable] = useState(false);

  useEffect(() => {
    // 이미지가 변경되면 즉시 로딩 상태로 만들기
    setIsLoading(true);
    setIsZoomed(false);
    setIsZoomable(false);

    const img = imgRef.current;
    if (!img) return;

    const handleLoad = () => {
      const heightThreshold = window.innerHeight * 0.6;
      const widthThreshold = window.innerWidth * 0.9;

      if (
        img.naturalHeight > heightThreshold ||
        img.naturalWidth > widthThreshold
      ) {
        setIsZoomable(true);
      }

     setIsLoading(false);
    };

    if (img.complete) {
      handleLoad();
    } else {
      img.onload = handleLoad;
    }
  }, [src]);

  const toggleZoom = (e: React.MouseEvent) => {
    if (!isZoomable) return;
    e.stopPropagation();
    setIsZoomed((prev) => !prev);
  };

  return (
    <div
      className="px-4 py-4 flex justify-center overflow-auto customScrollBar w-fit relative"
      style={{
        maxHeight: "70vh",
        maxWidth: "90vw",
        touchAction: "auto",
      }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          <span className="loader">Loading...</span>
        </div>
      )}
      <img
        ref={imgRef}
        src={src}
        alt="popup"
        onClick={toggleZoom}
        className="object-contain"
        style={{
          visibility: isLoading ? "hidden" : "visible",
          width: isZoomed ? "max-content" : "100%",
          height: isZoomed ? "max-content" : "100%",
          cursor: isZoomable
            ? isZoomed
              ? "zoom-out"
              : "zoom-in"
            : "default",
        }}
      />
    </div>
  );
}
