import type { Meta, StoryObj } from '@storybook/react';
import { ExperienceCard } from '@/components/ds/ExperienceCard';

const meta: Meta<typeof ExperienceCard> = {
  title: 'DS/ExperienceCard',
  component: ExperienceCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ExperienceCard>;

export const Default: Story = {
  args: {
    jobTitle: 'Senior Software Engineer',
    company: 'Tech Company Inc.',
    employmentDates: '2020 - Present',
    location: 'San Francisco, CA',
    responsibilities: [
      'Led development of microservices architecture',
      'Mentored junior developers and conducted code reviews',
      'Implemented CI/CD pipelines improving deployment speed by 40%',
      'Collaborated with product team to define technical requirements',
      'Optimized database queries reducing response time by 60%',
    ],
  },
};

export const WithoutLogo: Story = {
  args: {
    jobTitle: 'Full Stack Developer',
    company: 'Startup Co.',
    employmentDates: '2018 - 2020',
    location: 'Remote',
    responsibilities: [
      'Built React-based dashboard from scratch',
      'Integrated third-party APIs for data visualization',
      'Implemented authentication and authorization systems',
    ],
  },
};

export const WithLogo: Story = {
  args: {
    jobTitle: 'Platform Engineer',
    company: 'Cloud Systems',
    employmentDates: '2021 - 2023',
    location: 'New York, NY',
    logoUrl: 'https://via.placeholder.com/56',
    responsibilities: [
      'Managed Kubernetes clusters across multiple environments',
      'Developed infrastructure as code using Terraform',
      'Implemented monitoring and alerting systems',
      'Reduced infrastructure costs by 30% through optimization',
      'Led migration to cloud-native architecture',
    ],
  },
};

export const LongResponsibilities: Story = {
  args: {
    jobTitle: 'Tech Lead',
    company: 'Enterprise Corp',
    employmentDates: '2019 - 2022',
    location: 'Austin, TX',
    responsibilities: [
      'Architected and led development of enterprise-grade SaaS platform',
      'Managed team of 8 engineers across 3 time zones',
      'Defined technical strategy and roadmap aligned with business goals',
      'Implemented agile development practices improving delivery velocity',
      'Established code quality standards and testing infrastructure',
      'Collaborated with CTO on technology stack decisions',
      'Presented technical progress to executive stakeholders',
      'Recruited and onboarded new team members',
    ],
    initialVisible: 3,
  },
};

export const CustomLabels: Story = {
  args: {
    jobTitle: 'Software Engineer',
    company: 'Digital Agency',
    employmentDates: '2017 - 2019',
    location: 'London, UK',
    responsibilities: [
      'Developed responsive web applications for clients',
      'Collaborated with designers on UI/UX implementation',
      'Maintained and improved existing codebases',
    ],
    showMoreLabel: 'View more responsibilities',
    showLessLabel: 'Show fewer',
  },
};

export const Minimal: Story = {
  args: {
    jobTitle: 'Junior Developer',
    company: 'Web Studio',
    employmentDates: '2016 - 2017',
    responsibilities: [
      'Assisted in frontend development projects',
      'Fixed bugs and implemented minor features',
    ],
  },
};
