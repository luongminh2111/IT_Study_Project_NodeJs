{ pkgs }: {
  deps = [
    pkgs.man
    pkgs.nodePackages.nodemon
    pkgs.nodejs
    pkgs.gcc
    pkgs.jdk8
    pkgs.python2
  ];
}