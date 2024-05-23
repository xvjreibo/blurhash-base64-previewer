"use client";

import { ImageInfo, Previews } from "./utils/components";
import {
  useBlur,
  useErrorMessage,
  useImage,
  useIsProcessing,
} from "@/lib/context";

import styles from "./index.module.css";

export default function Main() {
  const [isProcessing, setIsProcessing] = useIsProcessing();
  const [image, setImage] = useImage();
  const [, setBlur] = useBlur();
  const [errorMessage, setErrorMessage] = useErrorMessage();

  return (
    <main className="flex flex-col gap-8 md:flex-row">
      <Previews />
      <div className={`grow-[1] shrink-[1] ${styles["right-side"]}`}>
        <div className="flex flex-wrap gap-3 gap-y-6 items-center ">
          <button
            className={`relative z-[1] px-3 py-1.5 text-gray-50 rounded-lg bg-gray-800 overflow-hidden ${styles.button}`}
            onClick={() => {
              if (image.src) URL.revokeObjectURL(image.src);
              setErrorMessage("");
              setImage({
                src: "",
                height: "",
                width: "",
                size: "",
              });
              setBlur({
                blurHash: "",
                blurHashBase64: "",
                blurHashBase64Size: "",
              });
              setIsProcessing(false);
            }}
          >
            Reset
          </button>
          <div className="font-bold">
            {isProcessing ? (
              <div className="flex gap-3">
                <svg
                  className={`w-5 origin-center ${styles.svg}`}
                  viewBox="25 25 50 50"
                  focusable="false"
                  aria-hidden="true"
                >
                  <circle
                    className={`fill-[none] stroke-current ${styles.circle}`}
                    strokeWidth="4"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="20"
                  ></circle>
                </svg>
                <p>Processing... Some large images may take longer to load.</p>
              </div>
            ) : (
              <p className="text-rose-700">
                {errorMessage ? "Error: " : ""}
                {errorMessage}
              </p>
            )}
          </div>
        </div>
        <ImageInfo />
      </div>
    </main>
  );
}
