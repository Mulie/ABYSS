# ABYSS - Testing Guide

This guide will help you test and verify all game systems work correctly.

## Quick Start Test Scene Setup

### Step 1: Create Basic Scene (5 minutes)

1. **Create New Scene** in Unity
   - File → New Scene
   - Save as "TestAbyss"

2. **Add Directional Light** (if not present)
   - GameObject → Light → Directional Light

3. **Create Ground Plane**
   - GameObject → 3D Object → Plane
   - Scale to (10, 1, 10)
   - Position at (0, 0, 0)

### Step 2: Set Up Player (3 minutes)

1. **Create Player GameObject**
   - GameObject → Create Empty
   - Name it "Player"
   - Add Tag "Player" (Edit Tags if needed)
   - Position at (0, 2, 0)

2. **Add PlayerCharacter Script**
   - Drag `PlayerCharacter` script onto Player
   - Drag `PlayerPos` script onto Player

3. **Add Visual Representation** (optional but helpful)
   - Create child object: GameObject → 3D Object → Capsule
   - Remove CapsuleCollider from child (Controller handles collision)
   - Scale capsule to (0.5, 1, 0.5)

### Step 3: Set Up Game Progress (1 minute)

1. **Create GameProgress GameObject**
   - GameObject → Create Empty
   - Name it "GameProgress"
   - Drag `GameProgress` script onto it

### Step 4: Create a Safe Zone (2 minutes)

1. **Create Safe Zone**
   - GameObject → 3D Object → Sphere
   - Name it "SafeZone_Sanctuary"
   - Position at (5, 1, 0)
   - Scale to (3, 3, 3)

2. **Configure Safe Zone**
   - Drag `SafeZone` script onto it
   - Remove SphereCollider (script adds trigger automatically)
   - In Inspector, set:
     - Zone Name: "Sanctuary"
     - Points Awarded: 100
     - Zone Color: Green

3. **Add Visual Material** (optional)
   - Create green material
   - Set Rendering Mode to Transparent
   - Apply to sphere

### Step 5: Create Enemies (3 minutes)

1. **Create Enemy Sphere**
   - GameObject → 3D Object → Sphere
   - Name it "Enemy_Chaser"
   - Position at (-5, 1, 0)
   - Tag as "Enemy"

2. **Configure Enemy**
   - Drag `SPHIRE` script onto it
   - Create red material and apply

3. **Duplicate** for more enemies (Ctrl+D)
   - Place at various positions

### Step 6: Create Death Spheres (2 minutes)

1. **Create Death Sphere**
   - GameObject → 3D Object → Sphere
   - Name it "DeathSphere_1"
   - Position at (0, 1, 5)
   - Tag as "DeathSphere"
   - Scale to (2, 2, 2)

2. **Configure Death Sphere**
   - Drag `Shere` script onto it
   - Create dark red/black material and apply

### Step 7: Verify Input Settings (1 minute)

1. **Open Input Manager**
   - Edit → Project Settings → Input

2. **Verify these axes exist:**
   - Horizontal (A/D, Left/Right arrows)
   - Vertical (W/S, Up/Down arrows)
   - Fire2 (Right mouse button)
   - Fire3 (Left Shift) - If missing, duplicate an axis and configure

## Testing Checklist

### ✓ Basic Movement Test
- [ ] Press Play
- [ ] Use WASD/Arrow keys to move
- [ ] Player moves smoothly
- [ ] Player rotates in movement direction
- [ ] Hold Shift to sprint (faster movement)

### ✓ Hope System Test
- [ ] Check console: "Hope begins her journey..."
- [ ] Watch top-left HUD: Hope percentage starts at 100%
- [ ] Hope slowly decreases over time
- [ ] Status shows "Exploring"

### ✓ Safe Zone Test
- [ ] Move player toward green sphere
- [ ] Upon entering:
   - [ ] Console: "The girl has found Sanctuary!"
   - [ ] Console: "A moment of peace at last... (+100 points)"
   - [ ] HUD shows "SAFE - Finding Peace"
   - [ ] Hope starts increasing
   - [ ] Points awarded: 100
   - [ ] Every second: +10 points bonus

- [ ] Stay in zone 10+ seconds
   - [ ] Bonus stops after 10 seconds
   - [ ] Hope reaches 100%

- [ ] Leave safe zone
   - [ ] Console: "Leaving Sanctuary after X seconds"
   - [ ] Status changes to "Exploring"
   - [ ] Hope starts decreasing again

### ✓ Enemy System Test
- [ ] Move player below Y=10 (descend if you have terrain)
- [ ] Enemy spheres should start chasing
- [ ] Enemies move randomly every 4 seconds
- [ ] When enemies get within 5 units:
   - [ ] Player status changes to "DANGER - Running!"
   - [ ] Player automatically sprints (faster)
   - [ ] Hope drains faster

- [ ] Press Right Mouse Button (Fire2)
   - [ ] Enemies freeze temporarily

### ✓ Death Sphere Test
- [ ] Move within 3 units of death sphere
   - [ ] Console warning: "DANGER! Player approaching death sphere"

- [ ] Touch death sphere (within 1 unit)
   - [ ] Level restarts after 0.5 seconds

### ✓ Hope Depletion Test
- [ ] Let hope drain to 0% (stay away from safe zones)
- [ ] When hope reaches 0:
   - [ ] Console: "Hope's hope has faded completely..."
   - [ ] Movement stops
   - [ ] Level restarts after 3 seconds
   - [ ] Death recorded in statistics

### ✓ Scoring System Test
- [ ] Check top-right HUD:
   - [ ] Score increases
   - [ ] High Score tracked
   - [ ] Safe Zones count
   - [ ] Time format: MM:SS

- [ ] Every 10 seconds: +10 survival points
- [ ] Safe zone entry: +100 points
- [ ] Safe zone rest: +10 points/second

### ✓ Milestone Test
- [ ] Reach 100 points:
   - [ ] Console: "MILESTONE ACHIEVED! Glimmer of Hope"

- [ ] Find 3 safe zones (create more if needed):
   - [ ] Console: "MILESTONE ACHIEVED! Haven Seeker"

- [ ] Reach 500 points:
   - [ ] Console: "MILESTONE ACHIEVED! Determined"

### ✓ Persistence Test
- [ ] Play game and earn points
- [ ] Note your high score
- [ ] Stop play mode
- [ ] Play again
- [ ] Check: High score is preserved

### ✓ Gizmo Visualization Test (in Scene View)
- [ ] Select Player:
   - [ ] Orange wire sphere (fear radius)
   - [ ] Colored sphere above head (hope indicator)
     - Green: > 60% hope
     - Yellow: 30-60% hope
     - Red: < 30% hope

- [ ] Select Safe Zone:
   - [ ] Green filled sphere (safe area)
   - [ ] When selected: double wire sphere

- [ ] Select Enemy:
   - [ ] Red wire sphere (stop distance)

- [ ] Select Death Sphere:
   - [ ] Red filled sphere (death radius)
   - [ ] Yellow wire sphere (warning radius)

## Common Issues and Solutions

### Issue: Player falls through ground
**Solution:**
- Ensure Plane has MeshCollider or BoxCollider
- CharacterController needs to be above ground
- Check Player Y position is > 1

### Issue: Safe zone not detecting player
**Solution:**
- Verify Player has tag "Player"
- Check SafeZone has trigger collider (auto-added)
- Ensure player CharacterController is present

### Issue: Enemies not chasing
**Solution:**
- Player must be below Y=10
- Check enemies have "Enemy" tag
- Verify enemies have SPHIRE script attached
- Check Player has PlayerPos component

### Issue: Hope not decreasing
**Solution:**
- Verify you're not in a safe zone
- Check PlayerCharacter script is attached
- Look for errors in console

### Issue: "Fire3 not defined" error
**Solution:**
- Open Edit → Project Settings → Input
- Duplicate "Fire1" axis
- Rename to "Fire3"
- Set Positive Button to "left shift"

### Issue: Multiple GameProgress objects
**Solution:**
- Delete extra GameProgress objects
- Keep only one
- Singleton pattern prevents duplicates

### Issue: No HUD showing
**Solution:**
- Check OnGUI() is not being overridden
- Verify GameProgress script is on "GameProgress" object
- Look for errors in console

## Performance Tips

1. **Too Many FindGameObjectsWithTag Calls**
   - Cache references in Start() when possible
   - Current implementation is fine for small test scenes

2. **Gizmos in Build**
   - Gizmos only show in Editor, not in builds
   - No performance impact on final game

3. **Update vs FixedUpdate**
   - CharacterController uses Update (correct)
   - Physics-based movement should use FixedUpdate

## Next Steps After Testing

Once all tests pass:

1. **Create More Content**
   - Add 5-10 safe zones with different names
   - Create varied enemy placements
   - Design interesting level geometry

2. **Add Visual Polish**
   - Import or create character model
   - Add particle effects for safe zones
   - Create glowing materials

3. **Add Audio**
   - Peaceful music for safe zones
   - Tense music for danger
   - Sound effects for milestones

4. **Level Design**
   - Create descending path into abyss
   - Place safe zones at intervals
   - Balance difficulty curve

## Debug Commands (Add to TestHelper script)

See `TestHelper` script for debug keyboard shortcuts:
- **H**: Add 100 hope
- **P**: Add 100 points
- **K**: Reduce hope to 1 (test death)
- **S**: Teleport to nearest safe zone
- **R**: Reset all progress

## Questions?

If something doesn't work:
1. Check Console for error messages
2. Verify all tags are set correctly
3. Ensure all scripts are attached
4. Check this guide's troubleshooting section

Happy testing! 🎮
