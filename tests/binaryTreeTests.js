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
let bNode = alphabetTree.insert('B', 'left', alphabetTree.root);
let aNode = alphabetTree.insert('A', 'left', bNode);
let dNode = alphabetTree.insert('D', 'right', bNode);
let cNode = alphabetTree.insert('C', 'left', dNode);
let eNode = alphabetTree.insert('E', 'right', dNode);
let gNode = alphabetTree.insert('G', 'right', alphabetTree.root);
let iNode = alphabetTree.insert('I', 'right', gNode);
let hNode = alphabetTree.insert('H', 'left', iNode);

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
const CORRECT_REVERSE = ['F',null,'G','B',null,'I','D','A',null,'H','E','C',null]


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

  describe('#getNode()', function() {
    it('should return the first instance of the node with matching value', function() {
      assert.deepStrictEqual(alphabetTree.getNode('A'), aNode );
      assert.deepStrictEqual(alphabetTree.getNode('H'), hNode );
    });
  });

  describe('#pathTo()', function() {
    it('should return the path to the passed value', function() {
      assert.deepStrictEqual(alphabetTree.getPathTo('A'),CORRECT_A_PATH);
    });
  });

  describe('#getLCA()', function() {
    it('should return the Least Common Ancester (LCA) of two nodes', function() {
      assert.deepStrictEqual(alphabetTree.getLCA('A', 'E'), 'B');
    });
  });

  describe('#reverse()', function() {
    it('should return the reverse of the tree', function() {
      //TODO: Get rid of #toArray dependency, create the reverse tree
      assert.deepStrictEqual(alphabetTree.reverse().toArray(), CORRECT_REVERSE);
    });
  });

});

