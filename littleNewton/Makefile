
COMPILER=closure-compiler/closure-compiler-v20160911.jar
SOURCE_FILES=src/littleNewton.js src/v3d.js src/core.js src/body.js src/rubberband.js src/repellant.js src/gravity.js
OUTPUT_FILE=dist/littleNewton.js
FLAGS=--compilation_level SIMPLE

all:
	java -jar $(COMPILER) $(FLAGS) --js $(SOURCE_FILES) --js_output_file $(OUTPUT_FILE)
