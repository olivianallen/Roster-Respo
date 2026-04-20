// Roster — earthy modern signup flow screens
// Palette tokens (earthy modern)
const R = {
  canvas:   'oklch(0.97 0.01 75)',   // warm off-white
  paper:    'oklch(0.99 0.005 80)',  // warmer white
  ink:      'oklch(0.22 0.015 60)',  // deep espresso
  ink2:     'oklch(0.45 0.015 60)',  // muted body
  ink3:     'oklch(0.62 0.01 60)',   // tertiary
  sand:     'oklch(0.92 0.018 75)',  // soft sand
  sand2:    'oklch(0.88 0.022 75)',  // sand border
  clay:     'oklch(0.58 0.095 45)',  // clay accent (primary)
  clayDk:   'oklch(0.48 0.09 45)',   // clay pressed
  moss:     'oklch(0.52 0.055 140)', // moss accent
  terra:    'oklch(0.48 0.085 35)',  // deeper terra
  line:     'oklch(0.86 0.015 75)',  // border
  serif: '"Newsreader", "Source Serif Pro", Georgia, serif',
  sans:  '"Inter", -apple-system, system-ui, sans-serif',
  mono:  '"JetBrains Mono", ui-monospace, Menlo, monospace',
};

// Shared screen shell — fills the iOS device viewport
function Screen({ children, bg = R.canvas, pad = true }) {
  return (
    <div style={{
      width: '100%', height: '100%', background: bg,
      display: 'flex', flexDirection: 'column',
      paddingTop: 60, // status bar
      boxSizing: 'border-box',
      fontFamily: R.sans, color: R.ink,
    }}>
      <div style={{
        flex: 1, padding: pad ? '0 28px' : 0, display: 'flex', flexDirection: 'column',
      }}>{children}</div>
    </div>
  );
}

// Step dots
function StepDots({ step, total = 5 }) {
  return (
    <div style={{ display: 'flex', gap: 6, marginTop: 22 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          height: 3, flex: 1, borderRadius: 2,
          background: i <= step ? R.clay : R.sand2,
          transition: 'background 220ms ease',
        }} />
      ))}
    </div>
  );
}

// Primary button
function PrimaryBtn({ children, onClick, disabled, style = {} }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: '100%', height: 56, borderRadius: 16, border: 'none',
      background: disabled ? R.sand2 : R.ink,
      color: disabled ? R.ink3 : R.canvas,
      fontFamily: R.sans, fontSize: 16, fontWeight: 540,
      letterSpacing: -0.1, cursor: disabled ? 'default' : 'pointer',
      transition: 'transform 120ms ease, background 160ms ease',
      ...style,
    }}
    onMouseDown={e => !disabled && (e.currentTarget.style.transform = 'scale(0.985)')}
    onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
    >{children}</button>
  );
}

function GhostBtn({ children, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', height: 52, borderRadius: 16,
      border: `1px solid ${R.line}`, background: 'transparent',
      color: R.ink, fontFamily: R.sans, fontSize: 15, fontWeight: 500,
      cursor: 'pointer', letterSpacing: -0.1,
    }}>{children}</button>
  );
}

// Back chevron
function Back({ onClick, step }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8 }}>
      <button onClick={onClick} aria-label="Back" style={{
        width: 40, height: 40, borderRadius: 12, border: 'none',
        background: 'transparent', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginLeft: -10,
      }}>
        <svg width="10" height="18" viewBox="0 0 10 18"><path d="M9 1L1 9l8 8" stroke={R.ink} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <div style={{
        fontFamily: R.mono, fontSize: 11, color: R.ink3,
        letterSpacing: 1.5, textTransform: 'uppercase',
      }}>{step != null ? `Step ${step + 1} of 5` : ''}</div>
      <div style={{ width: 40 }} />
    </div>
  );
}

// Logo mark — a simple folded-paper / stack glyph (original, abstract)
function Mark({ size = 36, color }) {
  const c = color || R.ink;
  return (
    <svg width={size} height={size} viewBox="0 0 36 36">
      <rect x="6" y="10" width="22" height="18" rx="3" fill={c} opacity="0.18"/>
      <rect x="8" y="7" width="22" height="18" rx="3" fill={c} opacity="0.45"/>
      <rect x="10" y="4" width="22" height="18" rx="3" fill={c}/>
      <path d="M14 10h14M14 14h10" stroke={R.canvas} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

// ────────────────────────────────────────────────────────
// 1) WELCOME
// ────────────────────────────────────────────────────────
function ScreenWelcome({ onStart, onSignIn }) {
  return (
    <Screen bg={R.canvas}>
      {/* hero */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: 28, paddingBottom: 20 }}>
        <div>
          <Mark size={44} />
          <div style={{ marginTop: 72 }}>
            <div style={{
              fontFamily: R.serif, fontSize: 56, lineHeight: 0.95,
              color: R.ink, letterSpacing: -1.5, fontWeight: 400,
            }}>
              Keep every<br/>
              <span style={{ fontStyle: 'italic', color: R.clay }}>application</span><br/>
              in one place.
            </div>
            <div style={{
              marginTop: 18, fontSize: 16, lineHeight: 1.5,
              color: R.ink2, maxWidth: 300, letterSpacing: -0.1,
            }}>
              Track the jobs you've applied to, follow up on time, and land the next one.
            </div>
          </div>
        </div>

        {/* visual — stacked cards */}
        <div style={{ position: 'relative', height: 150, margin: '0 -6px' }}>
          <StackCard rotate={-6} left={10} top={22} title="Atelier Oaks" tag="Screen" color={R.moss}/>
          <StackCard rotate={2} left={78} top={6} title="Northwind Studio" tag="Offer" color={R.clay}/>
          <StackCard rotate={-1} left={170} top={28} title="Paper & Pine" tag="Applied" color={R.ink2}/>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <PrimaryBtn onClick={onStart}>Create account</PrimaryBtn>
          <button onClick={onSignIn} style={{
            border: 'none', background: 'transparent', cursor: 'pointer',
            fontFamily: R.sans, fontSize: 14.5, color: R.ink2, padding: 10,
          }}>
            I already have an account <span style={{ color: R.ink, textDecoration: 'underline', textDecorationThickness: 1, textUnderlineOffset: 3 }}>Sign in</span>
          </button>
        </div>
      </div>
    </Screen>
  );
}

function StackCard({ title, tag, rotate, left, top, color }) {
  return (
    <div style={{
      position: 'absolute', left, top, width: 170,
      background: R.paper, borderRadius: 14,
      padding: '14px 14px', transform: `rotate(${rotate}deg)`,
      boxShadow: '0 1px 2px rgba(60,40,20,0.06), 0 8px 24px rgba(60,40,20,0.08)',
      border: `1px solid ${R.line}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{
          width: 24, height: 24, borderRadius: 6,
          background: R.sand, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: R.serif, fontSize: 14, color: R.ink,
        }}>{title[0]}</div>
        <div style={{
          fontFamily: R.mono, fontSize: 9.5, color: color,
          letterSpacing: 0.8, textTransform: 'uppercase',
          padding: '3px 7px', border: `1px solid ${color}`, borderRadius: 999,
        }}>{tag}</div>
      </div>
      <div style={{
        marginTop: 14, fontFamily: R.serif, fontSize: 17,
        color: R.ink, letterSpacing: -0.3,
      }}>{title}</div>
      <div style={{ marginTop: 3, fontSize: 11, color: R.ink3 }}>Senior Designer · Remote</div>
    </div>
  );
}

// ────────────────────────────────────────────────────────
// 2) EMAIL
// ────────────────────────────────────────────────────────
function ScreenEmail({ email, setEmail, onNext, onBack, step }) {
  const [focused, setFocused] = React.useState(true);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return (
    <Screen>
      <Back onClick={onBack} step={step}/>
      <StepDots step={step}/>
      <div style={{ marginTop: 40 }}>
        <div style={{
          fontFamily: R.serif, fontSize: 34, lineHeight: 1.05,
          color: R.ink, letterSpacing: -0.8,
        }}>What's your email?</div>
        <div style={{ marginTop: 10, fontSize: 14.5, color: R.ink2, lineHeight: 1.5 }}>
          We'll send a 6-digit code to verify it's you. No password needed.
        </div>
      </div>

      <div style={{ marginTop: 36 }}>
        <label style={{
          fontFamily: R.mono, fontSize: 10.5, color: R.ink3,
          letterSpacing: 1.2, textTransform: 'uppercase',
        }}>Email address</label>
        <div style={{
          marginTop: 8, borderBottom: `1.5px solid ${focused ? R.ink : R.line}`,
          transition: 'border-color 160ms',
          display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 10,
        }}>
          <input
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="you@domain.com"
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontFamily: R.sans, fontSize: 20, color: R.ink,
              letterSpacing: -0.3, padding: 0,
            }}
          />
          {valid && <Check />}
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '14px 16px', background: R.sand, borderRadius: 12,
        marginBottom: 14,
      }}>
        <LockIcon/>
        <div style={{ fontSize: 12.5, color: R.ink2, lineHeight: 1.4 }}>
          We'll never share your email with recruiters or employers.
        </div>
      </div>

      <PrimaryBtn onClick={onNext} disabled={!valid} style={{ marginBottom: 24 }}>Continue</PrimaryBtn>
    </Screen>
  );
}

function Check() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="9" fill={R.moss}/>
      <path d="M5.5 10.5l3 3 6-6.5" stroke={R.canvas} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
      <rect x="3" y="7" width="10" height="7" rx="1.5" fill="none" stroke={R.ink2} strokeWidth="1.3"/>
      <path d="M5 7V5a3 3 0 016 0v2" fill="none" stroke={R.ink2} strokeWidth="1.3"/>
    </svg>
  );
}

// ────────────────────────────────────────────────────────
// 3) VERIFY CODE
// ────────────────────────────────────────────────────────
function ScreenVerify({ code, setCode, email, onNext, onBack, step }) {
  const inputs = React.useRef([]);
  const digits = code.padEnd(6, ' ').split('').slice(0, 6);

  const handle = (i, v) => {
    const d = v.replace(/\D/g, '').slice(-1);
    const next = code.split('');
    next[i] = d;
    const joined = next.join('').slice(0, 6).replace(/\s/g, '');
    setCode(joined);
    if (d && i < 5) inputs.current[i + 1]?.focus();
  };
  const onKey = (i, e) => {
    if (e.key === 'Backspace' && !digits[i].trim() && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };

  const full = code.length === 6;
  return (
    <Screen>
      <Back onClick={onBack} step={step}/>
      <StepDots step={step}/>
      <div style={{ marginTop: 40 }}>
        <div style={{
          fontFamily: R.serif, fontSize: 34, lineHeight: 1.05,
          color: R.ink, letterSpacing: -0.8,
        }}>Check your inbox.</div>
        <div style={{ marginTop: 10, fontSize: 14.5, color: R.ink2, lineHeight: 1.5 }}>
          We sent a code to <span style={{ color: R.ink, fontWeight: 500 }}>{email || 'your email'}</span>. Enter it below.
        </div>
      </div>

      <div style={{ marginTop: 40, display: 'flex', gap: 10 }}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={el => (inputs.current[i] = el)}
            value={d.trim()}
            onChange={e => handle(i, e.target.value)}
            onKeyDown={e => onKey(i, e)}
            inputMode="numeric"
            maxLength={1}
            autoFocus={i === 0}
            style={{
              flex: 1, height: 62, borderRadius: 14,
              border: `1.5px solid ${d.trim() ? R.ink : R.line}`,
              background: R.paper,
              textAlign: 'center', fontFamily: R.serif, fontSize: 28,
              color: R.ink, outline: 'none',
              transition: 'border-color 160ms',
            }}
          />
        ))}
      </div>

      <div style={{
        marginTop: 22, textAlign: 'center', fontSize: 13.5, color: R.ink2,
      }}>
        Didn't get it? <span style={{ color: R.ink, textDecoration: 'underline', textDecorationThickness: 1, textUnderlineOffset: 3, cursor: 'pointer' }}>Resend code</span>
      </div>

      <div style={{ flex: 1 }} />

      <PrimaryBtn onClick={onNext} disabled={!full} style={{ marginBottom: 24 }}>Verify</PrimaryBtn>
    </Screen>
  );
}

// ────────────────────────────────────────────────────────
// 4) PROFILE — name + current role
// ────────────────────────────────────────────────────────
function ScreenProfile({ name, setName, role, setRole, onNext, onBack, step }) {
  return (
    <Screen>
      <Back onClick={onBack} step={step}/>
      <StepDots step={step}/>
      <div style={{ marginTop: 40 }}>
        <div style={{
          fontFamily: R.serif, fontSize: 34, lineHeight: 1.05,
          color: R.ink, letterSpacing: -0.8,
        }}>Tell us about yourself.</div>
        <div style={{ marginTop: 10, fontSize: 14.5, color: R.ink2, lineHeight: 1.5 }}>
          We'll use this to personalize your tracker. You can change it anytime.
        </div>
      </div>

      <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 22 }}>
        <Field label="Your name" value={name} setValue={setName} placeholder="Jamie Rivera"/>
        <Field label="Current role or focus" value={role} setValue={setRole} placeholder="Product designer"/>
      </div>

      <div style={{ flex: 1 }} />

      <PrimaryBtn onClick={onNext} disabled={!name.trim()} style={{ marginBottom: 24 }}>Continue</PrimaryBtn>
    </Screen>
  );
}

function Field({ label, value, setValue, placeholder }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <div>
      <label style={{
        fontFamily: R.mono, fontSize: 10.5, color: R.ink3,
        letterSpacing: 1.2, textTransform: 'uppercase',
      }}>{label}</label>
      <div style={{
        marginTop: 8, borderBottom: `1.5px solid ${focus ? R.ink : R.line}`,
        transition: 'border-color 160ms', paddingBottom: 10,
      }}>
        <input
          value={value} onChange={e => setValue(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{
            width: '100%', border: 'none', outline: 'none', background: 'transparent',
            fontFamily: R.sans, fontSize: 20, color: R.ink,
            letterSpacing: -0.3, padding: 0,
          }}
        />
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────
// 5) GOALS — pick job types (multi-select)
// ────────────────────────────────────────────────────────
const GOALS = [
  { id: 'ft', label: 'Full-time', hint: 'Salaried role' },
  { id: 'pt', label: 'Part-time', hint: 'Up to 30 hrs/wk' },
  { id: 'ct', label: 'Contract', hint: 'Fixed engagement' },
  { id: 'fl', label: 'Freelance', hint: 'Project work' },
  { id: 'in', label: 'Internship', hint: 'Learn & grow' },
  { id: 'rm', label: 'Remote only', hint: 'Work from anywhere' },
];

function ScreenGoals({ goals, toggleGoal, onNext, onBack, step }) {
  return (
    <Screen>
      <Back onClick={onBack} step={step}/>
      <StepDots step={step}/>
      <div style={{ marginTop: 40 }}>
        <div style={{
          fontFamily: R.serif, fontSize: 34, lineHeight: 1.05,
          color: R.ink, letterSpacing: -0.8,
        }}>What are you<br/>looking for?</div>
        <div style={{ marginTop: 10, fontSize: 14.5, color: R.ink2, lineHeight: 1.5 }}>
          Pick any that apply. We'll tailor reminders and insights.
        </div>
      </div>

      <div style={{
        marginTop: 28, display: 'grid', gap: 10,
        gridTemplateColumns: '1fr 1fr',
      }}>
        {GOALS.map(g => {
          const on = goals.includes(g.id);
          return (
            <button key={g.id} onClick={() => toggleGoal(g.id)} style={{
              textAlign: 'left', padding: '16px 14px',
              borderRadius: 16,
              border: `1.5px solid ${on ? R.ink : R.line}`,
              background: on ? R.ink : R.paper,
              color: on ? R.canvas : R.ink,
              cursor: 'pointer', fontFamily: R.sans,
              transition: 'all 160ms ease',
              position: 'relative', minHeight: 76,
            }}>
              <div style={{
                fontFamily: R.serif, fontSize: 19, letterSpacing: -0.3,
              }}>{g.label}</div>
              <div style={{
                marginTop: 2, fontSize: 11.5,
                color: on ? 'rgba(250,245,235,0.7)' : R.ink3,
              }}>{g.hint}</div>
              {on && (
                <div style={{
                  position: 'absolute', top: 12, right: 12,
                  width: 18, height: 18, borderRadius: 999,
                  background: R.clay, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5l2 2 4-4.5" stroke={R.canvas} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div style={{ flex: 1 }} />

      <PrimaryBtn onClick={onNext} disabled={goals.length === 0} style={{ marginBottom: 24 }}>
        Continue {goals.length > 0 && <span style={{ opacity: 0.6, marginLeft: 4 }}>· {goals.length}</span>}
      </PrimaryBtn>
    </Screen>
  );
}

// ────────────────────────────────────────────────────────
// 6) NOTIFICATIONS
// ────────────────────────────────────────────────────────
function ScreenNotify({ onAllow, onSkip, onBack, step }) {
  return (
    <Screen>
      <Back onClick={onBack} step={step}/>
      <StepDots step={step}/>
      <div style={{ marginTop: 40 }}>
        <div style={{
          fontFamily: R.serif, fontSize: 34, lineHeight: 1.05,
          color: R.ink, letterSpacing: -0.8,
        }}>Never miss<br/>a follow-up.</div>
        <div style={{ marginTop: 10, fontSize: 14.5, color: R.ink2, lineHeight: 1.5 }}>
          Roster sends gentle nudges when it's time to check in on an application.
        </div>
      </div>

      {/* mock notification preview */}
      <div style={{ marginTop: 36, position: 'relative' }}>
        <div style={{
          background: R.paper, borderRadius: 18, padding: '14px 16px',
          border: `1px solid ${R.line}`,
          boxShadow: '0 4px 20px rgba(60,40,20,0.06)',
          display: 'flex', gap: 12, alignItems: 'flex-start',
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: R.ink, display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}><Mark size={22} color={R.canvas}/></div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: R.ink }}>Roster</div>
              <div style={{ fontSize: 11, color: R.ink3 }}>now</div>
            </div>
            <div style={{ marginTop: 2, fontSize: 13.5, color: R.ink, lineHeight: 1.4 }}>
              <b style={{ fontWeight: 600 }}>Follow up with Atelier Oaks.</b> It's been 7 days since you applied.
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Row icon="🕯" title="Follow-up reminders" desc="7 / 14 / 21 days after applying"/>
        <Row icon="📅" title="Interview prep" desc="24 hours before scheduled calls"/>
        <Row icon="✍︎" title="Weekly digest" desc="Mondays at 9am · your pipeline"/>
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        <PrimaryBtn onClick={onAllow}>Turn on notifications</PrimaryBtn>
        <button onClick={onSkip} style={{
          border: 'none', background: 'transparent', cursor: 'pointer',
          fontFamily: R.sans, fontSize: 14, color: R.ink2, padding: 12,
        }}>Maybe later</button>
      </div>
    </Screen>
  );
}

function Row({ icon, title, desc }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <div style={{
        width: 34, height: 34, borderRadius: 10,
        background: R.sand, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 16,
      }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 540, color: R.ink }}>{title}</div>
        <div style={{ fontSize: 12, color: R.ink3, marginTop: 1 }}>{desc}</div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────
// 7) DONE — landing / first tracked application
// ────────────────────────────────────────────────────────
function ScreenDone({ name, onFinish }) {
  const first = (name || 'there').split(' ')[0];
  return (
    <Screen>
      <div style={{ paddingTop: 20 }}/>
      <div style={{
        marginTop: 40, display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: 20, background: R.ink,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="30" height="30" viewBox="0 0 30 30"><path d="M7 15.5l5 5 11-12" stroke={R.canvas} strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div style={{
          marginTop: 28,
          fontFamily: R.serif, fontSize: 40, lineHeight: 0.98,
          color: R.ink, letterSpacing: -1,
        }}>Welcome, {first}.</div>
        <div style={{ marginTop: 12, fontSize: 15, color: R.ink2, lineHeight: 1.5, maxWidth: 300 }}>
          Your tracker is ready. Add your first application to get started — you can paste a link and we'll autofill the rest.
        </div>
      </div>

      <div style={{ marginTop: 32 }}>
        <div style={{
          fontFamily: R.mono, fontSize: 10.5, color: R.ink3,
          letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10,
        }}>Getting started</div>
        <Task n={1} title="Add your first application" done={false}/>
        <Task n={2} title="Connect your email for auto-tracking" done={false}/>
        <Task n={3} title="Import from LinkedIn (optional)" done={false}/>
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        <PrimaryBtn onClick={onFinish}>Add first application</PrimaryBtn>
        <GhostBtn onClick={onFinish}>Skip · go to dashboard</GhostBtn>
      </div>
    </Screen>
  );
}

function Task({ n, title, done }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 0', borderBottom: `1px solid ${R.line}`,
    }}>
      <div style={{
        width: 24, height: 24, borderRadius: 999,
        border: `1.5px solid ${R.line}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: R.mono, fontSize: 11, color: R.ink3,
      }}>{n}</div>
      <div style={{ flex: 1, fontSize: 14.5, color: R.ink }}>{title}</div>
      <svg width="8" height="14" viewBox="0 0 8 14"><path d="M1 1l6 6-6 6" stroke={R.ink3} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </div>
  );
}

// ────────────────────────────────────────────────────────
// 8) COMPANY SEARCH — type-ahead + select a company
// ────────────────────────────────────────────────────────
const COMPANIES = [
  { id: 'atelier-oaks', name: 'Atelier Oaks', domain: 'atelieroaks.co', kind: 'Brand studio · 40 people', color: 'oklch(0.52 0.055 140)' },
  { id: 'northwind',    name: 'Northwind Studio', domain: 'northwind.design', kind: 'Product design · 120 people', color: 'oklch(0.58 0.095 45)' },
  { id: 'paper-pine',   name: 'Paper & Pine', domain: 'paperandpine.com', kind: 'Editorial · 18 people', color: 'oklch(0.48 0.085 35)' },
  { id: 'kiln',         name: 'Kiln', domain: 'kiln.app', kind: 'Dev tools · 60 people', color: 'oklch(0.45 0.07 250)' },
  { id: 'meridian',     name: 'Meridian Labs', domain: 'meridianlabs.io', kind: 'AI research · 200 people', color: 'oklch(0.42 0.06 280)' },
  { id: 'linen',        name: 'Linen & Co', domain: 'linen.co', kind: 'E-commerce · 80 people', color: 'oklch(0.55 0.08 60)' },
  { id: 'harbor',       name: 'Harbor Health', domain: 'harborhealth.com', kind: 'Healthtech · 300 people', color: 'oklch(0.5 0.07 210)' },
  { id: 'cedar',        name: 'Cedar & Moss', domain: 'cedarmoss.shop', kind: 'Retail · 25 people', color: 'oklch(0.5 0.06 150)' },
];

function ScreenCompanySearch({ query, setQuery, onPick, onBack }) {
  const filtered = query.trim()
    ? COMPANIES.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.domain.toLowerCase().includes(query.toLowerCase())
      )
    : COMPANIES.slice(0, 5);

  return (
    <Screen pad={false}>
      <div style={{ padding: '8px 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 44 }}>
          <button onClick={onBack} aria-label="Cancel" style={{
            border: 'none', background: 'transparent', cursor: 'pointer',
            fontFamily: R.sans, fontSize: 15, color: R.ink2, padding: 0,
          }}>Cancel</button>
          <div style={{
            flex: 1, textAlign: 'center', fontFamily: R.sans, fontSize: 15,
            fontWeight: 600, color: R.ink, marginRight: 50,
          }}>Add application</div>
        </div>
      </div>

      {/* Search field */}
      <div style={{ padding: '16px 20px 8px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: R.sand, borderRadius: 12, padding: '11px 14px',
          border: `1px solid ${R.line}`,
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16">
            <circle cx="7" cy="7" r="5" fill="none" stroke={R.ink2} strokeWidth="1.5"/>
            <path d="M11 11l3 3" stroke={R.ink2} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search company or paste a job URL"
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontFamily: R.sans, fontSize: 15, color: R.ink,
              letterSpacing: -0.2, padding: 0,
            }}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{
              border: 'none', background: 'rgba(0,0,0,0.1)',
              width: 18, height: 18, borderRadius: 999, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 0,
            }}>
              <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1 1l6 6M7 1l-6 6" stroke={R.paper} strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
          )}
        </div>
      </div>

      {/* Recents / results */}
      <div style={{ padding: '12px 20px 8px', fontFamily: R.mono, fontSize: 10.5, color: R.ink3, letterSpacing: 1.2, textTransform: 'uppercase' }}>
        {query.trim() ? `${filtered.length} result${filtered.length === 1 ? '' : 's'}` : 'Suggested'}
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '0 20px' }}>
        {filtered.length === 0 ? (
          <div style={{ padding: '28px 4px' }}>
            <div style={{ fontSize: 14, color: R.ink2, marginBottom: 14 }}>
              No match for "<span style={{ color: R.ink }}>{query}</span>"
            </div>
            <button onClick={() => onPick({
              id: 'custom', name: query, domain: '', kind: 'Custom entry', color: R.clay,
            })} style={{
              width: '100%', textAlign: 'left', padding: '14px 14px',
              borderRadius: 14, border: `1.5px dashed ${R.line}`,
              background: 'transparent', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, background: R.sand,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 1v12M1 7h12" stroke={R.ink} strokeWidth="1.8" strokeLinecap="round"/></svg>
              </div>
              <div>
                <div style={{ fontFamily: R.serif, fontSize: 17, color: R.ink, letterSpacing: -0.3 }}>Add "{query}"</div>
                <div style={{ fontSize: 12, color: R.ink3, marginTop: 1 }}>Create a custom entry</div>
              </div>
            </button>
          </div>
        ) : filtered.map(c => (
          <button key={c.id} onClick={() => onPick(c)} style={{
            width: '100%', textAlign: 'left', padding: '12px 4px',
            border: 'none', borderBottom: `1px solid ${R.line}`,
            background: 'transparent', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 11, background: c.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: R.canvas, fontFamily: R.serif, fontSize: 18,
              flexShrink: 0,
            }}>{c.name[0]}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: R.serif, fontSize: 17, color: R.ink, letterSpacing: -0.3 }}>{c.name}</div>
              <div style={{ fontSize: 12, color: R.ink3, marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {c.domain} · {c.kind}
              </div>
            </div>
            <svg width="8" height="14" viewBox="0 0 8 14" style={{ flexShrink: 0 }}><path d="M1 1l6 6-6 6" stroke={R.ink3} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        ))}
      </div>
    </Screen>
  );
}

// ────────────────────────────────────────────────────────
// 9) ROLE PICKER — pick an open role at the selected company
// ────────────────────────────────────────────────────────
const ROLES_BY_COMPANY = {
  'atelier-oaks': [
    { id: 'r1', title: 'Senior Brand Designer', loc: 'Remote · US', type: 'Full-time', posted: '2d ago', salary: '$120–150k' },
    { id: 'r2', title: 'Design Lead, Identity', loc: 'Brooklyn, NY', type: 'Full-time', posted: '5d ago', salary: '$160–190k' },
    { id: 'r3', title: 'Freelance Illustrator', loc: 'Remote', type: 'Contract', posted: '1w ago', salary: '$85–110/hr' },
  ],
  'northwind': [
    { id: 'r1', title: 'Senior Product Designer', loc: 'Remote · EU', type: 'Full-time', posted: '1d ago', salary: '€90–115k' },
    { id: 'r2', title: 'Design Systems Lead', loc: 'Amsterdam', type: 'Full-time', posted: '3d ago', salary: '€110–135k' },
    { id: 'r3', title: 'UX Researcher', loc: 'Hybrid · London', type: 'Full-time', posted: '1w ago', salary: '£75–95k' },
    { id: 'r4', title: 'Staff Product Designer', loc: 'Remote', type: 'Full-time', posted: '2w ago', salary: '€130–160k' },
  ],
  'paper-pine': [
    { id: 'r1', title: 'Art Director', loc: 'Portland, OR', type: 'Full-time', posted: '4d ago', salary: '$130–160k' },
    { id: 'r2', title: 'Editorial Designer', loc: 'Remote · US', type: 'Contract', posted: '6d ago', salary: '$70–90/hr' },
  ],
  'kiln':       [{ id: 'r1', title: 'Senior Product Designer', loc: 'Remote', type: 'Full-time', posted: '3d ago', salary: '$140–175k' }],
  'meridian':   [{ id: 'r1', title: 'Principal Designer, AI', loc: 'SF / Remote', type: 'Full-time', posted: '1w ago', salary: '$210–260k' }],
  'linen':      [{ id: 'r1', title: 'Web Designer', loc: 'Remote', type: 'Full-time', posted: '2d ago', salary: '$95–120k' }],
  'harbor':     [{ id: 'r1', title: 'Senior UX Designer', loc: 'Boston / Remote', type: 'Full-time', posted: '5d ago', salary: '$135–165k' }],
  'cedar':      [{ id: 'r1', title: 'Brand & Packaging Designer', loc: 'LA', type: 'Full-time', posted: '1w ago', salary: '$90–115k' }],
};

function ScreenRolePicker({ company, onPick, onBack, onCustom }) {
  const roles = ROLES_BY_COMPANY[company?.id] || [];
  return (
    <Screen pad={false}>
      <div style={{ padding: '8px 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 44 }}>
          <button onClick={onBack} aria-label="Back" style={{
            border: 'none', background: 'transparent', cursor: 'pointer', padding: 0,
            display: 'flex', alignItems: 'center', gap: 4, color: R.ink2,
            fontFamily: R.sans, fontSize: 15,
          }}>
            <svg width="8" height="14" viewBox="0 0 8 14"><path d="M7 1L1 7l6 6" stroke={R.ink2} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back
          </button>
          <div style={{ flex: 1 }}/>
        </div>
      </div>

      <div style={{ padding: '8px 28px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14, background: company?.color || R.ink,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: R.canvas, fontFamily: R.serif, fontSize: 24,
        }}>{company?.name[0]}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: R.serif, fontSize: 26, color: R.ink, letterSpacing: -0.5, lineHeight: 1 }}>{company?.name}</div>
          <div style={{ fontSize: 12.5, color: R.ink3, marginTop: 3 }}>{company?.kind}</div>
        </div>
      </div>

      <div style={{ padding: '4px 28px 10px', fontFamily: R.mono, fontSize: 10.5, color: R.ink3, letterSpacing: 1.2, textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
        <span>Open roles</span>
        <span>{roles.length}</span>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '0 20px 10px' }}>
        {roles.map(r => (
          <button key={r.id} onClick={() => onPick(r)} style={{
            width: '100%', textAlign: 'left', padding: '14px 14px',
            borderRadius: 14, border: `1px solid ${R.line}`,
            background: R.paper, cursor: 'pointer', marginBottom: 8,
            display: 'block', transition: 'border-color 160ms',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = R.ink}
          onMouseLeave={e => e.currentTarget.style.borderColor = R.line}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
              <div style={{ fontFamily: R.serif, fontSize: 17, color: R.ink, letterSpacing: -0.3, lineHeight: 1.2 }}>{r.title}</div>
              <div style={{
                fontFamily: R.mono, fontSize: 9.5, color: R.ink3,
                letterSpacing: 0.6, textTransform: 'uppercase', flexShrink: 0,
                padding: '2px 0',
              }}>{r.posted}</div>
            </div>
            {r.salary && (
              <div style={{
                marginTop: 6, fontFamily: R.serif, fontStyle: 'italic',
                fontSize: 15.5, color: R.terra, letterSpacing: -0.2,
              }}>{r.salary}</div>
            )}
            <div style={{ marginTop: 6, display: 'flex', gap: 10, alignItems: 'center', fontSize: 12, color: R.ink2 }}>
              <span style={{
                padding: '2px 8px', borderRadius: 999, background: R.sand,
                fontFamily: R.mono, fontSize: 10.5,
              }}>{r.type}</span>
              <span>{r.loc}</span>
            </div>
          </button>
        ))}

        <button onClick={onCustom} style={{
          width: '100%', textAlign: 'left', padding: '14px 14px',
          borderRadius: 14, border: `1.5px dashed ${R.line}`,
          background: 'transparent', cursor: 'pointer', marginTop: 4,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8, background: R.sand,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="12" height="12" viewBox="0 0 14 14"><path d="M7 1v12M1 7h12" stroke={R.ink} strokeWidth="1.8" strokeLinecap="round"/></svg>
          </div>
          <div>
            <div style={{ fontSize: 14, color: R.ink, fontWeight: 500 }}>Add a role not listed</div>
            <div style={{ fontSize: 11.5, color: R.ink3 }}>Enter title and details manually</div>
          </div>
        </button>
      </div>
    </Screen>
  );
}

// ────────────────────────────────────────────────────────
// 10) APPLICATION DETAILS — status + follow-up cadence
// ────────────────────────────────────────────────────────
const STATUSES = [
  { id: 'saved',   label: 'Saved',    color: 'oklch(0.62 0.01 60)' },
  { id: 'applied', label: 'Applied',  color: 'oklch(0.58 0.095 45)' },
  { id: 'screen',  label: 'Screen',   color: 'oklch(0.52 0.055 140)' },
  { id: 'onsite',  label: 'Onsite',   color: 'oklch(0.48 0.085 35)' },
];

function ScreenAppDetails({ company, role, status, setStatus, followUp, setFollowUp, rank, setRank, interviewAt, setInterviewAt, onSave, onBack }) {
  return (
    <Screen pad={false}>
      <div style={{ padding: '8px 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 44 }}>
          <button onClick={onBack} style={{
            border: 'none', background: 'transparent', cursor: 'pointer', padding: 0,
            display: 'flex', alignItems: 'center', gap: 4, color: R.ink2,
            fontFamily: R.sans, fontSize: 15,
          }}>
            <svg width="8" height="14" viewBox="0 0 8 14"><path d="M7 1L1 7l6 6" stroke={R.ink2} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back
          </button>
          <div style={{ flex: 1, textAlign: 'center', fontFamily: R.sans, fontSize: 15, fontWeight: 600, color: R.ink, marginRight: 48 }}>Details</div>
        </div>
      </div>

      <div style={{ padding: '20px 28px 0', flex: 1, overflow: 'auto' }}>
        {/* Preview card */}
        <div style={{
          padding: '16px 16px', borderRadius: 16, background: R.paper,
          border: `1px solid ${R.line}`, display: 'flex', gap: 12, alignItems: 'center',
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 11, background: company?.color || R.ink,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: R.canvas, fontFamily: R.serif, fontSize: 20,
          }}>{company?.name[0]}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: R.serif, fontSize: 18, color: R.ink, letterSpacing: -0.3, lineHeight: 1.15 }}>{role?.title}</div>
            <div style={{ fontSize: 12, color: R.ink3, marginTop: 2 }}>{company?.name} · {role?.loc}</div>
            {role?.salary && (
              <div style={{
                marginTop: 6, fontFamily: R.serif, fontStyle: 'italic',
                fontSize: 15, color: R.terra, letterSpacing: -0.2,
              }}>{role.salary}</div>
            )}
          </div>
        </div>

        {/* Status */}
        <div style={{ marginTop: 22 }}>
          <div style={{ fontFamily: R.mono, fontSize: 10.5, color: R.ink3, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>Status</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {STATUSES.map(s => {
              const on = s.id === status;
              return (
                <button key={s.id} onClick={() => setStatus(s.id)} style={{
                  padding: '12px 12px', borderRadius: 12,
                  border: `1.5px solid ${on ? R.ink : R.line}`,
                  background: on ? R.ink : R.paper, color: on ? R.canvas : R.ink,
                  cursor: 'pointer', fontFamily: R.sans, fontSize: 14, fontWeight: 500,
                  display: 'flex', alignItems: 'center', gap: 8, textAlign: 'left',
                  transition: 'all 160ms',
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: 999, background: s.color }}/>
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interest ranking */}
        <div style={{ marginTop: 22 }}>
          <div style={{ fontFamily: R.mono, fontSize: 10.5, color: R.ink3, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10, display: 'flex', justifyContent: 'space-between' }}>
            <span>My interest</span>
            <span style={{ textTransform: 'none', letterSpacing: 0 }}>
              {rank === 0 ? 'Not rated' : ['', 'Low', 'Mild', 'Solid', 'High', 'Top pick'][rank]}
            </span>
          </div>
          <div style={{
            display: 'flex', gap: 6, padding: '12px 12px',
            background: R.paper, borderRadius: 14, border: `1px solid ${R.line}`,
          }}>
            {[1,2,3,4,5].map(n => {
              const filled = n <= rank;
              return (
                <button key={n} onClick={() => setRank(n === rank ? 0 : n)} style={{
                  flex: 1, height: 44, borderRadius: 10, cursor: 'pointer',
                  border: `1.5px solid ${filled ? R.clay : R.line}`,
                  background: filled ? R.clay : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 140ms',
                }}>
                  <svg width="18" height="18" viewBox="0 0 20 20">
                    <path d="M10 2l2.4 5.2 5.6.6-4.2 3.9 1.2 5.6L10 14.5l-5 2.8 1.2-5.6L2 7.8l5.6-.6z"
                      fill={filled ? R.canvas : 'none'}
                      stroke={filled ? R.canvas : R.ink3}
                      strokeWidth="1.4" strokeLinejoin="round"/>
                  </svg>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interview calendar */}
        <div style={{ marginTop: 22 }}>
          <div style={{ fontFamily: R.mono, fontSize: 10.5, color: R.ink3, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>Interview scheduled</div>
          <div style={{
            padding: '14px 14px', background: R.paper, borderRadius: 14, border: `1px solid ${R.line}`,
            display: 'flex', gap: 10, alignItems: 'center',
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10, background: R.sand,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18">
                <rect x="2" y="3.5" width="14" height="12" rx="2" fill="none" stroke={R.ink} strokeWidth="1.3"/>
                <path d="M2 7h14M6 2v3M12 2v3" stroke={R.ink} strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <input
                type="date"
                value={interviewAt?.date || ''}
                onChange={e => setInterviewAt({ ...(interviewAt || {}), date: e.target.value })}
                style={{
                  border: 'none', outline: 'none', background: 'transparent',
                  fontFamily: R.sans, fontSize: 14, color: R.ink, padding: 0,
                }}
              />
              <input
                type="time"
                value={interviewAt?.time || ''}
                onChange={e => setInterviewAt({ ...(interviewAt || {}), time: e.target.value })}
                style={{
                  border: 'none', outline: 'none', background: 'transparent',
                  fontFamily: R.mono, fontSize: 12.5, color: R.ink3, padding: 0,
                }}
              />
            </div>
            {(interviewAt?.date || interviewAt?.time) && (
              <button onClick={() => setInterviewAt(null)} style={{
                border: 'none', background: 'transparent', cursor: 'pointer',
                fontSize: 11.5, color: R.ink3, fontFamily: R.sans, padding: 4,
              }}>Clear</button>
            )}
          </div>
        </div>

        {/* Follow-up */}
        <div style={{ marginTop: 22 }}>
          <div style={{ fontFamily: R.mono, fontSize: 10.5, color: R.ink3, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>Remind me to follow up</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, background: R.paper, borderRadius: 14, border: `1px solid ${R.line}`, overflow: 'hidden' }}>
            {[
              { id: '7d',  label: 'In 7 days',  hint: 'Standard cadence' },
              { id: '14d', label: 'In 14 days', hint: 'Slow-moving role' },
              { id: 'custom', label: 'Custom date', hint: 'Pick one' },
              { id: 'none', label: 'No reminder', hint: 'I\'ll check manually' },
            ].map((o, i, arr) => {
              const on = o.id === followUp;
              return (
                <button key={o.id} onClick={() => setFollowUp(o.id)} style={{
                  width: '100%', textAlign: 'left', border: 'none',
                  borderBottom: i < arr.length - 1 ? `1px solid ${R.line}` : 'none',
                  background: 'transparent', padding: '14px 14px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <div style={{
                    width: 18, height: 18, borderRadius: 999,
                    border: `1.5px solid ${on ? R.ink : R.line}`,
                    background: on ? R.ink : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {on && <svg width="9" height="9" viewBox="0 0 9 9"><path d="M1.5 4.5l2 2 4-4.5" stroke={R.canvas} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14.5, color: R.ink }}>{o.label}</div>
                    <div style={{ fontSize: 11.5, color: R.ink3, marginTop: 1 }}>{o.hint}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ padding: '12px 28px 24px' }}>
        <PrimaryBtn onClick={onSave}>Add to tracker</PrimaryBtn>
      </div>
    </Screen>
  );
}

// ────────────────────────────────────────────────────────
// 11) TRACKER HOME — applications list w/ newly-added one
// ────────────────────────────────────────────────────────
function ScreenTracker({ apps, onAdd, onOpenPrep, userName }) {
  const first = (userName || 'there').split(' ')[0];
  return (
    <Screen pad={false} bg={R.canvas}>
      {/* Header */}
      <div style={{ padding: '8px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10, background: R.ink,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: R.canvas, fontFamily: R.serif, fontSize: 15,
        }}>{(first[0] || 'R').toUpperCase()}</div>
        <button style={{
          width: 34, height: 34, borderRadius: 10, border: `1px solid ${R.line}`,
          background: R.paper, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14">
            <path d="M1 2h12M3 7h8M5 12h4" stroke={R.ink} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Title */}
      <div style={{ padding: '16px 24px 8px' }}>
        <div style={{ fontFamily: R.mono, fontSize: 10.5, color: R.ink3, letterSpacing: 1.2, textTransform: 'uppercase' }}>Your tracker</div>
        <div style={{ fontFamily: R.serif, fontSize: 36, letterSpacing: -0.8, color: R.ink, lineHeight: 1, marginTop: 6 }}>
          {apps.length} application{apps.length === 1 ? '' : 's'}
        </div>
        <div style={{ marginTop: 6, fontSize: 13, color: R.ink2 }}>
          {apps.length === 0
            ? 'Add your first one to start tracking.'
            : `${apps.filter(a => a.followUp && a.followUp !== 'none').length} with follow-ups scheduled.`}
        </div>
      </div>

      {/* Status strip */}
      {apps.length > 0 && (
        <div style={{ padding: '10px 24px 6px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['All', 'Saved', 'Applied', 'Screen', 'Onsite'].map((f, i) => (
            <div key={f} style={{
              padding: '6px 12px', borderRadius: 999,
              background: i === 0 ? R.ink : R.paper,
              color: i === 0 ? R.canvas : R.ink2,
              border: `1px solid ${i === 0 ? R.ink : R.line}`,
              fontSize: 12, fontWeight: 500,
            }}>{f}</div>
          ))}
        </div>
      )}

      {/* List */}
      <div style={{ flex: 1, overflow: 'auto', padding: '12px 24px 20px' }}>
        {apps.length === 0 ? (
          <div style={{
            padding: '40px 24px', borderRadius: 18, border: `1.5px dashed ${R.line}`,
            textAlign: 'center', marginTop: 20,
          }}>
            <div style={{ fontFamily: R.serif, fontSize: 20, color: R.ink, letterSpacing: -0.3 }}>No applications yet</div>
            <div style={{ marginTop: 6, fontSize: 13, color: R.ink2 }}>Tap the + below to add one.</div>
          </div>
        ) : apps.map(a => {
          const st = STATUSES.find(s => s.id === a.status) || STATUSES[1];
          return (
            <div key={a.id} style={{
              padding: '14px 14px', borderRadius: 16, background: R.paper,
              border: `1px solid ${R.line}`, marginBottom: 10,
              boxShadow: a.isNew ? `0 0 0 2px ${R.clay}33` : 'none',
              transition: 'box-shadow 300ms',
            }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 11, background: a.company.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: R.canvas, fontFamily: R.serif, fontSize: 18, flexShrink: 0,
                }}>{a.company.name[0]}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                    <div style={{ fontFamily: R.serif, fontSize: 17, color: R.ink, letterSpacing: -0.3, lineHeight: 1.15, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {a.role.title}
                    </div>
                    {a.isNew && <span style={{
                      fontFamily: R.mono, fontSize: 9, color: R.clay,
                      letterSpacing: 0.6, textTransform: 'uppercase', flexShrink: 0,
                    }}>New</span>}
                  </div>
                  <div style={{ fontSize: 12, color: R.ink3, marginTop: 2 }}>{a.company.name} · {a.role.loc}</div>
                  {a.role.salary && (
                    <div style={{
                      marginTop: 4, fontFamily: R.serif, fontStyle: 'italic',
                      fontSize: 14, color: R.terra, letterSpacing: -0.2,
                    }}>{a.role.salary}</div>
                  )}
                  {a.rank > 0 && (
                    <div style={{ marginTop: 6, display: 'flex', gap: 2, alignItems: 'center' }}>
                      {[1,2,3,4,5].map(n => (
                        <svg key={n} width="11" height="11" viewBox="0 0 20 20">
                          <path d="M10 2l2.4 5.2 5.6.6-4.2 3.9 1.2 5.6L10 14.5l-5 2.8 1.2-5.6L2 7.8l5.6-.6z"
                            fill={n <= a.rank ? R.clay : 'none'}
                            stroke={n <= a.rank ? R.clay : R.line}
                            strokeWidth="1.4" strokeLinejoin="round"/>
                        </svg>
                      ))}
                    </div>
                  )}
                  <div style={{ marginTop: 10, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      padding: '3px 9px', borderRadius: 999, background: R.sand,
                    }}>
                      <div style={{ width: 6, height: 6, borderRadius: 999, background: st.color }}/>
                      <span style={{ fontSize: 11.5, color: R.ink, fontWeight: 500 }}>{st.label}</span>
                    </div>
                    {a.followUp && a.followUp !== 'none' && (
                      <span style={{
                        fontSize: 11.5, color: R.ink2, display: 'flex', alignItems: 'center', gap: 5,
                      }}>
                        <svg width="11" height="11" viewBox="0 0 12 12"><circle cx="6" cy="6" r="5" fill="none" stroke={R.ink2} strokeWidth="1.2"/><path d="M6 3v3l2 1.5" stroke={R.ink2} strokeWidth="1.2" strokeLinecap="round"/></svg>
                        Follow up {a.followUp === '7d' ? 'in 7 days' : a.followUp === '14d' ? 'in 14 days' : 'on date'}
                      </span>
                    )}
                    {a.interviewAt?.date && (
                      <span style={{
                        fontSize: 11.5, color: R.terra, fontWeight: 500,
                        display: 'flex', alignItems: 'center', gap: 5,
                        padding: '3px 9px', borderRadius: 999, background: 'oklch(0.94 0.03 45)',
                      }}>
                        <svg width="10" height="10" viewBox="0 0 18 18"><rect x="2" y="3.5" width="14" height="12" rx="2" fill="none" stroke={R.terra} strokeWidth="1.5"/><path d="M2 7h14" stroke={R.terra} strokeWidth="1.5"/></svg>
                        Interview {new Date(a.interviewAt.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}{a.interviewAt.time && ` · ${a.interviewAt.time}`}
                      </span>
                    )}
                  </div>
                  <button onClick={() => onOpenPrep && onOpenPrep(a.id)} style={{
                    marginTop: 10, padding: '8px 10px', width: '100%',
                    borderRadius: 10, border: `1px solid ${R.line}`,
                    background: R.sand, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 8,
                    fontFamily: R.sans, fontSize: 12.5, color: R.ink, textAlign: 'left',
                  }}>
                    <svg width="12" height="12" viewBox="0 0 12 12">
                      <path d="M2 2h6l2 2v6H2z" fill="none" stroke={R.ink} strokeWidth="1.2" strokeLinejoin="round"/>
                      <path d="M4 6h4M4 8h3" stroke={R.ink} strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    <span style={{ flex: 1 }}>
                      Interview notes {(() => {
                        const n = a.notes ? Object.values(a.notes).filter(x => x && x.trim()).length : 0;
                        return n > 0 ? `· ${n}/8 sections` : '· none yet';
                      })()}
                    </span>
                    <svg width="6" height="10" viewBox="0 0 8 14"><path d="M1 1l6 6-6 6" stroke={R.ink3} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAB */}
      <div style={{ position: 'absolute', bottom: 54, right: 20, zIndex: 40 }}>
        <button onClick={onAdd} style={{
          width: 58, height: 58, borderRadius: 999, border: 'none', cursor: 'pointer',
          background: R.ink, color: R.canvas,
          boxShadow: '0 4px 16px rgba(60,40,20,0.25), 0 2px 4px rgba(60,40,20,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="20" height="20" viewBox="0 0 20 20"><path d="M10 3v14M3 10h14" stroke={R.canvas} strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
      </div>
    </Screen>
  );
}

// ────────────────────────────────────────────────────────
// 12) INTERVIEW PREP NOTES — rich notes per application
// ────────────────────────────────────────────────────────
const PREP_TEMPLATES = [
  { id: 'why',    group: 'before', label: 'Why this company', starter: '• 3 things that excite me about them:\n  1. \n  2. \n  3. ' },
  { id: 'star',   group: 'before', label: 'STAR stories',     starter: '• Situation:\n• Task:\n• Action:\n• Result:' },
  { id: 'q',      group: 'before', label: 'Questions to ask', starter: '• What does success look like in the first 90 days?\n• How does the team make decisions?\n• ' },
  { id: 'salary', group: 'before', label: 'Salary & logistics', starter: '• Target range: \n• Must-haves: \n• Nice-to-haves: ' },
  { id: 'debrief',group: 'after',  label: 'Debrief',            starter: '• Who I spoke with:\n• Overall vibe (1-5):\n• Felt strong on:\n• Felt shaky on:' },
  { id: 'answers',group: 'after',  label: 'Their answers',      starter: '• To my questions:\n• Red flags:\n• Green flags:' },
  { id: 'followup',group: 'after', label: 'Follow-up to send',  starter: '• Thank-you email draft:\n  Hi __,\n  Thanks for the conversation about __.\n• Anything to clarify or resend:' },
  { id: 'reflect',group: 'after',  label: 'Self-reflection',    starter: '• Would I take this role today? Y/N because…\n• What I\'d do differently next time:' },
];

function ScreenInterviewPrep({ company, role, notes, setNotes, onSave, onBack }) {
  const [phase, setPhase] = React.useState('before');
  const sectionsInPhase = PREP_TEMPLATES.filter(t => t.group === phase);
  const [activeId, setActiveId] = React.useState('why');
  // Keep active tab valid when phase changes
  React.useEffect(() => {
    if (!sectionsInPhase.find(s => s.id === activeId)) {
      setActiveId(sectionsInPhase[0]?.id);
    }
  }, [phase]);
  const active = activeId;
  const current = notes[active] || '';
  const filledBefore = PREP_TEMPLATES.filter(t => t.group === 'before' && (notes[t.id] || '').trim()).length;
  const filledAfter  = PREP_TEMPLATES.filter(t => t.group === 'after'  && (notes[t.id] || '').trim()).length;

  const applyTemplate = () => {
    const t = PREP_TEMPLATES.find(x => x.id === active);
    if (t && !current.trim()) setNotes({ ...notes, [active]: t.starter });
  };

  return (
    <Screen pad={false} bg={R.canvas}>
      <div style={{ padding: '8px 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 44 }}>
          <button onClick={onBack} style={{
            border: 'none', background: 'transparent', cursor: 'pointer', padding: 0,
            display: 'flex', alignItems: 'center', gap: 4, color: R.ink2,
            fontFamily: R.sans, fontSize: 15,
          }}>
            <svg width="8" height="14" viewBox="0 0 8 14"><path d="M7 1L1 7l6 6" stroke={R.ink2} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back
          </button>
          <div style={{ flex: 1, textAlign: 'center', fontFamily: R.sans, fontSize: 15, fontWeight: 600, color: R.ink, marginRight: 48 }}>Interview notes</div>
        </div>
      </div>

      {/* Context header */}
      <div style={{ padding: '14px 24px 10px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 11, background: company?.color || R.ink,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: R.canvas, fontFamily: R.serif, fontSize: 18, flexShrink: 0,
        }}>{company?.name[0]}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: R.serif, fontSize: 20, color: R.ink, letterSpacing: -0.4, lineHeight: 1.1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{role?.title}</div>
          <div style={{ fontSize: 12, color: R.ink3, marginTop: 2 }}>{company?.name}</div>
        </div>
      </div>

      {/* Before / After segmented toggle */}
      <div style={{ padding: '2px 20px 10px' }}>
        <div style={{
          display: 'flex', background: R.sand, borderRadius: 12, padding: 3,
          border: `1px solid ${R.line}`,
        }}>
          {[
            { id: 'before', label: 'Before', count: filledBefore },
            { id: 'after',  label: 'After',  count: filledAfter },
          ].map(p => {
            const on = p.id === phase;
            return (
              <button key={p.id} onClick={() => setPhase(p.id)} style={{
                flex: 1, padding: '9px 10px', borderRadius: 9, border: 'none',
                background: on ? R.paper : 'transparent',
                color: R.ink, cursor: 'pointer',
                fontFamily: R.sans, fontSize: 13, fontWeight: 540,
                boxShadow: on ? '0 1px 2px rgba(60,40,20,0.08)' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'all 160ms',
              }}>
                {p.label}
                <span style={{
                  fontFamily: R.mono, fontSize: 10, padding: '2px 6px', borderRadius: 999,
                  background: on ? R.sand : 'transparent',
                  color: on ? R.ink2 : R.ink3, fontWeight: 500,
                }}>{p.count}/{p.id === 'before' ? 4 : 4}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section chips */}
      <div style={{ padding: '4px 16px 10px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {sectionsInPhase.map(t => {
          const on = t.id === active;
          const has = (notes[t.id] || '').trim().length > 0;
          return (
            <button key={t.id} onClick={() => setActiveId(t.id)} style={{
              padding: '7px 12px', borderRadius: 999, flexShrink: 0,
              border: `1px solid ${on ? R.ink : R.line}`,
              background: on ? R.ink : R.paper,
              color: on ? R.canvas : R.ink,
              cursor: 'pointer', fontSize: 12.5, fontWeight: 500,
              display: 'flex', alignItems: 'center', gap: 6, fontFamily: R.sans,
            }}>
              {has && <div style={{ width: 5, height: 5, borderRadius: 999, background: on ? R.clay : R.moss }}/>}
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Editor */}
      <div style={{ flex: 1, padding: '4px 20px 10px', display: 'flex', flexDirection: 'column' }}>
        <div style={{
          flex: 1, borderRadius: 16, background: R.paper,
          border: `1px solid ${R.line}`, padding: '14px 14px',
          display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: R.mono, fontSize: 10.5, color: R.ink3, letterSpacing: 1.2, textTransform: 'uppercase' }}>
              {PREP_TEMPLATES.find(x => x.id === active)?.label}
            </div>
            {!current.trim() && (
              <button onClick={applyTemplate} style={{
                border: 'none', background: 'transparent', cursor: 'pointer',
                fontFamily: R.mono, fontSize: 10.5, color: R.clay,
                letterSpacing: 1, textTransform: 'uppercase', padding: 0,
              }}>+ Use template</button>
            )}
          </div>
          <textarea
            value={current}
            onChange={e => setNotes({ ...notes, [active]: e.target.value })}
            placeholder={`Jot down your ${phase === 'before' ? 'prep' : 'post-interview'} notes for ${PREP_TEMPLATES.find(x => x.id === active)?.label.toLowerCase()}…`}
            style={{
              flex: 1, marginTop: 10, border: 'none', outline: 'none',
              background: 'transparent', resize: 'none',
              fontFamily: R.sans, fontSize: 14.5, lineHeight: 1.55,
              color: R.ink, padding: 0, minHeight: 160,
            }}
          />
          <div style={{
            marginTop: 8, fontFamily: R.mono, fontSize: 10, color: R.ink3,
            display: 'flex', justifyContent: 'space-between',
          }}>
            <span>{current.length} char{current.length === 1 ? '' : 's'}</span>
            <span>Autosaves as you type</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '8px 28px 24px' }}>
        <PrimaryBtn onClick={onSave}>Save notes</PrimaryBtn>
      </div>
    </Screen>
  );
}

// ────────────────────────────────────────────────────────
// 13) CALENDAR — upcoming interviews, month view
// ────────────────────────────────────────────────────────
function ScreenCalendar({ apps, onOpenApp, onBack }) {
  const today = new Date();
  const [cursor, setCursor] = React.useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const withDates = apps.filter(a => a?.interviewAt?.date);
  const upcoming = withDates
    .map(a => ({ ...a, _d: new Date(a.interviewAt.date + 'T' + (a.interviewAt.time || '09:00')) }))
    .sort((x, y) => x._d - y._d);

  const y = cursor.getFullYear(), m = cursor.getMonth();
  const first = new Date(y, m, 1);
  const startDow = first.getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7) cells.push(null);

  const monthName = cursor.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  const dayMap = {};
  withDates.forEach(a => {
    const dt = new Date(a.interviewAt.date);
    if (dt.getFullYear() === y && dt.getMonth() === m) {
      const day = dt.getDate();
      (dayMap[day] = dayMap[day] || []).push(a);
    }
  });

  return (
    <Screen pad={false} bg={R.canvas}>
      <div style={{ padding: '8px 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 44 }}>
          <button onClick={onBack} style={{
            border: 'none', background: 'transparent', cursor: 'pointer', padding: 0,
            display: 'flex', alignItems: 'center', gap: 4, color: R.ink2,
            fontFamily: R.sans, fontSize: 15,
          }}>
            <svg width="8" height="14" viewBox="0 0 8 14"><path d="M7 1L1 7l6 6" stroke={R.ink2} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back
          </button>
          <div style={{ flex: 1, textAlign: 'center', fontFamily: R.sans, fontSize: 15, fontWeight: 600, color: R.ink, marginRight: 48 }}>Calendar</div>
        </div>
      </div>

      <div style={{ padding: '10px 24px 6px' }}>
        <div style={{ fontFamily: R.mono, fontSize: 10.5, color: R.ink3, letterSpacing: 1.2, textTransform: 'uppercase' }}>Interviews</div>
        <div style={{ fontFamily: R.serif, fontSize: 32, letterSpacing: -0.7, color: R.ink, lineHeight: 1, marginTop: 4 }}>
          {upcoming.filter(a => a._d >= today).length} upcoming
        </div>
      </div>

      {/* Month header */}
      <div style={{ padding: '14px 20px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => setCursor(new Date(y, m - 1, 1))} style={{
          width: 32, height: 32, borderRadius: 10, border: `1px solid ${R.line}`, background: R.paper, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="7" height="12" viewBox="0 0 8 14"><path d="M7 1L1 7l6 6" stroke={R.ink} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div style={{ fontFamily: R.serif, fontSize: 19, color: R.ink, letterSpacing: -0.3 }}>{monthName}</div>
        <button onClick={() => setCursor(new Date(y, m + 1, 1))} style={{
          width: 32, height: 32, borderRadius: 10, border: `1px solid ${R.line}`, background: R.paper, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="7" height="12" viewBox="0 0 8 14"><path d="M1 1l6 6-6 6" stroke={R.ink} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      {/* Weekday headers */}
      <div style={{ padding: '4px 20px', display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
        {['S','M','T','W','T','F','S'].map((d, i) => (
          <div key={i} style={{
            textAlign: 'center', fontFamily: R.mono, fontSize: 10, color: R.ink3,
            letterSpacing: 1.2, padding: '4px 0',
          }}>{d}</div>
        ))}
      </div>

      {/* Month grid */}
      <div style={{ padding: '2px 20px', display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3 }}>
        {cells.map((d, i) => {
          const isToday = d && y === today.getFullYear() && m === today.getMonth() && d === today.getDate();
          const evts = d ? (dayMap[d] || []) : [];
          return (
            <div key={i} style={{
              aspectRatio: '1 / 1', borderRadius: 8,
              background: isToday ? R.ink : (evts.length ? R.paper : 'transparent'),
              border: evts.length && !isToday ? `1px solid ${R.line}` : 'none',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              position: 'relative', padding: 2,
            }}>
              {d && (
                <>
                  <div style={{
                    fontFamily: R.sans, fontSize: 12, fontWeight: isToday || evts.length ? 600 : 400,
                    color: isToday ? R.canvas : R.ink,
                  }}>{d}</div>
                  {evts.length > 0 && !isToday && (
                    <div style={{ marginTop: 2, display: 'flex', gap: 1.5 }}>
                      {evts.slice(0, 3).map((_, k) => (
                        <div key={k} style={{ width: 4, height: 4, borderRadius: 999, background: R.clay }}/>
                      ))}
                    </div>
                  )}
                  {evts.length > 0 && isToday && (
                    <div style={{ marginTop: 2, fontSize: 9, color: R.canvas, fontFamily: R.mono }}>{evts.length}</div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Upcoming list */}
      <div style={{ flex: 1, overflow: 'auto', padding: '16px 20px 20px' }}>
        <div style={{ fontFamily: R.mono, fontSize: 10.5, color: R.ink3, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>Upcoming</div>
        {upcoming.length === 0 ? (
          <div style={{
            padding: '24px 16px', borderRadius: 14, border: `1.5px dashed ${R.line}`, textAlign: 'center',
          }}>
            <div style={{ fontFamily: R.serif, fontSize: 17, color: R.ink, letterSpacing: -0.3 }}>No interviews scheduled</div>
            <div style={{ marginTop: 4, fontSize: 12, color: R.ink3 }}>Add a date on an application to see it here.</div>
          </div>
        ) : upcoming.slice(0, 6).map(a => (
          <button key={a.id} onClick={() => onOpenApp && onOpenApp(a.id)} style={{
            width: '100%', textAlign: 'left', padding: '12px 14px', marginBottom: 8,
            borderRadius: 14, border: `1px solid ${R.line}`, background: R.paper,
            cursor: 'pointer', display: 'flex', gap: 12, alignItems: 'center',
          }}>
            <div style={{
              width: 46, flexShrink: 0, textAlign: 'center',
              padding: '4px 0', borderRadius: 8, background: R.sand,
            }}>
              <div style={{ fontFamily: R.mono, fontSize: 9.5, color: R.terra, letterSpacing: 1, textTransform: 'uppercase' }}>
                {a._d.toLocaleDateString(undefined, { month: 'short' })}
              </div>
              <div style={{ fontFamily: R.serif, fontSize: 22, color: R.ink, lineHeight: 1 }}>{a._d.getDate()}</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: R.serif, fontSize: 16, color: R.ink, letterSpacing: -0.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.role.title}</div>
              <div style={{ fontSize: 12, color: R.ink3, marginTop: 2 }}>
                {a.company.name}{a.interviewAt.time && ` · ${a.interviewAt.time}`}
              </div>
            </div>
          </button>
        ))}
      </div>
    </Screen>
  );
}

Object.assign(window, {
  R,
  ScreenWelcome, ScreenEmail, ScreenVerify, ScreenProfile, ScreenGoals, ScreenNotify, ScreenDone,
  ScreenCompanySearch, ScreenRolePicker, ScreenAppDetails, ScreenTracker, ScreenInterviewPrep, ScreenCalendar,
  COMPANIES, ROLES_BY_COMPANY, STATUSES, PREP_TEMPLATES,
});
