import { encode } from "blurhash";
import { blurhashToBase64 } from "blurhash-base64";

onmessage = (e: MessageEvent) => {
  try {
    const [width, height, imageData]: [number, number, ImageData] = e.data;
    if (!width || !height || !imageData) throw new Error();
    const blurHash = encode(imageData.data, width, height, 4, 4);
    const blurHashBase64 = blurhashToBase64(blurHash);
    self.postMessage([blurHash, blurHashBase64]);
  } catch (err) {
    self.postMessage([]);
  }
};
