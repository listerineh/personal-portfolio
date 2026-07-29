import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '@/components/ds/Button';
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownSeparator, DropdownLabel, DropdownCheckboxItem } from '@/components/ds/Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'DS/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

function ControlledDropdown({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <Dropdown open={open} onOpenChange={setOpen}>
      {children}
    </Dropdown>
  );
}

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Dropdown open={open} onOpenChange={setOpen}>
        <DropdownTrigger asChild>
          <Button>Open Menu</Button>
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem onClick={() => console.log('Profile')}>Profile</DropdownItem>
          <DropdownItem onClick={() => console.log('Settings')}>Settings</DropdownItem>
          <DropdownSeparator />
          <DropdownItem onClick={() => console.log('Logout')}>Logout</DropdownItem>
        </DropdownContent>
      </Dropdown>
    );
  },
};

export const WithLabel: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Dropdown open={open} onOpenChange={setOpen}>
        <DropdownTrigger asChild>
          <Button>Menu with Label</Button>
        </DropdownTrigger>
        <DropdownContent>
          <DropdownLabel>Account</DropdownLabel>
          <DropdownItem onClick={() => console.log('Profile')}>Profile</DropdownItem>
          <DropdownItem onClick={() => console.log('Billing')}>Billing</DropdownItem>
          <DropdownSeparator />
          <DropdownLabel>Preferences</DropdownLabel>
          <DropdownItem onClick={() => console.log('Settings')}>Settings</DropdownItem>
        </DropdownContent>
      </Dropdown>
    );
  },
};

export const WithCheckbox: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [checked1, setChecked1] = useState(true);
    const [checked2, setChecked2] = useState(false);
    return (
      <Dropdown open={open} onOpenChange={setOpen}>
        <DropdownTrigger asChild>
          <Button>Menu with Checkbox</Button>
        </DropdownTrigger>
        <DropdownContent>
          <DropdownCheckboxItem checked={checked1} onCheckedChange={setChecked1}>
            Show notifications
          </DropdownCheckboxItem>
          <DropdownCheckboxItem checked={checked2} onCheckedChange={setChecked2}>
            Auto-save
          </DropdownCheckboxItem>
          <DropdownSeparator />
          <DropdownItem onClick={() => console.log('Settings')}>Settings</DropdownItem>
        </DropdownContent>
      </Dropdown>
    );
  },
};

export const WithCustomHover: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Dropdown open={open} onOpenChange={setOpen}>
        <DropdownTrigger asChild>
          <Button>Custom Hover</Button>
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem onClick={() => console.log('Item 1')} hoverColor="rgba(245,158,11,0.1)">
            Amber hover
          </DropdownItem>
          <DropdownItem onClick={() => console.log('Item 2')} hoverColor="rgba(129,140,248,0.1)">
            Indigo hover
          </DropdownItem>
          <DropdownItem onClick={() => console.log('Item 3')} hoverColor="rgba(29,185,84,0.1)">
            Green hover
          </DropdownItem>
        </DropdownContent>
      </Dropdown>
    );
  },
};

export const AlignStart: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Dropdown open={open} onOpenChange={setOpen}>
        <DropdownTrigger asChild>
          <Button>Align Start</Button>
        </DropdownTrigger>
        <DropdownContent align="start">
          <DropdownItem onClick={() => console.log('Item 1')}>Item 1</DropdownItem>
          <DropdownItem onClick={() => console.log('Item 2')}>Item 2</DropdownItem>
        </DropdownContent>
      </Dropdown>
    );
  },
};
