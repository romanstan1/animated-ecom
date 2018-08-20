import './GLTFLoader'
import './OrbitControls'
import * as d3 from 'd3-scale'

var THREE = window.THREE

let camera, scene, renderer, frameRequest, geometry, material, cube, controls, mesh

const scale = d3.scaleLinear().domain([250, 1000]).range([2, 50])

function animate() {
  render()
  frameRequest = requestAnimationFrame(animate)

  if(camera.position.z > 250) {
    camera.position.z -= scale(camera.position.z)
    camera.lookAt(0,0,0)
  }
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
  const width = screen.width > 510? 510 : screen.width
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
  // scene.add( spotLightHelper );
}


let snapshot = false
let betaChange, gammaChange, alphaChange

function deviceOrientation(e) {
  if(cube) {
    if(snapshot) {
      betaChange = e.beta
      gammaChange = e.gamma
      // gammaChange = e.gamma * (Math.PI / 200)
      // alphaChange = e.alpha * (Math.PI / 200)
      snapshot = false
    }

    cube.rotation.x = ((e.beta - betaChange) * (Math.PI / 900))
    cube.rotation.y = ((e.gamma - gammaChange) * (Math.PI / 400))
    // cube.rotation.z =  (e.alpha * (Math.PI / 200)) - alphaChange - 0.2
    // cube.rotation.z =  -0.2
  }
}

function loadModel(url) {
  setTimeout(() => {
    snapshot = true
    betaChange, gammaChange, alphaChange
    const manager = new THREE.LoadingManager()
    manager.onLoad = () => {
      window.addEventListener('deviceorientation', deviceOrientation)
      camera.position.set( 0, 110, 500 )
      camera.lookAt(0,0,0)
    }
    const loader = new THREE.GLTFLoader(manager)
    loader.load(url, ( gltf ) => {
      cube = gltf.scene
      cube.name = url
      scene.add(cube)
      cube.children[0].position.y = 20
      cube.children[0].position.z = 0
      cube.children[0].position.x = 0
    })
  },200)
}


function removeModel(url) {
  const selectedObject = scene.getObjectByName(url)
  scene.remove( selectedObject )
  window.removeEventListener('deviceorientation', deviceOrientation)
}

export function update(url, show) {
  if(show) loadModel(url)
  else removeModel(url)
}

export function init() {
  let canvas = setCanvasSize()

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 0.85, 1000 )
	camera.position.set( 0, 110, 500 )

  // var axesHelper = new THREE.AxesHelper( 700 );
  // scene.add( axesHelper );

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setClearColor( 0xffffff, 1)
  renderer.setSize( canvas.width, canvas.height )

  window.addEventListener("resize", () => {
    canvas = setCanvasSize()
    camera.aspect = canvas.width / canvas.height
    camera.updateProjectionMatrix()
    renderer.setSize( canvas.width, canvas.height )
  }, true);

  createLights()

  const element = document.getElementById('scene')
  element.appendChild(renderer.domElement)

  controls = new THREE.OrbitControls( camera, element );
  controls.update()
  animate()
}

export function uninit() {
  const element = document.getElementById('scene')
  cancelAnimationFrame(frameRequest)
}
