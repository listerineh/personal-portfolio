import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DocList, DocText, LegalDocument } from '@/components/ds/LegalDocument';

const lorem = 'Illustrative paragraph for the story: a sentence or two of policy text at reading measure.';

const meta: Meta<typeof LegalDocument> = {
  title: 'DS/LegalDocument',
  component: LegalDocument,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    tocLabel: 'On this page',
    sections: ['Information we collect', 'How we use it', 'Your rights', 'Contact'].map((title, i) => ({
      id: `s${i}`,
      title,
      children: (
        <>
          <DocText>{lorem}</DocText>
          {i === 1 && <DocList items={['Provide the website', 'Improve the experience', 'Detect issues']} />}
          <div style={{ height: '40vh' }} />
        </>
      ),
    })),
  },
};

export default meta;
type Story = StoryObj<typeof LegalDocument>;

/** Scroll: the index marks the section being read; on narrow screens it folds into a panel. */
export const Default: Story = {};
