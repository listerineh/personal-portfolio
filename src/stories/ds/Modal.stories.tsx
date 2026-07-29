import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ds/Button';
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription } from '@/components/ds/Modal';

const meta: Meta<typeof Modal> = {
  title: 'DS/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    children: (
      <>
        <ModalTrigger asChild>
          <Button>Open Modal</Button>
        </ModalTrigger>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Modal Title</ModalTitle>
            <ModalDescription>This is a modal description with some additional context.</ModalDescription>
          </ModalHeader>
          <div className="space-y-4">
            <p>This is the modal content area where you can place any components or information.</p>
            <Button variant="secondary" size="sm">Action</Button>
          </div>
        </ModalContent>
      </>
    ),
  },
};

export const Simple: Story = {
  args: {
    children: (
      <>
        <ModalTrigger asChild>
          <Button>Simple Modal</Button>
        </ModalTrigger>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Simple Title</ModalTitle>
          </ModalHeader>
          <p>A simple modal with just a title and content.</p>
        </ModalContent>
      </>
    ),
  },
};

export const WithCustomClass: Story = {
  args: {
    children: (
      <>
        <ModalTrigger asChild>
          <Button>Custom Size Modal</Button>
        </ModalTrigger>
        <ModalContent className="max-w-lg">
          <ModalHeader>
            <ModalTitle>Larger Modal</ModalTitle>
            <ModalDescription>This modal has a custom max-width class.</ModalDescription>
          </ModalHeader>
          <p>This modal is wider than the default max-w-md.</p>
        </ModalContent>
      </>
    ),
  },
};

export const ComplexContent: Story = {
  args: {
    children: (
      <>
        <ModalTrigger asChild>
          <Button>Complex Modal</Button>
        </ModalTrigger>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Confirmation Required</ModalTitle>
            <ModalDescription>Please review the following information before proceeding.</ModalDescription>
          </ModalHeader>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-foreground/5">
              <p className="font-semibold mb-2">Important Information</p>
              <p className="text-sm text-foreground/70">This action cannot be undone. Please make sure you want to proceed.</p>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="ghost" size="sm">Cancel</Button>
              <Button variant="primary" size="sm">Confirm</Button>
            </div>
          </div>
        </ModalContent>
      </>
    ),
  },
};
