import { motion } from 'framer-motion';
import { FiCamera, FiCode, FiLayers, FiPenTool } from 'react-icons/fi';
import fingerprintHero from '../assets/fingerprint-hero-v2.png';

const mobileCallouts = [
  { title: 'Development', text: 'Frontend · Web Apps · UI', icon: FiCode },
  { title: 'Photography', text: 'People · Places · Stories', icon: FiCamera },
  { title: 'Design', text: 'Interfaces · Systems', icon: FiPenTool },
  { title: 'Research', text: 'Explore · Analyze · Build', icon: FiLayers },
];

const CreativeFingerprint = () => (
  <motion.figure
    className="creative-fingerprint"
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
    aria-labelledby="creative-fingerprint-title"
  >
    <div className="fingerprint-stage">
      <svg
        className="fingerprint-artwork"
        viewBox="0 0 760 500"
        role="img"
        aria-label="Realistic fingerprint connected to development, design, photography, and research"
      >
        <g className="scan-rings" transform="translate(380 250)">
          <circle r="184" />
          <circle r="160" />
          <circle r="136" />
        </g>

        <g className="fingerprint-frame">
          <path d="M258 70h-22v24 M502 70h22v24 M258 430h-22v-24 M502 430h22v-24" />
          <path d="M380 42v26 M367 55h26 M380 432v26 M367 445h26" />
          <path d="M210 250h26 M223 237v26 M524 250h26 M537 237v26" />
        </g>

        <image
          className="fingerprint-image"
          href={fingerprintHero}
          x="250"
          y="55"
          width="260"
          height="400"
          preserveAspectRatio="none"
        />

        <path className="fingerprint-orbit" d="M466 55 A205 205 0 0 1 536 111" />
        <path className="fingerprint-orbit" d="M528 386 A205 205 0 0 1 474 433" />

        <g className="fingerprint-connectors">
          <path d="M166 165H220L285 217" />
          <path d="M166 355H220L292 392" />
          <path d="M489 220L548 165H596" />
          <path d="M480 390H522L560 355H596" />
          <circle cx="166" cy="165" r="3" /><circle cx="285" cy="217" r="3" />
          <circle cx="166" cy="355" r="3" /><circle cx="292" cy="392" r="3" />
          <circle cx="489" cy="220" r="3" /><circle cx="596" cy="165" r="3" />
          <circle cx="480" cy="390" r="3" /><circle cx="596" cy="355" r="3" />
        </g>

        <g className="diagram-callout diagram-development">
          <g className="diagram-icon" transform="translate(34 108)">
            <path d="M10 4 2 12l8 8M18 4l8 8-8 8M15 1l-5 22" />
          </g>
          <text className="diagram-title" x="34" y="166">Development</text>
          <text className="diagram-subtitle" x="34" y="187">Frontend · Web Apps · UI</text>
        </g>

        <g className="diagram-callout diagram-design">
          <g className="diagram-icon" transform="translate(34 298)">
            <path d="m4 22 4-1 14-14-5-5L3 16l-1 7 2-1ZM14 5l5 5M3 16l5 5" />
          </g>
          <text className="diagram-title" x="34" y="356">Design</text>
          <text className="diagram-subtitle" x="34" y="377">Interfaces · Systems</text>
        </g>

        <g className="diagram-callout diagram-photography">
          <g className="diagram-icon" transform="translate(620 108)">
            <path d="M3 7h5l2-3h8l2 3h5v15H3V7Z" />
            <circle cx="14" cy="14" r="5" />
          </g>
          <text className="diagram-title" x="620" y="166">Photography</text>
          <text className="diagram-subtitle" x="620" y="187">People · Places · Stories</text>
        </g>

        <g className="diagram-callout diagram-research">
          <g className="diagram-icon" transform="translate(620 298)">
            <path d="m2 8 12-6 12 6-12 6L2 8Zm3 6 9 5 9-5M5 19l9 5 9-5" />
          </g>
          <text className="diagram-title" x="620" y="356">Research</text>
          <text className="diagram-subtitle" x="620" y="377">Explore · Analyze · Build</text>
        </g>
      </svg>
    </div>

    <div className="fingerprint-mobile-callouts" aria-label="Creative disciplines">
      {mobileCallouts.map(({ title, text, icon: Icon }) => (
        <article key={title}>
          <Icon aria-hidden="true" />
          <strong>{title}</strong>
          <span>{text}</span>
        </article>
      ))}
    </div>

    <figcaption>
      <p id="creative-fingerprint-title"><i aria-hidden="true" /> A creative <b>&amp;</b> technical mindset</p>
      <span>Code <em>×</em> Design <em>×</em> Photography <em>×</em> Research</span>
    </figcaption>
  </motion.figure>
);

export default CreativeFingerprint;
