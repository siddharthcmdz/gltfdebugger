
export enum TextureDataType {
    INT,
    Float,
    UnsignedBytes
}

export enum TextureMapType {
    Albedo,
    Alpha,
    Normal,
    AO,
    Displacement,
    Emissive,
    EnvMap,
    Roughness,   
}

export class GdbTexture {
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


export class GdbMaterial {
    private readonly _textureMap = new Map<TextureMapType, GdbTexture>;

    constructor(texmapType : Map<TextureMapType, GdbTexture>) {
        this._textureMap = new Map(texmapType)
    }

    public getTexture(textureMapType : TextureMapType) : GdbTexture | undefined {
        if(this._textureMap.has(textureMapType)) {
            return this._textureMap.get(textureMapType);
        }

        return undefined;
    }
};

export class GdbMesh {
    private readonly _name : string ;
    private readonly _material : GdbMaterial;
    private readonly _numVertexAttribs : number;
    private readonly _numTriangles : number;
    private readonly _isIndexed : boolean;
    
    constructor(name: string, material: GdbMaterial, numVertexAttribs: number, numTriangles: number, isIndexed: boolean) {
        this._name = name;
        this._material = material;
        this._numVertexAttribs = numVertexAttribs;
        this._numTriangles = numTriangles;
        this._isIndexed = isIndexed;
    }

    get name() : string {
        return this._name;
    }

    get material() : GdbMaterial {
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
