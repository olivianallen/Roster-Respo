export const COMPANIES = [
  { id: 'atelier-oaks', name: 'Atelier Oaks',    domain: 'atelieroaks.co',   kind: 'Brand studio · 40 people',   color: '#5E7A58' },
  { id: 'northwind',    name: 'Northwind Studio', domain: 'northwind.design', kind: 'Product design · 120 people', color: '#B4643E' },
  { id: 'paper-pine',   name: 'Paper & Pine',     domain: 'paperandpine.com', kind: 'Editorial · 18 people',       color: '#8F4A2E' },
  { id: 'kiln',         name: 'Kiln',             domain: 'kiln.app',         kind: 'Dev tools · 60 people',       color: '#5A6B9A' },
  { id: 'meridian',     name: 'Meridian Labs',    domain: 'meridianlabs.io',  kind: 'AI research · 200 people',    color: '#4A5F8A' },
  { id: 'linen',        name: 'Linen & Co',       domain: 'linen.co',         kind: 'E-commerce · 80 people',      color: '#8A6B3E' },
  { id: 'harbor',       name: 'Harbor Health',    domain: 'harborhealth.com', kind: 'Healthtech · 300 people',     color: '#3E6A8A' },
  { id: 'cedar',        name: 'Cedar & Moss',     domain: 'cedarmoss.shop',   kind: 'Retail · 25 people',          color: '#4A7A5A' },
];

export const ROLES_BY_COMPANY = {
  'atelier-oaks': [
    { id: 'r1', title: 'Senior Brand Designer',  loc: 'Remote · US',     type: 'Full-time', posted: '2d ago', salary: '$120–150k' },
    { id: 'r2', title: 'Design Lead, Identity',  loc: 'Brooklyn, NY',    type: 'Full-time', posted: '5d ago', salary: '$160–190k' },
    { id: 'r3', title: 'Freelance Illustrator',  loc: 'Remote',          type: 'Contract',  posted: '1w ago', salary: '$85–110/hr' },
  ],
  'northwind': [
    { id: 'r1', title: 'Senior Product Designer', loc: 'Remote · EU',    type: 'Full-time', posted: '1d ago', salary: '€90–115k' },
    { id: 'r2', title: 'Design Systems Lead',     loc: 'Amsterdam',      type: 'Full-time', posted: '3d ago', salary: '€110–135k' },
    { id: 'r3', title: 'UX Researcher',           loc: 'Hybrid · London',type: 'Full-time', posted: '1w ago', salary: '£75–95k' },
    { id: 'r4', title: 'Staff Product Designer',  loc: 'Remote',         type: 'Full-time', posted: '2w ago', salary: '€130–160k' },
  ],
  'paper-pine': [
    { id: 'r1', title: 'Art Director',       loc: 'Portland, OR',  type: 'Full-time', posted: '4d ago', salary: '$130–160k' },
    { id: 'r2', title: 'Editorial Designer', loc: 'Remote · US',   type: 'Contract',  posted: '6d ago', salary: '$70–90/hr' },
  ],
  'kiln':     [{ id: 'r1', title: 'Senior Product Designer', loc: 'Remote',      type: 'Full-time', posted: '3d ago', salary: '$140–175k' }],
  'meridian': [{ id: 'r1', title: 'Principal Designer, AI',  loc: 'SF / Remote', type: 'Full-time', posted: '1w ago', salary: '$210–260k' }],
  'linen':    [{ id: 'r1', title: 'Web Designer',            loc: 'Remote',      type: 'Full-time', posted: '2d ago', salary: '$95–120k'  }],
  'harbor':   [{ id: 'r1', title: 'Senior UX Designer',      loc: 'Boston / Remote', type: 'Full-time', posted: '5d ago', salary: '$135–165k' }],
  'cedar':    [{ id: 'r1', title: 'Brand & Packaging Designer', loc: 'LA',       type: 'Full-time', posted: '1w ago', salary: '$90–115k' }],
};

export const GOALS = [
  { id: 'ft', label: 'Full-time',   hint: 'Salaried role' },
  { id: 'pt', label: 'Part-time',   hint: 'Up to 30 hrs/wk' },
  { id: 'ct', label: 'Contract',    hint: 'Fixed engagement' },
  { id: 'fl', label: 'Freelance',   hint: 'Project work' },
  { id: 'in', label: 'Internship',  hint: 'Learn & grow' },
  { id: 'rm', label: 'Remote only', hint: 'Work from anywhere' },
];

export const STATUSES = [
  { id: 'saved',   label: 'Saved',   color: '#948A7F' },
  { id: 'applied', label: 'Applied', color: '#B4643E' },
  { id: 'screen',  label: 'Screen',  color: '#5E7A58' },
  { id: 'onsite',  label: 'Onsite',  color: '#8F4A2E' },
];

export const PREP_TEMPLATES = [
  { id: 'why',     group: 'before', label: 'Why this company',   starter: '• 3 things that excite me about them:\n  1. \n  2. \n  3. ' },
  { id: 'star',    group: 'before', label: 'STAR stories',        starter: '• Situation:\n• Task:\n• Action:\n• Result:' },
  { id: 'q',       group: 'before', label: 'Questions to ask',    starter: '• What does success look like in the first 90 days?\n• How does the team make decisions?\n• ' },
  { id: 'salary',  group: 'before', label: 'Salary & logistics',  starter: '• Target range: \n• Must-haves: \n• Nice-to-haves: ' },
  { id: 'debrief', group: 'after',  label: 'Debrief',             starter: '• Who I spoke with:\n• Overall vibe (1-5):\n• Felt strong on:\n• Felt shaky on:' },
  { id: 'answers', group: 'after',  label: 'Their answers',       starter: '• To my questions:\n• Red flags:\n• Green flags:' },
  { id: 'followup',group: 'after',  label: 'Follow-up to send',   starter: '• Thank-you email draft:\n  Hi __,\n  Thanks for the conversation about __.\n• Anything to clarify or resend:' },
  { id: 'reflect', group: 'after',  label: 'Self-reflection',     starter: "• Would I take this role today? Y/N because…\n• What I'd do differently next time:" },
];

export const RANK_LABELS = ['Not rated', 'Low', 'Mild', 'Solid', 'High', 'Top pick'];
