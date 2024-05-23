import toast from "react-hot-toast";
import copy from "copy-to-clipboard";

import styles from "./index.module.css";

type RowProps = {
  label: string;
  content: string;
};

export default function Row({ label, content }: RowProps) {
  return (
    <button
      className={`relative flex items-center gap-2 ${
        !content ? " cursor-default" : ""
      } rounded-sm max-w-fit ${styles.container}`}
      onClick={() => {
        if (!content) return;
        copy(content.split(" ")[0]);
        toast.success("Copied!", {
          id: `toast-${label}`,
        });
      }}
      tabIndex={!content ? -1 : undefined}
    >
      <p>{label}:</p>
      <div
        className={`px-3 py-1 rounded-md whitespace-nowrap overflow-x-auto transition-colors bg2 ${styles.content}`}
      >
        <p>{content ? content : "---"}</p>
      </div>
    </button>
  );
}
