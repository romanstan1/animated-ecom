import './GLTFLoader'
import './DeviceOrientationControls'
import './OrbitControls'
// import './DRACOLoader'

var THREE = window.THREE

let camera, scene, renderer, frameRequest, geometry, material, cube, controls, mesh

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  render()
  frameRequest = requestAnimationFrame(animate)
}

function render() {
  controls.update()
  renderer.render( scene, camera )
}

function getScreenDimensions() {
  const width = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth

  const height = window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight
  return {width, height}
}

function setCanvasSize() {
  const screen = getScreenDimensions()
  const width = screen.width - 20
  const height = (screen.height / 2) - 80
  return {width, height}
}

function createLights() {
  let light = new THREE.AmbientLight( 0xffffff, 0.5 );
  // var light = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)
  scene.add( light );

  let light2 = new THREE.HemisphereLight( 0xbbbbff, 0x444422 );
	light2.position.set( 0, 1, 0 );
	scene.add( light2 );

  let spotLight = new THREE.SpotLight( 0xffffff, 1.0 );
  spotLight.position.set( 0, 20, 20 );
  spotLight.angle = 1;
  spotLight.penumbra = 0.95;
  spotLight.distance = 1000;

  spotLight.castShadow = true;
  spotLight.shadow.darkness = 0.5;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;

  spotLight.shadow.camera.near = 0.1;
  spotLight.shadow.camera.far = 2000;
  spotLight.shadow.camera.fov = 30;
  spotLight.decay = 0;

  scene.add( spotLight );

  var spotLightHelper = new THREE.SpotLightHelper( spotLight );
  scene.add( spotLightHelper );

}

export function init() {
  const canvas = setCanvasSize()

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 0.25, 50 )
	camera.position.set( 0, 0, 10 );


  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setClearColor( 0xffffff, 1)
  renderer.setSize( canvas.width, canvas.height )

  createLights()
  scene.add( new THREE.AxesHelper( 1000 ) );

  const element = document.getElementById('scene')
  element.appendChild(renderer.domElement)

  // controls = new THREE.OrbitControls( camera, element );
  // controls.update()

  geometry = new THREE.BoxGeometry( 2, 2, 2 )
  material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } )
  cube = new THREE.Mesh( geometry, material )

  controls = new THREE.DeviceOrientationControls( camera )
  // controls.target.set( 0, -0.2, -0.2 )
  console.log('controls', controls)
  loadModel()

  // scene.add( cube )

  camera.position.z = 5

  console.log('scene:', scene)
  animate()
}


function loadModel() {
  // Instantiate a loader
  var loader = new THREE.GLTFLoader()
	loader.load('DamagedHelmet/glTF/DamagedHelmet.gltf', function ( gltf ) {
		scene.add( gltf.scene );
	})
}

export function uninit() {
  cancelAnimationFrame(frameRequest)
}
