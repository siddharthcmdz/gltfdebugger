import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import Stats from 'three/examples/jsm/libs/stats.module'

const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer()
renderer.physicallyCorrectLights = true
renderer.shadowMap.enabled = true
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;

const consoleDiv = document.getElementById('console');
let ctexnode : Text = new Text("");
if(consoleDiv){
    ctexnode = document.createTextNode("");
    consoleDiv.appendChild(ctexnode);  
}
ctexnode.nodeValue = "Some blah"


const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/js/libs/draco/');

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

let constr : string = '';
loader.load(
    'models/monkey.glb',
    function (gltf : GLTF) {
            scene.add(gltf.scene)
            gltf.scene.traverse((child)=>{
                console.log(child);
                consoleDiv?.append(document.createTextNode(child.type))
                consoleDiv?.append(document.createElement('br'));
                if((child as THREE.Mesh).isMesh) {
                    const m = child as THREE.Mesh;
                    m.receiveShadow = true;
                    m.castShadow = true;
                    let material = m.material as THREE.MeshStandardMaterial;
                    console.log('mesh material: ', material);
                    material.onBeforeCompile = shader => {
                        console.log(shader.fragmentShader);
                    }
                }

                if((child as THREE.Light).isLight) {
                    const l = child as THREE.Light;
                    l.castShadow = true;
                    l.shadow.bias = -0.003;
                    l.shadow.mapSize.width = 2048;
                    l.shadow.mapSize.height = 2048;
                }
            })
        },
        (xhr) => {
            console.log(xhr.loaded / xhr.total * 100 + '% loaded')
        },
        (error) => {error}
);

ctexnode.nodeValue = constr;

window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

// const stats = Stats()
// document.body.appendChild(stats.dom)

function animate() {
    requestAnimationFrame(animate)
    controls.update()
    render()

    // stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()

