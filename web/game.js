// ABYSS - Web Version
// A narrative-driven survival game about hope and perseverance

// Game State
const game = {
    scene: null,
    camera: null,
    renderer: null,
    player: null,
    enemies: [],
    deathSpheres: [],
    safeZones: [],

    // Player state
    hope: 100,
    maxHope: 100,
    hopeDecayRate: 2, // per second
    hopeRecoveryRate: 10, // per second in safe zones
    isSafe: false,
    isAfraid: false,
    isDead: false,

    // Scoring
    score: 0,
    highScore: parseInt(localStorage.getItem('abyss_highScore') || '0'),
    safeZonesFound: 0,
    safeZonesDiscovered: new Set(),

    // Time
    survivalTime: 0,
    startTime: 0,
    lastFrameTime: 0,

    // Movement
    moveSpeed: 5,
    sprintSpeed: 8,
    playerVelocity: new THREE.Vector3(),
    keys: {},
    mouse: { x: 0, y: 0 },

    // Settings
    fearDistance: 5,
    isRunning: false
};

// Milestones
const milestones = [
    { name: "First Steps", points: 0, achieved: false },
    { name: "Glimmer of Hope", points: 100, achieved: false },
    { name: "Determined", points: 500, achieved: false },
    { name: "Survivor", points: 1000, achieved: false },
    { name: "Courageous", points: 2500, achieved: false },
    { name: "Beacon of Hope", points: 5000, achieved: false },
    { name: "Legend of the Abyss", points: 10000, achieved: false }
];

// Initialize Three.js
function init() {
    const canvas = document.getElementById('gameCanvas');
    const container = document.getElementById('gameContainer');

    // Scene
    game.scene = new THREE.Scene();
    game.scene.fog = new THREE.Fog(0x0a0a0a, 10, 50);
    game.scene.background = new THREE.Color(0x0a0a0a);

    // Camera
    game.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    // Renderer
    game.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    game.renderer.setSize(window.innerWidth, window.innerHeight);
    game.renderer.shadowMap.enabled = true;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    game.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    game.scene.add(directionalLight);

    // Create world
    createGround();
    createPlayer();
    createSafeZones();
    createEnemies();
    createDeathSpheres();

    // Event listeners
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    document.addEventListener('mousemove', onMouseMove);

    // Update HUD
    updateHUD();
}

function createGround() {
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        roughness: 0.8
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    game.scene.add(ground);

    // Add grid for depth perception
    const gridHelper = new THREE.GridHelper(100, 50, 0x333333, 0x222222);
    game.scene.add(gridHelper);
}

function createPlayer() {
    // Player is a capsule (cylinder + sphere)
    const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.3, 1.2, 8);
    const headGeometry = new THREE.SphereGeometry(0.25, 8, 8);

    const material = new THREE.MeshStandardMaterial({
        color: 0x60a5fa,
        emissive: 0x3b82f6,
        emissiveIntensity: 0.2
    });

    game.player = new THREE.Group();

    const body = new THREE.Mesh(bodyGeometry, material);
    body.position.y = 0.6;
    body.castShadow = true;

    const head = new THREE.Mesh(headGeometry, material);
    head.position.y = 1.4;
    head.castShadow = true;

    game.player.add(body);
    game.player.add(head);
    game.player.position.set(0, 0, 0);

    game.scene.add(game.player);

    // Camera follows player
    game.camera.position.set(0, 5, 8);
    game.camera.lookAt(game.player.position);
}

function createSafeZones() {
    const zones = [
        { name: "Sanctuary", pos: [8, 0.5, 8], color: 0x22c55e },
        { name: "Garden of Peace", pos: [-10, 0.5, 5], color: 0x10b981 },
        { name: "Haven", pos: [5, 0.5, -12], color: 0x059669 },
        { name: "Refuge", pos: [-8, 0.5, -8], color: 0x14b8a6 }
    ];

    zones.forEach(zoneData => {
        const geometry = new THREE.SphereGeometry(3, 16, 16);
        const material = new THREE.MeshStandardMaterial({
            color: zoneData.color,
            emissive: zoneData.color,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.6
        });

        const zone = new THREE.Mesh(geometry, material);
        zone.position.set(...zoneData.pos);
        zone.userData = {
            type: 'safeZone',
            name: zoneData.name,
            pointsAwarded: 100,
            bonusPerSecond: 10,
            discovered: false,
            playerInside: false,
            timeInZone: 0
        };

        game.safeZones.push(zone);
        game.scene.add(zone);

        // Pulsing animation
        zone.userData.pulsePhase = Math.random() * Math.PI * 2;
    });
}

function createEnemies() {
    const enemyPositions = [
        [-5, 0.5, 0],
        [5, 0.5, -5],
        [-8, 0.5, 3],
        [0, 0.5, -8]
    ];

    enemyPositions.forEach(pos => {
        const geometry = new THREE.SphereGeometry(0.5, 16, 16);
        const material = new THREE.MeshStandardMaterial({
            color: 0xef4444,
            emissive: 0xdc2626,
            emissiveIntensity: 0.5
        });

        const enemy = new THREE.Mesh(geometry, material);
        enemy.position.set(...pos);
        enemy.castShadow = true;

        enemy.userData = {
            type: 'enemy',
            velocity: new THREE.Vector3(
                Math.random() - 0.5,
                0,
                Math.random() - 0.5
            ).normalize().multiplyScalar(0.1),
            changeDirectionTimer: 0
        };

        game.enemies.push(enemy);
        game.scene.add(enemy);
    });
}

function createDeathSpheres() {
    const deathPositions = [
        [0, 1, 5],
        [12, 1, 0],
        [-12, 1, -3]
    ];

    deathPositions.forEach(pos => {
        const geometry = new THREE.SphereGeometry(1, 16, 16);
        const material = new THREE.MeshStandardMaterial({
            color: 0x1a0000,
            emissive: 0x7f0000,
            emissiveIntensity: 0.8
        });

        const deathSphere = new THREE.Mesh(geometry, material);
        deathSphere.position.set(...pos);
        deathSphere.castShadow = true;

        deathSphere.userData = {
            type: 'deathSphere',
            deathDistance: 1.5,
            warningDistance: 4
        };

        game.deathSpheres.push(deathSphere);
        game.scene.add(deathSphere);
    });
}

// Game loop
function animate(currentTime) {
    if (!game.isRunning || game.isDead) {
        requestAnimationFrame(animate);
        return;
    }

    const deltaTime = game.lastFrameTime ? (currentTime - game.lastFrameTime) / 1000 : 0;
    game.lastFrameTime = currentTime;
    game.survivalTime = (currentTime - game.startTime) / 1000;

    // Update player
    updatePlayer(deltaTime);

    // Update enemies
    updateEnemies(deltaTime);

    // Update safe zones
    updateSafeZones(deltaTime);

    // Check death spheres
    checkDeathSpheres();

    // Update hope
    updateHope(deltaTime);

    // Check danger
    checkDanger();

    // Award survival points
    if (Math.floor(game.survivalTime) % 10 === 0 && Math.floor(game.survivalTime) > 0) {
        if (!game.lastSurvivalAward || game.lastSurvivalAward !== Math.floor(game.survivalTime)) {
            addPoints(10, "Survived " + Math.floor(game.survivalTime) + "s");
            game.lastSurvivalAward = Math.floor(game.survivalTime);
        }
    }

    // Update camera
    updateCamera();

    // Animate safe zones
    animateSafeZones(currentTime);

    // Update HUD
    updateHUD();

    // Render
    game.renderer.render(game.scene, game.camera);
    requestAnimationFrame(animate);
}

function updatePlayer(deltaTime) {
    const moveVector = new THREE.Vector3();
    const speed = (game.keys['Shift'] || game.isAfraid) ? game.sprintSpeed : game.moveSpeed;

    if (game.keys['w'] || game.keys['ArrowUp']) moveVector.z -= 1;
    if (game.keys['s'] || game.keys['ArrowDown']) moveVector.z += 1;
    if (game.keys['a'] || game.keys['ArrowLeft']) moveVector.x -= 1;
    if (game.keys['d'] || game.keys['ArrowRight']) moveVector.x += 1;

    if (moveVector.length() > 0) {
        moveVector.normalize();
        game.player.position.x += moveVector.x * speed * deltaTime;
        game.player.position.z += moveVector.z * speed * deltaTime;

        // Rotate player to face movement direction
        game.player.rotation.y = Math.atan2(moveVector.x, moveVector.z);
    }

    // Keep player on ground
    game.player.position.y = 0;

    // Boundary limits
    const limit = 45;
    game.player.position.x = Math.max(-limit, Math.min(limit, game.player.position.x));
    game.player.position.z = Math.max(-limit, Math.min(limit, game.player.position.z));
}

function updateEnemies(deltaTime) {
    game.enemies.forEach(enemy => {
        // Random movement
        enemy.userData.changeDirectionTimer += deltaTime;
        if (enemy.userData.changeDirectionTimer > 4) {
            enemy.userData.velocity = new THREE.Vector3(
                Math.random() - 0.5,
                0,
                Math.random() - 0.5
            ).normalize().multiplyScalar(0.1);
            enemy.userData.changeDirectionTimer = 0;
        }

        // Chase player
        const distanceToPlayer = enemy.position.distanceTo(game.player.position);
        if (distanceToPlayer > 2) {
            const direction = new THREE.Vector3()
                .subVectors(game.player.position, enemy.position)
                .normalize();

            enemy.position.x += (direction.x * 0.01 + enemy.userData.velocity.x) * deltaTime * 60;
            enemy.position.z += (direction.z * 0.01 + enemy.userData.velocity.z) * deltaTime * 60;
        }

        // Boundary limits
        const limit = 45;
        enemy.position.x = Math.max(-limit, Math.min(limit, enemy.position.x));
        enemy.position.z = Math.max(-limit, Math.min(limit, enemy.position.z));

        // Floating animation
        enemy.position.y = 0.5 + Math.sin(Date.now() * 0.002 + enemy.position.x) * 0.2;
    });
}

function updateSafeZones(deltaTime) {
    game.isSafe = false;

    game.safeZones.forEach(zone => {
        const distance = zone.position.distanceTo(game.player.position);
        const inZone = distance < 3;

        if (inZone) {
            game.isSafe = true;

            // First time discovery
            if (!zone.userData.discovered) {
                zone.userData.discovered = true;
                const zoneName = zone.userData.name;

                if (!game.safeZonesDiscovered.has(zoneName)) {
                    game.safeZonesDiscovered.add(zoneName);
                    game.safeZonesFound++;
                    addPoints(zone.userData.pointsAwarded, "Found " + zoneName + "!");
                    console.log("Discovered safe zone: " + zoneName);
                }
            }

            // Award bonus points
            if (!zone.userData.playerInside) {
                zone.userData.playerInside = true;
                zone.userData.timeInZone = 0;
            }

            zone.userData.timeInZone += deltaTime;

            // Bonus every second, up to 10 seconds
            if (zone.userData.timeInZone < 10) {
                const bonusInterval = Math.floor(zone.userData.timeInZone);
                if (!zone.userData.lastBonus || zone.userData.lastBonus !== bonusInterval) {
                    zone.userData.lastBonus = bonusInterval;
                    if (bonusInterval > 0) {
                        addPoints(zone.userData.bonusPerSecond, "Resting in " + zone.userData.name);
                    }
                }
            }
        } else {
            if (zone.userData.playerInside) {
                zone.userData.playerInside = false;
                console.log("Left " + zone.userData.name);
            }
        }
    });
}

function checkDeathSpheres() {
    game.deathSpheres.forEach(sphere => {
        const distance = sphere.position.distanceTo(game.player.position);

        if (distance < sphere.userData.deathDistance) {
            gameOver();
        }
    });
}

function updateHope(deltaTime) {
    if (game.isSafe) {
        game.hope = Math.min(game.hope + game.hopeRecoveryRate * deltaTime, game.maxHope);
    } else {
        game.hope = Math.max(game.hope - game.hopeDecayRate * deltaTime, 0);
    }

    if (game.hope <= 0 && !game.isDead) {
        gameOver();
    }
}

function checkDanger() {
    game.isAfraid = false;

    // Check enemies
    game.enemies.forEach(enemy => {
        if (enemy.position.distanceTo(game.player.position) < game.fearDistance) {
            game.isAfraid = true;
        }
    });

    // Check death spheres
    game.deathSpheres.forEach(sphere => {
        if (sphere.position.distanceTo(game.player.position) < sphere.userData.warningDistance) {
            game.isAfraid = true;
        }
    });
}

function updateCamera() {
    // Third-person camera
    const cameraOffset = new THREE.Vector3(0, 5, 8);
    const cameraPosition = game.player.position.clone().add(cameraOffset);

    game.camera.position.lerp(cameraPosition, 0.1);
    game.camera.lookAt(game.player.position.clone().add(new THREE.Vector3(0, 1, 0)));
}

function animateSafeZones(time) {
    game.safeZones.forEach(zone => {
        // Pulsing scale
        const pulse = 1 + Math.sin(time * 0.002 + zone.userData.pulsePhase) * 0.05;
        zone.scale.set(pulse, pulse, pulse);

        // Pulsing emissive intensity
        zone.material.emissiveIntensity = 0.4 + Math.sin(time * 0.003 + zone.userData.pulsePhase) * 0.2;
    });
}

// Scoring
function addPoints(points, reason) {
    game.score += points;
    console.log("+" + points + " points - " + reason + " (Total: " + game.score + ")");

    if (game.score > game.highScore) {
        game.highScore = game.score;
        localStorage.setItem('abyss_highScore', game.highScore.toString());
        console.log("NEW HIGH SCORE: " + game.highScore);
    }

    checkMilestones();
}

function checkMilestones() {
    milestones.forEach(milestone => {
        if (!milestone.achieved && game.score >= milestone.points) {
            milestone.achieved = true;
            showMilestone(milestone.name);
        }
    });
}

function showMilestone(name) {
    const notification = document.getElementById('milestoneNotification');
    notification.textContent = "🏆 " + name + "!";
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// HUD Updates
function updateHUD() {
    // Hope
    const hopePercent = Math.round((game.hope / game.maxHope) * 100);
    document.getElementById('hopePercent').textContent = hopePercent;

    const hopeFill = document.getElementById('hopeFill');
    hopeFill.style.width = hopePercent + '%';

    hopeFill.className = 'hope-fill';
    if (hopePercent < 30) hopeFill.classList.add('critical');
    else if (hopePercent < 60) hopeFill.classList.add('low');

    // Score
    document.getElementById('score').textContent = game.score;
    document.getElementById('highScore').textContent = game.highScore;
    document.getElementById('safeZones').textContent = game.safeZonesFound;

    // Status
    const statusEl = document.getElementById('status');
    if (game.isSafe) {
        statusEl.textContent = 'SAFE - Finding Peace';
        statusEl.className = 'status-text status-safe';
    } else if (game.isAfraid) {
        statusEl.textContent = 'DANGER - Running!';
        statusEl.className = 'status-text status-danger';
    } else {
        statusEl.textContent = 'Exploring';
        statusEl.className = 'status-text status-exploring';
    }
}

// Game flow
function startGame() {
    document.getElementById('startScreen').classList.add('hidden');
    game.isRunning = true;
    game.startTime = performance.now();
    game.lastFrameTime = game.startTime;
    init();
    animate(game.startTime);
}

function gameOver() {
    if (game.isDead) return;
    game.isDead = true;

    console.log("Game Over - Hope faded after " + game.survivalTime.toFixed(1) + " seconds");

    document.getElementById('survivalTime').textContent = game.survivalTime.toFixed(1);
    document.getElementById('finalScore').textContent = game.score;
    document.getElementById('finalSafeZones').textContent = game.safeZonesFound;

    setTimeout(() => {
        document.getElementById('gameOverScreen').classList.add('show');
    }, 1000);
}

function restartGame() {
    document.getElementById('gameOverScreen').classList.remove('show');

    // Reset game state
    game.hope = 100;
    game.score = 0;
    game.safeZonesFound = 0;
    game.safeZonesDiscovered.clear();
    game.survivalTime = 0;
    game.isDead = false;
    game.isSafe = false;
    game.isAfraid = false;

    // Reset player position
    game.player.position.set(0, 0, 0);

    // Reset safe zones
    game.safeZones.forEach(zone => {
        zone.userData.discovered = false;
        zone.userData.playerInside = false;
        zone.userData.timeInZone = 0;
        zone.userData.lastBonus = null;
    });

    // Reset milestones
    milestones.forEach(m => m.achieved = false);

    game.isRunning = true;
    game.startTime = performance.now();
    game.lastFrameTime = game.startTime;
}

// Event handlers
function onWindowResize() {
    game.camera.aspect = window.innerWidth / window.innerHeight;
    game.camera.updateProjectionMatrix();
    game.renderer.setSize(window.innerWidth, window.innerHeight);
}

function onKeyDown(event) {
    game.keys[event.key.toLowerCase()] = true;
}

function onKeyUp(event) {
    game.keys[event.key.toLowerCase()] = false;
}

function onMouseMove(event) {
    game.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    game.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

console.log("ABYSS - Web Version Loaded");
console.log("Guide Hope through the abyss to find safety and peace.");
