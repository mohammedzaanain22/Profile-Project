import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const MODEL = '/ai_robot.glb'
const UP = new THREE.Vector3(0, 1, 0)
const RIGHT = new THREE.Vector3(1, 0, 0)
const qYaw = new THREE.Quaternion()
const qPitch = new THREE.Quaternion()
const qDesired = new THREE.Quaternion()
const qParent = new THREE.Quaternion()

function Robot() {
  const { scene } = useGLTF(MODEL)
  const { gl } = useThree()

  const head = useMemo(() => scene.getObjectByName('Head'), [scene])
  const baseWorld = useRef(new THREE.Quaternion())
  const mouse = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })

  const fit = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const s = 3 / size.y
    return { s, pos: center.multiplyScalar(-s) }
  }, [scene])

  useEffect(() => {
    if (!head) {
      console.warn('Head node not found in the model')
      return
    }
    scene.updateWorldMatrix(true, true)
    head.getWorldQuaternion(baseWorld.current)
  }, [head, scene])

  useEffect(() => {
    const onMove = (e) => {
      const r = gl.domElement.getBoundingClientRect()
      const nx = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)
      const ny = (e.clientY - (r.top + r.height * 0.3)) / (window.innerHeight / 2)
      mouse.current.x = THREE.MathUtils.clamp(nx, -1, 1)
      mouse.current.y = THREE.MathUtils.clamp(-ny, -1, 1)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [gl])

  useFrame((_, delta) => {
    if (!head) return
    const t = 1 - Math.exp(-delta * 8)
    current.current.x += (mouse.current.x - current.current.x) * t
    current.current.y += (mouse.current.y - current.current.y) * t

    qYaw.setFromAxisAngle(UP, current.current.x * 0.7)
    qPitch.setFromAxisAngle(RIGHT, -current.current.y * 0.35)
    qDesired.copy(qYaw).multiply(qPitch).multiply(baseWorld.current)

    head.parent.getWorldQuaternion(qParent)
    head.quaternion.copy(qParent.invert()).multiply(qDesired)
  })

  return (
    <Float speed={1.5} floatIntensity={0.4} rotationIntensity={0}>
      <group scale={fit.s} position={fit.pos.toArray()}>
        <primitive object={scene} />
      </group>
    </Float>
  )
}

export default function RobotScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 5], fov: 35 }}
      dpr={[1, 2]}
      style={{ touchAction: 'pan-y' }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 4, 5]} intensity={2.5} />
      <directionalLight position={[-4, 1, 2]} intensity={1.2} color="#7c5cff" />
      <directionalLight position={[0, -2, 3]} intensity={0.8} color="#22d3ee" />
      <Suspense fallback={null}>
        <Robot />
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload(MODEL)