import './GLTFLoader'
import './OrbitControls'

var THREE = window.THREE

let camera, scene, renderer, frameRequest, geometry, material, cube, controls, mesh

function animate() {
  render()
  frameRequest = requestAnimationFrame(animate)
}

function render() {
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
  const width = screen.width
  const height = (screen.height - 120) * 0.6
  return {width, height}
}

function createLights() {
  let light = new THREE.AmbientLight( 0xffffff, 0.5 );
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


function loadModel(url) {

  const manager = new THREE.LoadingManager()

  manager.onLoad = () => {
  	// console.log( 'Loading complete!', url)
    setTimeout(() => {
      // console.log( 'onLoad set camera position' )
      // camera.position.set( 0, 0, 5 )
    },200)
  }

  manager.onStart = () => {
    // console.log('onStart')
    // camera.position.set( 0, 0, 55 )
  }

  const loader = new THREE.GLTFLoader(manager)

  loader.load(url, ( gltf ) => {
    cube = gltf.scene
    cube.name = url
    scene.add(cube)

    console.log('cube', cube)

    cube.rotation.y = -1.6
    cube.rotation.z = -0.2
    cube.rotation.x = 0.3

    cube.position.y = -0.5
  })
}

function removeModel(url) {
  const selectedObject = scene.getObjectByName(url)
  scene.remove( selectedObject )
}

export function update(url, show) {
  if(show) loadModel(url)
  else removeModel(url)
}

export function init() {
  const canvas = setCanvasSize()

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 0.25, 50 )
	camera.position.set( 0, 0, 5 )

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setClearColor( 0xffffff, 1)
  renderer.setSize( canvas.width, canvas.height )

  createLights()
  scene.add( new THREE.AxesHelper( 1000 ) );

  const element = document.getElementById('scene')
  element.appendChild(renderer.domElement)

  controls = new THREE.OrbitControls( camera, element );
  controls.update()

  window.addEventListener('deviceorientation', (e) => {
    if(cube) {
      cube.rotation.x = e.beta  * (Math.PI / 200)
      cube.rotation.y = e.gamma * (Math.PI / 200)
      cube.rotation.z = e.alpha * (Math.PI / 200)
    }
  })
  animate()
}

export function uninit() {
  const element = document.getElementById('scene')
  console.log('uninit', scene, element)

  if(element.children.length > 0) {
    // element.removeChild()
  }

  cancelAnimationFrame(frameRequest)
  // camera, scene, renderer, frameRequest, geometry, material, cube, controls, mesh
}
