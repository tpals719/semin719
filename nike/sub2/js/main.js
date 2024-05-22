import * as THREE from 'three';
import {GLTFLoader} from 'gltf'
import {OrbitControls} from 'orbit'

window.addEventListener('load', function () {
  init();
});
//랜더러
async function init() {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha:true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);
//scene
  const scene = new THREE.Scene();
//camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1500,
  );

  camera.position.set(-10,0,-5)
 
//오브젝트 가져오기
const gltfLoader = new GLTFLoader();

const gltf = await gltfLoader.loadAsync('./src/models/nike_tc_7900_sail/scene.gltf')
const shoes = gltf.scene;


shoes.traverse(object => {
  if (object.isMesh) {
    object.castShadow = true;
  }
});

shoes.scale.set(10,10,10)
shoes.position.y=-0.5
scene.add(shoes)

//조명
const directionalLight1 = new THREE.DirectionalLight( 0xffffff, 1.2 );

directionalLight1.castShadow = true;
directionalLight1.shadow.mapSize.width = 2000 ;
directionalLight1.shadow.mapSize.height = 2000;
directionalLight1.shadow.radius = 20;



directionalLight1.position.y =3;
directionalLight1.position.x =-1;




scene.add( directionalLight1)




//OrbitControls 카메라 추가
const controls = new OrbitControls(camera, renderer.domElement)

controls.enableZoom=true

 


const geometry = new THREE.PlaneGeometry( 1000,1000,32,32 );
const material = new THREE.MeshPhongMaterial( {color: '#ffffff',});
const plane = new THREE.Mesh( geometry, material );

plane.rotation.x = -Math.PI /2
plane.position.y = -2.5;
plane.receiveShadow = true;

scene.add( plane );


  //반응형
  render();

  function render() {
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(render);
  }

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.render(scene, camera);
  }

  window.addEventListener('resize', handleResize);
}