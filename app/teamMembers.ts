// Team member definitions per C‑Suite role
export type TeamMember = {
  name: string;
  email: string;
};

// Initialise with empty arrays for each C‑Suite role. Adjust as needed.
export const TEAM_MEMBERS: Record<string, TeamMember[]> = {
  CEO: [],
  COO: [],
  CFO: [],
  CTO: [],
  CPO: [],
  CMO: [],
  CRO: [],
  CIO: [],
  CISO: [],
  CHRO: [],
  CLO: [],
};

/** Add a team member to a specific C‑Suite role */
export function addTeamMember(role: string, member: TeamMember): void {
  if (TEAM_MEMBERS[role]) {
    // Prevent duplicate emails for the same role
    const exists = TEAM_MEMBERS[role].some(m => m.email.toLowerCase() === member.email.toLowerCase());
    if (!exists) {
      TEAM_MEMBERS[role].push(member);
    }
  }
}

/** Retrieve the array of team members for a given role */
export function loadTeamMembers() {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('team-members-demo');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Record<string, TeamMember[]>;
        Object.assign(TEAM_MEMBERS, parsed);
      } catch (e) {
        console.error('Failed to parse saved team members', e);
      }
    }
  }
}

export function getTeamMembers(role: string): TeamMember[] {
  return TEAM_MEMBERS[role] ?? [];
}

export function persistTeamMembers() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('team-members-demo', JSON.stringify(TEAM_MEMBERS));
  }
}

