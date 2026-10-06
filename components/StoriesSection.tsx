import { Reveal } from "@/components/Reveal";
import { StoryIndex } from "@/components/StoryIndex";
import type { Story } from "@/lib/stories";
import ui from "./ui.module.css";

type StoriesSectionProps = {
  title: string;
  stories: Story[];
};

export function StoriesSection({ title, stories }: StoriesSectionProps) {
  return (
    <section id="stories" className={ui.section}>
      <div className={ui.inner}>
        <div className={ui.headingRow}>
          <Reveal as="h1" className={ui.pageTitle}>
            {title}
          </Reveal>
        </div>
        <StoryIndex stories={stories} />
      </div>
    </section>
  );
}
