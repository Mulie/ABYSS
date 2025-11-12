# ABYSS

A Unity survival game where players must navigate through a dangerous abyss while avoiding deadly spheres and hostile enemies.

## Game Concept

In ABYSS, players descend into a mysterious void filled with dangerous spheres. As they go deeper (lower Y position), enemy spheres become aggressive and chase them. The goal is to survive and explore the abyss while avoiding instant-death hazards.

## Game Mechanics

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

### 1. Fixed Critical Bug
- **Issue**: SPHIRE called `InvokeRepeating("moving", 2, 4)` but the `moving` function didn't exist
- **Fix**: Created `RandomMovement()` function that generates unpredictable movement patterns

### 2. Enhanced Code Quality
- Added comprehensive comments explaining game mechanics
- Removed unused variables (x, myTransform, startPosition from Shere)
- Improved variable naming (pp → playerPosScript, movx/movz → currentMovementX/Z)
- Replaced magic numbers with named, configurable variables

### 3. Added Error Handling
- Null checks for player references in both scripts
- Debug logging for initialization and errors
- Prevention of multiple death triggers

### 4. Improved Game Feel
- Added warning system for death spheres
- Implemented respawn delay for dramatic effect
- Added stop distance to prevent chase jittering
- Enhanced chase behavior with better interpolation

### 5. Developer Experience
- Added Gizmo visualization for debug ranges
- Comprehensive inline documentation
- Clear function separation and organization
- TODO markers for future enhancements

## Setup Instructions

1. Attach the `SPHIRE` script to enemy sphere GameObjects
2. Attach the `Shere` script to death sphere GameObjects
3. Ensure your player GameObject is named "Player" or assign it manually in inspector
4. Ensure player has a `PlayerPos` component with a `PlayerP` Vector3 property
5. Configure variables in Unity Inspector to tune gameplay

## Future Enhancements

### Suggested Improvements:
1. **Visual/Audio Feedback**
   - Screen flash when near death spheres
   - Warning sounds for proximity alerts
   - Death animation/sound effects

2. **Scoring System**
   - Track survival time
   - Award points for depth reached
   - High score persistence

3. **Multiple Enemy Types**
   - Fast but weak enemies
   - Slow but tanky enemies
   - Enemies with special abilities

4. **Power-ups**
   - Temporary invincibility
   - Speed boost
   - Enemy freeze

5. **Progressive Difficulty**
   - More enemies as player descends
   - Faster chase speeds at lower depths
   - Increasing number of death spheres

## Technical Notes

- Written in UnityScript (JavaScript for Unity)
- Uses `#pragma strict` for type safety
- Compatible with older Unity versions
- Note: `Application.LoadLevel` is deprecated in Unity 5.3+
  - Consider migrating to `SceneManager.LoadScene()` for newer Unity versions

## Requirements

- Unity 4.x or higher (or Unity 5.3+ with deprecated API support)
- Player GameObject with PlayerPos component
- Input system configured with "Fire2" button

## License

[Add your license here]

## Credits

Game Code: ABYSS
Code Improvements: 2025 Revision
