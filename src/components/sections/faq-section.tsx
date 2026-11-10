import { faqs } from "@/content/faqs";
import { TextLink } from "@/components/ui/links";

/** FAQ built on native <details>, so it works without JavaScript. */
export function FaqSection() {
  return (
    <section className="faq wrap">
      <div>
        <p className="eyebrow">A LITTLE CLARITY GOES A LONG WAY</p>
        <h2>
          Good questions.
          <br />
          Straight answers.
        </h2>
        <p>
          Before the first conversation,
          <br />a few things worth knowing.
        </p>
        <TextLink href="/contact">{"Prepare your enquiry "}</TextLink>
      </div>
      <div className="faq-list">
        {faqs.map(({ question, answer }, i) => (
          <details key={question}>
            <summary>
              <span className="faq-num">
                {"0"}
                {i + 1}
              </span>
              {question}
              <span className="faq-plus" aria-hidden="true" />
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
