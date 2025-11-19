import * as THREE from "three";

// Cena
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;

// Render
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Objeto controlado
const playerGeometry = new THREE.BoxGeometry(1, 1, 1);
const playerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
scene.add(player);

// Objeto alvo
const targetGeometry = new THREE.BoxGeometry(1, 1, 1);
const targetMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const target = new THREE.Mesh(targetGeometry, targetMaterial);
target.position.y = 2;
scene.add(target);

// Controle
let speed = 0.05;
let moveUp = false;
let moveDown = false;

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") moveUp = true;
    if (e.key === "ArrowDown") moveDown = true;
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowUp") moveUp = false;
    if (e.key === "ArrowDown") moveDown = false;
});

// Função de colisão
const playerBox = new THREE.Box3();
const targetBox = new THREE.Box3();

function checkCollision() {
    playerBox.setFromObject(player);
    targetBox.setFromObject(target);
    return playerBox.intersectsBox(targetBox);
}

// Loop
function animate() {
    requestAnimationFrame(animate);

    if (moveUp) player.position.y += speed;
    if (moveDown) player.position.y -= speed;

    if (checkCollision()) {
        target.material.color.set(0x0000ff);
    }

    renderer.render(scene, camera);
}

animate();