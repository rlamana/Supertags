
namespace 'Supertags', (exports) ->
	class exports.SuperShape extends THREE.Object3D
		# Public
		step: 0.1
		n1: 5
		n2: 10
		n3: 15
		n4: 15
		a1: 1
		a2: 1
		scaler: .5

		renderMode: 'line'

		geometry: null
		material: null

		constructor: (parameters) ->
			super()

			if !!parameters
				@n1 = parameters.n1;
				@n2 = parameters.n2;
				@n3 = parameters.n3;
				@n4 = parameters.n4;


			@geometry = new THREE.Geometry()
			@material = new THREE.MeshNormalMaterial color: 0x0000ff

			this.calculate()
			this.setRenderMode('line')

		setRenderMode: (mode) ->
			if mode? and mode is 'line'
				object = new THREE.Line @geometry, new THREE.LineBasicMaterial
					color: 0x0000ff
				object.name = 'line'

			else if mode? and mode is 'particule'
				object = new THREE.ParticleSystem @geometry, new THREE.ParticleBasicMaterial
					color: 0xFF2211,
					opacity: 0.7,
					size: 0.07
				object.name = 'particule'
			else
				object = new THREE.Mesh @geometry, @material
				object.doubleSided = true
				object.name = 'mesh'

			this.add(object) if object?
			this

		calculate: ->
			N_X = Math.round 2*Math.PI/@step
			N_Y = Math.round Math.PI/@step

			v = new THREE.Vector3
			vertices = []
			faces = []

			# Calculate vertices
			for x in [0..N_X]
				i = -Math.PI + x*@step

				for y in [0..N_Y]
					j = -Math.PI/2.0 + y*@step

					xx = 0
					yy = 0
					zz = 0

					t1 = Math.cos(@n1 * i/4)
					t1 = 1/@a1 * Math.abs(t1)
					t1 = Math.abs(t1)

					t2 = Math.sin(@n1 * i/4)
					t2 = 1/@a2 * Math.abs(t2)
					t2 = Math.abs(t2)
					raux1 = Math.pow(t1, @n3) + Math.pow(t2, @n4)

					r1 = Math.abs(raux1)
					r1 = Math.pow(r1, -1/@n2)

					t1 = Math.cos(@n1 * j/4)
					t1 = 1/@a1 * Math.abs(t1)
					t1 = Math.abs(t1)

					t2 = Math.sin(@n1 * j/4)
					t2 = 1/@a2 * Math.abs(t2)
					t2 = Math.abs(t2)

					raux2 = Math.pow(t1, @n3) + Math.pow(t2, @n4)

					r2 = Math.abs raux2
					r2 = Math.pow r2, (-1/@n2)

					xx = r1 * Math.cos(i) * r2 * Math.cos(j) * @scaler
					yy = r1 * Math.sin(i) * r2 * Math.cos(j) * @scaler
					zz = r2 * Math.sin(j) * @scaler

					v = new THREE.Vector3(xx, yy, zz)
					vertices.push(v)

			# Calculate faces
			for i in [0..N_X]
				for j in [0..N_Y]
					faces.push(new THREE.Face3(
						i * N_Y + j,
						i * N_Y + j + 1,
						(i + 1) * N_Y + j + 1
					))

					faces.push(new THREE.Face3(
						i * N_Y + j,
						(i + 1) * N_Y + j + 1,
						(i + 1) * N_Y + j
					))

			@geometry.vertices = vertices
			@geometry.faces = faces

			@geometry.computeFaceNormals();
			@geometry.computeVertexNormals();
			# @geometry.computeCentroids()

