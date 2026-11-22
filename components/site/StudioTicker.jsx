const words = ["DESIGN IS A DECISION", "CODE IS A CRAFT", "CURIOSITY IS THE ENGINE"];

export default function StudioTicker() {
  return (
    <div className="studio-ticker" role="separator" aria-label="Design, code, curiosity">
      <div className="studio-ticker__track" aria-hidden="true">
        {[0, 1, 2, 3].map((repeat) => (
          <span className="studio-ticker__set" key={repeat}>
            {words.map((word) => <span className="studio-ticker__word" key={word}>
              <span className="studio-ticker__star">✳</span>{word}
            </span>)}
          </span>
        ))}
      </div>
    </div>
  );
}