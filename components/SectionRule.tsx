import ui from "./ui.module.css";

export function SectionRule() {
  return (
    <div className={ui.sectionRuleWrap} aria-hidden>
      <hr className={ui.sectionRule} />
    </div>
  );
}
