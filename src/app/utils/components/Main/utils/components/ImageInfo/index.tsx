import { useBlur, useImage } from "@/lib/context";

import { Row } from "./utils/components";

export default function ImageInfo() {
  const [image] = useImage();
  const [blur] = useBlur();

  return (
    <section className="flex flex-col gap-5 pt-5">
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-bold">Image Info: </h3>
        <Row label="Width" content={image.width} />
        <Row label="Height" content={image.height} />
        <Row label="Size" content={image.size} />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-bold">BlurHash:</h3>
        <Row label="Hash" content={blur.blurHash} />
        <Row label="Base64" content={blur.blurHashBase64} />
        <Row label="Base64 size" content={blur.blurHashBase64Size} />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-bold">How to use it?</h3>
        <p>{`<Image placeholder='blur' blurDataURL={put base64 here} />`}</p>
        <p>
          <a
            className="underline"
            target="_blank"
            href="https://github.com/woltapp/blurhash/tree/master/TypeScript"
          >
            Here&apos;s the BlurHash library.
          </a>
        </p>
        <p>
          <a
            className="underline"
            target="_blank"
            href="https://github.com/mcnaveen/blurhash-base64"
          >
            Here&apos;s the library I used to generate the Base64 image.
          </a>
        </p>
      </div>
    </section>
  );
}
