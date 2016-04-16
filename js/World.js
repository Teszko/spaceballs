function World () {
    this.scene = null;
    this.phyWorld = null;
    this.sphereList = [];
    this.connectionList = [];
    this.clock = null;
    this.renderer = null;
    this.camera = null;
    this.controls = null;
    this.directionalLight = null;
    this.ambientLight = null;
}

World.prototype.init = function (parent_dom_element) {
    this.scene = new THREE.Scene();

    this.phyWorld = new CANNON.World();
    this.phyWorld.gravity.set(0, 0, 0); // m/s²

    this.clock = new THREE.Clock();

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    parent_dom_element.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 9;

    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
    this.controls.enableZoom = true;

    this.ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    this.directionalLight.position.set(1, 1, 0);
    this.scene.add(this.directionalLight);
};
