# Usage

var BinaryTree = require('binarytree');

var wikiTree = new BinaryTree('F')
wikiTree.insertLeft('B');
wikiTree.left.insertLeft('A');
wikiTree.left.insertRight('D');
wikiTree.left.right.insertLeft('C');
wikiTree.left.right.insertRight('E');
wikiTree.insertRight('G');
wikiTree.right.insertRight('I');
wikiTree.right.right.insertLeft('H');
