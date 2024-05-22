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
  renderer.shadowMap.enabled = true;//1.그림자를 사용하겠다
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

  camera.position.set(1,0,5)
  ///로딩바 만들기
// const porgressbar = document.querySelector("#progress-bar")
// const pcontainer = document.querySelector("#progress-bar-container")
// const loadingManager = new THREE.LoadingManager();//threejs 제공 태그

// loadingManager.onProgress = (url,loaded,total) => {
//  porgressbar.value = (loaded / total) * 100;//현재 진행률
// }
// //로딩이 완료 되면 보이지 않음
// loadingManager.onLoad = () => {
// pcontainer.style.display = 'none'
// }
 
//오브젝트 가져오기
const gltfLoader = new GLTFLoader();

const gltf = await gltfLoader.loadAsync('./models/air_jordan_1_1985/scene.gltf')
const shoes = gltf.scene;


shoes.traverse(object => {
  if (object.isMesh) {
    object.castShadow = true;
  }
});

shoes.scale.set(0.018,0.02,0.02)
shoes.position.y=-0.5
scene.add(shoes)

//조명
const directionalLight1 = new THREE.DirectionalLight( 0xffffff, 1.2 );
// const directionalLight2 = new THREE.DirectionalLight( 0xffffff, 0.8 );
directionalLight1.castShadow = true;
directionalLight1.shadow.mapSize.width = 2000 ;
directionalLight1.shadow.mapSize.height = 2000;
directionalLight1.shadow.radius = 20;



directionalLight1.position.y =3;
directionalLight1.position.x =-1;
// directionalLight2.castShadow = true;



scene.add( directionalLight1)


const spotLight = new THREE.SpotLight( 0xffffff,0.6);
spotLight.position.set(-10,10,10 );
spotLight.map = new THREE.TextureLoader().load( );

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 2000;
spotLight.shadow.mapSize.height = 2000;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;

scene.add( spotLight );

//OrbitControls 카메라 추가
const controls = new OrbitControls(camera, renderer.domElement)
// controls.autoRotate = true
controls.enableZoom=true

 


// //그림자 받을 바닥
const geometry = new THREE.PlaneGeometry( 1000,1000,32,32 );
const material = new THREE.MeshPhongMaterial( {color: '#ffffff',
  // transparent:true,
  // opacity:0.5
} );
const plane = new THREE.Mesh( geometry, material );

plane.rotation.x = -Math.PI /2
plane.position.y = -1.7
plane.receiveShadow = true;//그림자를 받음


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