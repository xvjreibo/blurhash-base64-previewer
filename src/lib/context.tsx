"use client";

import { BlurInfo, ImageInfo } from "@/lib/types";
import { createContext, useContext, useRef, useState } from "react";

type ImageType = [ImageInfo, React.Dispatch<React.SetStateAction<ImageInfo>>];
const ImageContext = createContext<ImageType>({} as ImageType);
export function useImage() {
  return useContext(ImageContext);
}

type BlurType = [BlurInfo, React.Dispatch<React.SetStateAction<BlurInfo>>];
const BlurContext = createContext<BlurType>({} as BlurType);
export function useBlur() {
  return useContext(BlurContext);
}

type ErrorMessageType = [string, React.Dispatch<React.SetStateAction<string>>];
const ErrorMessageContext = createContext<ErrorMessageType>(
  {} as ErrorMessageType
);
export function useErrorMessage() {
  return useContext(ErrorMessageContext);
}

type IsProcessingType = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
];
const IsProcessingContext = createContext<IsProcessingType>(
  {} as IsProcessingType
);
export function useIsProcessing() {
  return useContext(IsProcessingContext);
}

type ProviderProps = { children: React.ReactNode };

export default function Provider({ children }: ProviderProps) {
  const [imageContext, setImageContext] = useState<ImageInfo>({
    src: "",
    height: "",
    width: "",
    size: "",
  });
  const [blurContext, setBlurContext] = useState<BlurInfo>({
    blurHash: "",
    blurHashBase64: "",
    blurHashBase64Size: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <ImageContext.Provider value={[imageContext, setImageContext]}>
      <BlurContext.Provider value={[blurContext, setBlurContext]}>
        <ErrorMessageContext.Provider value={[errorMessage, setErrorMessage]}>
          <IsProcessingContext.Provider value={[isProcessing, setIsProcessing]}>
            {children}
          </IsProcessingContext.Provider>
        </ErrorMessageContext.Provider>
      </BlurContext.Provider>
    </ImageContext.Provider>
  );
}
