import { useBlur } from "@/lib/context";

import { Dropzone } from "./utils/components";

export default function Previews() {
  const [blur] = useBlur();

  return (
    <div className="grid gap-8 md:basis-[45%] text-gray-800">
      <Dropzone />
      <div className="min-w-0" style={{ aspectRatio: "4 / 3" }}>
        <p className="pb-2 font-bold text-center">
          What&apos;s it gonna look like in Next.js Image Component:
        </p>
        <div
          className="bg2 rounded-xl overflow-hidden h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' %3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='none' style='filter: url(%23b);' href='${blur.blurHashBase64}'/%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>
    </div>
  );
}
