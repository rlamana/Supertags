
namespace 'Supertags', (exports) ->
	class exports.Image
		scene: null
		camera: null
		renderer: null
		shape: null

		constructor: ->
			@scene = new THREE.Scene
			@camera = new THREE.PerspectiveCamera(
				20,    	# Field of view
				window.innerWidth / window.innerHeight, # Aspect ratio
				1,		# Near plane
				3000)	# Far plane

			@camera.position.set 1, 1, 10
			@camera.lookAt @scene.position
			@scene.add @camera

			light = new THREE.PointLight(0x430000)
			light.position.x = 10
			light.position.y = 50
			light.position.z = 130
			@scene.add light

			@renderer = new THREE.WebGLRenderer
			@renderer.setSize(window.innerWidth, window.innerHeight)
			@renderer.sortObjects = false

			# Supershape
			@shape = new Supertags.SuperShape()
			@scene.add @shape

			this.render()

		render: =>
			@renderer.render @scene, @camera

		animate: =>
			t = new Date().getTime()
			@camera.position.x = Math.sin(t/1000)*10
			@camera.position.z = Math.cos(t/1000)*10
			@camera.position.y = Math.cos(t/1000)*10
			@camera.lookAt @scene.position

			this.render()
			requestAnimationFrame(this.animate)

		appendTo: (element) ->
			container = document.createElement 'div'
			container.appendChild @renderer.domElement
			element.appendChild container
			element



