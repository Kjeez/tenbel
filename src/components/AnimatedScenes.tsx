/**
 * Animated Network Topology Scenes for MWC 2026 Showcase
 * Each scene is an SVG with CSS keyframe micro-animations showing:
 * - Data pulses flowing through cables
 * - Signal waves radiating from antennas/towers
 * - Network frequency lines visible along connections
 * - Moving elements (trains, data packets)
 * - Blinking LEDs on equipment
 */

/* ─── RAILWAY CONNECTIVITY SCENE ──────────────────────── */

export function RailwayScene() {
  return (
    <div className="anim-scene-wrap">
      <video className="anim-scene-video" autoPlay loop muted playsInline>
        <source src="/videos/Train_moving_along_railway_tracks_20261001173524.mp4" type="video/mp4" />
      </video>
      <div className="anim-scene-overlay" />
      <svg viewBox="0 0 800 400" className="anim-scene-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          {/* Gradient for cables */}
          <linearGradient id="cableGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="signalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glowStrong">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Ground / Tracks ── */}
        <line x1="0" y1="320" x2="800" y2="320" stroke="#1e293b" strokeWidth="2" />
        {/* Rail tracks */}
        <line x1="0" y1="310" x2="800" y2="310" stroke="#334155" strokeWidth="3" />
        <line x1="0" y1="318" x2="800" y2="318" stroke="#334155" strokeWidth="3" />
        {/* Rail ties */}
        {Array.from({ length: 40 }).map((_, i) => (
          <rect key={`tie-${i}`} x={i * 20 + 5} y={308} width={10} height={12} fill="#1e293b" rx={1} />
        ))}

        {/* ── Cell Tower (right side) ── */}
        <g transform="translate(650, 120)">
          {/* Tower structure */}
          <polygon points="0,180 -8,0 8,0" fill="none" stroke="#475569" strokeWidth="2" />
          <line x1="-12" y1="60" x2="12" y2="60" stroke="#475569" strokeWidth="1.5" />
          <line x1="-10" y1="120" x2="10" y2="120" stroke="#475569" strokeWidth="1.5" />
          {/* Antenna dishes */}
          <rect x="-3" y="-8" width="6" height="8" fill="#64748b" rx={1} />
          <line x1="-10" y1="10" x2="0" y2="0" stroke="#64748b" strokeWidth="2" />
          <line x1="10" y1="10" x2="0" y2="0" stroke="#64748b" strokeWidth="2" />
          {/* Signal waves */}
          <circle cx="0" cy="0" r="15" fill="none" stroke="#a855f7" strokeWidth="1.5" opacity="0" className="anim-signal-wave anim-signal-wave--1" />
          <circle cx="0" cy="0" r="15" fill="none" stroke="#a855f7" strokeWidth="1.5" opacity="0" className="anim-signal-wave anim-signal-wave--2" />
          <circle cx="0" cy="0" r="15" fill="none" stroke="#a855f7" strokeWidth="1.5" opacity="0" className="anim-signal-wave anim-signal-wave--3" />
          {/* Tower LED */}
          <circle cx="0" cy="-12" r="3" fill="#ef4444" className="anim-blink" />
        </g>

        {/* ── Trackside Antenna (center) ── */}
        <g transform="translate(400, 200)">
          {/* Pole */}
          <rect x="-3" y="0" width="6" height="110" fill="#475569" rx={2} />
          {/* Antenna head */}
          <rect x="-12" y="-10" width="24" height="14" fill="#334155" rx={3} stroke="#14b8a6" strokeWidth="1" />
          <rect x="-8" y="-4" width="3" height="3" fill="#14b8a6" className="anim-blink-fast" rx={1} />
          <rect x="-2" y="-4" width="3" height="3" fill="#eab308" className="anim-blink" rx={1} />
          <rect x="4" y="-4" width="3" height="3" fill="#22c55e" className="anim-blink-slow" rx={1} />
          {/* Signal waves from antenna */}
          <circle cx="0" cy="-3" r="20" fill="none" stroke="#14b8a6" strokeWidth="1.2" opacity="0" className="anim-signal-wave anim-signal-wave--1" />
          <circle cx="0" cy="-3" r="20" fill="none" stroke="#14b8a6" strokeWidth="1.2" opacity="0" className="anim-signal-wave anim-signal-wave--2" />
          <circle cx="0" cy="-3" r="20" fill="none" stroke="#14b8a6" strokeWidth="1" opacity="0" className="anim-signal-wave anim-signal-wave--3" />
        </g>

        {/* ── Router Box (center-right, on ground) ── */}
        <g transform="translate(520, 270)">
          {/* Router body */}
          <rect x="-25" y="-15" width="50" height="30" fill="#1e293b" stroke="#14b8a6" strokeWidth="1.5" rx={5} />
          <text x="0" y="2" textAnchor="middle" fill="#94a3b8" fontSize="7" fontWeight="600">ROUTER</text>
          {/* LEDs */}
          <circle cx="-15" cy="-8" r="2.5" fill="#22c55e" className="anim-blink-fast" />
          <circle cx="-8" cy="-8" r="2.5" fill="#14b8a6" className="anim-blink" />
          <circle cx="-1" cy="-8" r="2.5" fill="#eab308" className="anim-blink-slow" />
          {/* Antennas on router */}
          <line x1="12" y1="-15" x2="16" y2="-30" stroke="#64748b" strokeWidth="1.5" />
          <line x1="18" y1="-15" x2="22" y2="-28" stroke="#64748b" strokeWidth="1.5" />
          <circle cx="16" cy="-32" r="2" fill="#14b8a6" className="anim-blink-fast" />
          <circle cx="22" cy="-30" r="2" fill="#a855f7" className="anim-blink" />
        </g>

        {/* ── CCTV Camera (left of center) ── */}
        <g transform="translate(300, 220)">
          {/* Mount */}
          <rect x="-2" y="0" width="4" height="90" fill="#475569" />
          {/* Camera body */}
          <rect x="-8" y="-10" width="20" height="12" fill="#334155" rx={3} />
          <circle cx="8" cy="-4" r="4" fill="#1e293b" stroke="#ef4444" strokeWidth="1" />
          <circle cx="8" cy="-4" r="2" fill="#ef4444" className="anim-blink-slow" />
          {/* Scan arc */}
          <path d="M 8,-4 L 30,-18 L 30,10 Z" fill="rgba(239,68,68,0.06)" stroke="none" className="anim-scan" />
        </g>

        {/* ── Satellite Dish (far left) ── */}
        <g transform="translate(120, 180)">
          <rect x="-2" y="0" width="4" height="130" fill="#475569" />
          <ellipse cx="0" cy="-8" rx="18" ry="10" fill="none" stroke="#64748b" strokeWidth="2" transform="rotate(-30)" />
          <line x1="0" y1="-8" x2="-5" y2="-18" stroke="#64748b" strokeWidth="2" />
          <circle cx="-5" cy="-20" r="3" fill="#eab308" className="anim-blink" />
          {/* Satellite beam going up */}
          <line x1="-5" y1="-20" x2="-30" y2="-80" stroke="#eab308" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" className="anim-dash-flow-up" />
          <line x1="-5" y1="-20" x2="10" y2="-75" stroke="#eab308" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" className="anim-dash-flow-up" style={{ animationDelay: '0.5s' }} />
        </g>

        {/* ── WiFi Hotspot Icon (above router) ── */}
        <g transform="translate(520, 220)">
          <path d="M -12,0 Q -12,-8 0,-12 Q 12,-8 12,0" fill="none" stroke="#6366f1" strokeWidth="1.5" opacity="0.6" />
          <path d="M -8,-2 Q -8,-6 0,-9 Q 8,-6 8,-2" fill="none" stroke="#6366f1" strokeWidth="1.5" opacity="0.8" />
          <path d="M -4,-4 Q -4,-6 0,-7 Q 4,-6 4,-4" fill="none" stroke="#6366f1" strokeWidth="1.5" />
          <circle cx="0" cy="-2" r="2" fill="#6366f1" />
        </g>

        {/* ── CONNECTION CABLES (with data flow animation) ── */}

        {/* Cable: Antenna → Router */}
        <path
          d="M 400,310 C 420,310 460,285 495,270"
          fill="none"
          stroke="#1e293b"
          strokeWidth="3"
        />
        <path
          d="M 400,310 C 420,310 460,285 495,270"
          fill="none"
          stroke="#14b8a6"
          strokeWidth="2"
          strokeDasharray="6 12"
          className="anim-data-flow"
          filter="url(#glow)"
        />
        {/* Data packet on cable */}
        <circle r="4" fill="#14b8a6" filter="url(#glow)" className="anim-packet-1">
          <animateMotion dur="2s" repeatCount="indefinite" path="M 400,310 C 420,310 460,285 495,270" />
        </circle>

        {/* Cable: Router → Tower */}
        <path
          d="M 545,270 C 580,260 620,200 650,180"
          fill="none"
          stroke="#1e293b"
          strokeWidth="3"
        />
        <path
          d="M 545,270 C 580,260 620,200 650,180"
          fill="none"
          stroke="#a855f7"
          strokeWidth="2"
          strokeDasharray="6 12"
          className="anim-data-flow"
          style={{ animationDelay: '0.5s' }}
          filter="url(#glow)"
        />
        <circle r="4" fill="#a855f7" filter="url(#glow)">
          <animateMotion dur="1.8s" repeatCount="indefinite" path="M 545,270 C 580,260 620,200 650,180" />
        </circle>

        {/* Cable: CCTV → Router */}
        <path
          d="M 312,220 C 360,230 440,260 495,268"
          fill="none"
          stroke="#1e293b"
          strokeWidth="3"
        />
        <path
          d="M 312,220 C 360,230 440,260 495,268"
          fill="none"
          stroke="#ef4444"
          strokeWidth="1.5"
          strokeDasharray="4 10"
          className="anim-data-flow"
          style={{ animationDelay: '1s' }}
          filter="url(#glow)"
        />
        <circle r="3" fill="#ef4444" filter="url(#glow)">
          <animateMotion dur="2.5s" repeatCount="indefinite" path="M 312,220 C 360,230 440,260 495,268" />
        </circle>

        {/* Cable: Satellite → Router */}
        <path
          d="M 138,180 C 250,220 400,250 495,265"
          fill="none"
          stroke="#1e293b"
          strokeWidth="3"
        />
        <path
          d="M 138,180 C 250,220 400,250 495,265"
          fill="none"
          stroke="#eab308"
          strokeWidth="1.5"
          strokeDasharray="4 10"
          className="anim-data-flow"
          style={{ animationDelay: '1.5s' }}
          filter="url(#glow)"
        />
        <circle r="3" fill="#eab308" filter="url(#glow)">
          <animateMotion dur="3s" repeatCount="indefinite" path="M 138,180 C 250,220 400,250 495,265" />
        </circle>

        {/* ── TRAIN (animated, moving left to right) ── */}
        <g className="anim-train">
          {/* Train body */}
          <rect x="-40" y="-22" width="80" height="18" fill="#1e293b" stroke="#475569" strokeWidth="1.5" rx={4} />
          <rect x="-38" y="-20" width="20" height="10" fill="rgba(99,102,241,0.15)" rx={2} />
          <rect x="-14" y="-20" width="20" height="10" fill="rgba(99,102,241,0.15)" rx={2} />
          <rect x="10" y="-20" width="20" height="10" fill="rgba(99,102,241,0.15)" rx={2} />
          {/* Headlight */}
          <rect x="36" y="-18" width="6" height="6" fill="#eab308" rx={1} className="anim-blink-fast" />
          {/* Wheels */}
          <circle cx="-25" cy="-2" r="5" fill="#334155" stroke="#475569" strokeWidth="1" />
          <circle cx="-5" cy="-2" r="5" fill="#334155" stroke="#475569" strokeWidth="1" />
          <circle cx="15" cy="-2" r="5" fill="#334155" stroke="#475569" strokeWidth="1" />
          <circle cx="30" cy="-2" r="5" fill="#334155" stroke="#475569" strokeWidth="1" />
        </g>

        {/* ── Labels ── */}
        <text x="650" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600" letterSpacing="0.05em">CELL TOWER</text>
        <text x="400" y="185" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600" letterSpacing="0.05em">TRACKSIDE ANTENNA</text>
        <text x="520" y="310" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="600" letterSpacing="0.05em">CENTRAL ROUTER</text>
        <text x="300" y="205" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="600" letterSpacing="0.05em">CCTV</text>
        <text x="120" y="165" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="600" letterSpacing="0.05em">SATELLITE</text>
        <text x="520" y="208" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="600" letterSpacing="0.05em">WiFi</text>

        {/* ── Network status bar at bottom ── */}
        <rect x="50" y="355" width="700" height="30" fill="rgba(30,41,59,0.8)" rx={8} />
        <circle cx="75" cy="370" r="4" fill="#22c55e" className="anim-blink-fast" />
        <text x="88" y="374" fill="#94a3b8" fontSize="9" fontWeight="500">ALL SYSTEMS CONNECTED</text>
        <circle cx="260" cy="370" r="3" fill="#14b8a6" className="anim-blink" />
        <text x="270" y="374" fill="#64748b" fontSize="8">ANTENNA: ACTIVE</text>
        <circle cx="400" cy="370" r="3" fill="#a855f7" className="anim-blink-slow" />
        <text x="410" y="374" fill="#64748b" fontSize="8">TOWER: BROADCASTING</text>
        <circle cx="550" cy="370" r="3" fill="#ef4444" className="anim-blink" />
        <text x="560" y="374" fill="#64748b" fontSize="8">CCTV: RECORDING</text>
        <circle cx="680" cy="370" r="3" fill="#eab308" className="anim-blink-slow" />
        <text x="690" y="374" fill="#64748b" fontSize="8">SAT: UPLINK</text>
      </svg>
      <style>{railwayAnimStyles}</style>
    </div>
  );
}

const railwayAnimStyles = `
  .anim-train {
    animation: trainMove 12s linear infinite;
  }
  @keyframes trainMove {
    0% { transform: translate(80px, 306px); }
    100% { transform: translate(750px, 306px); }
  }
`;

/* ─── DISASTER MANAGEMENT SCENE ───────────────────────── */

export function DisasterScene() {
  return (
    <div className="anim-scene-wrap">
      <video className="anim-scene-video" autoPlay loop muted playsInline>
        <source src="/videos/Rescue_teams_setting_up_communic._20261001173529.mp4" type="video/mp4" />
      </video>
      <div className="anim-scene-overlay" />
      <svg viewBox="0 0 800 400" className="anim-scene-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glowD">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* ── Mountain terrain ── */}
        <polygon points="0,350 100,180 200,260 300,150 400,230 500,170 600,250 700,190 800,350" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
        <polygon points="0,350 80,220 180,300 280,200 350,280 450,220 550,290 650,210 750,280 800,350" fill="#0a0a1a" stroke="#1e293b" strokeWidth="0.5" />

        {/* ── Broken Cell Tower (shows infrastructure failure) ── */}
        <g transform="translate(200, 160)">
          {/* Broken tower */}
          <line x1="-5" y1="90" x2="-3" y2="30" stroke="#475569" strokeWidth="2" />
          <line x1="5" y1="90" x2="3" y2="30" stroke="#475569" strokeWidth="2" />
          <line x1="-8" y1="60" x2="8" y2="60" stroke="#475569" strokeWidth="1" />
          {/* Broken top part (tilted) */}
          <g transform="rotate(25, 0, 30)">
            <line x1="-3" y1="30" x2="-1" y2="0" stroke="#475569" strokeWidth="2" strokeDasharray="4 2" />
            <line x1="3" y1="30" x2="1" y2="0" stroke="#475569" strokeWidth="2" strokeDasharray="4 2" />
          </g>
          {/* X mark — no signal */}
          <line x1="-10" y1="-10" x2="10" y2="10" stroke="#ef4444" strokeWidth="2" opacity="0.8" />
          <line x1="10" y1="-10" x2="-10" y2="10" stroke="#ef4444" strokeWidth="2" opacity="0.8" />
          <text x="0" y="105" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">TOWER DOWN</text>
          {/* Spark/danger */}
          <circle cx="2" cy="28" r="6" fill="none" stroke="#ef4444" strokeWidth="1" className="anim-signal-wave anim-signal-wave--1" style={{ animationDuration: '1.5s' }} />
        </g>

        {/* ── OffGrid Node 1 (left side, rescue team) ── */}
        <g transform="translate(350, 200)">
          {/* Device body */}
          <rect x="-12" y="-10" width="24" height="20" fill="#1e293b" stroke="#14b8a6" strokeWidth="1.5" rx={4} />
          <line x1="0" y1="-10" x2="0" y2="-22" stroke="#14b8a6" strokeWidth="1.5" />
          <circle cx="0" cy="-24" r="2.5" fill="#14b8a6" className="anim-blink-fast" />
          {/* Label */}
          <text x="0" y="4" textAnchor="middle" fill="#14b8a6" fontSize="5" fontWeight="700">NODE</text>
          <text x="0" y="25" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="600">OFFGRID 1</text>
          {/* Signal waves — LoRa broadcast */}
          <circle cx="0" cy="-24" r="12" fill="none" stroke="#14b8a6" strokeWidth="1" opacity="0" className="anim-signal-wave anim-signal-wave--1" />
          <circle cx="0" cy="-24" r="12" fill="none" stroke="#14b8a6" strokeWidth="1" opacity="0" className="anim-signal-wave anim-signal-wave--2" />
          <circle cx="0" cy="-24" r="12" fill="none" stroke="#14b8a6" strokeWidth="1" opacity="0" className="anim-signal-wave anim-signal-wave--3" />
        </g>

        {/* ── OffGrid Node 2 (relay in middle) ── */}
        <g transform="translate(500, 170)">
          <rect x="-10" y="-8" width="20" height="16" fill="#1e293b" stroke="#14b8a6" strokeWidth="1.5" rx={4} />
          <line x1="0" y1="-8" x2="0" y2="-18" stroke="#14b8a6" strokeWidth="1.5" />
          <circle cx="0" cy="-20" r="2" fill="#eab308" className="anim-blink" />
          <text x="0" y="3" textAnchor="middle" fill="#eab308" fontSize="5" fontWeight="700">RELAY</text>
          <text x="0" y="22" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="600">MESH RELAY</text>
          <circle cx="0" cy="-20" r="10" fill="none" stroke="#eab308" strokeWidth="1" opacity="0" className="anim-signal-wave anim-signal-wave--1" />
          <circle cx="0" cy="-20" r="10" fill="none" stroke="#eab308" strokeWidth="1" opacity="0" className="anim-signal-wave anim-signal-wave--2" />
        </g>

        {/* ── OffGrid Node 3 (far rescue team) ── */}
        <g transform="translate(650, 190)">
          <rect x="-12" y="-10" width="24" height="20" fill="#1e293b" stroke="#14b8a6" strokeWidth="1.5" rx={4} />
          <line x1="0" y1="-10" x2="0" y2="-22" stroke="#14b8a6" strokeWidth="1.5" />
          <circle cx="0" cy="-24" r="2.5" fill="#14b8a6" className="anim-blink-fast" />
          <text x="0" y="4" textAnchor="middle" fill="#14b8a6" fontSize="5" fontWeight="700">NODE</text>
          <text x="0" y="25" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="600">OFFGRID 2</text>
          <circle cx="0" cy="-24" r="12" fill="none" stroke="#14b8a6" strokeWidth="1" opacity="0" className="anim-signal-wave anim-signal-wave--1" />
          <circle cx="0" cy="-24" r="12" fill="none" stroke="#14b8a6" strokeWidth="1" opacity="0" className="anim-signal-wave anim-signal-wave--2" />
          <circle cx="0" cy="-24" r="12" fill="none" stroke="#14b8a6" strokeWidth="1" opacity="0" className="anim-signal-wave anim-signal-wave--3" />
        </g>

        {/* ── Mesh Connection Lines (Node1 → Relay → Node2) ── */}
        {/* Node1 → Relay */}
        <path d="M 362,190 C 400,175 460,165 500,162" fill="none" stroke="#1e293b" strokeWidth="3" />
        <path d="M 362,190 C 400,175 460,165 500,162" fill="none" stroke="#14b8a6" strokeWidth="2" strokeDasharray="6 10" className="anim-data-flow" filter="url(#glowD)" />
        <circle r="4" fill="#14b8a6" filter="url(#glowD)">
          <animateMotion dur="1.5s" repeatCount="indefinite" path="M 362,190 C 400,175 460,165 500,162" />
        </circle>

        {/* Relay → Node2 */}
        <path d="M 520,162 C 560,170 610,180 650,182" fill="none" stroke="#1e293b" strokeWidth="3" />
        <path d="M 520,162 C 560,170 610,180 650,182" fill="none" stroke="#eab308" strokeWidth="2" strokeDasharray="6 10" className="anim-data-flow" style={{ animationDelay: '0.6s' }} filter="url(#glowD)" />
        <circle r="4" fill="#eab308" filter="url(#glowD)">
          <animateMotion dur="1.5s" repeatCount="indefinite" path="M 520,162 C 560,170 610,180 650,182" begin="0.6s" />
        </circle>

        {/* ── Emergency CommsBox (bottom center) ── */}
        <g transform="translate(430, 310)">
          <rect x="-28" y="-18" width="56" height="36" fill="#1e293b" stroke="#E8307A" strokeWidth="1.5" rx={5} />
          <text x="0" y="-4" textAnchor="middle" fill="#E8307A" fontSize="6" fontWeight="700">COMMS</text>
          <text x="0" y="5" textAnchor="middle" fill="#E8307A" fontSize="6" fontWeight="700">BOX</text>
          <circle cx="-18" cy="-10" r="2.5" fill="#22c55e" className="anim-blink-fast" />
          <circle cx="-10" cy="-10" r="2.5" fill="#E8307A" className="anim-blink" />
          {/* Antennas */}
          <line x1="-20" y1="-18" x2="-24" y2="-35" stroke="#64748b" strokeWidth="1.5" />
          <line x1="20" y1="-18" x2="24" y2="-35" stroke="#64748b" strokeWidth="1.5" />
          <circle cx="-24" cy="-37" r="2" fill="#E8307A" className="anim-blink-fast" />
          <circle cx="24" cy="-37" r="2" fill="#E8307A" className="anim-blink" />
          {/* Signal waves from CommsBox */}
          <circle cx="0" cy="-18" r="15" fill="none" stroke="#E8307A" strokeWidth="1" opacity="0" className="anim-signal-wave anim-signal-wave--1" />
          <circle cx="0" cy="-18" r="15" fill="none" stroke="#E8307A" strokeWidth="1" opacity="0" className="anim-signal-wave anim-signal-wave--2" />
          <text x="0" y="30" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="600">EMERGENCY COMMS BOX</text>
        </g>

        {/* CommsBox → Node1 connection */}
        <path d="M 410,292 C 390,260 370,230 354,210" fill="none" stroke="#E8307A" strokeWidth="1.5" strokeDasharray="4 8" className="anim-data-flow" style={{ animationDelay: '0.3s' }} filter="url(#glowD)" />
        <circle r="3" fill="#E8307A" filter="url(#glowD)">
          <animateMotion dur="2s" repeatCount="indefinite" path="M 410,292 C 390,260 370,230 354,210" begin="0.3s" />
        </circle>

        {/* ── Range indicator ── */}
        <text x="430" y="130" textAnchor="middle" fill="#14b8a6" fontSize="11" fontWeight="700" opacity="0.7" className="anim-fade-pulse">MESH RANGE: 12–13 km</text>
        <line x1="340" y1="138" x2="520" y2="138" stroke="#14b8a6" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />

        {/* ── Status bar ── */}
        <rect x="50" y="360" width="700" height="28" fill="rgba(30,41,59,0.8)" rx={8} />
        <circle cx="75" cy="374" r="4" fill="#ef4444" className="anim-blink" />
        <text x="88" y="378" fill="#ef4444" fontSize="9" fontWeight="600">INFRASTRUCTURE DOWN</text>
        <text x="250" y="378" fill="#64748b" fontSize="8">|</text>
        <circle cx="270" cy="374" r="4" fill="#22c55e" className="anim-blink-fast" />
        <text x="283" y="378" fill="#22c55e" fontSize="9" fontWeight="600">MESH NETWORK ACTIVE</text>
        <text x="450" y="378" fill="#64748b" fontSize="8">|</text>
        <text x="470" y="378" fill="#94a3b8" fontSize="8">3 Nodes Connected • Relay Active</text>
      </svg>
    </div>
  );
}

/* ─── SMART AGRICULTURE SCENE ─────────────────────────── */

export function AgricultureScene() {
  return (
    <div className="anim-scene-wrap">
      <video className="anim-scene-video" autoPlay loop muted playsInline>
        <source src="/videos/Autonomous_harvester_in_wheat_field_20261001173521.mp4" type="video/mp4" />
      </video>
      <div className="anim-scene-overlay" />
      <svg viewBox="0 0 800 400" className="anim-scene-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glowA">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* ── Ground ── */}
        <rect x="0" y="300" width="800" height="100" fill="#1a1a0a" />
        {/* Field rows */}
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={`row-${i}`} x1="0" y1={300 + i * 5} x2="800" y2={300 + i * 5} stroke="#2a2a10" strokeWidth="0.5" />
        ))}
        {/* Crop indicators */}
        {Array.from({ length: 30 }).map((_, i) => (
          <line key={`crop-${i}`} x1={40 + i * 24} y1="300" x2={40 + i * 24} y2="288" stroke="#4a7a2a" strokeWidth="2" opacity="0.4" />
        ))}

        {/* ── Harvester Combine (animated) ── */}
        <g className="anim-harvester">
          {/* Harvester body */}
          <rect x="-50" y="-35" width="90" height="30" fill="#1e293b" stroke="#22c55e" strokeWidth="1" rx={4} />
          <rect x="-45" y="-30" width="25" height="18" fill="rgba(34,197,94,0.1)" rx={2} />
          {/* Header/cutter */}
          <rect x="-70" y="-20" width="20" height="14" fill="#334155" stroke="#475569" strokeWidth="1" rx={2} />
          <line x1="-70" y1="-10" x2="-55" y2="-10" stroke="#22c55e" strokeWidth="1" strokeDasharray="2 2" className="anim-dash-flow" />
          {/* Wheels */}
          <circle cx="-30" cy="-2" r="7" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
          <circle cx="25" cy="-2" r="9" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
          {/* Antenna on harvester */}
          <line x1="30" y1="-35" x2="35" y2="-55" stroke="#64748b" strokeWidth="1.5" />
          <circle cx="35" cy="-57" r="3" fill="#14b8a6" className="anim-blink-fast" />
          {/* Camera */}
          <rect x="-5" y="-42" width="10" height="7" fill="#334155" rx={2} />
          <circle cx="0" cy="-38" r="2" fill="#ef4444" className="anim-blink-slow" />
          {/* Sensor data broadcast */}
          <circle cx="35" cy="-57" r="10" fill="none" stroke="#14b8a6" strokeWidth="1" opacity="0" className="anim-signal-wave anim-signal-wave--1" />
          <circle cx="35" cy="-57" r="10" fill="none" stroke="#14b8a6" strokeWidth="1" opacity="0" className="anim-signal-wave anim-signal-wave--2" />
        </g>

        {/* ── RFID Sensor Posts (in field) ── */}
        {[180, 340, 500].map((x, i) => (
          <g key={`rfid-${i}`} transform={`translate(${x}, 250)`}>
            <rect x="-2" y="0" width="4" height="50" fill="#475569" />
            <rect x="-8" y="-8" width="16" height="12" fill="#1e293b" stroke="#6366f1" strokeWidth="1" rx={3} />
            <circle cx="0" cy="-2" r="2" fill="#6366f1" className="anim-blink" style={{ animationDelay: `${i * 0.4}s` }} />
            <text x="0" y="62" textAnchor="middle" fill="#64748b" fontSize="7" fontWeight="600">RFID</text>
            {/* RFID scan wave */}
            <circle cx="0" cy="-2" r="8" fill="none" stroke="#6366f1" strokeWidth="0.8" opacity="0" className="anim-signal-wave anim-signal-wave--1" style={{ animationDelay: `${i * 0.4}s` }} />
            <circle cx="0" cy="-2" r="8" fill="none" stroke="#6366f1" strokeWidth="0.8" opacity="0" className="anim-signal-wave anim-signal-wave--2" style={{ animationDelay: `${i * 0.4 + 0.7}s` }} />
          </g>
        ))}

        {/* ── OffGrid Node (field base station) ── */}
        <g transform="translate(660, 200)">
          <rect x="-15" y="-12" width="30" height="24" fill="#1e293b" stroke="#14b8a6" strokeWidth="1.5" rx={5} />
          <line x1="0" y1="-12" x2="0" y2="-28" stroke="#14b8a6" strokeWidth="2" />
          <circle cx="0" cy="-30" r="3" fill="#14b8a6" className="anim-blink-fast" />
          <text x="0" y="3" textAnchor="middle" fill="#14b8a6" fontSize="5" fontWeight="700">OG</text>
          <text x="0" y="28" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="600">OFFGRID BASE</text>
          {/* Signal */}
          <circle cx="0" cy="-30" r="15" fill="none" stroke="#14b8a6" strokeWidth="1" opacity="0" className="anim-signal-wave anim-signal-wave--1" />
          <circle cx="0" cy="-30" r="15" fill="none" stroke="#14b8a6" strokeWidth="1" opacity="0" className="anim-signal-wave anim-signal-wave--2" />
          <circle cx="0" cy="-30" r="15" fill="none" stroke="#14b8a6" strokeWidth="1" opacity="0" className="anim-signal-wave anim-signal-wave--3" />
        </g>

        {/* ── Data connections: RFID → OffGrid ── */}
        {[180, 340, 500].map((x, i) => (
          <g key={`conn-${i}`}>
            <path d={`M ${x},245 C ${x + 50},230 ${590 + i * 10},215 645,200`} fill="none" stroke="#6366f1" strokeWidth="1" strokeDasharray="4 8" className="anim-data-flow" style={{ animationDelay: `${i * 0.5}s` }} filter="url(#glowA)" />
            <circle r="3" fill="#6366f1" filter="url(#glowA)">
              <animateMotion dur={`${2 + i * 0.3}s`} repeatCount="indefinite" path={`M ${x},245 C ${x + 50},230 ${590 + i * 10},215 645,200`} begin={`${i * 0.5}s`} />
            </circle>
          </g>
        ))}

        {/* ── Collision avoidance zone ── */}
        <g className="anim-harvester" style={{ animationName: 'none' }}>
          {/* This overlays on the harvester */}
        </g>

        {/* ── AI / Cloud Processing (top right) ── */}
        <g transform="translate(700, 80)">
          <rect x="-30" y="-20" width="60" height="40" fill="rgba(30,41,59,0.8)" stroke="#22c55e" strokeWidth="1" rx={8} />
          <text x="0" y="-4" textAnchor="middle" fill="#22c55e" fontSize="7" fontWeight="700">AI ENGINE</text>
          <text x="0" y="8" textAnchor="middle" fill="#64748b" fontSize="6">PROCESSING</text>
          {/* Spinning indicator */}
          <circle cx="20" cy="-10" r="4" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="6 6" className="anim-spin" />
          {/* Connection to OffGrid */}
          <path d="M 670,100 C 670,140 665,170 660,195" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="3 6" className="anim-data-flow" style={{ animationDelay: '0.8s' }} filter="url(#glowA)" />
          <circle r="3" fill="#22c55e" filter="url(#glowA)">
            <animateMotion dur="1.5s" repeatCount="indefinite" path="M 670,100 C 670,140 665,170 660,195" begin="0.8s" />
          </circle>
        </g>

        {/* Labels */}
        <text x="100" y="40" fill="#94a3b8" fontSize="11" fontWeight="700" opacity="0.5">SMART AGRICULTURE — IoT ENABLED</text>
        <text x="100" y="56" fill="#64748b" fontSize="9">Autonomous Harvesting • RFID Monitoring • AI Collision Avoidance</text>

        {/* Status bar */}
        <rect x="50" y="360" width="700" height="28" fill="rgba(30,41,59,0.8)" rx={8} />
        <circle cx="75" cy="374" r="4" fill="#22c55e" className="anim-blink-fast" />
        <text x="88" y="378" fill="#22c55e" fontSize="9" fontWeight="600">HARVEST ACTIVE</text>
        <text x="200" y="378" fill="#64748b" fontSize="8">|</text>
        <text x="215" y="378" fill="#6366f1" fontSize="8" fontWeight="500">3 RFID SENSORS</text>
        <text x="330" y="378" fill="#64748b" fontSize="8">|</text>
        <text x="345" y="378" fill="#14b8a6" fontSize="8" fontWeight="500">OFFGRID: NO CHARGES</text>
        <text x="500" y="378" fill="#64748b" fontSize="8">|</text>
        <text x="515" y="378" fill="#22c55e" fontSize="8" fontWeight="500">COLLISION AVOIDANCE: ON</text>
      </svg>
      <style>{agricultureAnimStyles}</style>
    </div>
  );
}

const agricultureAnimStyles = `
  .anim-harvester {
    animation: harvesterMove 20s linear infinite;
  }
  @keyframes harvesterMove {
    0% { transform: translate(100px, 295px); }
    50% { transform: translate(550px, 295px); }
    100% { transform: translate(100px, 295px); }
  }
`;

/* ─── REMOTE CONNECTIVITY SCENE ───────────────────────── */

export function RemoteConnectivityScene() {
  return (
    <div className="anim-scene-wrap">
      <video className="anim-scene-video" autoPlay loop muted playsInline>
        <source src="/videos/Hospital_switches_to_backup_conn._20261001173501.mp4" type="video/mp4" />
      </video>
      <div className="anim-scene-overlay" />
      <svg viewBox="0 0 800 400" className="anim-scene-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glowR">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* ── Water/Ocean ── */}
        <rect x="0" y="280" width="800" height="120" fill="#060620" />
        {Array.from({ length: 8 }).map((_, i) => (
          <path key={`wave-${i}`} d={`M 0,${290 + i * 12} Q ${100 + i * 20},${285 + i * 12} 200,${290 + i * 12} T 400,${290 + i * 12} T 600,${290 + i * 12} T 800,${290 + i * 12}`} fill="none" stroke="#1e293b" strokeWidth="0.5" className="anim-wave" style={{ animationDelay: `${i * 0.3}s` }} />
        ))}

        {/* ── Island ── */}
        <ellipse cx="200" cy="280" rx="120" ry="20" fill="#0f172a" />

        {/* ── Hospital Building ── */}
        <g transform="translate(200, 190)">
          <rect x="-40" y="0" width="80" height="80" fill="#1e293b" stroke="#475569" strokeWidth="1" rx={4} />
          {/* Windows */}
          {[0, 1, 2].map(row => [0, 1, 2].map(col => (
            <rect key={`win-${row}-${col}`} x={-30 + col * 24} y={10 + row * 22} width="16" height="12" fill={col === 1 && row === 0 ? 'rgba(20,184,166,0.2)' : 'rgba(99,102,241,0.08)'} rx={2} />
          )))}
          {/* Red cross */}
          <rect x="-4" y="-15" width="8" height="18" fill="#ef4444" rx={2} />
          <rect x="-9" y="-10" width="18" height="8" fill="#ef4444" rx={2} />
          <text x="0" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600">REMOTE HOSPITAL</text>
        </g>

        {/* ── Satellite Dish on Hospital ── */}
        <g transform="translate(240, 175)">
          <line x1="0" y1="15" x2="0" y2="0" stroke="#64748b" strokeWidth="2" />
          <ellipse cx="0" cy="-4" rx="12" ry="7" fill="none" stroke="#64748b" strokeWidth="1.5" transform="rotate(-20)" />
          <circle cx="-3" cy="-8" r="2" fill="#eab308" className="anim-blink" />
        </g>

        {/* ── Multi-SIM Router (on hospital roof) ── */}
        <g transform="translate(170, 180)">
          <rect x="-15" y="-8" width="30" height="16" fill="#1e293b" stroke="#14b8a6" strokeWidth="1.5" rx={4} />
          <text x="0" y="2" textAnchor="middle" fill="#14b8a6" fontSize="5" fontWeight="700">ROUTER</text>
          <circle cx="-8" cy="-4" r="2" fill="#22c55e" className="anim-blink-fast" />
          <circle cx="-2" cy="-4" r="2" fill="#14b8a6" className="anim-blink" />
          <circle cx="4" cy="-4" r="2" fill="#eab308" className="anim-blink-slow" />
          {/* Dual SIM indicator */}
          <rect x="9" y="-6" width="4" height="8" fill="#22c55e" rx={1} opacity="0.7" />
          <rect x="14" y="-6" width="4" height="8" fill="#6366f1" rx={1} opacity="0.7" />
          <text x="0" y="16" textAnchor="middle" fill="#64748b" fontSize="6">MULTI-SIM</text>
        </g>

        {/* ── Satellite (top, in space) ── */}
        <g transform="translate(400, 50)">
          <rect x="-8" y="-5" width="16" height="10" fill="#334155" stroke="#eab308" strokeWidth="1" rx={2} />
          {/* Solar panels */}
          <rect x="-30" y="-4" width="20" height="8" fill="#1e293b" stroke="#475569" strokeWidth="0.5" rx={1} />
          <rect x="10" y="-4" width="20" height="8" fill="#1e293b" stroke="#475569" strokeWidth="0.5" rx={1} />
          <circle cx="0" cy="0" r="3" fill="#eab308" className="anim-blink" />
          <text x="0" y="18" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="600">SATELLITE</text>
          {/* Beams */}
          <circle cx="0" cy="0" r="12" fill="none" stroke="#eab308" strokeWidth="0.8" opacity="0" className="anim-signal-wave anim-signal-wave--1" />
          <circle cx="0" cy="0" r="12" fill="none" stroke="#eab308" strokeWidth="0.8" opacity="0" className="anim-signal-wave anim-signal-wave--2" />
        </g>

        {/* ── Cell Tower (mainland, far right) ── */}
        <g transform="translate(650, 140)">
          <polygon points="0,140 -6,0 6,0" fill="none" stroke="#475569" strokeWidth="2" />
          <line x1="-10" y1="50" x2="10" y2="50" stroke="#475569" strokeWidth="1" />
          <line x1="-8" y1="100" x2="8" y2="100" stroke="#475569" strokeWidth="1" />
          <circle cx="0" cy="-5" r="3" fill="#a855f7" className="anim-blink" />
          <text x="0" y="155" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="600">CELL TOWER</text>
          <circle cx="0" cy="-5" r="12" fill="none" stroke="#a855f7" strokeWidth="1" opacity="0" className="anim-signal-wave anim-signal-wave--1" />
          <circle cx="0" cy="-5" r="12" fill="none" stroke="#a855f7" strokeWidth="1" opacity="0" className="anim-signal-wave anim-signal-wave--2" />
        </g>

        {/* ── Connection: Hospital Router → Satellite (primary) ── */}
        <path d="M 237,170 C 280,120 350,70 397,55" fill="none" stroke="#eab308" strokeWidth="2" strokeDasharray="6 10" className="anim-data-flow" filter="url(#glowR)" />
        <circle r="4" fill="#eab308" filter="url(#glowR)">
          <animateMotion dur="2s" repeatCount="indefinite" path="M 237,170 C 280,120 350,70 397,55" />
        </circle>

        {/* ── Connection: Satellite → Cell Tower (backhaul) ── */}
        <path d="M 410,55 C 480,80 580,110 645,140" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 8" className="anim-data-flow" style={{ animationDelay: '0.5s' }} filter="url(#glowR)" />
        <circle r="3" fill="#a855f7" filter="url(#glowR)">
          <animateMotion dur="2.5s" repeatCount="indefinite" path="M 410,55 C 480,80 580,110 645,140" begin="0.5s" />
        </circle>

        {/* ── Failover indicator ── */}
        <g transform="translate(400, 160)">
          <rect x="-50" y="-14" width="100" height="28" fill="rgba(30,41,59,0.9)" stroke="#22c55e" strokeWidth="1" rx={14} />
          <circle cx="-35" cy="0" r="4" fill="#22c55e" className="anim-blink-fast" />
          <text x="5" y="4" textAnchor="middle" fill="#22c55e" fontSize="8" fontWeight="700">AUTO-FAILOVER</text>
        </g>

        {/* ── Connection: Router → Cell Tower (failover backup, dashed) ── */}
        <path d="M 185,180 C 300,200 500,220 640,265" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="3 6" className="anim-data-flow" style={{ animationDelay: '1s' }} opacity="0.5" filter="url(#glowR)" />
        <text x="410" y="240" textAnchor="middle" fill="#22c55e" fontSize="7" opacity="0.6">CELLULAR BACKUP</text>

        {/* ── Doctor / Telemedicine indicator (inside hospital) ── */}
        <g transform="translate(200, 220)">
          <circle cx="0" cy="0" r="12" fill="rgba(20,184,166,0.1)" stroke="#14b8a6" strokeWidth="0.5" />
          <text x="0" y="4" textAnchor="middle" fill="#14b8a6" fontSize="7" fontWeight="600">📡</text>
        </g>

        {/* ── Status bar ── */}
        <rect x="50" y="360" width="700" height="28" fill="rgba(30,41,59,0.8)" rx={8} />
        <circle cx="75" cy="374" r="4" fill="#22c55e" className="anim-blink-fast" />
        <text x="88" y="378" fill="#22c55e" fontSize="9" fontWeight="600">CONNECTIVITY: 99.9% UPTIME</text>
        <text x="280" y="378" fill="#64748b" fontSize="8">|</text>
        <text x="295" y="378" fill="#eab308" fontSize="8" fontWeight="500">PRIMARY: SATELLITE</text>
        <text x="430" y="378" fill="#64748b" fontSize="8">|</text>
        <text x="445" y="378" fill="#22c55e" fontSize="8" fontWeight="500">BACKUP: CELLULAR</text>
        <text x="580" y="378" fill="#64748b" fontSize="8">|</text>
        <text x="595" y="378" fill="#14b8a6" fontSize="8" fontWeight="500">FAILOVER: AUTO</text>
      </svg>
      <style>{remoteAnimStyles}</style>
    </div>
  );
}

const remoteAnimStyles = `
  .anim-wave {
    animation: waveShift 4s ease-in-out infinite alternate;
  }
  @keyframes waveShift {
    0% { transform: translateX(0); }
    100% { transform: translateX(15px); }
  }
`;

/* ─── SMART FACTORY SCENE ─────────────────────────────── */

export function FactoryScene() {
  return (
    <div className="anim-scene-wrap">
      <video className="anim-scene-video" autoPlay loop muted playsInline>
        <source src="/videos/Smart_factory_production_line_in._20261001173455.mp4" type="video/mp4" />
      </video>
      <div className="anim-scene-overlay" />
      <svg viewBox="0 0 800 400" className="anim-scene-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glowF">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* ── Factory floor ── */}
        <rect x="0" y="300" width="800" height="100" fill="#0a0a14" />
        <line x1="0" y1="300" x2="800" y2="300" stroke="#1e293b" strokeWidth="1" />

        {/* ── Conveyor Belt ── */}
        <rect x="80" y="260" width="620" height="8" fill="#1e293b" stroke="#334155" strokeWidth="1" rx={4} />
        {/* Rollers */}
        {Array.from({ length: 30 }).map((_, i) => (
          <circle key={`roller-${i}`} cx={90 + i * 20} cy="264" r="3" fill="#334155" stroke="#475569" strokeWidth="0.5" className="anim-spin-slow" />
        ))}
        {/* Moving product boxes */}
        <rect x="0" y="245" width="18" height="14" fill="#1e293b" stroke="#6366f1" strokeWidth="1" rx={2} className="anim-conveyor-item anim-conveyor-item--1" />
        <rect x="0" y="245" width="18" height="14" fill="#1e293b" stroke="#22c55e" strokeWidth="1" rx={2} className="anim-conveyor-item anim-conveyor-item--2" />
        <rect x="0" y="245" width="18" height="14" fill="#1e293b" stroke="#ef4444" strokeWidth="1" rx={2} className="anim-conveyor-item anim-conveyor-item--3" />

        {/* ── RFID Scanner Station 1 (Date/Batch Coding) ── */}
        <g transform="translate(250, 210)">
          <rect x="-20" y="-15" width="40" height="30" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" rx={5} />
          <text x="0" y="-2" textAnchor="middle" fill="#6366f1" fontSize="6" fontWeight="700">RFID</text>
          <text x="0" y="7" textAnchor="middle" fill="#6366f1" fontSize="5">SCAN</text>
          <circle cx="12" cy="-8" r="2" fill="#6366f1" className="anim-blink-fast" />
          {/* Scan beam down */}
          <rect x="-8" y="15" width="16" height="30" fill="rgba(99,102,241,0.08)" />
          <line x1="-8" y1="15" x2="-8" y2="45" stroke="#6366f1" strokeWidth="0.5" opacity="0.3" />
          <line x1="8" y1="15" x2="8" y2="45" stroke="#6366f1" strokeWidth="0.5" opacity="0.3" />
          {/* Scan line animation */}
          <line x1="-6" y1="20" x2="6" y2="20" stroke="#6366f1" strokeWidth="1.5" className="anim-scan-line" filter="url(#glowF)" />
          <text x="0" y="58" textAnchor="middle" fill="#94a3b8" fontSize="7" fontWeight="600">BATCH CODING</text>
        </g>

        {/* ── Quality Check Station ── */}
        <g transform="translate(430, 210)">
          <rect x="-20" y="-15" width="40" height="30" fill="#1e293b" stroke="#22c55e" strokeWidth="1.5" rx={5} />
          <text x="0" y="-2" textAnchor="middle" fill="#22c55e" fontSize="6" fontWeight="700">QC</text>
          <text x="0" y="7" textAnchor="middle" fill="#22c55e" fontSize="5">CHECK</text>
          <circle cx="12" cy="-8" r="2" fill="#22c55e" className="anim-blink" />
          {/* Camera / sensor */}
          <rect x="-5" y="-25" width="10" height="8" fill="#334155" rx={2} />
          <circle cx="0" cy="-21" r="2" fill="#22c55e" className="anim-blink-fast" />
          <text x="0" y="58" textAnchor="middle" fill="#94a3b8" fontSize="7" fontWeight="600">QUALITY FILTER</text>
        </g>

        {/* ── Waste Sorting Station ── */}
        <g transform="translate(600, 210)">
          <rect x="-20" y="-15" width="40" height="30" fill="#1e293b" stroke="#ef4444" strokeWidth="1.5" rx={5} />
          <text x="0" y="-2" textAnchor="middle" fill="#ef4444" fontSize="6" fontWeight="700">SORT</text>
          <text x="0" y="7" textAnchor="middle" fill="#ef4444" fontSize="5">GRADE</text>
          <circle cx="12" cy="-8" r="2" fill="#ef4444" className="anim-blink-slow" />
          {/* Sorting arrows */}
          <line x1="0" y1="15" x2="-15" y2="35" stroke="#22c55e" strokeWidth="1" />
          <line x1="0" y1="15" x2="15" y2="35" stroke="#ef4444" strokeWidth="1" />
          <text x="-18" y="45" textAnchor="middle" fill="#22c55e" fontSize="6">✓</text>
          <text x="18" y="45" textAnchor="middle" fill="#ef4444" fontSize="6">✗</text>
          <text x="0" y="58" textAnchor="middle" fill="#94a3b8" fontSize="7" fontWeight="600">WASTE FILTER</text>
        </g>

        {/* ── Central IoT Hub ── */}
        <g transform="translate(430, 100)">
          <rect x="-35" y="-20" width="70" height="40" fill="rgba(30,41,59,0.9)" stroke="#14b8a6" strokeWidth="1.5" rx={8} />
          <text x="0" y="-4" textAnchor="middle" fill="#14b8a6" fontSize="7" fontWeight="700">IoT HUB</text>
          <text x="0" y="8" textAnchor="middle" fill="#64748b" fontSize="6">REAL-TIME DATA</text>
          <circle cx="-22" cy="-12" r="2.5" fill="#22c55e" className="anim-blink-fast" />
          <circle cx="-15" cy="-12" r="2.5" fill="#14b8a6" className="anim-blink" />
          <circle cx="-8" cy="-12" r="2.5" fill="#6366f1" className="anim-blink-slow" />
          {/* Spinning process */}
          <circle cx="22" cy="-2" r="8" fill="none" stroke="#14b8a6" strokeWidth="1" strokeDasharray="8 8" className="anim-spin" />
        </g>

        {/* ── Data connections: Stations → Hub ── */}
        <path d="M 250,210 C 300,160 380,120 395,105" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4 8" className="anim-data-flow" filter="url(#glowF)" />
        <circle r="3" fill="#6366f1" filter="url(#glowF)">
          <animateMotion dur="1.8s" repeatCount="indefinite" path="M 250,210 C 300,160 380,120 395,105" />
        </circle>

        <path d="M 430,210 L 430,125" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4 8" className="anim-data-flow" style={{ animationDelay: '0.4s' }} filter="url(#glowF)" />
        <circle r="3" fill="#22c55e" filter="url(#glowF)">
          <animateMotion dur="1.2s" repeatCount="indefinite" path="M 430,210 L 430,125" begin="0.4s" />
        </circle>

        <path d="M 600,210 C 560,160 480,120 465,105" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 8" className="anim-data-flow" style={{ animationDelay: '0.8s' }} filter="url(#glowF)" />
        <circle r="3" fill="#ef4444" filter="url(#glowF)">
          <animateMotion dur="1.8s" repeatCount="indefinite" path="M 600,210 C 560,160 480,120 465,105" begin="0.8s" />
        </circle>

        {/* Labels */}
        <text x="100" y="40" fill="#94a3b8" fontSize="11" fontWeight="700" opacity="0.5">SMART FACTORY — CONNECTED INTELLIGENCE</text>
        <text x="100" y="56" fill="#64748b" fontSize="9">Batch Coding → Quality Check → Waste Sorting → Full Traceability</text>

        {/* Status bar */}
        <rect x="50" y="360" width="700" height="28" fill="rgba(30,41,59,0.8)" rx={8} />
        <circle cx="75" cy="374" r="4" fill="#22c55e" className="anim-blink-fast" />
        <text x="88" y="378" fill="#22c55e" fontSize="9" fontWeight="600">LINE ACTIVE</text>
        <text x="180" y="378" fill="#64748b" fontSize="8">|</text>
        <text x="195" y="378" fill="#6366f1" fontSize="8" fontWeight="500">RFID SCANNING</text>
        <text x="310" y="378" fill="#64748b" fontSize="8">|</text>
        <text x="325" y="378" fill="#22c55e" fontSize="8" fontWeight="500">QUALITY: A/B/C</text>
        <text x="440" y="378" fill="#64748b" fontSize="8">|</text>
        <text x="455" y="378" fill="#ef4444" fontSize="8" fontWeight="500">WASTE: FILTERED</text>
        <text x="580" y="378" fill="#64748b" fontSize="8">|</text>
        <text x="595" y="378" fill="#14b8a6" fontSize="8" fontWeight="500">TRACEABILITY: 100%</text>
      </svg>
      <style>{factoryAnimStyles}</style>
    </div>
  );
}

const factoryAnimStyles = `
  .anim-conveyor-item--1 { animation: conveyorMove 6s linear infinite; }
  .anim-conveyor-item--2 { animation: conveyorMove 6s linear infinite 2s; }
  .anim-conveyor-item--3 { animation: conveyorMove 6s linear infinite 4s; }
  @keyframes conveyorMove {
    0% { transform: translate(100px, 0); opacity: 0; }
    5% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translate(680px, 0); opacity: 0; }
  }
  .anim-scan-line {
    animation: scanLine 1.5s ease-in-out infinite;
  }
  @keyframes scanLine {
    0% { transform: translateY(0); opacity: 1; }
    50% { transform: translateY(22px); opacity: 0.6; }
    100% { transform: translateY(0); opacity: 1; }
  }
  .anim-spin-slow {
    animation: spinSlow 3s linear infinite;
    transform-origin: center;
  }
  @keyframes spinSlow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

/* ─── GLOBAL ANIMATION STYLES ─────────────────────────── */

export const globalAnimStyles = `
  .anim-scene-wrap {
    position: relative;
    width: 100%;
    border-radius: 18px;
    overflow: hidden;
    background: #060612;
    border: 1px solid rgba(255,255,255,0.06);
    margin-bottom: 24px;
  }
  .anim-scene-video {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    object-fit: cover;
    z-index: 0;
    opacity: 0.7;
  }
  .anim-scene-overlay {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: radial-gradient(circle at center, rgba(6,6,18,0.15) 0%, rgba(6,6,18,0.55) 100%);
    z-index: 1;
  }
  .anim-scene-svg {
    position: relative;
    z-index: 2;
    width: 100%;
    height: auto;
    display: block;
  }

  /* Signal waves radiating from antennas */
  .anim-signal-wave {
    animation: signalWave 2.4s ease-out infinite;
  }
  .anim-signal-wave--1 { animation-delay: 0s; }
  .anim-signal-wave--2 { animation-delay: 0.8s; }
  .anim-signal-wave--3 { animation-delay: 1.6s; }

  @keyframes signalWave {
    0% { r: 8; opacity: 0.7; }
    100% { r: 50; opacity: 0; }
  }

  /* Blinking LEDs */
  .anim-blink { animation: blink 2s ease-in-out infinite; }
  .anim-blink-fast { animation: blink 1s ease-in-out infinite; }
  .anim-blink-slow { animation: blink 3s ease-in-out infinite; }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.2; }
  }

  /* Data flow along cables */
  .anim-data-flow {
    animation: dataFlow 2s linear infinite;
  }
  @keyframes dataFlow {
    0% { stroke-dashoffset: 36; }
    100% { stroke-dashoffset: 0; }
  }

  /* Dash flow upward (satellite) */
  .anim-dash-flow-up {
    animation: dashFlowUp 2s linear infinite;
  }
  @keyframes dashFlowUp {
    0% { stroke-dashoffset: 0; }
    100% { stroke-dashoffset: -16; }
  }

  .anim-dash-flow {
    animation: dashFlow 1s linear infinite;
  }
  @keyframes dashFlow {
    0% { stroke-dashoffset: 8; }
    100% { stroke-dashoffset: 0; }
  }

  /* CCTV scan arc */
  .anim-scan {
    animation: scanPan 4s ease-in-out infinite alternate;
    transform-origin: 8px -4px;
  }
  @keyframes scanPan {
    0% { transform: rotate(-15deg); }
    100% { transform: rotate(15deg); }
  }

  /* Spinning indicator */
  .anim-spin {
    animation: spinAnim 3s linear infinite;
    transform-origin: center;
  }
  @keyframes spinAnim {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Fade pulse for text */
  .anim-fade-pulse {
    animation: fadePulse 3s ease-in-out infinite;
  }
  @keyframes fadePulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.9; }
  }
`;

/* ─── HIKING & WILDERNESS SCENE ───────────────────────── */

export function HikingScene() {
  return (
    <div className="anim-scene-wrap">
      <video className="anim-scene-video" autoPlay loop muted playsInline>
        <source src="/videos/Hikers_connecting_via_mesh_network_20261001173508.mp4" type="video/mp4" />
      </video>
      <div className="anim-scene-overlay" />
      <svg viewBox="0 0 800 400" className="anim-scene-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glowH">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* ── Sky gradient ── */}
        <rect x="0" y="0" width="800" height="400" fill="#060612" />

        {/* ── Mountain silhouettes ── */}
        <polygon points="0,350 60,200 120,280 200,150 280,230 350,180 400,350" fill="#0a0f1e" />
        <polygon points="350,350 420,190 500,260 560,170 620,240 700,200 800,350" fill="#0d1425" />
        <polygon points="0,350 100,250 180,300 250,220 320,290 400,250 500,300 580,240 650,310 750,260 800,350" fill="#0f172a" />
        
        {/* ── Valley floor ── */}
        <rect x="0" y="320" width="800" height="80" fill="#0a0a14" />
        
        {/* ── Trees ── */}
        {[80, 140, 220, 350, 450, 520, 620, 700].map((x, i) => (
          <g key={`tree-${i}`} transform={`translate(${x}, ${305 + Math.sin(i) * 8})`}>
            <polygon points="0,-20 -6,0 6,0" fill="#0f2518" stroke="#1a3a28" strokeWidth="0.5" />
            <rect x="-1" y="0" width="2" height="8" fill="#1e293b" />
          </g>
        ))}

        {/* ── Hiker 1 (left peak) ── */}
        <g transform="translate(200, 140)">
          {/* Person silhouette */}
          <circle cx="0" cy="-12" r="5" fill="#475569" />
          <rect x="-3" y="-7" width="6" height="12" fill="#475569" rx={2} />
          <line x1="-3" y1="5" x2="-5" y2="15" stroke="#475569" strokeWidth="2" />
          <line x1="3" y1="5" x2="5" y2="15" stroke="#475569" strokeWidth="2" />
          {/* OffGrid device in hand */}
          <rect x="6" y="-5" width="8" height="12" fill="#1e293b" stroke="#14b8a6" strokeWidth="1" rx={2} />
          <line x1="10" y1="-5" x2="10" y2="-14" stroke="#14b8a6" strokeWidth="1" />
          <circle cx="10" cy="-16" r="2" fill="#14b8a6" className="anim-blink-fast" />
          {/* Signal waves */}
          <circle cx="10" cy="-16" r="10" fill="none" stroke="#14b8a6" strokeWidth="1" opacity="0" className="anim-signal-wave anim-signal-wave--1" />
          <circle cx="10" cy="-16" r="10" fill="none" stroke="#14b8a6" strokeWidth="1" opacity="0" className="anim-signal-wave anim-signal-wave--2" />
          <circle cx="10" cy="-16" r="10" fill="none" stroke="#14b8a6" strokeWidth="1" opacity="0" className="anim-signal-wave anim-signal-wave--3" />
          <text x="0" y="28" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="600">HIKER A</text>
          <text x="0" y="38" textAnchor="middle" fill="#14b8a6" fontSize="7">OffGrid Node</text>
        </g>

        {/* ── Relay Node (valley relay point) ── */}
        <g transform="translate(400, 240)">
          <rect x="-12" y="-10" width="24" height="20" fill="#1e293b" stroke="#eab308" strokeWidth="1.5" rx={4} />
          <line x1="0" y1="-10" x2="0" y2="-22" stroke="#eab308" strokeWidth="1.5" />
          <circle cx="0" cy="-24" r="3" fill="#eab308" className="anim-blink" />
          <text x="0" y="4" textAnchor="middle" fill="#eab308" fontSize="5" fontWeight="700">RELAY</text>
          {/* Signal waves */}
          <circle cx="0" cy="-24" r="12" fill="none" stroke="#eab308" strokeWidth="1" opacity="0" className="anim-signal-wave anim-signal-wave--1" />
          <circle cx="0" cy="-24" r="12" fill="none" stroke="#eab308" strokeWidth="1" opacity="0" className="anim-signal-wave anim-signal-wave--2" />
          <text x="0" y="22" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="600">MESH RELAY</text>
        </g>

        {/* ── Hiker 2 (right peak) ── */}
        <g transform="translate(600, 160)">
          <circle cx="0" cy="-12" r="5" fill="#475569" />
          <rect x="-3" y="-7" width="6" height="12" fill="#475569" rx={2} />
          <line x1="-3" y1="5" x2="-5" y2="15" stroke="#475569" strokeWidth="2" />
          <line x1="3" y1="5" x2="5" y2="15" stroke="#475569" strokeWidth="2" />
          {/* OffGrid device */}
          <rect x="6" y="-5" width="8" height="12" fill="#1e293b" stroke="#14b8a6" strokeWidth="1" rx={2} />
          <line x1="10" y1="-5" x2="10" y2="-14" stroke="#14b8a6" strokeWidth="1" />
          <circle cx="10" cy="-16" r="2" fill="#14b8a6" className="anim-blink-fast" />
          <circle cx="10" cy="-16" r="10" fill="none" stroke="#14b8a6" strokeWidth="1" opacity="0" className="anim-signal-wave anim-signal-wave--1" />
          <circle cx="10" cy="-16" r="10" fill="none" stroke="#14b8a6" strokeWidth="1" opacity="0" className="anim-signal-wave anim-signal-wave--2" />
          <circle cx="10" cy="-16" r="10" fill="none" stroke="#14b8a6" strokeWidth="1" opacity="0" className="anim-signal-wave anim-signal-wave--3" />
          <text x="0" y="28" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="600">HIKER B</text>
          <text x="0" y="38" textAnchor="middle" fill="#14b8a6" fontSize="7">OffGrid Node</text>
        </g>

        {/* ── Mesh connections: Hiker A → Relay → Hiker B ── */}
        <path d="M 215,130 C 270,160 340,210 395,230" fill="none" stroke="#14b8a6" strokeWidth="2" strokeDasharray="6 10" className="anim-data-flow" filter="url(#glowH)" />
        <circle r="4" fill="#14b8a6" filter="url(#glowH)">
          <animateMotion dur="2s" repeatCount="indefinite" path="M 215,130 C 270,160 340,210 395,230" />
        </circle>

        <path d="M 410,230 C 460,210 540,180 605,150" fill="none" stroke="#eab308" strokeWidth="2" strokeDasharray="6 10" className="anim-data-flow" style={{ animationDelay: '0.6s' }} filter="url(#glowH)" />
        <circle r="4" fill="#eab308" filter="url(#glowH)">
          <animateMotion dur="2s" repeatCount="indefinite" path="M 410,230 C 460,210 540,180 605,150" begin="0.6s" />
        </circle>

        {/* ── Range arc (showing 12-13km mesh range) ── */}
        <path d="M 200,100 Q 400,40 600,100" fill="none" stroke="#14b8a6" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.3" />
        <text x="400" y="60" textAnchor="middle" fill="#14b8a6" fontSize="10" fontWeight="700" opacity="0.6" className="anim-fade-pulse">1.5–2 km per hop • 12–13 km mesh</text>

        {/* ── Stars ── */}
        {[50, 150, 300, 450, 550, 680, 750, 100, 380, 620].map((x, i) => (
          <circle key={`star-${i}`} cx={x} cy={20 + (i * 7) % 50} r={0.8 + Math.random()} fill="#fff" opacity={0.3 + Math.random() * 0.3} className={i % 2 === 0 ? 'anim-blink-slow' : 'anim-blink'} />
        ))}

        {/* ── No Network indicator ── */}
        <g transform="translate(100, 60)">
          <rect x="-45" y="-12" width="90" height="24" fill="rgba(30,41,59,0.8)" stroke="rgba(239,68,68,0.3)" strokeWidth="1" rx={12} />
          <circle cx="-30" cy="0" r="3" fill="#ef4444" opacity="0.5" />
          <line x1="-32" y1="-2" x2="-28" y2="2" stroke="#ef4444" strokeWidth="1" />
          <text x="5" y="4" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="600">NO CELL NETWORK</text>
        </g>

        <g transform="translate(690, 60)">
          <rect x="-45" y="-12" width="90" height="24" fill="rgba(30,41,59,0.8)" stroke="rgba(20,184,166,0.3)" strokeWidth="1" rx={12} />
          <circle cx="-30" cy="0" r="3" fill="#14b8a6" className="anim-blink-fast" />
          <text x="5" y="4" textAnchor="middle" fill="#14b8a6" fontSize="8" fontWeight="600">OFFGRID ACTIVE</text>
        </g>

        {/* ── Status bar ── */}
        <rect x="50" y="360" width="700" height="28" fill="rgba(30,41,59,0.8)" rx={8} />
        <circle cx="75" cy="374" r="4" fill="#14b8a6" className="anim-blink-fast" />
        <text x="88" y="378" fill="#14b8a6" fontSize="9" fontWeight="600">MESH ACTIVE</text>
        <text x="190" y="378" fill="#64748b" fontSize="8">|</text>
        <text x="205" y="378" fill="#94a3b8" fontSize="8">2 Nodes + 1 Relay</text>
        <text x="340" y="378" fill="#64748b" fontSize="8">|</text>
        <text x="355" y="378" fill="#eab308" fontSize="8" fontWeight="500">NO SIM REQUIRED</text>
        <text x="490" y="378" fill="#64748b" fontSize="8">|</text>
        <text x="505" y="378" fill="#14b8a6" fontSize="8" fontWeight="500">BATTERY: 3–4 WEEKS</text>
        <text x="650" y="378" fill="#64748b" fontSize="8">|</text>
        <text x="665" y="378" fill="#22c55e" fontSize="8" fontWeight="500">ZERO CHARGES</text>
      </svg>
    </div>
  );
}

