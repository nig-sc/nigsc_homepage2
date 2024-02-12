#!/usr/bin/env bash


# Get the name of the directory where the script is located.
function dirName() {
    DIR="$(dirname "$(readlink -f "$0")")"
    basename "$DIR"
}



function deploy() {

    dest_dir=$HOME/public_html

    npx browserslist@latest --update-db
    yarn run build
    rm -Rf ${dest_dir}/$1
    cp -rp build $dest_dir/$1

}


deploy $(dirName)
