#!/bin/bash
SOURCE_FILE="$2/Main.$1"

compile_and_run()
{
  COMPILER_OUTPUT=$($1 2>&1 >/dev/null)
  if [ -z "$COMPILER_OUTPUT" ]; 
  then
    echo -e "$($2)"
  else 
    echo -e "${COMPILER_OUTPUT//$2/}"
  fi
}

case $1 in
  java)
    compile_and_run "javac $SOURCE_FILE" "java -cp $2 Main"
    ;;
  c)
    compile_and_run "gcc $SOURCE_FILE -o $2/Main" "${2}/Main"
    ;;
  js)
    compile_and_run "" "node $SOURCE_FILE "
    ;;
  py)
    compile_and_run "" "python $SOURCE_FILE"
    ;;
  *)
    echo -n "Unsupported language"
    ;;
esac