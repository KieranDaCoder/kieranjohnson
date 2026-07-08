import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { WorkSectionNav } from "@/components/WorkSectionNav";

export const metadata: Metadata = {
  title: "Work — Kieran Johnson",
  description: "Selected PR, advertising and campaign work by Kieran Johnson.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader icon="/icons/work.svg" title="What I've been working on">
        Campaigns, strategies and analyses from my studies and beyond. Each one opens into a
        full case study.
      </PageHeader>

      <WorkSectionNav />
    </>
  );
}
