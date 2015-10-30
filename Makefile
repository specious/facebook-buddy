default: build

build:
	mkdir dist
	zip -r dist/facebook-buddy.zip manifest.json *.html *.css *.js gfx

clean:
	rm -rfv dist