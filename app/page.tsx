'use client';
import { useEffect, useMemo, useState } from 'react';
import { createClient } from '../lib/supabase';

import { CSUITE_MEMBERS, findCSuiteMember } from './csuite';
import { getTeamMembers, addTeamMember, TeamMember, TEAM_MEMBERS, loadTeamMembers, persistTeamMembers } from './teamMembers';
type Note = {
  id: string;
  title: string;
  body: string;
  category: string;
  priority: string;
  pinned: boolean;
  allocated_to?: string;
  allocated_by?: string;
  user_id?: string;
  updated_at: string;
};

type FilterTab = 'all' | 'mine' | 'to_others' | 'to_me';

const categories = ['Meeting', 'Strategy', 'Decision', 'Board', 'Project', 'Personal'];

const DEFAULT_CSUITE_NOTES: Note[] = [
  {
    id: 'csuite-ceo-1',
    title: 'Board Strategy & Annual Operating Priorities',
    body: 'Review 3-year vision, capital allocation milestones, and board approval roadmap for international expansion.',
    category: 'Strategy',
    priority: 'Critical',
    pinned: true,
    allocated_to: 'ceo@executive.local',
    allocated_by: 'executive@local.demo',
    user_id: 'local-demo-user',
    updated_at: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'csuite-cfo-1',
    title: 'Q4 Budget & Runway Forecast Model',
    body: 'Finalize department headcount budgets, burn rate scenario analysis, and treasury investment strategy.',
    category: 'Decision',
    priority: 'Critical',
    pinned: true,
    allocated_to: 'cfo@executive.local',
    allocated_by: 'executive@local.demo',
    user_id: 'local-demo-user',
    updated_at: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: 'csuite-cto-1',
    title: 'AI Platform Architecture & Core Infrastructure Scalability',
    body: 'Evaluate multi-cloud resilience, latency SLAs for inference pipelines, and technical debt retirement plan.',
    category: 'Project',
    priority: 'High',
    pinned: false,
    allocated_to: 'cto@executive.local',
    allocated_by: 'executive@local.demo',
    user_id: 'local-demo-user',
    updated_at: new Date(Date.now() - 10800000).toISOString()
  },
  {
    id: 'csuite-coo-1',
    title: 'Cross-Functional Execution Cadence & Vendor Consolidation',
    body: 'Audit operational bottlenecks across delivery teams, renegotiate enterprise software contracts, and streamline OKR tracking.',
    category: 'Meeting',
    priority: 'Normal',
    pinned: false,
    allocated_to: 'coo@executive.local',
    allocated_by: 'executive@local.demo',
    user_id: 'local-demo-user',
    updated_at: new Date(Date.now() - 14400000).toISOString()
  },
  {
    id: 'csuite-cpo-1',
    title: 'Q1 Product Roadmap & Executive UX Overhaul',
    body: 'Customer advisory board feedback synthesis, feature prioritization for enterprise workflows, and release gates.',
    category: 'Project',
    priority: 'High',
    pinned: false,
    allocated_to: 'cpo@executive.local',
    allocated_by: 'executive@local.demo',
    user_id: 'local-demo-user',
    updated_at: new Date(Date.now() - 18000000).toISOString()
  },
  {
    id: 'csuite-ciso-1',
    title: 'Zero-Trust Architecture & SOC2 Type II Renewal',
    body: 'Review third-party risk assessments, employee security training metrics, and incident response table-top results.',
    category: 'Decision',
    priority: 'Critical',
    pinned: false,
    allocated_to: 'ciso@executive.local',
    allocated_by: 'executive@local.demo',
    user_id: 'local-demo-user',
    updated_at: new Date(Date.now() - 21600000).toISOString()
  },
  {
    id: 'csuite-cro-1',
    title: 'Global Enterprise Pipeline & Sales Capacity Planning',
    body: 'Analyze enterprise win rates, ACV trends, channel partner compensation models, and Q1 quota allocations.',
    category: 'Strategy',
    priority: 'High',
    pinned: false,
    allocated_to: 'cro@executive.local',
    allocated_by: 'executive@local.demo',
    user_id: 'local-demo-user',
    updated_at: new Date(Date.now() - 25200000).toISOString()
  },
  {
    id: 'csuite-cmo-1',
    title: 'Brand Repositioning Campaign & Executive Summit',
    body: 'Keynote themes, press briefings, thought leadership calendar, and brand equity measurement for enterprise market.',
    category: 'Project',
    priority: 'Normal',
    pinned: false,
    allocated_to: 'cmo@executive.local',
    allocated_by: 'executive@local.demo',
    user_id: 'local-demo-user',
    updated_at: new Date(Date.now() - 28800000).toISOString()
  },
  {
    id: 'csuite-chro-1',
    title: 'Executive Leadership Compensation & Retention Packages',
    body: 'Benchmarking C-suite equity grants, senior retention bonuses, and organizational design for global expansion.',
    category: 'Board',
    priority: 'High',
    pinned: false,
    allocated_to: 'chro@executive.local',
    allocated_by: 'executive@local.demo',
    user_id: 'local-demo-user',
    updated_at: new Date(Date.now() - 32400000).toISOString()
  },
  {
    id: 'csuite-clo-1',
    title: 'Governance Policies, IP Protection & Regulatory Filings',
    body: 'Review board resolution drafting, intellectual property audit, and cross-border regulatory compliance updates.',
    category: 'Board',
    priority: 'Critical',
    pinned: false,
    allocated_to: 'clo@executive.local',
    allocated_by: 'executive@local.demo',
    user_id: 'local-demo-user',
    updated_at: new Date(Date.now() - 36000000).toISOString()
  },
  {
    id: 'csuite-cio-1',
    title: 'Cloud Infrastructure Migration & Multi-Region Disaster Recovery',
    body: 'RTO/RPO targets verification, backup verification procedures, and enterprise data lake consolidation status.',
    category: 'Strategy',
    priority: 'Normal',
    pinned: false,
    allocated_to: 'cio@executive.local',
    allocated_by: 'executive@local.demo',
    user_id: 'local-demo-user',
    updated_at: new Date(Date.now() - 39600000).toISOString()
  }
];

export default function Home() {
  const [client] = useState(() => createClient());
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const [notes, setNotes] = useState<Note[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [filterTab, setFilterTab] = useState<FilterTab>('all');
  const [csuiteFilter, setCsuiteFilter] = useState<string>('all');

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('Meeting');
  const [priority, setPriority] = useState('Normal');
  const [pinned, setPinned] = useState(false);
  const [allocatedTo, setAllocatedTo] = useState('');
  const [allocatedBy, setAllocatedBy] = useState('');
// New state for team member management
  const [showAddTeam, setShowAddTeam] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');

  // Load team members on component mount (demo mode)
  useEffect(() => {
    loadTeamMembers();
  }, []);

  // Helper to add a new team member and persist
  const handleAddTeamMember = () => {
    if (!selectedMember?.role) {
      setMessage('Select a C‑Suite role before adding a team member.');
      return;
    }
    if (!newMemberName.trim() || !newMemberEmail.trim()) {
      setMessage('Name and email are required.');
      return;
    }
    addTeamMember(selectedMember.role, { name: newMemberName.trim(), email: newMemberEmail.trim() });
    persistTeamMembers();
    setShowAddTeam(false);
    setNewMemberName('');
    setNewMemberEmail('');
    setMessage(`Added ${newMemberName} to ${selectedMember.role}.`);
  };

  async function loadNotes() {
    if (!client) {
      try {
        const saved = localStorage.getItem('executive-notes-demo');
        if (saved) {
          setNotes(JSON.parse(saved));
        } else {
          // Pre-seed C-Suite allocations for demo mode
          localStorage.setItem('executive-notes-demo', JSON.stringify(DEFAULT_CSUITE_NOTES));
          setNotes(DEFAULT_CSUITE_NOTES);
        }
      } catch {
        setNotes(DEFAULT_CSUITE_NOTES);
        setMessage('Could not read local demo notes from this browser.');
      }
      return;
    }

    const { data, error } = await client
      .from('notes')
      .select('id,title,body,category,priority,pinned,allocated_to,allocated_by,user_id,updated_at')
      .order('pinned', { ascending: false })
      .order('updated_at', { ascending: false });

    if (error) {
      setMessage(error.message);
    } else {
      setNotes(data || []);
    }
  }

  useEffect(() => {
    if (!client) {
      setUser({ id: 'local-demo-user', email: 'executive@local.demo' });
      void loadNotes();
      setMessage('Local demo mode: C-Suite allocations are saved in this browser. Connect Supabase for cloud sync.');
      return;
    }

    client.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      if (data.session?.user) void loadNotes();
    });

    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        void loadNotes();
      } else {
        setNotes([]);
        setSelected(null);
        setTitle('');
        setBody('');
        setAllocatedTo('');
        setAllocatedBy('');
      }
    });

    return () => subscription.unsubscribe();
  }, [client]);

  const filtered = useMemo(() => {
    const currentEmail = (user?.email || '').toLowerCase();
    const currentId = user?.id || '';

    return notes.filter(n => {
      const searchTarget = (
        n.title + ' ' +
        n.body + ' ' +
        n.category + ' ' +
        (n.allocated_to || '') + ' ' +
        (n.allocated_by || '')
      ).toLowerCase();

      if (!searchTarget.includes(query.toLowerCase())) return false;

      const noteAllocatedTo = (n.allocated_to || '').trim().toLowerCase();
      const isAllocatedToMe = Boolean(noteAllocatedTo && (noteAllocatedTo === currentEmail || (n.allocated_to || '').trim() === currentId));
      const isAllocatedToOther = Boolean(noteAllocatedTo && !isAllocatedToMe);
      const isCreatedByMe = !n.user_id || n.user_id === currentId;

      if (filterTab === 'to_me' && !isAllocatedToMe) return false;
      if (filterTab === 'to_others' && !isAllocatedToOther) return false;
      if (filterTab === 'mine' && (!isCreatedByMe || isAllocatedToOther)) return false;

      // Filter by C-Suite member if selected
      if (csuiteFilter !== 'all') {
        const member = findCSuiteMember(noteAllocatedTo);
        if (!member || member.role.toLowerCase() !== csuiteFilter.toLowerCase()) {
          return false;
        }
      }

      return true;
    });
  }, [notes, query, filterTab, csuiteFilter, user]);

  function startNewNote() {
    setSelected(null);
    setTitle('');
    setBody('');
    setCategory('Meeting');
    setPriority('Normal');
    setPinned(false);
    setAllocatedTo('');
    setAllocatedBy('');
    setMessage('');
  }

  function choose(n: Note) {
    setSelected(n.id);
    setTitle(n.title);
    setBody(n.body);
    setCategory(n.category);
    setPriority(n.priority);
    setPinned(n.pinned);
    setAllocatedTo(n.allocated_to || '');
    setAllocatedBy(n.allocated_by || '');
    setMessage('');
  }

  async function auth(mode: 'signin' | 'signup') {
    if (!client) return;
    setMessage('');
    const result = mode === 'signup'
      ? await client.auth.signUp({ email, password })
      : await client.auth.signInWithPassword({ email, password });

    if (result.error) {
      setMessage(result.error.message);
    } else {
      if (mode === 'signup') {
        setUser(result.data.session?.user ?? null);
        setMessage(
          result.data.session
            ? 'Account created and signed in.'
            : 'Account request submitted. Check your email to confirm the account, then sign in.'
        );
      } else {
        setUser(result.data.user);
        setMessage('Signed in.');
        await loadNotes();
      }
    }
  }

  async function resetPassword() {
    if (!client) {
      setMessage('Configure Supabase before requesting a password reset.');
      return;
    }
    if (!email.trim()) {
      setMessage('Enter your email address first.');
      return;
    }
    setMessage('');
    const { error } = await client.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/` : undefined
    });
    setMessage(
      error
        ? error.message
        : 'If an account exists for that email, a password-reset message will be sent. Check your inbox and spam folder.'
    );
  }

  async function save() {
    if (!user) return;
    const userIdentifier = user.email || user.id;
    const targetAllocatedTo = allocatedTo.trim();
    const targetAllocatedBy = targetAllocatedTo ? (allocatedBy || userIdentifier) : '';

    const basePayload = {
      title: title.trim() || 'Untitled note',
      body,
      category,
      priority,
      pinned,
      allocated_to: targetAllocatedTo,
      allocated_by: targetAllocatedBy,
      updated_at: new Date().toISOString()
    };

    if (!client) {
      const existing = selected ? notes.find(n => n.id === selected) : null;
      const id = selected || `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const note: Note = {
        ...basePayload,
        id,
        user_id: existing?.user_id || user.id
      };
      const next = selected ? notes.map(n => (n.id === selected ? note : n)) : [note, ...notes];
      try {
        localStorage.setItem('executive-notes-demo', JSON.stringify(next));
        setNotes(next);
        setSelected(id);
        setAllocatedBy(targetAllocatedBy);
        const cMember = findCSuiteMember(targetAllocatedTo);
        setMessage(
          targetAllocatedTo
            ? `Saved and allocated to ${cMember ? `${cMember.role} (${cMember.title})` : targetAllocatedTo} (browser mode).`
            : 'Saved in this browser only. Connect Supabase for account-backed storage.'
        );
      } catch {
        setMessage('Could not save this note in browser storage. Check available storage and browser privacy settings.');
      }
      return;
    }

    const result = selected
      ? await client.from('notes').update(basePayload).eq('id', selected).select('id').maybeSingle()
      : await client.from('notes').insert({ ...basePayload, user_id: user.id }).select('id').single();

    if (result.error) {
      setMessage(result.error.message);
      return;
    }
    if (!result.data) {
      setMessage('No note was changed. Check your permissions.');
      return;
    }

    setSelected(result.data.id);
    setAllocatedBy(targetAllocatedBy);
    const cMember = findCSuiteMember(targetAllocatedTo);
    setMessage(targetAllocatedTo ? `Saved and allocated to ${cMember ? `${cMember.role} (${cMember.title})` : targetAllocatedTo}.` : 'Saved.');
    await loadNotes();
  }

  async function remove() {
    if (!selected) return;
    if (typeof window !== 'undefined' && !window.confirm('Delete this note permanently?')) return;

    if (!client) {
      const next = notes.filter(n => n.id !== selected);
      try {
        localStorage.setItem('executive-notes-demo', JSON.stringify(next));
        setNotes(next);
        startNewNote();
        setMessage('Note deleted from this browser.');
      } catch {
        setMessage('Could not update browser storage.');
      }
      return;
    }

    const { data, error } = await client.from('notes').delete().eq('id', selected).select('id').maybeSingle();
    if (error) {
      setMessage(error.message);
    } else if (!data) {
      setMessage('No note was deleted. Check your permissions.');
    } else {
      startNewNote();
      setMessage('Note deleted.');
      await loadNotes();
    }
  }

  async function signout() {
    if (!client) return;
    await client.auth.signOut();
    setUser(null);
    setNotes([]);
    startNewNote();
    setMessage('Signed out.');
  }

  const selectedMember = findCSuiteMember(allocatedTo);

  return (
    <main className="shell">
      <header>
        <div>
          <p className="eyebrow">PRIVATE EXECUTIVE WORKSPACE</p>
          <h1>Executive Notes</h1>
          <p className="sub">Meetings, decisions and strategy — in one focused space.</p>
        </div>
        {user && client && <button className="quiet" onClick={signout}>Sign out</button>}
        {!client && <span className="eyebrow">LOCAL DEMO</span>}
      </header>

      {!user ? (
        <section className="auth panel">
          <h2>Sign in to your workspace</h2>
          <p>Use your Supabase-authenticated account to access private notes.</p>
          <label>
            Email
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" />
          </label>
          <div className="actions">
            <button onClick={() => auth('signin')}>Sign in</button>
            <button className="secondary" onClick={() => auth('signup')}>Create account</button>
            <button className="quiet" onClick={resetPassword}>Forgot password?</button>
          </div>
          {message && <p className="message">{message}</p>}
        </section>
      ) : (
        <div className="workspace">
          <aside className="panel sidebar">
            <div className="sidebarhead">
              <h2>Your notes</h2>
              <button onClick={startNewNote}>+ New</button>
            </div>

            <input
              aria-label="Search notes"
              placeholder="Search notes, C-suite roles, assignees…"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />

            <div className="filter-tabs" role="tablist" aria-label="Filter notes by allocation">
              <button
                type="button"
                className={`filter-btn ${filterTab === 'all' ? 'active' : ''}`}
                onClick={() => setFilterTab('all')}
              >
                All ({notes.length})
              </button>
              <button
                type="button"
                className={`filter-btn ${filterTab === 'mine' ? 'active' : ''}`}
                onClick={() => setFilterTab('mine')}
              >
                My notes
              </button>
              <button
                type="button"
                className={`filter-btn ${filterTab === 'to_others' ? 'active' : ''}`}
                onClick={() => setFilterTab('to_others')}
              >
                Allocated to others
              </button>
              <button
                type="button"
                className={`filter-btn ${filterTab === 'to_me' ? 'active' : ''}`}
                onClick={() => setFilterTab('to_me')}
              >
                Allocated to me
              </button>
            </div>

            <label style={{ fontSize: '12px', fontWeight: 650, color: 'var(--muted)', display: 'block', marginTop: '10px' }}>
              Filter by C-Suite Role:
              <select
                className="sidebar-filter-select"
                value={csuiteFilter}
                onChange={e => setCsuiteFilter(e.target.value)}
              >
                <option value="all">All C-Suite Members & General Notes</option>
                {CSUITE_MEMBERS.map(m => (
                  <option key={m.role} value={m.role}>
                    {m.role} — {m.title}
                  </option>
                ))}
              </select>
            </label>

            <div className="notelist">
              {filtered.map(n => {
                const member = findCSuiteMember(n.allocated_to || '');
                return (
                  <button
                    key={n.id}
                    className={'noteitem ' + (selected === n.id ? 'active' : '')}
                    onClick={() => choose(n)}
                  >
                    <span>{n.pinned ? '📌 ' : ''}{n.title || 'Untitled note'}</span>
                    <small>{n.category} · {new Date(n.updated_at).toLocaleDateString()}</small>
                    {n.allocated_to && (
                      <span className="allocated-badge">
                        {member ? (
                          <>
                            <span className="role-badge">{member.role}</span> {member.title}
                          </>
                        ) : user?.email && n.allocated_to.toLowerCase() === user.email.toLowerCase() ? (
                          '👤 Allocated to you'
                        ) : (
                          `👤 ${n.allocated_to}`
                        )}
                      </span>
                    )}
                    <small>{n.body.slice(0, 72) || 'No content yet'}</small>
                  </button>
                );
              })}
              {!filtered.length && <p className="muted">No matching executive notes found.</p>}
            </div>
          </aside>

          <section className="panel editor">
            <div className="editorhead">
              <span className="eyebrow">{selected ? 'EDIT NOTE' : 'NEW NOTE'}</span>
              <label className="pin">
                <input type="checkbox" checked={pinned} onChange={e => setPinned(e.target.checked)} /> Pin
              </label>
            </div>

            <input
              className="titleinput"
              placeholder="Note title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            <div className="metadata">
              <label>
                Category
                <select value={category} onChange={e => setCategory(e.target.value)}>
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </label>

              <label>
                Priority
                <select value={priority} onChange={e => setPriority(e.target.value)}>
                  {['Normal', 'High', 'Critical'].map(p => <option key={p}>{p}</option>)}
                </select>
              </label>

              <label style={{ minWidth: '170px' }}>
                C-Suite Officer
                <select
                  className="csuite-select"
                  value={selectedMember ? selectedMember.role : ''}
                  onChange={e => {
                    const found = CSUITE_MEMBERS.find(m => m.role === e.target.value);
                    if (found) setAllocatedTo(found.email);
                    else if (e.target.value === '') setAllocatedTo('');
                  }}
                >
                  <option value="">-- Select C-Suite Role --</option>
                  {CSUITE_MEMBERS.map(m => (
                    <option key={m.role} value={m.role}>
                      {m.role} — {m.title}
                    </option>
                  ))}
                </select>
              </label>

              <label style={{ minWidth: '200px', flex: 1.5 }}>
                Assignee Email / Identifier
                <input
                  type="text"
                  list="csuite-datalist"
                  placeholder="e.g. cto@executive.local"
                  value={allocatedTo}
                  onChange={e => setAllocatedTo(e.target.value)}
                />
                <datalist id="csuite-datalist">
                  {CSUITE_MEMBERS.map(m => (
                    <option key={m.email} value={m.email}>
                      {m.role} — {m.title} ({m.department})
                    </option>
                  ))}
                </datalist>
                {selectedMember?.role && (
                  <div style={{ marginTop: '8px' }}>
                    <label style={{ minWidth: '200px' }}>
                      Team Member
                      <select
                        value={allocatedTo}
                        onChange={e => setAllocatedTo(e.target.value)}
                      >
                        <option value="">-- Select Team Member --</option>
                        {getTeamMembers(selectedMember.role).map(m => (
                          <option key={m.email} value={m.email}>
                            {m.name} — {m.email}
                          </option>
                        ))}
                      </select>
                    </label>
                    <button type="button" className="secondary" onClick={() => setShowAddTeam(true)} style={{ marginLeft: '8px' }}>
                      Add Team Member
                    </button>
                  </div>
                )}
                {showAddTeam && (
                  <div style={{ marginTop: '8px', padding: '8px', border: '1px solid var(--muted)', borderRadius: '4px' }}>
                    <label>
                      Name
                      <input type="text" value={newMemberName} onChange={e => setNewMemberName(e.target.value)} />
                    </label>
                    <label style={{ marginLeft: '8px' }}>
                      Email
                      <input type="email" value={newMemberEmail} onChange={e => setNewMemberEmail(e.target.value)} />
                    </label>
                    <button type="button" className="primary" onClick={handleAddTeamMember}>Add</button>
                    <button type="button" className="quiet" onClick={() => setShowAddTeam(false)} style={{ marginLeft: '4px' }}>Cancel</button>
                  </div>
                )}
              </label>
            </div>

            {/* C-Suite Quick Allocation Tray */}
            <div className="csuite-tray">
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--muted)', marginRight: '4px' }}>
                Quick Allocate C-Suite:
              </span>
              {CSUITE_MEMBERS.map(m => {
                const isActive = selectedMember?.role === m.role;
                return (
                  <button
                    key={m.role}
                    type="button"
                    className={`csuite-chip ${isActive ? 'active' : ''}`}
                    onClick={() => setAllocatedTo(m.email)}
                    title={`${m.title} (${m.department})`}
                  >
                    {m.role}
                  </button>
                );
              })}
              {user?.email && (
                <button
                  type="button"
                  className="csuite-chip"
                  onClick={() => setAllocatedTo(user.email || '')}
                  title={`Allocate to Self (${user.email})`}
                >
                  Self
                </button>
              )}
            </div>

            {allocatedTo.trim() && (
              <div className="allocation-info">
                <span>
                  👤 <strong>Allocated to:</strong>{' '}
                  {selectedMember ? (
                    <>
                      <span className="role-badge">{selectedMember.role}</span>{' '}
                      <strong>{selectedMember.title}</strong> ({allocatedTo} · {selectedMember.department})
                    </>
                  ) : (
                    allocatedTo
                  )}
                  {allocatedBy && allocatedBy !== allocatedTo ? ` · Delegated by: ${allocatedBy}` : ''}
                </span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {user?.email && allocatedTo.toLowerCase() !== user.email.toLowerCase() && (
                    <button
                      type="button"
                      className="quick-btn"
                      onClick={() => setAllocatedTo(user.email || '')}
                    >
                      Allocate to me
                    </button>
                  )}
                  <button
                    type="button"
                    className="quick-btn"
                    onClick={() => { setAllocatedTo(''); setAllocatedBy(''); }}
                  >
                    Clear allocation
                  </button>
                </div>
              </div>
            )}

            <textarea
              placeholder="Capture key executive points, decisions, risks, C-suite action items and next steps…"
              value={body}
              onChange={e => setBody(e.target.value)}
            />

            <div className="actions">
              <button onClick={save}>Save note</button>
              {selected && <button className="danger" onClick={remove}>Delete</button>}
            </div>

            {message && <p className="message">{message}</p>}
          </section>
        </div>
      )}

      <footer>
        Designed for executive workflows. Configure and test access policies before storing confidential information.
      </footer>
    </main>
  );
}
