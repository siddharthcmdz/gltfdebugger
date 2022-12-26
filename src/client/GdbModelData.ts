
enum TextureDataType {
    INT,
    Float,
    UnsignedBytes
}

class Texture {
    private name: string;
    private path: string;
    private width : number;
    private height : number;
    private bpp : number;
    private numComponents : number;
    private textureDataType : TextureDataType;

    constructor(name: string, path: string, width: number, height: number, bpp: number, numComponents: number, textureDataType: TextureDataType) {
        this.name = name;
        this.path = path;
        this.width = width;
        this.height = height;
        this.bpp = bpp;
        this.numComponents = numComponents;
        this.textureDataType = textureDataType;
    }
};

class Material {

};

class Mesh {
    private readonly _name : string ;
    private readonly _material : Material;
    private readonly _numVertexAttribs : number;
    private readonly _numTriangles : number;
    private readonly _isIndexed : boolean;
    
    constructor(name: string, material: Material, numVertexAttribs: number, numTriangles: number, isIndexed: boolean) {
        this._name = name;
        this._material = material;
        this._numVertexAttribs = numVertexAttribs;
        this._numTriangles = numTriangles;
        this._isIndexed = isIndexed;
    }

    get name() : string {
        return this._name;
    }

    get material() : Material {
        return this._material;
    }

    get numVertexAttribs() : number {
        return this._numVertexAttribs;
    }

    get numTriangles() : number {
        return this._numTriangles;
    }

    get isIndexed() :  boolean {
        return this._isIndexed;
    }

};

class ModelData {
    private _meshes : Mesh[];
    private _modelName : string;
    
    constructor(meshes : Mesh[], modelname : string) {
        this._modelName = modelname;
        this._meshes = meshes;
    }

    get meshes() : Mesh[] {
        return this._meshes;
    }

    get modelName() : string {
        return this._modelName;
    }
}
