import { useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import {
  useBlur,
  useErrorMessage,
  useImage,
  useIsProcessing,
} from "@/lib/context";

import stringByteLength from "string-byte-length";
import { encode } from "blurhash";
import { blurhashToBase64 } from "blurhash-base64";

export default function Dropzone() {
  const [image, setImage] = useImage();
  const [, setBlur] = useBlur();
  const [, setIsProcessing] = useIsProcessing();
  const [, setErrorMessage] = useErrorMessage();
  const workerRef = useRef<Worker>();

  useEffect(() => {
    return () => {
      if (workerRef.current) workerRef.current.terminate();
    };
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop: async (files: File[]) => {
        if (image.src) URL.revokeObjectURL(image.src);
        setImage({ src: "", height: "", width: "", size: "" });
        setBlur({ blurHash: "", blurHashBase64: "", blurHashBase64Size: "" });
        setErrorMessage("");
        setIsProcessing(true);
        if (workerRef.current) workerRef.current.terminate();
        let url = "";
        let img;
        try {
          img = await new Promise(
            (resolve: (img: HTMLImageElement) => void, reject) => {
              const img = new Image();
              img.onload = () => resolve(img);
              img.onerror = (...args) => reject(args);
              url = URL.createObjectURL(files[0]);
              img.src = url;
            }
          );
        } catch (err) {
          setErrorMessage("The format is not supported. 😕");
          setIsProcessing(false);
          return;
        }
        try {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const context = canvas.getContext("2d");
          if (!context) throw new Error();
          context.drawImage(img, 0, 0);
          setImage({
            src: url,
            height: img.height + " px",
            width: img.width + " px",
            size: (files[0].size / 1024).toFixed(2) + " kb",
          });
          const imageData = context.getImageData(0, 0, img.width, img.height);
          if (typeof OffscreenCanvas !== "undefined") {
            workerRef.current = new Worker(
              new URL("./utils/worker.ts", import.meta.url),
              { type: "module" }
            );
            workerRef.current.postMessage([
              canvas.width,
              canvas.height,
              imageData,
            ]);
            workerRef.current.addEventListener(
              "message",
              (e: MessageEvent) => {
                try {
                  const [blurHash, blurHashBase64]: [string, string] = e.data;
                  if (!blurHash || !blurHashBase64) throw new Error();
                  const blurHashBase64Size = stringByteLength(blurHashBase64);
                  setIsProcessing(false);
                  setBlur({
                    blurHash,
                    blurHashBase64,
                    blurHashBase64Size:
                      (blurHashBase64Size / 1024).toFixed(2) + " kb",
                  });
                } catch (err) {
                  if (image.src) URL.revokeObjectURL(image.src);
                  setImage({
                    height: "",
                    width: "",
                    src: "",
                    size: "",
                  });
                  setErrorMessage("An error has occured.");
                }
              },
              { once: true }
            );
          } else {
            const blurHash = encode(
              imageData.data,
              imageData.width,
              imageData.height,
              4,
              4
            );
            const blurHashBase64 = blurhashToBase64(blurHash);
            const blurHashBase64Size = stringByteLength(blurHashBase64);
            setBlur({
              blurHash,
              blurHashBase64,
              blurHashBase64Size:
                (blurHashBase64Size / 1024).toFixed(2) + " kb",
            });
          }
        } catch (err) {
          if (err instanceof Error) {
            if (image.src) URL.revokeObjectURL(image.src);
            setImage({
              height: "",
              width: "",
              src: "",
              size: "",
            });
          }
          setErrorMessage("An error has occured. 😕");
        }
      },
      multiple: false,
    });

  return (
    <div
      className="min-w-0 bg2 bg-center bg-cover rounded-xl oh"
      style={{
        backgroundImage: `url('${image.src}')`,
        aspectRatio: "4 / 3",
      }}
    >
      <input {...getInputProps()} />{" "}
      <div
        className={`flex flex-col items-center justify-center gap-2 h-full border-2 border-transparent border-dashed rounded-xl focus:outline-none focus:border-gray-800${
          isDragActive ? " !border-green-400" : ""
        }${isDragReject ? " !border-red-500" : ""}`}
        {...getRootProps()}
      >
        {!image.src ? (
          <>
            <svg
              className="w-14 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="3 6 26 20"
            >
              <path d="M27.5 6h-23C3.67 6 3 6.67 3 7.5v17c0 .83.67 1.5 1.5 1.5h23c.83 0 1.5-.67 1.5-1.5v-17c0-.83-.67-1.5-1.5-1.5zm.5 12.69v5.81c0 .28-.22.5-.5.5h-23c-.28 0-.5-.22-.5-.5v-1.75l10.31-6.81 3.04 2.23 5.24-4.23L28 17.69v1zm0-2.29-4.84-3.28c-.18-.12-.37-.18-.561-.18-.189 0-.39.06-.56.18l-4.7 3.76-2.52-1.78a.98.98 0 0 0-.56-.18c-.19 0-.38.06-.56.18L4 21.54V7.5c0-.28.22-.5.5-.5h23c.28 0 .5.22.5.5v8.9z" />
              <path d="M13 11c0 .93-.64 1.71-1.5 1.93-.86-.22-1.5-1-1.5-1.93s.64-1.71 1.5-1.93c.86.22 1.5 1 1.5 1.93z" />
              <path d="M28 18.69v5.81c0 .28-.22.5-.5.5h-23c-.28 0-.5-.22-.5-.5v-.75l10.31-6.81 3.04 2.23 5.24-4.23L28 18.69z" />
              <path d="M11 9c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2m0-1a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
            </svg>
            <p className="text-base font-medium">Upload your image here...</p>
          </>
        ) : null}
      </div>
    </div>
  );
}
