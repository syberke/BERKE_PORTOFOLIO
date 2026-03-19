"use client";

/**
 * WordReveal
 * Wraps each word in `.t-line > .word-wrap > .word` structure.
 * GSAP animates `.word` from `translateY(110%) → 0`.
 *
 * Props:
 *   lines     – string[]  each line of the heading
 *   italic    – number[]  indices of lines to render in <em>
 *   className – extra class for the root element
 *   tag       – wrapper tag (default "h2")
 */
export default function WordReveal({
  lines = [],
  italic = [],
  className = "",
  tag: Tag = "h2",
}) {
  return (
    <Tag className={className}>
      {lines.map((line, li) => (
        <span className="t-line" key={li}>
          {italic.includes(li) ? (
            <span className="word-wrap">
              <em className="word">{line}</em>
            </span>
          ) : (
            line.split(" ").map((word, wi) => (
              <span className="word-wrap" key={wi} style={{ marginRight: ".25em" }}>
                <span className="word">{word}</span>
              </span>
            ))
          )}
        </span>
      ))}
    </Tag>
  );
}