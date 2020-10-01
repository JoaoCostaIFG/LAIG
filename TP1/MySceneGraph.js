const DEGREE_TO_RAD = Math.PI / 180;

// Order of the groups in the XML document.
var INITIALS_INDEX = 0;
var VIEWS_INDEX = 1;
var ILLUMINATION_INDEX = 2;
var LIGHTS_INDEX = 3;
var TEXTURES_INDEX = 4;
var MATERIALS_INDEX = 5;
var NODES_INDEX = 6;

/**
 * MySceneGraph class, representing the scene graph.
 */
class MySceneGraph {
    /**
     * Constructor for MySceneGraph class.
     * Initializes necessary variables and starts the XML file reading process.
     * @param {string} filename - File that defines the 3D scene
     * @param {XMLScene} scene
     */
    constructor(filename, scene) {
        this.loadedOk = null;

        // Establish bidirectional references between scene and graph.
        this.scene = scene;
        scene.graph = this;

        this.nodes = [];

        this.idRoot = null; // The id of the root element.

        this.axisCoords = [];
        this.axisCoords['x'] = [1, 0, 0];
        this.axisCoords['y'] = [0, 1, 0];
        this.axisCoords['z'] = [0, 0, 1];

        // File reading 
        this.reader = new CGFXMLreader();

        /*
         * Read the contents of the xml file, and refer to this class for loading and error handlers.
         * After the file is read, the reader calls onXMLReady on this object.
         * If any error occurs, the reader calls onXMLError on this object, with an error message
         */
        this.reader.open('scenes/' + filename, this);

        // TODO
        // this.obj = new MyCilinder(scene, 2, 2, 4, 20, 2);
        // this.obj = new MyTriangle(scene, 0, 0, 0, 2, 1, 0);
        // this.obj = new MySphere(scene, 2, 20, 20);
        this.obj = new MyTorus(scene, 40, 40, 0.1, 5);

        this.obj.enableNormalViz();

        this.mat = new CGFappearance(scene);
        this.tex = new CGFtexture(scene, "scenes/images/earth.jpg");
        this.mat.setTexture(this.tex);
    }

    /*
     * Callback to be executed after successful reading
     */
    onXMLReady() {
        this.log("XML Loading finished.");
        var rootElement = this.reader.xmlDoc.documentElement;

        // Here should go the calls for different functions to parse the various blocks
        var error = this.parseXMLFile(rootElement);

        if (error != null) {
            this.onXMLError(error);
            return;
        }

        this.loadedOk = true;

        // As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
        this.scene.onGraphLoaded();
    }

    /*
     * Callback to be executed on any read error, showing an error on the console.
     * @param {string} message
     */
    onXMLError(message) {
        console.error("XML Loading Error: " + message);
        this.loadedOk = false;
    }

    /**
     * Callback to be executed on any minor error, showing a warning on the console.
     * @param {string} message
     */
    onXMLMinorError(message) {
        console.warn("Warning: " + message);
    }

    /**
     * Callback to be executed on any message.
     * @param {string} message
     */
    log(message) {
        console.log("   " + message);
    }

    /**
     * Parses the XML file, processing each block.
     * @param {XML root element} rootElement
     */
    parseXMLFile(rootElement) {
        if (rootElement.nodeName != "lsf")
            return "root tag <lsf> missing";

        var nodes = rootElement.children;

        // Reads the names of the nodes to an auxiliary buffer.
        var nodeNames = [];

        for (var i = 0; i < nodes.length; i++) {
            nodeNames.push(nodes[i].nodeName);
        }

        var error;

        // Processes each node, verifying errors.

        // <initials>
        var index;
        if ((index = nodeNames.indexOf("initials")) == -1)
            return "tag <initials> missing";
        else {
            if (index != INITIALS_INDEX)
                this.onXMLMinorError("tag <initials> out of order " + index);

            //Parse initials block
            if ((error = this.parseInitials(nodes[index])) != null)
                return error;
        }

        // <views>
        if ((index = nodeNames.indexOf("views")) == -1)
            return "tag <views> missing";
        else {
            if (index != VIEWS_INDEX)
                this.onXMLMinorError("tag <views> out of order");

            //Parse views block
            if ((error = this.parseViews(nodes[index])) != null)
                return error;
        }

        // <illumination>
        if ((index = nodeNames.indexOf("illumination")) == -1)
            return "tag <illumination> missing";
        else {
            if (index != ILLUMINATION_INDEX)
                this.onXMLMinorError("tag <illumination> out of order");

            //Parse illumination block
            if ((error = this.parseIllumination(nodes[index])) != null)
                return error;
        }

        // <lights>
        if ((index = nodeNames.indexOf("lights")) == -1)
            return "tag <lights> missing";
        else {
            if (index != LIGHTS_INDEX)
                this.onXMLMinorError("tag <lights> out of order");

            //Parse lights block
            if ((error = this.parseLights(nodes[index])) != null)
                return error;
        }
        // <textures>
        if ((index = nodeNames.indexOf("textures")) == -1)
            return "tag <textures> missing";
        else {
            if (index != TEXTURES_INDEX)
                this.onXMLMinorError("tag <textures> out of order");

            //Parse textures block
            if ((error = this.parseTextures(nodes[index])) != null)
                return error;
        }

        // <materials>
        if ((index = nodeNames.indexOf("materials")) == -1)
            return "tag <materials> missing";
        else {
            if (index != MATERIALS_INDEX)
                this.onXMLMinorError("tag <materials> out of order");

            //Parse materials block
            if ((error = this.parseMaterials(nodes[index])) != null)
                return error;
        }

        // <nodes>
        if ((index = nodeNames.indexOf("nodes")) == -1)
            return "tag <nodes> missing";
        else {
            if (index != NODES_INDEX)
                this.onXMLMinorError("tag <nodes> out of order");

            //Parse nodes block
            if ((error = this.parseNodes(nodes[index])) != null)
                return error;
        }
        this.log("all parsed");
    }

    /**
     * Parses the <initials> block. 
     * @param {initials block element} initialsNode
     */
    parseInitials(initialsNode) {
        var children = initialsNode.children;
        var nodeNames = [];

        for (var i = 0; i < children.length; i++)
            nodeNames.push(children[i].nodeName);

        var rootIndex = nodeNames.indexOf("root");
        var referenceIndex = nodeNames.indexOf("reference");

        // Get root of the scene.
        if(rootIndex == -1)
            return "No root id defined for scene.";

        var rootNode = children[rootIndex];
        var id = this.reader.getString(rootNode, 'id');
        if (id == null)
            return "No root id defined for scene.";

        this.idRoot = id;

        // Get axis length        
        if(referenceIndex == -1)
            this.onXMLMinorError("no axis_length defined for scene; assuming 'length = 1'");

        var refNode = children[referenceIndex];
        var axis_length = this.reader.getFloat(refNode, 'length');
        if (axis_length == null)
            this.onXMLMinorError("no axis_length defined for scene; assuming 'length = 1'");

        this.referenceLength = axis_length || 1;

        this.log("Parsed initials");

        return null;
    }

    /**
     * Parses the <views> block.
     * @param {view block element} viewsNode
     */
    parseViews(viewsNode) {
        var children = viewsNode.children;

        this.cameras = [];
        // assume first camera if none given
        this.defaultCameraId = this.reader.getString(viewsNode, "default");
        if (this.defaultCameraId == null)
            return this.defaultCameraId;
        var numCameras = 0;

        var grandChildren = [];
        var nodeNames = [];

        for (var i = 0; i < children.length; i++) {
            // Storing camera information
            var global = [];
            var attributeNames = [];

            // Check type of camera
            if (children[i].nodeName == "perspective") {
                attributeNames = ["angle", "near", "far"];
                global = ["perspective"];
            }
            else if (children[i].nodeName == "ortho") {
                attributeNames = ["left", "right", "bottom", "top", "near", "far"];
                global = ["ortho"];
            }
            else {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current camera.
            var cameraId = this.reader.getString(children[i], 'id');
            if (cameraId == null)
                return "no ID defined for camera";
            global.push(cameraId);

            // Checks for repeated IDs.
            if (this.cameras[cameraId] != null)
                return "ID must be unique for each camera (conflict: ID = " + cameraId + ")";

            // Specifications for the current light.

            // Parse remaining tag info
            nodeNames = [];
            for (var j = 0; j < children[i].attributes.length; j++) {
                nodeNames.push(children[i].attributes[j].nodeName);
            }
            for (var j = 0; j < attributeNames.length; j++) {
                var attributeIndex = nodeNames.indexOf(attributeNames[j]);

                if (attributeIndex != -1) {
                    var aux = this.reader.getFloat(children[i], attributeNames[j], "camera float (" + attributeNames[j] + ") with ID " + cameraId);
                    if (typeof aux === 'string' || aux instanceof String)
                        return aux;

                    global.push(aux);
                }
                else
                    return "camera " + attributeNames[j] + " undefined for ID = " + cameraId;
            }

            // Parse other info
            if (children[i].nodeName == "perspective")
                attributeNames = ["from", "to"];
            else
                attributeNames = ["from", "to", "up"];

            nodeNames = [];
            grandChildren = children[i].children;
            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }

            for (var j = 0; j < attributeNames.length; j++) {
                var attributeIndex = nodeNames.indexOf(attributeNames[j]);

                if (attributeIndex != -1) {
                    var aux = this.parseCoordinates3D(grandChildren[attributeIndex], attributeNames[j], "camera position (" + attributeNames[j] + ") with ID " + cameraId);
                    if (typeof aux === 'string' || aux instanceof String)
                        return aux;

                    global.push(aux);
                }
                else if (attributeNames[j] == "up") // default value
                    global.push([0, 1, 0]);
                else
                    return "camera " + attributeNames[j] + " undefined for ID = " + cameraId;
            }

            this.cameras[cameraId] = global;
            ++numCameras;
        }

        if (numCameras == 0)
            return "at least one camera must be defined";
        if (this.cameras[this.defaultCameraId] == null)
            return "default camera (" + this.defaultCameraId + ") was not defined.";

        this.log("Parsed views");
        return null;
    }

    /**
     * Parses the <illumination> node.
     * @param {illumination block element} illuminationsNode
     */
    parseIllumination(illuminationsNode) {
        var children = illuminationsNode.children;

        this.ambient = [];
        this.background = [];

        var nodeNames = [];

        for (var i = 0; i < children.length; i++)
            nodeNames.push(children[i].nodeName);

        var ambientIndex = nodeNames.indexOf("ambient");
        var backgroundIndex = nodeNames.indexOf("background");

        var color = this.parseColor(children[ambientIndex], "ambient");
        if (!Array.isArray(color))
            return color;
        else
            this.ambient = color;

        color = this.parseColor(children[backgroundIndex], "background");
        if (!Array.isArray(color))
            return color;
        else
            this.background = color;

        this.log("Parsed Illumination.");

        return null;
    }

    /**
     * Parses the <light> node.
     * @param {lights block element} lightsNode
     */
    parseLights(lightsNode) {
        var children = lightsNode.children;

        this.lights = [];
        var numLights = 0;

        var grandChildren = [];
        var nodeNames = [];

        // Any number of lights.
        for (var i = 0; i < children.length; i++) {

            // Storing light information
            var global = [];
            var attributeNames = [];
            var attributeTypes = [];

            //Check type of light
            if (children[i].nodeName != "light") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }
            else {
                attributeNames.push(...["enable", "position", "ambient", "diffuse", "specular"]);
                attributeTypes.push(...["boolean","position", "color", "color", "color"]);
            }

            // Get id of the current light.
            var lightId = this.reader.getString(children[i], 'id');
            if (lightId == null)
                return "no ID defined for light";

            // Checks for repeated IDs.
            if (this.lights[lightId] != null)
                return "ID must be unique for each light (conflict: ID = " + lightId + ")";

            grandChildren = children[i].children;
            // Specifications for the current light.

            nodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }

            for (var j = 0; j < attributeNames.length; j++) {
                var attributeIndex = nodeNames.indexOf(attributeNames[j]);

                if (attributeIndex != -1) {
                    if (attributeTypes[j] == "boolean")
                        var aux = this.parseBoolean(grandChildren[attributeIndex], "value", "enabled attribute for light of ID " + lightId);
                    else if (attributeTypes[j] == "position")
                        var aux = this.parseCoordinates4D(grandChildren[attributeIndex], "light position for ID " + lightId);
                    else
                        var aux = this.parseColor(grandChildren[attributeIndex], attributeNames[j] + " illumination for ID " + lightId);

                    if (typeof aux === 'string' || aux instanceof String)
                        return aux;

                    global.push(aux);
                }
                else
                    return "light " + attributeNames[j] + " undefined for ID = " + lightId;
            }
            this.lights[lightId] = global;
            numLights++;
        }

        if (numLights == 0)
            return "at least one light must be defined";
        else if (numLights > 8)
            this.onXMLMinorError("too many lights defined; WebGL imposes a limit of 8 lights");

        this.log("Parsed lights");
        return null;
    }

    /**
     * Parses the <textures> block. 
     * @param {textures block element} texturesNode
     */
    parseTextures(texturesNode) {
        //For each texture in textures block, check ID and file URL
        //this.onXMLMinorError("To do: Parse textures.");

        var children = texturesNode.children;
        
        this.textures = [];

        // Any number of textures.
        for (var i = 0; i < children.length; i++) {
            if (children[i].nodeName != "texture") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current texture.
            var textureID = this.reader.getString(children[i], 'id');
            if (textureID == null)
                return "no ID defined for texture";

            // Checks for repeated IDs.
            if (this.textures[textureID] != null)
                return "ID must be unique for each texture (conflict: ID = " + textureID + ")";

            // Get path of the current texture.
            var texturePath = this.reader.getString(children[i], 'path');
            if (texturePath == null)
                return "no Path defined for texture";

            this.textures[textureID] = new CGFtexture(this.scene, texturePath);
           
        }

        this.log("Parsed textures");

        return null;
    }

    /**
     * Parses the <materials> node.
     * @param {materials block element} materialsNode
     */
    parseMaterials(materialsNode) {
        var children = materialsNode.children;

        this.materials = [];
        var numMaterials = 0;

        var grandChildren = [];
        var nodeNames = [];

        // Any number of materials.
        for (var i = 0; i < children.length; i++) {

            // Storing light information
            var global = [];
            var attributeNames = [];
            var attributeTypes = [];

             //Check type of material
            if (children[i].nodeName != "material") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }
            else {
                attributeNames = ["shininess", "specular", "diffuse", "ambient", "emissive"];
                attributeTypes = ["float","color", "color", "color", "color"];
            }

            // Get id of the current material.
            var materialID = this.reader.getString(children[i], 'id');
            if (materialID == null)
                return "no ID defined for material";

            // Checks for repeated IDs.
            if (this.materials[materialID] != null)
                return "ID must be unique for each material (conflict: ID = " + materialID + ")";

            grandChildren = children[i].children;
            // Specifications for the current material.

            nodeNames = [];
            for(var j = 0; j < grandChildren.length; j++){
                nodeNames.push(grandChildren[j].nodeName);
            }

            for (var j = 0; j < attributeNames.length; j++) {
                var attributeIndex = nodeNames.indexOf(attributeNames[j]);

                if (attributeIndex != -1) {
                    if (attributeTypes[j] == "float")
                        var aux = this.parseFloat(grandChildren[attributeIndex], "value", "shininess attribute for material of ID " + materialID);
                    else
                        var aux = this.parseColor(grandChildren[attributeIndex], attributeNames[j] + " illumination for ID " + materialID);

                    if (typeof aux === 'string')
                        return aux;

                    global.push(aux);
                }
                else
                    return "material" + attributeNames[j] + " undefined for ID = " + materialID;
                
            }

            var mat =  new CGFappearance(this.scene);
            mat.setShininess(global[0]);
            mat.setSpecular(...global[1]);
            mat.setDiffuse(...global[2]);
            mat.setAmbient(...global[3]);
            mat.setEmission(...global[4]);

            this.materials[materialID] = mat;

            numMaterials++;
        }

        if (numMaterials == 0)
            return "at least one light must be defined";
        
        this.log("Parsed materials");
        return null;
    }

    /**
    * Parses a given node's transformations
    * @param {object that contains transformation's info} tgInfo
    */
    parseNodeTransformations(tgInfo) {
        var tgMtr = mat4.create();
        var tg = tgInfo.nodeName;

        if (tg == "translation") {
            var coords = this.parseCoordinates3D(tgInfo, "translation");
            if (!Array.isArray(coords))
              return coords;

            mat4.translate(tgMtr, tgMtr, coords);
        }
        else if (tg == "rotation") {
            var axis = this.reader.getString(tgInfo, "axis");
            if (axis == null) {
                this.onXMLMinorError("unable to parse rotation axis: " + axis + ". Assuming zz rotation.");
                axis = "zz";
            }
            var angle = this.parseFloat(tgInfo, "angle", "angle", 0.0);

            switch (axis) {
                case "xx":
                    mat4.rotateX(tgMtr, tgMtr, angle);
                    break;
                case "yy":
                    mat4.rotateY(tgMtr, tgMtr, angle);
                    break;
                case "zz":
                    mat4.rotateZ(tgMtr, tgMtr, angle);
                    break;
                default:
                    this.onXMLMinorError("unknown rotation axis: " + axis + ". Assuming no rotation.");
                    break;
            }
        }
        else if (tg == "scale") {
            var sx = this.parseFloat(tgInfo, "sx", "sx", 1.0);
            var sy = this.parseFloat(tgInfo, "sy", "sy", 1.0);
            var sz = this.parseFloat(tgInfo, "sz", "sz", 1.0);
            mat4.scale(tgMtr, tgMtr, [sx, sy, sz]);
        }
        else {
            this.onXMLMinorError("unknown transformation " + tg + ".");
        }

        return tgMtr;
    }

    parseLeaf(leafNode) {
        // TODO getInteger ?

        var attributeNames = [];
        var objType = this.reader.getString(leafNode, "type");
        switch (objType) {
            case "rectangle":
                attributeNames = ["x1", "y1", "x2", "y2"];
                break;
            case "triangle":
                attributeNames = ["x1", "y1", "x2", "y2", "x3", "y3"];
                break;
            case "cylinder":
                attributeNames = ["bottomRadius", "topRadius", "height", "slices", "stacks"];
                break;
            case "sphere":
                attributeNames = ["radius", "slices", "stacks"];
                break;
            case "torus":
                attributeNames = ["slices", "loops", "inner", "outer"];
                break;
            default:
                return "unknown leaf type: " + objType + ".";
        }

        // Parse remaining tag info
        var global = [];
        var nodeNames = [];
        for (var j = 0; j < leafNode.attributes.length; j++) {
            nodeNames.push(leafNode.attributes[j].nodeName);
        }
        for (var j = 0; j < attributeNames.length; j++) {
            var attributeIndex = nodeNames.indexOf(attributeNames[j]);

            if (attributeIndex != -1) {
                var aux = this.parseFloat(leafNode, attributeNames[j], "leaf float (" + attributeNames[j] + ") with type " + objType);
                if (typeof aux === 'string' || aux instanceof String)
                    return aux;

                global.push(aux);
            }
            else
                return "leaf " + attributeNames[j] + " undefined for type = " + objType;
        }

        var obj;
        switch (objType) {
            case "rectangle":
                obj = new MyRectangle(this.scene, ...global);
                break;
            case "triangle":
                obj = new MyTriangle(this.scene, ...global);
                break;
            case "cylinder":
                obj = new MyCilinder(this.scene, ...global);
                break;
            case "sphere":
                obj = new MySphere(this.scene, ...global);
                break;
            default: // "torus":
                obj = new MyTorus(this.scene, ...global);
                break;
        }

        return obj;
    }

    /**
    * Parses the <nodes> block.
    * @param {nodes block element} nodesNode
    */
    parseNodes(nodesNode) {
        var children = nodesNode.children;

        var grandChildren = [];
        var grandgrandChildren = [];
        var nodeNames = [];

        // Any number of nodes.
        for (var i = 0; i < children.length; i++) {
            if (children[i].nodeName != "node") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current node.
            var nodeID = this.reader.getString(children[i], 'id');
            if (nodeID == null)
                return "no ID defined for nodeID";

            // Checks for repeated IDs.
            if (this.nodes[nodeID] != null)
                return "ID must be unique for each node (conflict: ID = " + nodeID + ")";
            
            var nodeObj = new MyNode(nodeID, null); // TODO ref para parent node
            this.nodes[nodeID] = nodeObj;

            grandChildren = children[i].children;

            nodeNames = [];
            for (var j = 0; j < grandChildren.length; j++)
                nodeNames.push(grandChildren[j].nodeName);

            var transformationsIndex = nodeNames.indexOf("transformations");
            var materialIndex = nodeNames.indexOf("material");
            var textureIndex = nodeNames.indexOf("texture");
            var descendantsIndex = nodeNames.indexOf("descendants");

            // Transformations
            if (transformationsIndex == -1) {
                this.onXMLMinorError("tag <transformations> missing, assuming no transformations.");
            }
            else {
                grandgrandChildren = grandChildren[transformationsIndex].children;
                for (var j = 0; j < grandgrandChildren.length; j++) {
                    var tg = this.parseNodeTransformations(grandgrandChildren[j]);
                    if (typeof tg === 'string' || tg instanceof String)
                        return tg;
                    nodeObj.addTgMatrix(tg);
                }
            }

            // Material
            if (materialIndex == -1) {
                this.onXMLMinorError("tag <material> missing for node (conflict: ID = " + nodeID + ")");
            }
            else{
                var materialID = this.reader.getString(grandChildren[materialIndex], 'id');

                nodeObj.setMaterial(materialID);
            }
            
            // Texture
            this.onXMLMinorError("To do: Parse node textures.");

            // Descendants
            if (descendantsIndex == -1) {
                return "tag <descendants> missing. Parsing failed";
            }
            else {
                grandgrandChildren = grandChildren[descendantsIndex].children;
                for (var j = 0; j < grandgrandChildren.length; j++) {
                    var descType = grandgrandChildren[j].nodeName;
                    if (descType == "noderef") {
                        var descId = this.reader.getString(grandgrandChildren[j], "id");
                        if (descId == null)
                            return "noderef is missing an id.";
                        nodeObj.addDescendantNode(descId);
                    }
                    else if (descType == "leaf") {
                        var leafObj = this.parseLeaf(grandgrandChildren[j]);
                        if (typeof leafObj === 'string' || leafObj instanceof String)
                            return leafObj;
                        nodeObj.addDescendantLeaf(leafObj);
                    }
                    else {
                        this.onXMLMinorError("unknown descendant type: " + descType + ".");
                    }
                }
            }
        }

        /* associate descendant noderef's IDs with the correct objects */
        for (var key in this.nodes) {
            var obj = this.nodes[key];
            for (var i = 0; i < obj.descendantsNode.length; ++i) {
                var desc = obj.descendantsNode[i];
                if (this.nodes[desc] == null)
                    return "missing node with ID: " + desc + ".";
                obj.descendantsNode[i] = this.nodes[desc];
            }
        }
    }

    parseFloat(node, name, messageError, defaultVal=null){
        var f = this.reader.getFloat(node, name);
        if (f == null || isNaN(f)) {
            if (defaultVal != null) {
                this.onXMLMinorError("unable to parse float component " + messageError + "; assuming 'value = " + defaultVal + "'");
                f = defaultVal;
            }
            else {
                return "unable to parse float component " + messageError;
            }
        }

        return f;
    }

    parseBoolean(node, name, messageError){
        var boolVal = true;
        boolVal = this.reader.getBoolean(node, name);
        if (!(boolVal != null && !isNaN(boolVal) && (boolVal == true || boolVal == false)))
            this.onXMLMinorError("unable to parse value component " + messageError + "; assuming 'value = 1'");

        return boolVal || 1;
    }

    /**
     * Parse the coordinates from a node with ID = id
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseCoordinates3D(node, messageError) {
        var position = [];

        // x
        var x = this.reader.getFloat(node, 'x');
        if (!(x != null && !isNaN(x)))
            return "unable to parse x-coordinate of the " + messageError;

        // y
        var y = this.reader.getFloat(node, 'y');
        if (!(y != null && !isNaN(y)))
            return "unable to parse y-coordinate of the " + messageError;

        // z
        var z = this.reader.getFloat(node, 'z');
        if (!(z != null && !isNaN(z)))
            return "unable to parse z-coordinate of the " + messageError;

        position.push(...[x, y, z]);

        return position;
    }

    /**
     * Parse the coordinates from a node with ID = id
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseCoordinates4D(node, messageError) {
        var position = [];

        //Get x, y, z
        position = this.parseCoordinates3D(node, messageError);

        if (!Array.isArray(position))
            return position;


        // w
        var w = this.reader.getFloat(node, 'w');
        if (!(w != null && !isNaN(w)))
            return "unable to parse w-coordinate of the " + messageError;

        position.push(w);

        return position;
    }

    /**
     * Parse the color components from a node
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseColor(node, messageError) {
        var color = [];

        // R
        var r = this.reader.getFloat(node, 'r');
        if (!(r != null && !isNaN(r) && r >= 0 && r <= 1))
            return "unable to parse R component of the " + messageError;

        // G
        var g = this.reader.getFloat(node, 'g');
        if (!(g != null && !isNaN(g) && g >= 0 && g <= 1))
            return "unable to parse G component of the " + messageError;

        // B
        var b = this.reader.getFloat(node, 'b');
        if (!(b != null && !isNaN(b) && b >= 0 && b <= 1))
            return "unable to parse B component of the " + messageError;

        // A
        var a = this.reader.getFloat(node, 'a');
        if (!(a != null && !isNaN(a) && a >= 0 && a <= 1))
            return "unable to parse A component of the " + messageError;

        color.push(...[r, g, b, a]);

        return color;
    }

    processNode(nodeObj) {
        this.scene.multMatrix(nodeObj.tgMatrix);
        this.scene.pushMatrix();

        // draw primitives
        nodeObj.displayPrimitives();

        // recursively process descendant MyNode objects
        for (var i = 0; i < nodeObj.descendantsNode.length; ++i)
            this.processNode(nodeObj.descendantsNode[i]);

        this.scene.popMatrix();
    }

    /**
     * Displays the scene, processing each node, starting in the root node.
     */
    displayScene() {
        // this.mat.apply();
        // this.obj.display();

        this.processNode(this.nodes[this.idRoot]);

        //To do: Create display loop for transversing the scene graph, calling the root node's display function
        
        //this.nodes[this.idRoot].display()
    }
}
