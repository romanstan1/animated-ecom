import './GLTFLoader'
import './OrbitControls'
import * as d3 from 'd3-scale'

var THREE = window.THREE

let camera, scene, renderer, frameRequest, geometry, material, cube, controls, mesh

const zScale = d3.scaleLinear().domain([220, 1000]).range([2, 50])
const yScale = d3.scaleLinear().domain([85, 500]).range([1, 50])
const xScale = d3.scaleLinear().domain([85, 500]).range([1, 50])

function animate() {
  render()
  frameRequest = requestAnimationFrame(animate)

  if(camera.position.z > 220) {
    camera.position.z -= zScale(camera.position.z)
    camera.position.y -= yScale(camera.position.y)
    camera.lookAt(0,0,0)
  }
  //
  // if(camera.position.y > 110 && camera.position.z < 230) {
  //   // camera.position.z -= zScale(camera.position.z)
  //   camera.position.y -= yScale(camera.position.y)
  //   camera.lookAt(0,0,0)
  // }

  // if(camera.position.z > 220 && camera.position.z < 300 && camera.position.x ) {
  //   camera.position.z -= xScale(camera.position.z)
  // }

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
  // let light = new THREE.AmbientLight( 0xffffff, 0.9 );
  // scene.add( light );

  // let light2 = new THREE.HemisphereLight( 0xffffff, 1 );
	// light2.position.set( 0, 300, 100  );
	// scene.add( light2 );

  let light3 = new THREE.HemisphereLight( 0xffffff, 1 );
	light3.position.set( 0, 300, -200  );
	scene.add( light3 );

  const spotLight = new THREE.SpotLight( 0xffffff, 1.0 );
  spotLight.position.set( 0, 500, 340 );
  spotLight.angle = 120;
  spotLight.penumbra = 0.95;
  spotLight.distance = 1000;

  spotLight.castShadow = true;
  spotLight.shadowDarkness = 0.1;
  // light.shadowCameraVisible = true;

  spotLight.shadow.darkness = 0.5;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;

  spotLight.shadow.camera.near = 0.1;
  spotLight.shadow.camera.far = 2000;
  spotLight.shadow.camera.fov = 30;
  spotLight.decay = 0;

  console.log('sl: ', spotLight)

  scene.add( spotLight );

  const spotLightHelper = new THREE.SpotLightHelper( spotLight );
  // scene.add( spotLightHelper )
}


let snapshot = false
let betaChange, gammaChange, alphaChange

function deviceOrientation(e) {
  if(cube) {
    if(snapshot) {
      betaChange = e.beta
      gammaChange = e.gamma
      snapshot = false
    }
    cube.rotation.x = ((e.beta - betaChange) * (Math.PI / 900))
    cube.rotation.y = ((e.gamma - gammaChange) * (Math.PI / 400))
  }
}

function loadModel(url) {
  setTimeout(() => {
    snapshot = true
    betaChange, gammaChange, alphaChange
    const manager = new THREE.LoadingManager()
    manager.onLoad = () => {
      window.addEventListener('deviceorientation', deviceOrientation)
      camera.position.set( 50, 310, 400 )
      camera.lookAt(0,0,0)
    }
    const loader = new THREE.GLTFLoader(manager)

    loader.load(url, ( gltf ) => {
      cube = gltf.scene
      cube.name = url
      scene.add(cube)
      cube.castShadow = true;
      cube.receiveShadow = true;
      cube.children[0].position.y = 20
      cube.children[0].position.z = 0
      cube.children[0].position.x = 0
      cube.children[0].traverse(child => {
				if ( child.isMesh ) {
					child.castShadow = true;
					child.receiveShadow = true;
				}
			})

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
	camera.position.set( 0, 310, 400 )

  // var axesHelper = new THREE.AxesHelper( 700 );
  // scene.add( axesHelper );

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setClearColor( 0xffffff, 1)
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  renderer.setSize( canvas.width, canvas.height )
  renderer.setPixelRatio( window.devicePixelRatio )

  // const geometry = new THREE.BoxGeometry(30, 30, 30)
  // const material = new THREE.MeshPhongMaterial({ color: '#433F81' })
  // const box = new THREE.Mesh(geometry, material)
  // box.castShadow = true;
  // box.position.y = 80
  // box.position.z = 70

  // scene.add(box)

  const floorGeometry = new THREE.BoxGeometry(400, 0.1, 400)
  // const floorMaterial = new THREE.MeshPhongMaterial({ color: '#433F81' })
  // const floorMaterial = new THREE.MeshPhongMaterial({ color: '#303c54' })
  const floorMaterial = new THREE.MeshPhongMaterial({ color: '#ffffff' })

  const floor = new THREE.Mesh(floorGeometry, floorMaterial)
  floor.position.y = -30
  floor.receiveShadow = true;

  scene.add(floor)

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
