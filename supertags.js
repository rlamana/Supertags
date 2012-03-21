(function() {
  var namespace,
    __slice = Array.prototype.slice,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  namespace = function(target, name, block) {
    var item, top, _i, _len, _ref, _ref2;
    if (arguments.length < 3) {
      _ref = [(typeof exports !== 'undefined' ? exports : window)].concat(__slice.call(arguments)), target = _ref[0], name = _ref[1], block = _ref[2];
    }
    top = target;
    _ref2 = name.split('.');
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      item = _ref2[_i];
      target = target[item] || (target[item] = {});
    }
    return block(target, top);
  };

  namespace('Supertags', function(exports) {
    return exports.Image = (function() {

      Image.prototype.scene = null;

      Image.prototype.camera = null;

      Image.prototype.renderer = null;

      Image.prototype.shape = null;

      function Image() {
        var camera, light, mesh, renderer, scene, shape;
        scene = this.scene = new THREE.Scene;
        camera = this.camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 3000);
        camera.position.set(1, 1, 10);
        camera.lookAt(scene.position);
        scene.add(camera);
        light = new THREE.PointLight(0x430000);
        light.position.x = 10;
        light.position.y = 50;
        light.position.z = 130;
        scene.add(light);
        renderer = this.renderer = new THREE.WebGLRenderer;
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.sortObjects = false;
        shape = new exports.Supershape();
        mesh = new THREE.Line(shape, new THREE.LineNormalMaterial({
          color: 0x0000ff
        }));
        scene.add(mesh);
        renderer.render(scene, camera);
      }

      Image.prototype.appendTo = function(element) {
        var container;
        container = document.createElement('div');
        container.appendChild(this.renderer.domElement);
        element.appendChild(container);
        return element;
      };

      return Image;

    })();
  });

  namespace('Supertags', function(exports) {
    return exports.Supershape = (function(_super) {

      __extends(Supershape, _super);

      Supershape.prototype.step = 0.1;

      Supershape.prototype.n1 = 5;

      Supershape.prototype.n2 = 10;

      Supershape.prototype.n3 = 15;

      Supershape.prototype.n4 = 15;

      Supershape.prototype.a1 = 1;

      Supershape.prototype.a2 = 1;

      Supershape.prototype.scaler = .5;

      function Supershape() {
        this.calculate();
      }

      Supershape.prototype.calculate = function() {
        var N_X, N_Y, faces, i, j, r1, r2, raux1, raux2, t1, t2, v, vertices, x, xx, y, yy, zz, _ref, _ref2;
        N_X = Math.round(2 * Math.PI / this.step);
        N_Y = Math.round(Math.PI / this.step);
        v = new THREE.Vector3;
        vertices = [];
        faces = [];
        for (x = 0; 0 <= N_X ? x <= N_X : x >= N_X; 0 <= N_X ? x++ : x--) {
          i = -Math.PI + x * this.step;
          for (y = 0; 0 <= N_Y ? y <= N_Y : y >= N_Y; 0 <= N_Y ? y++ : y--) {
            j = -Math.PI / 2.0 + y * this.step;
            xx = 0;
            yy = 0;
            zz = 0;
            t1 = Math.cos(this.n1 * i / 4);
            t1 = 1 / this.a1 * Math.abs(t1);
            t1 = Math.abs(t1);
            t2 = Math.sin(this.n1 * i / 4);
            t2 = 1 / this.a2 * Math.abs(t2);
            t2 = Math.abs(t2);
            raux1 = (Math.pow(t1, this.n3)) + (Math.pow(t2, this.n4));
            r1 = Math.abs(raux1);
            r1 = Math.pow(r1, -1 / this.n2);
            t1 = Math.cos(this.n1 * j / 4);
            t1 = 1 / this.a1 * Math.abs(t1);
            t1 = Math.abs(t1);
            t2 = Math.sin(this.n1 * j / 4);
            t2 = 1 / this.a2 * Math.abs(t2);
            t2 = Math.abs(t2);
            raux2 = (Math.pow(t1, this.n3)) + (Math.pow(t2, this.n4));
            r2 = Math.abs(raux2);
            r2 = Math.pow(r2, -1 / this.n2);
            xx = r1 * Math.cos(i) * r2 * Math.cos(j) * this.scaler;
            yy = r1 * Math.sin(i) * r2 * Math.cos(j) * this.scaler;
            zz = r2 * Math.sin(j) * this.scaler;
            vertices.push(new THREE.Vertex(new THREE.Vector3(xx, yy, zz)));
          }
        }
        for (i = 0, _ref = N_X - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
          for (j = 0, _ref2 = N_Y - 1; 0 <= _ref2 ? j <= _ref2 : j >= _ref2; 0 <= _ref2 ? j++ : j--) {
            faces.push(new THREE.Face4(i * N_Y + j, i * N_Y + j + 1, (i + 1) * N_Y + j + 1, (i + 1) * N_Y + j));
          }
        }
        return this.vertices = vertices;
        /*
        			@faces = faces
        			
        			@computeFaceNormals()
        			@computeCentroids()
        */
      };

      return Supershape;

    })(THREE.Geometry);
  });

}).call(this);
