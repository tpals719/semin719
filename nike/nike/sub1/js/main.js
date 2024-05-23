import * as THREE from 'three';
import {OrbitControls} from 'orbit';
import { GLTFLoader } from 'gltf';

window.addEventListener('load', function () {
  init();
});
///renderer
 async function init() {

  const renderer = new THREE.WebGLRenderer({
    
    antialias: true,
    alpha:true,
    
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);


//camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  500,
);


camera.position.set(1,3,15)

// camera.position.set(1,2,5)

const controls = new OrbitControls(camera,renderer.domElement)

  
//scene
  const scene = new THREE.Scene();
 
const gltfLoader = new GLTFLoader();
const gltf = await gltfLoader.loadAsync('./models/air_jordan_1_1985/scene.gltf');
 const shoes = gltf.scene;

  //오브젝트 그림자


  shoes.traverse(object=>{
    if(object.inMesh){
      object.castShadow= true;
    }
  })//glft 사용시 적어줌


shoes.scale.set(0.05,0.05,0.05)

shoes.castShadow = true;
  scene.add(shoes);

  //조명
  




const directionalLight1 = new THREE.DirectionalLight( 0xffffff, 1.5 );


directionalLight1.castShadow= true;
directionalLight1.shadow.mapSize.width =1024;
directionalLight1.shadow.mapSize.height =1024;
directionalLight1.shadow.radius =20;

directionalLight1.position.set(-1,10,3)




const helper = new THREE.DirectionalLightHelper( directionalLight1, 5 );
scene.add( helper );



scene.add( directionalLight1);









  
   
  const planeGeometry = new THREE.PlaneGeometry( 100,100 );
const planeMaterial = new THREE.MeshStandardMaterial( {color: 0xffffff} );//반사없음
const plane = new THREE.Mesh( planeGeometry,planeMaterial);
plane.rotation.x = Math.PI * -0.5//-90도 회전
plane.position.y=-4;
plane.receiveShadow  = true
scene.add( plane );




//반응형
  render();

  function render() {
    renderer.render(scene, camera);
    
    controls.update()

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