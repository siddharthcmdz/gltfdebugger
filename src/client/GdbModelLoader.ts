import { Mesh } from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { GdbMaterial, GdbMesh, GdbTexture, TextureMapType, TextureDataType } from './GdbModelData';
import { BufferAttribute } from 'three';

//use three to load the glb
//parse the glb 
//load relevant into into our model
class GdbModelLoader {
    private readonly _mesh: GdbMesh | undefined;

    constructor(glbpath: string) {
        this._mesh = this.loadGlb(glbpath);
    }

    loadGlb(glbpath: string): GdbMesh | undefined {
        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/examples/jsm/libs/draco/');
        loader.setDRACOLoader(dracoLoader);

        loader.load(glbpath, (loadedglb) => {
            loadedglb.scene.traverse((child) => {
                console.log(child);
                if ((child as THREE.Mesh).isMesh) {
                    const m = child as THREE.Mesh;
                    const meshName = m.name + '( ' + m.uuid + ' )';
                    if (!m.geometry) {
                        console.log('Critical: missing geometry');
                    }

                    let numVertices: number = m.geometry.attributes.position.count;
                    let isIndexed: boolean = false;
                    let numTriangles: number = 0;
                    if (m.geometry.index !== null) {
                        isIndexed = true;
                        numTriangles = m.geometry.index.count / 3;
                    } else {
                        numTriangles = m.geometry.attributes.position.count / 3;
                    }


                    let material = m.material as THREE.MeshStandardMaterial;
                    // console.log('mesh material: ', material);

                    const textypemap = new Map<TextureMapType, GdbTexture>();

                    if (material.alphaMap) {
                        const texname = material.alphaMap.name + '( ' + material.alphaMap.uuid + ' )';
                        const texpath = material.alphaMap.sourceFile
                        // console.log(material.alphaMap.image)
                        const tex: GdbTexture = new GdbTexture(texname, "", 1, 1, 1, 1, TextureDataType.UnsignedBytes);
                        textypemap.set(TextureMapType.Alpha, tex);
                    }


                    const mesh: GdbMesh = new GdbMesh(meshName, new GdbMaterial(textypemap), numVertices, numTriangles, isIndexed);
                    console.log('loaded gdbmesh: ', mesh);

                    return mesh;
                }
            })
        });

        return undefined;
    }

    get mesh() {
        return this._mesh;
    }
};


export default GdbModelLoader;