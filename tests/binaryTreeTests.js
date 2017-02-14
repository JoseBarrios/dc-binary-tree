'use strict'

var BinaryTree = require('../index.js');
var assert = require('assert');

/*  Test tree is a replica of the tree found in wikipedia under:
 *  https://en.wikipedia.org/wiki/Tree_traversal
                 F
              B     G
            A   D     I
               C E     H
 */
var alphabetTree = new BinaryTree('F')
let bNode = alphabetTree.appendChildNode('B', 'left', alphabetTree.root);
let aNode = alphabetTree.appendChildNode('A', 'left', bNode);
let dNode = alphabetTree.appendChildNode('D', 'right', bNode);
let cNode = alphabetTree.appendChildNode('C', 'left', dNode);
let eNode = alphabetTree.appendChildNode('E', 'right', dNode);
let gNode = alphabetTree.appendChildNode('G', 'right', alphabetTree.root);
let iNode = alphabetTree.appendChildNode('I', 'right', gNode);
let hNode = alphabetTree.appendChildNode('H', 'left', iNode);

//Correct outputs
const CORRECT_A_PATH = ['F','B'];
const CORRECT_E_PATH = ['F','B','D'];
const CORRECT_H_PATH = ['F','G','I'];
const CORRECT_LEAF_DEPTHS = [ 2, 3, 3, 3 ];
const CORRECT_BFS = ['F','B','G','A','D','I','C','E','H'];
const CORRECT_DFS_PREORDER = ['F','B','A','D','C','E','G','I','H'];
const CORRECT_DFS_INORDER = ['A','B','C','D','E','F','G','H','I'];
const CORRECT_DFS_POSTORDER = ['A','C','E','D','B','H','I','G','F'];
const CORRECT_MAX_DEPTH = 3;
const CORRECT_ARRAY = ['F',null,'B','G', null, 'A','D','I',null,'C','E','H',null];


describe('BinaryTree', function() {

  describe('#DFS()', function() {
    it('should return an array of pre-ordered node values', function() {
      assert.deepStrictEqual(alphabetTree.DFS('PREORDER'),CORRECT_DFS_PREORDER);
    });
    it('should return an array of in-ordered node values', function() {
      assert.deepStrictEqual(alphabetTree.DFS(),CORRECT_DFS_INORDER);
      assert.deepStrictEqual(alphabetTree.DFS('INORDER'),CORRECT_DFS_INORDER);
    });
    it('should return an array of post-ordered node values', function() {
      assert.deepStrictEqual(alphabetTree.DFS('POSTORDER'),CORRECT_DFS_POSTORDER);
    });
  });

  describe('#BFS()', function() {
    it('should return an array of node values by breath order', function() {
      assert.deepStrictEqual(alphabetTree.BFS(),CORRECT_BFS);
    });
  });

  describe('#toArray()', function() {
    it('should return an array representation of the binary tree', function() {
      assert.deepStrictEqual(alphabetTree.toArray(), CORRECT_ARRAY);
    });
  });


  describe('#getLeafDepths()', function() {
    it('should return an array of leaf depths', function() {
      assert.deepStrictEqual(alphabetTree.getLeafDepths(), CORRECT_LEAF_DEPTHS);
    });
  });

  describe('#getMaxDepth()', function() {
    it('should return the level of the deepest leaf', function() {
      assert.deepStrictEqual(alphabetTree.getMaxDepth(),CORRECT_MAX_DEPTH);
    });
  });

  describe('#getNodeByValue()', function() {
    it('should return the first instance of the node with matching value', function() {
      assert.deepStrictEqual(alphabetTree.getNodeByValue('A'), aNode );
    });
  });

  describe('#findPathToValue()', function() {
    it('should return the path to the passed value', function() {
      assert.deepStrictEqual(alphabetTree.findPathToValue('A'),CORRECT_A_PATH);
    });
  });

  describe('#findPathToNode()', function() {
    it('should return the path to the passed value', function() {
      assert.deepStrictEqual(alphabetTree.findPathToNode(aNode),CORRECT_A_PATH);
    });
  });

});

