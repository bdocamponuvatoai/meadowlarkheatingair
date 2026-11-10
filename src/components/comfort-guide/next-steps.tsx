import { nextSteps } from "@/content/comfort-guide";

/** "Your next three steps" on the comfort guide page. */
export function NextSteps() {
  return (
    <section className="process wrap">
      <p className="eyebrow">YOUR NEXT THREE STEPS</p>
      <h2>
        A little preparation.
        <br />A clearer conversation.
      </h2>
      <div className="process-grid">
        {nextSteps.map((step) => (
          <div key={step.number}>
            <span>{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
