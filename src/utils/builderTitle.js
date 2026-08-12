// Builder Title Generator — client-side, no API needed
// Keyword matching with multiple options for regeneration cycling

const titleMap = {
  // Dev general
  'developer': ['THE SHIPPER', 'THE CODE CASTAWAY', 'THE SYNTAX SURFER', 'THE BUILD BREAKER'],
  'dev': ['THE SHIPPER', 'THE CODE CASTAWAY', 'THE SYNTAX SURFER', 'THE BUILD BREAKER'],
  'engineer': ['THE SYSTEM ARCHITECT', 'THE LOGIC SURFER', 'THE CODE MARINER', 'THE SIGNAL BUILDER'],
  'programmer': ['THE LOOP RIDER', 'THE FUNCTION FISHERMAN', 'THE BYTE SURFER'],
  'coder': ['THE KEYSTROKE PIRATE', 'THE SYNTAX SMUGGLER', 'THE CODE DRIFTER'],
  'software': ['THE SOFTWARE SURFER', 'THE SYSTEM SAILOR', 'THE CODE NAVIGATOR'],

  // Frontend
  'frontend': ['THE PIXEL SURFER', 'THE DOM DIVER', 'THE INTERFACE ISLANDER', 'THE RENDER RIDER'],
  'front-end': ['THE PIXEL SURFER', 'THE DOM DIVER', 'THE INTERFACE ISLANDER'],
  'react': ['THE COMPONENT CASTAWAY', 'THE HOOK SURFER', 'THE JSX PIRATE'],
  'vue': ['THE REACTIVE RIDER', 'THE TEMPLATE SURFER'],
  'angular': ['THE DIRECTIVE DRIFTER', 'THE MODULE MARINER'],
  'css': ['THE STYLE SMUGGLER', 'THE CASCADE CAPTAIN'],
  'ui': ['THE PIXEL SURFER', 'THE INTERFACE ISLANDER', 'THE SCREEN SCULPTOR'],

  // Backend
  'backend': ['THE SYSTEM SMUGGLER', 'THE SERVER SURFER', 'THE API ARCHITECT', 'THE DATABASE DIVER'],
  'back-end': ['THE SYSTEM SMUGGLER', 'THE SERVER SURFER', 'THE API ARCHITECT'],
  'server': ['THE SERVER SURFER', 'THE UPTIME GUARDIAN', 'THE RESPONSE RIDER'],
  'api': ['THE API ARCHITECT', 'THE ENDPOINT EXPLORER', 'THE REST RIDER'],
  'database': ['THE DATA DIVER', 'THE QUERY SURFER', 'THE SCHEMA SAILOR'],
  'node': ['THE NODE NAVIGATOR', 'THE RUNTIME RIDER', 'THE EVENT LOOP SURFER'],
  'python': ['THE PYTHONIC PIRATE', 'THE SCRIPT SURFER', 'THE INDENT ISLANDER'],
  'java': ['THE CLASS CAPTAIN', 'THE OOP OCEAN RIDER'],
  'rust': ['THE OWNERSHIP ORACLE', 'THE SAFE SURFER', 'THE BORROW CAPTAIN'],
  'go': ['THE GOROUTINE SURFER', 'THE CONCURRENT CAPTAIN'],
  'golang': ['THE GOROUTINE SURFER', 'THE CONCURRENT CAPTAIN'],

  // Full Stack
  'full stack': ['THE BEACH-TO-BACKEND BUILDER', 'THE FULL TIDE RIDER', 'THE END-TO-END EXPLORER'],
  'fullstack': ['THE BEACH-TO-BACKEND BUILDER', 'THE FULL TIDE RIDER', 'THE END-TO-END EXPLORER'],
  'full-stack': ['THE BEACH-TO-BACKEND BUILDER', 'THE FULL TIDE RIDER'],

  // AI/ML
  'ai': ['THE MACHINE WHISPERER', 'THE NEURAL NAVIGATOR', 'THE MODEL MARINER', 'THE PROMPT PIRATE'],
  'machine learning': ['THE MACHINE WHISPERER', 'THE GRADIENT SURFER', 'THE TENSOR TAMER'],
  'ml': ['THE MACHINE WHISPERER', 'THE GRADIENT SURFER', 'THE TENSOR TAMER'],
  'deep learning': ['THE DEEP DIVER', 'THE NEURAL NAVIGATOR'],
  'llm': ['THE PROMPT PIRATE', 'THE TOKEN SURFER', 'THE CONTEXT CAPTAIN'],
  'nlp': ['THE LANGUAGE SURFER', 'THE SEMANTIC SAILOR'],
  'data science': ['THE DATA DIVER', 'THE INSIGHT ISLANDER', 'THE PATTERN PIRATE'],
  'data': ['THE DATA DIVER', 'THE INSIGHT ISLANDER', 'THE PATTERN PIRATE'],

  // Design
  'designer': ['THE PIXEL SURFER', 'THE VISUAL VOYAGER', 'THE DESIGN DRIFTER', 'THE AESTHETIC ARCHITECT'],
  'design': ['THE PIXEL SURFER', 'THE VISUAL VOYAGER', 'THE DESIGN DRIFTER'],
  'ux': ['THE EXPERIENCE EXPLORER', 'THE FLOW SURFER', 'THE JOURNEY MAPPER'],
  'graphic': ['THE VISUAL VOYAGER', 'THE CANVAS CAPTAIN', 'THE COLOR CASTAWAY'],
  'brand': ['THE BRAND BUILDER', 'THE IDENTITY ISLANDER'],

  // Product / Business
  'founder': ['THE WAVE MAKER', 'THE VISION VOYAGER', 'THE VENTURE SURFER', 'THE TIDE STARTER'],
  'ceo': ['THE WAVE MAKER', 'THE SHIP CAPTAIN', 'THE VENTURE VOYAGER'],
  'cto': ['THE TECH TIDE RIDER', 'THE ARCHITECTURE ADMIRAL'],
  'product': ['THE TIDE TURNER', 'THE FEATURE FISHERMAN', 'THE ROADMAP RIDER'],
  'pm': ['THE TIDE TURNER', 'THE SPRINT SURFER', 'THE BACKLOG CAPTAIN'],
  'manager': ['THE TIDE TURNER', 'THE FLOW CAPTAIN'],
  'marketing': ['THE GROWTH SURFER', 'THE SIGNAL BROADCASTER', 'THE REACH RIDER'],
  'growth': ['THE GROWTH SURFER', 'THE VIRAL VOYAGER'],
  'sales': ['THE DEAL DIVER', 'THE PIPELINE PIRATE'],
  'business': ['THE VENTURE SURFER', 'THE DEAL DIVER'],

  // DevOps / Infra
  'devops': ['THE CLOUD SURFER', 'THE PIPELINE PIRATE', 'THE DEPLOY DRIFTER'],
  'cloud': ['THE CLOUD SURFER', 'THE SCALE SAILOR', 'THE INFRA ISLANDER'],
  'infra': ['THE INFRA ISLANDER', 'THE UPTIME SURFER', 'THE SYSTEM SAILOR'],
  'infrastructure': ['THE INFRA ISLANDER', 'THE UPTIME SURFER'],
  'sre': ['THE RELIABILITY RIDER', 'THE UPTIME GUARDIAN'],
  'kubernetes': ['THE CONTAINER CAPTAIN', 'THE CLUSTER SURFER'],
  'docker': ['THE CONTAINER CAPTAIN', 'THE IMAGE ISLANDER'],
  'aws': ['THE CLOUD SURFER', 'THE REGION RIDER'],

  // Mobile
  'mobile': ['THE APP CASTAWAY', 'THE TOUCH SURFER', 'THE SCREEN SAILOR'],
  'ios': ['THE SWIFT SURFER', 'THE APP ISLANDER', 'THE CUPERTINO CASTAWAY'],
  'android': ['THE DROID DRIFTER', 'THE APP ARCHITECT'],
  'flutter': ['THE WIDGET SURFER', 'THE CROSS-SHORE BUILDER'],
  'react native': ['THE NATIVE NAVIGATOR', 'THE BRIDGE BUILDER'],

  // Security
  'security': ['THE FIREWALL FISHERMAN', 'THE CIPHER SURFER', 'THE GUARD NAVIGATOR'],
  'cyber': ['THE CYBER SURFER', 'THE FIREWALL FISHERMAN'],
  'hacker': ['THE ETHICAL EXPLORER', 'THE BUG BOUNTY SURFER'],
  'pentester': ['THE BREACH SURFER', 'THE VULNERABILITY VOYAGER'],

  // Web3 / Blockchain
  'blockchain': ['THE CHAIN SURFER', 'THE BLOCK BUILDER', 'THE LEDGER NAVIGATOR'],
  'web3': ['THE WEB3 WAVE RIDER', 'THE DECENTRALIZED DRIFTER'],
  'crypto': ['THE CHAIN SURFER', 'THE TOKEN NAVIGATOR'],
  'solidity': ['THE CONTRACT CAPTAIN', 'THE GAS OPTIMIZER'],
  'smart contract': ['THE CONTRACT CAPTAIN', 'THE ON-CHAIN SURFER'],

  // Content / Writing
  'content': ['THE STORY SMUGGLER', 'THE NARRATIVE NAVIGATOR', 'THE WORD SURFER'],
  'writer': ['THE STORY SMUGGLER', 'THE WORD SURFER', 'THE NARRATIVE NAVIGATOR'],
  'technical writer': ['THE DOC DRIFTER', 'THE SYNTAX STORYTELLER'],
  'copywriter': ['THE WORD SURFER', 'THE COPY CAPTAIN'],

  // Game Dev
  'game': ['THE PIXEL PIRATE', 'THE LEVEL SURFER', 'THE SPAWN CAPTAIN'],
  'gamedev': ['THE PIXEL PIRATE', 'THE LEVEL SURFER'],
  'unity': ['THE SCENE SURFER', 'THE PREFAB PIRATE'],
  'unreal': ['THE BLUEPRINT BUILDER', 'THE RENDER RIDER'],

  // Other tech
  'qa': ['THE BUG HUNTER', 'THE QUALITY CAPTAIN', 'THE TEST SURFER'],
  'testing': ['THE TEST SURFER', 'THE ASSERTION ADMIRAL'],
  'analyst': ['THE INSIGHT ISLANDER', 'THE DATA DRIFTER'],
  'consultant': ['THE SOLUTION SURFER', 'THE STRATEGY SAILOR'],
  'freelance': ['THE FREE SURFER', 'THE SOLO SAILOR', 'THE INDEPENDENT ISLANDER'],
  'student': ['THE LEARNING SURFER', 'THE KNOWLEDGE NAVIGATOR', 'THE FUTURE BUILDER'],
  'intern': ['THE RISING TIDE', 'THE SHORE STARTER'],
  'open source': ['THE OPEN OCEAN BUILDER', 'THE PUBLIC REPO PIRATE'],
  'community': ['THE COMMUNITY CAPTAIN', 'THE COLLECTIVE SURFER'],
};

// Fallback titles when no keyword matches
const fallbackTitles = [
  'THE BUILDER',
  'THE SIGNAL MAKER',
  'THE WAVE BUILDER',
  'THE GOA HACKER',
  'THE BEACH BUILDER',
  'THE TROPICAL TECHNOLOGIST',
  'THE SHORE BUILDER',
  'THE COAST CODER',
];

/**
 * Generate a builder title based on role/stack input
 * @param {string} role - The user's stack/role
 * @param {number} variant - Which variant to use (for regeneration)
 * @returns {string} A fun builder title
 */
export function generateBuilderTitle(role, variant = 0) {
  if (!role || role.trim() === '') return fallbackTitles[variant % fallbackTitles.length];

  const normalizedRole = role.toLowerCase().trim();

  // Check for multi-word matches first (longer keys first for priority)
  const sortedKeys = Object.keys(titleMap).sort((a, b) => b.length - a.length);

  for (const keyword of sortedKeys) {
    if (normalizedRole.includes(keyword)) {
      const titles = titleMap[keyword];
      return titles[variant % titles.length];
    }
  }

  return fallbackTitles[variant % fallbackTitles.length];
}

/**
 * Get the total number of variants available for a given role
 * @param {string} role
 * @returns {number}
 */
export function getTitleVariantCount(role) {
  if (!role || role.trim() === '') return fallbackTitles.length;

  const normalizedRole = role.toLowerCase().trim();
  const sortedKeys = Object.keys(titleMap).sort((a, b) => b.length - a.length);

  for (const keyword of sortedKeys) {
    if (normalizedRole.includes(keyword)) {
      return titleMap[keyword].length;
    }
  }

  return fallbackTitles.length;
}

/**
 * Generate a dynamic builder number
 * @returns {string} e.g. "026"
 */
export function generateBuilderNumber() {
  return String(Math.floor(Math.random() * 999) + 1).padStart(3, '0');
}
