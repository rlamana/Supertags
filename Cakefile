
{exec} = require 'child_process'

task 'build', 'Build Supertags Application', (options) ->
	exec 'coffee --join supertags.js  --compile --output . src', (err, stdout, stderr) ->
        console.log stdout + stderr

task 'watch', 'Compile and watch Supertags Application', (options) ->
	command = 'coffee --watch --join supertags.js --compile --output . src'
	console.log command
	exec command, (err, stdout, stderr) ->
        console.log stdout + stderr

task 'compile', 'Compile supertags files into build/', (options) ->
	exec 'coffee --compile --output build/ src', (err, stdout, stderr) ->
        console.log stdout + stderr

task 'clean', 'Clean all compilation', (options) ->
	exec 'rm -Rf build/*', (err, stdout, stderr) ->
		exec 'rm supertags.js', (err, stdout, stderr) ->
        	console.log stdout + stderr