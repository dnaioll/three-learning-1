import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

//criando o renderer (responsavel por desenhar a cena no navegador)
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
//criando a camera (responsavel por observar a cena)
const fov = 75;
const aspect = w/h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
//criando a cena
const scene = new THREE.Scene();

//criando controles 
const controls = new OrbitControls(camera, renderer.domElement);
//ativando amortecimento para suavizar movimentos da camera
controls.enableDamping = true;
controls.dampingFactor = 0.03;

//cria um objeto (geometria, material e mescla os dois)
const geo = new THREE.IcosahedronGeometry(1.0, 2);
const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true
});
const mesh = new THREE.Mesh(geo, mat);
//adiciona o objeto na cena
scene.add(mesh);

//criando novo objeto reciclando a geometria do anterior
const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
});
const wireMesh = new THREE.Mesh (geo, wireMat);
wireMesh.scale.setScalar(1.001);
//adiciona wireframe como filho do objeto inicial (mesh)
mesh.add(wireMesh);

//criando uma luz hemisferica para iluminar a cena
const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
scene.add(hemiLight)

//criando o loop de animação
function animate(t = 0) {
    requestAnimationFrame(animate);
    //mesh.rotation.y = t * 0.0001;
    renderer.render(scene, camera);
    controls.update();
}

animate();