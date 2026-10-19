// C‑Suite member definitions and helper
export type CSuiteMember = {
  role: string;
  title: string;
  email: string;
  department: string;
};

export const CSUITE_MEMBERS: CSuiteMember[] = [
  { role: 'CEO', title: 'Chief Executive Officer', email: 'ceo@executive.local', department: 'Executive Leadership' },
  { role: 'COO', title: 'Chief Operating Officer', email: 'coo@executive.local', department: 'Operations & Execution' },
  { role: 'CFO', title: 'Chief Financial Officer', email: 'cfo@executive.local', department: 'Finance & Capital' },
  { role: 'CTO', title: 'Chief Technology Officer', email: 'cto@executive.local', department: 'Engineering & Technology' },
  { role: 'CPO', title: 'Chief Product Officer', email: 'cpo@executive.local', department: 'Product & Design' },
  { role: 'CMO', title: 'Chief Marketing Officer', email: 'cmo@executive.local', department: 'Marketing & Brand' },
  { role: 'CRO', title: 'Chief Revenue Officer', email: 'cro@executive.local', department: 'Sales & Revenue' },
  { role: 'CIO', title: 'Chief Information Officer', email: 'cio@executive.local', department: 'IT & Infrastructure' },
  { role: 'CISO', title: 'Chief Information Security Officer', email: 'ciso@executive.local', department: 'Cybersecurity & Risk' },
  { role: 'CHRO', title: 'Chief Human Resources Officer', email: 'chro@executive.local', department: 'People & Talent' },
  { role: 'CLO', title: 'Chief Legal Officer / General Counsel', email: 'clo@executive.local', department: 'Legal & Governance' },
];

export function findCSuiteMember(emailOrRole: string): CSuiteMember | undefined {
  const query = emailOrRole.trim().toLowerCase();
  if (!query) return undefined;
  return CSUITE_MEMBERS.find(
    m =>
      m.email.toLowerCase() === query ||
      m.role.toLowerCase() === query ||
      query.includes(m.email.toLowerCase()) ||
      query.includes(`(${m.email.toLowerCase()})`) ||
      query === m.role.toLowerCase()
  );
}
