import React, { useEffect, useMemo, useState } from "react";

const CATEGORIES = [
  "AgriTech", "HealthTech", "EdTech", "FinTech", "CleanTech/Energy",
  "E-Commerce/Retail Tech", "Transportation/Logistics", "Smart Cities/Infrastructure",
  "Environmental Solutions", "Social Innovation", "Other"
];

const SDG_OPTIONS = [
  { v: '1', l: 'No Poverty' }, { v: '2', l: 'Zero Hunger' }, { v: '3', l: 'Good Health and Well-being' },
  { v: '4', l: 'Quality Education' }, { v: '5', l: 'Gender Equality' }, { v: '6', l: 'Clean Water and Sanitation' },
  { v: '7', l: 'Affordable and Clean Energy' }, { v: '8', l: 'Decent Work and Economic Growth' },
  { v: '9', l: 'Industry, Innovation and Infrastructure' }, { v: '10', l: 'Reduced Inequalities' },
  { v: '11', l: 'Sustainable Cities and Communities' }, { v: '12', l: 'Responsible Consumption and Production' },
  { v: '13', l: 'Climate Action' }, { v: '14', l: 'Life Below Water' }, { v: '15', l: 'Life on Land' },
  { v: '16', l: 'Peace, Justice and Strong Institutions' }, { v: '17', l: 'Partnerships for the Goals' }
];

const STAGES = [
  'Idea/Concept Stage', 'Prototype Development', 'MVP (Minimum Viable Product)',
  'Market Testing', 'Early Revenue/Scaling'
];

const DEFAULT_MEMBER = { name: '', email: '', phone: '', role: '', department: '', level: '' };
const STORAGE_KEY = 'innotech_registration_draft_v2';

export default function Register() {
  const [teamName, setTeamName] = useState('');
  const [innovationTitle, setInnovationTitle] = useState('');
  const [category, setCategory] = useState('');
  const [sdgs, setSdgs] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [impact, setImpact] = useState('');
  const [stage, setStage] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [documentUrl, setDocumentUrl] = useState('');
  const [members, setMembers] = useState<any[]>([{ ...DEFAULT_MEMBER }, { ...DEFAULT_MEMBER }, { ...DEFAULT_MEMBER }]);
  const [pitchFile, setPitchFile] = useState<File | null>(null);
  const [docFile, setDocFile] = useState<File | null>(null);
  const [terms, setTerms] = useState({ accurate: false, enrolled: false, rules: false, truthful: false });

  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const draft = localStorage.getItem(STORAGE_KEY);
      if (draft) {
        const d = JSON.parse(draft);
        setTeamName(d.teamName || '');
        setInnovationTitle(d.innovationTitle || '');
        setCategory(d.category || '');
        setSdgs(d.sdgs || []);
        setDescription(d.description || '');
        setProblem(d.problem || '');
        setSolution(d.solution || '');
        setImpact(d.impact || '');
        setStage(d.stage || '');
        setVideoUrl(d.videoUrl || '');
        setDocumentUrl(d.documentUrl || '');
        setMembers(d.members && d.members.length ? d.members : [{...DEFAULT_MEMBER},{...DEFAULT_MEMBER},{...DEFAULT_MEMBER}]);
        setTerms(d.terms || {accurate:false,enrolled:false,rules:false,truthful:false});
      }
    } catch (err) {
      // ignore
    }
  }, []);

  useEffect(() => {
    const draft = { teamName, innovationTitle, category, sdgs, description, problem, solution, impact, stage, videoUrl, documentUrl, members, terms };
    const t = setTimeout(() => {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(draft)); } catch(e){}
    }, 700);
    return () => clearTimeout(t);
  }, [teamName, innovationTitle, category, sdgs, description, problem, solution, impact, stage, videoUrl, documentUrl, members, terms]);

  const wordCount = useMemo(() => description.split(/\s+/).filter(Boolean).length, [description]);
  const handleDescriptionChange = (txt: string) => {
    const words = txt.split(/\s+/).filter(Boolean);
    if (words.length <= 200) setDescription(txt);
    else setDescription(words.slice(0,200).join(' '));
  };
  const toggleSdg = (v: string) => setSdgs(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]);
  const addMember = () => { if (members.length < 5) setMembers(prev => [...prev, {...DEFAULT_MEMBER}]); };
  const removeMember = (i: number) => { if (members.length > 3) setMembers(prev => prev.filter((_, idx) => idx !== i)); };
  const updateMember = (i: number, f: string, val: string) => setMembers(prev => prev.map((m, idx) => idx === i ? {...m, [f]: val} : m));
  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const isValidPhone = (p: string) => {
    const s = String(p || '').replace(/\s+/g,'');
    return /^(\+234|234)?[0-9]{10}$/.test(s) || /^0[0-9]{10}$/.test(s);
  };
  const hasDuplicateEmails = () => {
    const list = members.map(m => (m.email||'').trim().toLowerCase()).filter(Boolean);
    return new Set(list).size !== list.length;
  };
  const allTermsChecked = Object.values(terms).every(Boolean);
  const baseValidity = () => {
    if (!teamName.trim() || !innovationTitle.trim() || !category || sdgs.length===0) return false;
    if (!description.trim() || !problem.trim() || !solution.trim() || !impact.trim() || !stage) return false;
    if (members.length < 3 || members.length > 5) return false;
    if (hasDuplicateEmails()) return false;
    for (const m of members) {
      if (!m.name.trim() || !m.email.trim() || !m.phone.trim() || !m.role.trim() || !m.department.trim() || !m.level) return false;
      if (!isValidEmail(m.email) || !isValidPhone(m.phone)) return false;
    }
    if (!allTermsChecked) return false;
    return true;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setSubmitError(null);
    if (!baseValidity()) { setSubmitError('Please complete all required fields correctly.'); return; }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('teamName', teamName.trim());
      fd.append('innovationTitle', innovationTitle.trim());
      fd.append('category', category);
      fd.append('sdgs', JSON.stringify(sdgs));
      fd.append('description', description.trim());
      fd.append('problem', problem.trim());
      fd.append('solution', solution.trim());
      fd.append('impact', impact.trim());
      fd.append('stage', stage);
      fd.append('videoUrl', videoUrl.trim());
      fd.append('documentUrl', documentUrl.trim());
      fd.append('members', JSON.stringify(members));
      if (pitchFile) fd.append('pitchFile', pitchFile);
      if (docFile) fd.append('docFile', docFile);

      const res = await fetch('/api/innotech/register', { method: 'POST', body: fd });
      if (!res.ok) {
        const payload = await res.json().catch(()=>null);
        throw new Error(payload?.message || `Submission failed (${res.status})`);
      }
      const data = await res.json().catch(()=>({}));
      setSubmitted(true);
      setRegistrationId(data.registrationId || 'INN-XXXX');
      localStorage.removeItem(STORAGE_KEY);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setSubmitError(err.message || 'Submission failed');
    } finally { setLoading(false); }
  };

  const steps = [
    { key: 'team', title: 'Team' },
    { key: 'innovation', title: 'Innovation' },
    { key: 'members', title: 'Members' },
    { key: 'files', title: 'Files' },
    { key: 'terms', title: 'Terms' },
    { key: 'review', title: 'Review' }
  ];

  const stepValid = (idx: number) => {
    switch(idx) {
      case 0: return Boolean(teamName.trim());
      case 1: return Boolean(innovationTitle.trim() && category && sdgs.length>0 && wordCount>0);
      case 2:
        return members.length>=3 && members.every((m: any) => m.name && m.email && m.phone && m.role && m.department && m.level && isValidEmail(m.email) && isValidPhone(m.phone)) && !hasDuplicateEmails();
      case 3: return true;
      case 4: return allTermsChecked;
      case 5: return baseValidity();
      default: return false;
    }
  };

  if (submitted) {
    return (
      <div style={{background:'var(--bg-light)'}} className="page-root">
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <main className="container center">
          <div className="success-card">
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:56,height:56,borderRadius:999,background:'var(--mint)',color:'var(--dark)',fontWeight:800}}>✓</div>
            <h1 className="h2">Registration Received</h1>
            <p className="muted">Thank you — your team has been registered for Innotech 4.0.</p>
            <div className="stat-card">
              <div>
                <p className="stat-number">{registrationId}</p>
                <p className="stat-label">Registration ID</p>
              </div>
              <div>
                <p className="muted">A confirmation email will be sent to your team lead.</p>
              </div>
            </div>
            <div style={{display:'flex', gap:12, justifyContent:'center', marginTop:18}}>
              <button className="btn-primary" onClick={()=>window.location.reload()}>Register Another Team</button>
            </div>
          </div>
        </main>
        <Footer />
        <Style />
      </div>
    );
  }

  return (
    <div className="page-root">
      <Style />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <section className="hero">
          <div className="hero-inner container">
            <div className="hero-content">
              <p className="eyebrow">INNOTECH 4.0</p>
              <h1 className="hero-title">Building solutions for tomorrow</h1>
              <p className="hero-sub">The premier innovation & pitch competition uniting students, founders, and industry leaders to design, build and launch impactful technology solutions.</p>
            </div>
          </div>
        </section>

        <section id="register" className="section container" style={{paddingTop:40}}>
          <div className="form-wrap">
            <div className="form-header">
              <div>
                <h2 className="h3">Register your team</h2>
                <p className="muted">Multi-step registration. Save progress automatically. Required: 3–5 members, must be UI students.</p>
              </div>
              <div className="progress-pill">{currentStep+1}/{steps.length}</div>
            </div>
            <form onSubmit={handleSubmit} className="form-card" aria-labelledby="form-heading">
              <div className="stepper">
                {steps.map((s, idx) => (
                  <div key={s.key} className={`step ${idx===currentStep ? 'active' : idx<currentStep ? 'done' : ''}`} aria-current={idx===currentStep ? 'step' : undefined}>
                    <div className="step-dot">{idx<currentStep ? '✓' : idx+1}</div>
                    <div className="step-label">{s.title}</div>
                  </div>
                ))}
              </div>
              <div className="step-content">
                {currentStep === 0 && (
                  <section>
                    <label className="field">
                      <span className="label">Team Name *</span>
                      <input id="teamName" value={teamName} onChange={e=>setTeamName(e.target.value)} placeholder="e.g., Team Infinity" className="input" />
                    </label>
                    <label className="field">
                      <span className="label">Team Lead Email *</span>
                      <input value={members[0]?.email||''} onChange={e=>updateMember(0,'email',e.target.value)} placeholder="lead@university.edu" className="input" />
                      <p className="hint">This address receives confirmations and next steps.</p>
                    </label>
                  </section>
                )}

                {currentStep === 1 && (
                  <section>
                    <label className="field">
                      <span className="label">Innovation / Project Title *</span>
                      <input value={innovationTitle} onChange={e=>setInnovationTitle(e.target.value)} className="input" placeholder="Short, clear title" />
                    </label>
                    <div className="grid-2">
                      <label className="field">
                        <span className="label">Category *</span>
                        <select value={category} onChange={e=>setCategory(e.target.value)} className="select">
                          <option value="">Select a category</option>
                          {CATEGORIES.map(c=> <option key={c} value={c}>{c}</option>)}
                        </select>
                      </label>
                      <label className="field">
                        <span className="label">Stage *</span>
                        <select value={stage} onChange={e=>setStage(e.target.value)} className="select">
                          <option value="">Select stage</option>
                          {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </label>
                    </div>
                    <div className="field">
                      <span className="label">UN SDGs (select at least 1) *</span>
                      <div className="sdg-grid">
                        {SDG_OPTIONS.map(o => (
                          <label key={o.v} className="sdg">
                            <input type="checkbox" checked={sdgs.includes(o.v)} onChange={()=>toggleSdg(o.v)} />
                            <span>SDG {o.v}: {o.l}</span>
                          </label>
                        ))}
                      </div>
                      {!sdgs.length && <p className="error small">Select at least one SDG</p>}
                    </div>
                    <label className="field">
                      <span className="label">Brief Description (max 200 words) *</span>
                      <textarea value={description} onChange={e=>handleDescriptionChange(e.target.value)} rows={4} className="textarea" />
                      <div className="hint-row">
                        <p className="hint small">{wordCount} / 200 words</p>
                        {wordCount>=200 && <p className="error small">Maximum reached</p>}
                      </div>
                    </label>
                    <label className="field">
                      <span className="label">Problem Statement *</span>
                      <textarea value={problem} onChange={e=>setProblem(e.target.value)} rows={3} className="textarea" />
                    </label>
                    <label className="field">
                      <span className="label">Your Solution *</span>
                      <textarea value={solution} onChange={e=>setSolution(e.target.value)} rows={3} className="textarea" />
                    </label>
                    <label className="field">
                      <span className="label">Expected Impact *</span>
                      <textarea value={impact} onChange={e=>setImpact(e.target.value)} rows={2} className="textarea" />
                    </label>
                  </section>
                )}

                {currentStep === 2 && (
                  <section>
                    <div className="members-header">
                      <h3 className="h4">Team Members ({members.length}/5)</h3>
                      <div>
                        {members.length < 5 && <button type="button" className="btn-ghost" onClick={addMember}>+ Add member</button>}
                      </div>
                    </div>
                    <div className="members-list">
                      {members.map((m, idx) => (
                        <div key={idx} className="member-card">
                          <div className="member-title">
                            <strong>Member {idx+1}</strong>
                            {members.length > 3 && idx > 0 && <button className="btn-ghost" onClick={()=>removeMember(idx)}>Remove</button>}
                          </div>
                          <div className="grid-2">
                            <label className="field">
                              <span className="label">Full Name *</span>
                              <input value={m.name} onChange={e=>updateMember(idx,'name',e.target.value)} className="input"/>
                            </label>
                            <label className="field">
                              <span className="label">Email *</span>
                              <input value={m.email} onChange={e=>updateMember(idx,'email',e.target.value)} className="input"/>
                              {m.email && !isValidEmail(m.email) && <p className="error small">Invalid email</p>}
                            </label>
                            <label className="field">
                              <span className="label">Phone *</span>
                              <input value={m.phone} onChange={e=>updateMember(idx,'phone',e.target.value)} className="input" placeholder="+234..." />
                              {m.phone && !isValidPhone(m.phone) && <p className="error small">Use +234 or 0 format</p>}
                            </label>
                            <label className="field">
                              <span className="label">Role *</span>
                              <input value={m.role} onChange={e=>updateMember(idx,'role',e.target.value)} className="input" placeholder="Developer, Designer..." />
                            </label>
                            <label className="field">
                              <span className="label">Department *</span>
                              <input value={m.department} onChange={e=>updateMember(idx,'department',e.target.value)} className="input" />
                            </label>
                            <label className="field">
                              <span className="label">Level *</span>
                              <select value={m.level} onChange={e=>updateMember(idx,'level',e.target.value)} className="select">
                                <option value="">Select</option>
                                <option>100L</option><option>200L</option><option>300L</option><option>400L</option><option>500L</option><option>600L</option><option>PG</option>
                              </select>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                    {hasDuplicateEmails() && <p className="error">Two or more members have the same email — please use unique emails.</p>}
                  </section>
                )}

                {currentStep === 3 && (
                  <section>
                    <label className="field">
                      <span className="label">Demo Video Link</span>
                      <input value={videoUrl} onChange={e=>setVideoUrl(e.target.value)} className="input" placeholder="https://youtube.com/..." />
                      <p className="hint small">You can share a YouTube or Drive link instead of uploading a large video file.</p>
                    </label>
                    <label className="field">
                      <span className="label">Supporting Document Link</span>
                      <input value={documentUrl} onChange={e=>setDocumentUrl(e.target.value)} className="input" placeholder="https://drive.google.com/..." />
                    </label>
                    <label className="field">
                      <span className="label">Pitch Deck (PDF/PPT, max 10MB)</span>
                      <input type="file" accept=".pdf,.ppt,.pptx,.doc,.docx" onChange={e=>setPitchFile(e.target.files?.[0]||null)} />
                      {pitchFile && <p className="hint small">Selected: {pitchFile.name} • {Math.round(pitchFile.size/1024)} KB</p>}
                    </label>
                    <label className="field">
                      <span className="label">Additional Document (optional)</span>
                      <input type="file" accept=".pdf,.doc,.docx,.zip" onChange={e=>setDocFile(e.target.files?.[0]||null)} />
                      {docFile && <p className="hint small">Selected: {docFile.name}</p>}
                    </label>
                  </section>
                )}

                {currentStep === 4 && (
                  <section>
                    <div className="card-muted">
                      <p className="label">Important Requirements</p>
                      <ul className="muted small">
                        <li>Teams must have 3–5 members.</li>
                        <li>Solutions should be STEM-related and align with at least one UN SDG.</li>
                        <li>All team members must be current University of Ibadan students.</li>
                      </ul>
                    </div>
                    <div className="terms-grid">
                      <label className="term">
                        <input type="checkbox" checked={terms.accurate} onChange={e=>setTerms(t=>({...t, accurate:e.target.checked}))} />
                        <span>I confirm that all information provided is accurate and truthful</span>
                      </label>
                      <label className="term">
                        <input type="checkbox" checked={terms.enrolled} onChange={e=>setTerms(t=>({...t, enrolled:e.target.checked}))} />
                        <span>All team members are currently enrolled students at the University of Ibadan</span>
                      </label>
                      <label className="term">
                        <input type="checkbox" checked={terms.rules} onChange={e=>setTerms(t=>({...t, rules:e.target.checked}))} />
                        <span>We agree to abide by the Innotech 4.0 rules and regulations</span>
                      </label>
                      <label className="term">
                        <input type="checkbox" checked={terms.truthful} onChange={e=>setTerms(t=>({...t, truthful:e.target.checked}))} />
                        <span>We understand that incomplete or false information may lead to disqualification</span>
                      </label>
                    </div>
                    {!allTermsChecked && <p className="error">You must accept all terms to continue.</p>}
                  </section>
                )}

                {currentStep === 5 && (
                  <section>
                    <div className="review-card">
                      <h3 className="h4">Summary</h3>
                      <p><strong>Team:</strong> {teamName}</p>
                      <p><strong>Title:</strong> {innovationTitle}</p>
                      <p><strong>Category:</strong> {category} • <strong>Stage:</strong> {stage}</p>
                      <p><strong>SDGs:</strong> {sdgs.join(', ') || '—'}</p>
                      <div className="muted" style={{marginTop:10}}>
                        <p><strong>Description</strong></p>
                        <p className="small">{description || '—'}</p>
                      </div>
                    </div>
                    <div className="review-card" style={{marginTop:12}}>
                      <h3 className="h4">Members</h3>
                      {members.map((m, idx) => (
                        <div className="member-line" key={idx}>
                          <div>
                            <strong>{m.name || `Member ${idx+1}`}</strong> — <span className="muted small">{m.role} ({m.level})</span>
                          </div>
                          <div className="muted small">{m.email} • {m.phone}</div>
                        </div>
                      ))}
                    </div>
                    <div className="review-card" style={{marginTop:12}}>
                      <h3 className="h4">Files & Links</h3>
                      <p>Video: {videoUrl || '—'}</p>
                      <p>Doc link: {documentUrl || '—'}</p>
                      <p>Pitch file: {pitchFile ? pitchFile.name : '—'}</p>
                      <p>Additional file: {docFile ? docFile.name : '—'}</p>
                    </div>
                    {!baseValidity() && <p className="error">There are validation errors; please fix them before submitting.</p>}
                  </section>
                )}
              </div>
              <div className="form-actions">
                <div>
                  <button type="button" className="btn-ghost" onClick={() => setCurrentStep(s => Math.max(0, s-1))} disabled={currentStep===0}>⟵ Back</button>
                </div>
                <div style={{display:'flex', gap:12}}>
                  <button type="button" className="btn-outline" onClick={() => {
                    if (!stepValid(currentStep)) { setSubmitError('Please complete required fields in this step before continuing.'); return; }
                    setSubmitError(null);
                    setCurrentStep(s => Math.min(steps.length-1, s+1));
                  }}>{currentStep < steps.length-1 ? <>Next ⟶</> : 'Finish'}</button>
                  <button type="submit" className="btn-primary" disabled={!baseValidity() || loading}>
                    {loading ? 'Submitting…' : 'Submit Registration'}
                  </button>
                </div>
              </div>
              {submitError && <p className="error" role="alert">{submitError}</p>}
            </form>
            <div className="support">
              <p className="muted small">Need help? Contact <a href="mailto:innotech@ui.edu.ng">innotech@ui.edu.ng</a></p>
              <p className="muted tiny">©️ 2025 Innotech 4.0 | University of Ibadan</p>
            </div>
          </div>
        </section>

        <section id="tracks" className="section container">
          <div className="grid-3">
            <Card title="Tracks" description="Choose from AgriTech, HealthTech, FinTech and more." />
            <Card title="Mentorship" description="Get matched with industry mentors." />
            <Card title="Prizes & Support" description="Funding, incubation opportunities and more." />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Header({menuOpen, setMenuOpen}:{menuOpen:boolean; setMenuOpen:(v:boolean|((p:boolean)=>boolean))=>void;}) {
  return (
    <header className="nav">
      <div className="nav-inner container">
        <div className="brand">
          <div className="logo-mark" aria-hidden>
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12c0-6 8-6 8 0s8 6 8 0" stroke="var(--teal-dark)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 12c0 6 8 6 8 0s8-6 8 0" stroke="var(--mint)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.85"/>
            </svg>
          </div>
          <div>
            <div className="brand-title">INNOTECH 4.0</div>
            <div className="brand-tag">Building solutions for tomorrow</div>
          </div>
        </div>
        <nav className={`menu ${menuOpen? 'open':''}`}>
          <a href="#register">Register</a>
          <a href="#tracks">Tracks</a>
          <a href="#sponsors">Sponsors</a>
          <a href="#timeline">Timeline</a>
        </nav>
        <div className="nav-actions">
          <button className="btn-ghost" onClick={()=>setMenuOpen((m:boolean)=>!m)} aria-label="Toggle menu">☰</button>
        </div>
      </div>
    </header>
  );
}

function Footer(){
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-col">
          <div className="brand-compact">INNOTECH 4.0</div>
          <p className="muted small">Empowering students, founders, and industry leaders to design and launch impactful technology solutions.</p>
        </div>
        <div className="footer-col">
          <h4 className="small">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="#register">Register</a></li>
            <li><a href="#tracks">Tracks</a></li>
            <li><a href="#timeline">Timeline</a></li>
            <li><a href="#sponsors">Sponsors</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4 className="small">Contact</h4>
          <p className="muted small">innotech@ui.edu.ng</p>
        </div>
      </div>
    </footer>
  );
}

function Card({title, description}:{title:string; description:string;}) {
  return (
    <div className="impact-card">
      <div className="impact-icon">∞</div>
      <h3 className="h4">{title}</h3>
      <p className="muted small">{description}</p>
    </div>
  );
}

function Style(){
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;800&family=Inter:wght@300;400;600;700&display=swap');
      :root{
        --teal: #14B8A6; --teal-dark: #0D9488; --dark: #0A1F1C; --mint: #99F6E4; --mint-2: #5EEAD4;
        --bg-light: #F9FAFB; --card: #FFFFFF; --muted: #94A3B8; --text: #111827; --success: #10B981; --warning: #F59E0B; --error: #EF4444;
        --radius-md: 12px; --radius-sm: 8px; --container: 1160px;
        font-family: 'Space Grotesk', 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
      }
      *{box-sizing:border-box} body,html,#root{margin:0;padding:0;height:100%}
      .page-root{background: var(--dark); color:var(--text); min-height:100vh; font-size:16px; line-height:1.6;}
      .container{max-width:var(--container); margin:0 auto; padding:0 20px;} .center{display:flex; align-items:center; justify-content:center; min-height:60vh;}
      .nav{position:fixed; top:0; left:0; right:0; height:72px; background:#071212; z-index:60; display:flex; align-items:center;}
      .nav-inner{display:flex; align-items:center; justify-content:space-between; width:100%;}
      .brand{display:flex; gap:12px; align-items:center; color:var(--mint);} .logo-mark{width:42px; height:42px; border-radius:10px; display:flex; align-items:center; justify-content:center; background:var(--teal);} .brand-title{font-weight:700; color:var(--mint); letter-spacing:-0.01em;} .brand-tag{font-size:12px; color:rgba(255,255,255,0.8);} .menu{display:flex; gap:28px; align-items:center;} .menu a{color:rgba(255,255,255,0.95); text-decoration:none; font-weight:600;} .menu.open{display:flex;} .nav-actions{display:flex; gap:8px; align-items:center;} .btn-ghost{background:transparent; border:none; color:var(--mint); padding:8px 10px; border-radius:10px; cursor:pointer;} .btn-ghost:focus{outline:3px solid rgba(20,184,166,0.16);}      
      .hero{min-height:72vh; display:flex; align-items:center; padding:96px 0 64px; background:#0A1F1C; color:#FFFFFF;} .hero-inner{display:flex; gap:40px; align-items:center;} .hero-content{flex:1; max-width:720px;} .eyebrow{color:var(--mint); font-weight:700; letter-spacing:0.06em; text-transform:uppercase; font-size:12px;} .hero-title{font-size:3rem; margin:8px 0 12px; color:#FFFFFF; font-weight:800; line-height:1.05;} .hero-sub{color:rgba(255,255,255,0.92); margin-bottom:18px; max-width:60ch;} .cta-row{display:flex; gap:14px; margin-top:18px;} .btn-primary{background:var(--teal); color:white; padding:12px 32px; border-radius:8px; border:none; font-weight:700; cursor:pointer;} .btn-primary:hover{background:var(--teal-dark);} .btn-primary.large{padding:14px 36px; font-size:1.05rem;} .btn-outline{background:transparent; border:2px solid var(--teal); color:var(--teal); padding:10px 30px; border-radius:8px; cursor:pointer;} .hero-figure{width:320px; display:flex; align-items:center; justify-content:center;} .hero-illustration{width:260px; height:260px; border-radius:24px; background:var(--mint); display:flex; align-items:center; justify-content:center; font-size:64px; color:var(--dark); font-weight:800;}
      .section{padding:48px 0;} .form-wrap{max-width:900px; margin:0 auto;} .form-header{display:flex; justify-content:space-between; align-items:flex-start; gap:12px; margin-bottom:12px;} .form-card{background:var(--card); padding:24px; border-radius:16px; box-shadow: 0 12px 30px rgba(2,6,23,0.12); border:1px solid rgba(30,41,59,0.03);} .progress-pill{background:var(--mint); color:var(--dark); padding:8px 12px; border-radius:999px; font-weight:600;}
      /* Increase contrast on dark background for section heading */
      .section .form-header .h3{color:#FFFFFF;}
      .section .form-header .muted{color:rgba(255,255,255,0.9);}      
      .stepper{display:flex; gap:10px; margin-bottom:14px; overflow:auto;} .step{display:flex; align-items:center; gap:10px; padding:6px 8px; border-radius:12px; background:transparent; color:var(--muted);} .step.active{background:var(--teal); color:white;} .step .step-dot{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.06); font-weight:700;} .step.done{color:var(--muted); opacity:0.85;} .step-content{margin-top:8px;}
      .field{display:block; margin-bottom:12px;} .label{display:block; font-weight:600; margin-bottom:6px;} .input, .select, .textarea{width:100%; padding:12px 14px; border-radius:10px; border:1px solid #E6E9EE; font-size:15px; background:#FFF; color:var(--text);} .textarea{min-height:76px; resize:vertical;} .input:focus, .select:focus, .textarea:focus{outline:3px solid rgba(20,184,166,0.14); border-color:var(--teal-dark);} .grid-2{display:grid; grid-template-columns:repeat(2,1fr); gap:12px;} .grid-3{display:grid; grid-template-columns:repeat(3,1fr); gap:20px;} .sdg-grid{display:grid; grid-template-columns:repeat(2,1fr); gap:8px; max-height:160px; overflow:auto; padding:6px; border-radius:8px; border:1px dashed rgba(30,41,59,0.04)} .sdg{display:flex; gap:8px; align-items:center; padding:8px; border-radius:8px; cursor:pointer;}
      .hint{color:var(--muted);} .hint-row{display:flex; justify-content:space-between;} .muted{color:var(--muted);} .small{font-size:0.9rem;} .tiny{font-size:0.8rem;}
      .input::placeholder, .textarea::placeholder{color:#64748B;}
      .members-header{display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;} .members-list{display:flex; flex-direction:column; gap:12px;} .member-card{border-radius:12px; padding:12px; border:1px solid rgba(30,41,59,0.04); background:#fff;} .member-title{display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;}
      .card-muted{background: var(--mint); padding:12px; border-radius:12px; color:var(--dark); margin-bottom:12px;} .terms-grid{display:grid; gap:8px;} .term{display:flex; gap:10px; align-items:center; padding:8px; border-radius:10px; background:#FBFEFD;}
      .review-card{background: #fff; padding:12px; border-radius:10px; border:1px solid rgba(30,41,59,0.04);} .member-line{display:flex; justify-content:space-between; margin-bottom:6px;}
      .form-actions{display:flex; justify-content:space-between; align-items:center; margin-top:18px;} .btn-outline{background:transparent; border:2px solid var(--teal); color:var(--teal); padding:10px 18px; border-radius:10px; cursor:pointer;} .btn-outline:disabled{opacity:0.5; cursor:not-allowed;} .btn-primary:disabled{opacity:0.6; cursor:not-allowed;}
      .support{margin-top:14px; display:flex; justify-content:space-between; align-items:center; gap:10px;} .error{color:var(--error); margin-top:8px; font-weight:600;} .stat-card{display:flex; gap:16px; align-items:center; justify-content:center; margin-top:12px; padding:12px; border-radius:12px; background:#0E2A26;} .stat-number{font-weight:800; font-size:20px;} .stat-label{font-size:13px; color:var(--muted);} .impact-card{background: var(--mint); border-radius:16px; padding:24px; text-align:left; color:var(--dark);} .impact-icon{font-size:28px;}
      .footer{background:var(--dark); color:rgba(255,255,255,0.9); padding:48px 0; margin-top:40px;} .footer-inner{display:flex; gap:40px; align-items:flex-start; justify-content:space-between;} .footer-col{flex:1;} .footer-links{list-style:none; padding:0; margin:8px 0 0; display:flex; flex-direction:column; gap:6px;} .footer-links a{color:rgba(255,255,255,0.8); text-decoration:none;}
      @media (max-width: 1024px){ .hero-inner{flex-direction:column; align-items:flex-start;} .grid-2{grid-template-columns:1fr;} .container{padding:0 16px;} }
      /* Show hamburger only on small screens */
      @media (min-width: 641px){ .nav-actions .btn-ghost{display:none;} }
      @media (max-width: 640px){ .nav{height:64px;} .menu{display:none;} .menu.open{display:flex; position:absolute; top:64px; right:20px; background:#071212; padding:12px; border-radius:8px; flex-direction:column;} .hero-title{font-size:2rem;} .grid-3{grid-template-columns:1fr;} .stepper{gap:6px;} .input, .textarea{font-size:15px;} .nav-actions .btn-ghost{display:inline-flex;} }
    `}</style>
  );
}


