# ABYSS

A narrative-driven survival game following a young girl's journey through a dangerous abyss as she searches for peace, safety, and hope.

## 🎮 Play Now

**Web Version (Play in Browser):**
👉 [Open `/web/index.html`](web/index.html) in your browser or [deploy to the web](WEB_DEPLOYMENT.md)!

**Unity Version:**
Available for Windows, macOS, Linux - see [Setup Instructions](#setup-instructions) below

## Story

You play as **Hope**, a young girl lost in a mysterious abyss filled with dangers. She must navigate through hostile enemies and deadly hazards while searching for safe zones - sanctuaries of peace where she can rest and recover. Every moment of safety she finds brings her closer to her goal, earning points that represent her courage and determination to survive.

As Hope descends deeper into the abyss, enemies become more aggressive, and her hope begins to fade. Finding safe zones restores her spirit and rewards her perseverance. How long can she survive? How many sanctuaries can she discover?

## Game Concept

ABYSS is a survival game where players must balance exploration with self-preservation. As the player descends into the mysterious void, enemy spheres become aggressive and chase them. The goal is to find safe zones, earn points by surviving, and maintain hope while navigating through increasingly dangerous territory.

## Game Mechanics

### Character System (PlayerCharacter Script)
- **Hope Mechanic**: The protagonist has a "Hope" meter (0-100%) that drains in dangerous areas and recovers in safe zones
- **Movement**: WASD controls with sprint ability (Shift or when near danger)
- **Emotional States**: The character reacts to her environment - calm in safety, afraid near danger, desperate when hope is low
- **Death Condition**: When hope reaches zero, the journey ends and the level restarts
- **Survival Tracking**: Time survived is tracked and contributes to scoring

### Safe Zone System (SafeZone Script)
- **Sanctuary Discovery**: Finding a safe zone awards substantial points (100 base points)
- **Rest Bonus**: Staying in safe zones awards bonus points per second (10 pts/sec)
- **Hope Recovery**: Hope regenerates quickly in safe zones (15% per second)
- **Peaceful Havens**: Multiple safe zones can exist, each with unique names and rewards
- **Visual Feedback**: Safe zones glow with a gentle pulsing effect

### Scoring System (GameProgress Script)
- **Point Sources**: Earn points by finding safe zones, surviving over time, and resting in sanctuaries
- **High Score Tracking**: Best score is saved and persists between sessions
- **Milestones**: Unlock achievements like "Glimmer of Hope" (first safe zone) and "Legend of the Abyss" (10,000 points)
- **Statistics**: Tracks safe zones found, total deaths, and longest survival time
- **Progressive Rewards**: Every 10 seconds of survival awards bonus points

### Enemy Behavior (SPHIRE Script)
- **Random Movement**: Enemy spheres move in unpredictable patterns, changing direction every 4 seconds
- **Chase Mechanic**: When the player descends below Y=10, enemies become aggressive and chase the player
- **Smart Following**: Enemies use smooth interpolation to follow the player, creating natural-looking pursuit
- **Stop Distance**: Enemies stop chasing when within 2 units to prevent jittering
- **Player Defense**: Players can temporarily freeze enemy movement using the Fire2 button (right mouse/secondary fire)

### Death Spheres (Shere Script)
- **Instant Death**: Contact with death spheres (within 1 unit) restarts the level
- **Warning System**: When within 3 units, players receive proximity warnings
- **Respawn Delay**: Brief delay before level restart for dramatic effect
- **Visual Indicators**: Gizmos in Unity Editor show danger and warning zones

## Scripts Documentation

### PlayerCharacter - The Young Girl Protagonist

**Location**: `/PlayerCharacter`

**Purpose**: Controls the main character, Hope, as she navigates through the abyss searching for safety and peace.

**Key Variables** (configurable in Unity Inspector):
- `characterName` ("Hope"): The girl's name
- `currentHope` / `maxHope` (100): Hope meter that affects survival
- `hopeDecayRate` (2.0): Hope lost per second in danger
- `hopeRecoveryRate` (10.0): Hope gained per second in safe zones
- `moveSpeed` (5.0): Normal walking speed
- `sprintSpeed` (8.0): Running speed when afraid or sprinting
- `fearDistance` (5.0): Distance to threats that triggers fear

**Functions**:
- `Start()`: Initializes character and finds GameProgress system
- `Update()`: Handles movement, hope updates, and emotional states
- `HandleMovement()`: Processes player input and movement
- `UpdateHope()`: Manages hope meter based on environment
- `CheckForDanger()`: Detects nearby threats and triggers fear
- `EnterSafeZone()` / `ExitSafeZone()`: Handles safe zone interactions
- `OnHopeLost()`: Triggers when hope reaches zero
- `OnGUI()`: Displays HUD with hope, status, and score

**Tags Required**: Death spheres should be tagged "DeathSphere", enemies tagged "Enemy"

### SafeZone - Peaceful Sanctuary

**Location**: `/SafeZone`

**Purpose**: Creates havens of peace where the player can rest, recover hope, and earn points.

**Key Variables** (configurable in Unity Inspector):
- `zoneName` ("Sanctuary"): Name of this safe zone
- `pointsAwarded` (100): Points given upon entering
- `bonusPerSecond` (10): Bonus points per second of rest
- `maxBonusTime` (10.0): Maximum seconds to earn bonuses
- `healingRate` (15.0): Hope recovery rate in this zone
- `zoneColor` (Green): Visual color for the zone
- `glowIntensity` (0.5): How bright the zone glows
- `pulseSpeed` (1.0): Speed of pulsing visual effect

**Functions**:
- `Start()`: Initializes zone and sets up trigger collider
- `Update()`: Awards bonus points and handles visual pulsing
- `OnTriggerEnter()` / `OnTriggerExit()`: Detects player entry/exit
- `OnPlayerEnter()`: Awards points and notifies player character
- `OnPlayerExit()`: Logs departure and total bonuses earned
- `OnDrawGizmos()`: Visualizes safe zone boundaries in editor

**Setup**: Automatically creates a trigger collider if none exists

### GameProgress - Scoring and Achievement System

**Location**: `/GameProgress`

**Purpose**: Tracks player progress, scores, achievements, and statistics across sessions.

**Key Variables** (configurable in Unity Inspector):
- `safeZoneMultiplier` (1.0): Multiplier for safe zone points
- `survivalMultiplier` (1.0): Multiplier for survival points
- `difficultyMultiplier` (1.0): Overall difficulty multiplier

**Functions**:
- `Awake()`: Initializes milestones and loads saved progress
- `Start()`: Begins survival time tracking
- `AddPoints()`: Awards points and checks for milestones
- `UpdateSurvivalTime()`: Tracks time and awards survival bonuses
- `IncrementSafeZonesFound()`: Records safe zone discoveries
- `RecordDeath()`: Logs death and resets session
- `SaveProgress()` / `LoadProgress()`: Persists data using PlayerPrefs
- `CheckMilestones()`: Unlocks achievements when conditions are met
- `OnGUI()`: Displays score, high score, and statistics

**Persistence**: Saves high score, total points, safe zones, deaths, and best survival time

**Milestones**:
- First Steps (0 pts) - Begin the journey
- Glimmer of Hope (100 pts) - Reach first safe zone
- Determined (500 pts)
- Survivor (1000 pts)
- Haven Seeker - Find 3 safe zones
- Courageous (2500 pts)
- Beacon of Hope (5000 pts)
- Legend of the Abyss (10000 pts)

### PlayerPos - Position Tracker

**Location**: `/PlayerPos`

**Purpose**: Tracks and exposes player position for enemies and hazards to reference.

**Key Variables**:
- `PlayerP` (Vector3): Current player position
- `updateRate` (0.1): How often to update position

**Functions**:
- `Update()`: Updates position at specified rate
- `LateUpdate()`: Ensures most recent position
- `GetPosition()`: Returns current position
- `GetHeight()`: Returns Y position
- `GetDistanceTo()`: Calculates distance to target

### SPHIRE - Sphere Enemy Controller

**Location**: `/SPHIRE`

**Purpose**: Controls enemy sphere AI that hunts the player as they descend into the abyss.

**Key Variables** (configurable in Unity Inspector):
- `chaseSpeed` (0.01): Speed multiplier for chasing player
- `randomMovementSpeed` (0.1): Speed of random movement patterns
- `chaseHeightThreshold` (10): Y position below which enemies chase
- `stopDistance` (2.0): Minimum distance maintained from player

**Functions**:
- `Start()`: Initializes player reference and starts random movement
- `RandomMovement()`: Generates new random movement vector every 4 seconds
- `Update()`: Handles chase logic and movement updates
- `OnDrawGizmosSelected()`: Visualizes chase range in editor

### Shere - Death Sphere Hazard

**Location**: `/Shere`

**Purpose**: Creates deadly environmental hazards that kill the player on contact.

**Key Variables** (configurable in Unity Inspector):
- `deathDistance` (1.0): Kill radius around sphere
- `warningDistance` (3.0): Distance at which warnings appear
- `respawnDelay` (0.5): Seconds before level restarts after death
- `showWarning` (true): Enable/disable proximity warnings
- `player`: Reference to player GameObject

**Functions**:
- `Start()`: Finds player and initializes death sphere
- `Update()`: Monitors distance and triggers death/warnings
- `KillPlayer()`: Handles death logic and restart timer
- `RestartLevel()`: Reloads the current level
- `OnDrawGizmos()`: Visualizes danger zones in editor

## Code Improvements Made

### Version 2.0 - Character System & Narrative (Latest)

#### 1. Added Complete Character System
- **PlayerCharacter Script**: Created protagonist "Hope" with movement, emotional states, and hope mechanic
- **Meaningful Gameplay**: Hope meter creates tension - drains in danger, recovers in safety
- **Player Agency**: WASD movement, sprint ability, fear responses to nearby threats
- **Death Condition**: Running out of hope creates meaningful failure state beyond instant death

#### 2. Implemented Safe Zone & Scoring System
- **SafeZone Script**: Peaceful sanctuaries that reward exploration and survival
- **Point System**: Entry points (100), rest bonuses (10/sec), survival rewards (every 10 sec)
- **GameProgress Script**: Comprehensive tracking of scores, achievements, and statistics
- **Persistence**: High scores and progress saved between sessions using PlayerPrefs
- **Milestones**: 8 achievements ranging from "First Steps" to "Legend of the Abyss"

#### 3. Added Narrative Depth
- **Story Context**: Young girl's journey to find peace and safety
- **Emotional Resonance**: Hope mechanic represents mental/emotional state
- **Meaningful Goals**: Safe zones represent moments of peace in a hostile world
- **Character Identity**: Named protagonist with personality and purpose

#### 4. Enhanced Player Feedback
- **HUD System**: Displays hope percentage, status (Safe/Danger/Exploring), and score
- **Visual Indicators**: Gizmo visualization for fear radius and hope level
- **Debug Messages**: Contextual logging for player actions and state changes
- **Statistics Display**: Score, high score, safe zones found, and survival time

#### 5. Improved Game Architecture
- **PlayerPos Script**: Helper script for position tracking used by enemies
- **Modular Design**: Separate scripts for character, zones, and progress tracking
- **Tag System**: Proper use of tags for "Player", "Enemy", and "DeathSphere"
- **Auto-Setup**: Scripts automatically add required components (CharacterController, colliders)

### Version 1.0 - Core Improvements

#### 1. Fixed Critical Bug
- **Issue**: SPHIRE called `InvokeRepeating("moving", 2, 4)` but the `moving` function didn't exist
- **Fix**: Created `RandomMovement()` function that generates unpredictable movement patterns

#### 2. Enhanced Code Quality
- Added comprehensive comments explaining game mechanics
- Removed unused variables (x, myTransform, startPosition from Shere)
- Improved variable naming (pp → playerPosScript, movx/movz → currentMovementX/Z)
- Replaced magic numbers with named, configurable variables

#### 3. Added Error Handling
- Null checks for player references in both scripts
- Debug logging for initialization and errors
- Prevention of multiple death triggers

#### 4. Improved Game Feel
- Added warning system for death spheres
- Implemented respawn delay for dramatic effect
- Added stop distance to prevent chase jittering
- Enhanced chase behavior with better interpolation

#### 5. Developer Experience
- Added Gizmo visualization for debug ranges
- Comprehensive inline documentation
- Clear function separation and organization
- TODO markers for future enhancements

## Setup Instructions

### Basic Setup
1. Create a GameObject named "Player" for the protagonist
2. Attach `PlayerCharacter` and `PlayerPos` scripts to the Player GameObject
3. Add a CharacterController component to the Player (or it will be added automatically)
4. Tag the Player GameObject as "Player"

### Safe Zones
1. Create empty GameObjects where you want safe zones
2. Attach the `SafeZone` script to each
3. Configure zone names and point values in the Inspector
4. Trigger colliders will be added automatically

### Game Progress Tracking
1. Create an empty GameObject named "GameProgress"
2. Attach the `GameProgress` script to it
3. This object persists between scenes and tracks all progress

### Enemies and Hazards
1. Create sphere GameObjects for enemies
2. Attach `SPHIRE` script to enemy spheres
3. Tag enemy objects as "Enemy"
4. Create sphere GameObjects for death hazards
5. Attach `Shere` script to death sphere GameObjects
6. Tag death spheres as "DeathSphere"

### Input Configuration
- Ensure Input Manager has these axes configured:
  - "Horizontal" and "Vertical" for movement (WASD/Arrow keys)
  - "Fire2" for defensive ability (right mouse button)
  - "Fire3" for sprint (left shift)

### Optional Enhancements
- Add visual models for Hope (the young girl character)
- Create glowing materials for safe zones
- Add particle effects for safe zone discovery
- Implement audio cues for hope levels and safe zone entry

## Future Enhancements

### Suggested Improvements:

1. **Visual Polish**
   - 3D model for Hope (the young girl) with animations
   - Screen effects when hope is low (vignette, desaturation)
   - Particle effects for safe zone entry (gentle light, flowers)
   - Glowing aura around safe zones
   - Visual representation of fear state (screen shake, distortion)

2. **Audio System**
   - Peaceful ambient music in safe zones
   - Tense music when enemies are near
   - Heartbeat sound when hope is low
   - Achievement unlock sounds
   - Footstep sounds that change with emotional state

3. **Expanded Safe Zone Types**
   - Ancient shrines with unique visual themes
   - Temporary safe zones that disappear after use
   - Hidden sanctuaries that award bonus points
   - Safe zones that unlock story fragments

4. **Story & Narrative**
   - Collectible memory fragments that reveal Hope's backstory
   - Environmental storytelling through level design
   - Multiple endings based on points/safe zones found
   - NPC spirits that offer guidance in safe zones

5. **Advanced Gameplay**
   - Multiple enemy types with different behaviors
   - Power-ups: temporary invincibility, speed boost, hope surge
   - Environmental puzzles to unlock safe zones
   - Progressive difficulty as player descends deeper
   - Skill tree for Hope's abilities

6. **Meta-Progression**
   - Unlockable character customization
   - Permanent upgrades purchased with earned points
   - New game+ mode with increased difficulty
   - Leaderboards for competitive players

7. **Level Design**
   - Procedurally generated abyss layouts
   - Hand-crafted story levels
   - Multiple biomes with unique themes
   - Secret areas with rare safe zones

## Web Version

ABYSS is now available as a browser-based game!

**Features:**
- ✅ Play instantly in any modern browser
- ✅ No downloads or installation required
- ✅ Works on desktop, mobile, and tablets
- ✅ High score persistence via localStorage
- ✅ Full game experience with all mechanics
- ✅ Built with Three.js for smooth 3D graphics

**Quick Start:**
```bash
cd web/
python -m http.server 8000
# Open http://localhost:8000
```

**Deploy to Web:**
See [WEB_DEPLOYMENT.md](WEB_DEPLOYMENT.md) for GitHub Pages, Netlify, Vercel, and itch.io deployment guides.

**Web Version Location:** `/web/`

## Technical Notes

### Unity Version
- Written in UnityScript (JavaScript for Unity)
- Uses `#pragma strict` for type safety
- Compatible with older Unity versions
- Note: `Application.LoadLevel` is deprecated in Unity 5.3+
  - Consider migrating to `SceneManager.LoadScene()` for newer Unity versions
- **WebGL Build:** UnityScript not supported - see [UNITY_WEBGL_BUILD.md](UNITY_WEBGL_BUILD.md)

### Web Version
- Built with Three.js r128 for 3D rendering
- Vanilla JavaScript (ES6+)
- No build process required
- ~100KB total file size
- Runs at 60 FPS on modern browsers
- See [web/README.md](web/README.md) for details

## Requirements

- Unity 4.x or higher (or Unity 5.3+ with deprecated API support)
- Player GameObject with PlayerPos component
- Input system configured with "Fire2" button

## License

[Add your license here]

## Credits

Game Code: ABYSS
Code Improvements: 2025 Revision
