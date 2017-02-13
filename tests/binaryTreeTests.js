'use strict'

var BinaryTree = require('../index.js');
var assert = require('assert');


/*  Test tree is a replica of the tree found in wikipedia under:
 *  https://en.wikipedia.org/wiki/Tree_traversal
 */
var testTree = new BinaryTree('F')
let bNode = testTree.appendChildNode('B', 'left', testTree.root);
let aNode = testTree.appendChildNode('A', 'left', bNode);
let dNode = testTree.appendChildNode('D', 'right', bNode);
let cNode = testTree.appendChildNode('C', 'left', dNode);
let eNode = testTree.appendChildNode('E', 'right', dNode);
let gNode = testTree.appendChildNode('G', 'right', testTree.root);
let iNode = testTree.appendChildNode('I', 'right', gNode);
let hNode = testTree.appendChildNode('H', 'left', iNode);

//Correct outputs
const CORRECT_DSF_PREORDER = ['F','B','A','D','C','E','G','I','H'];
const CORRECT_DSF_INORDER = ['A','B','C','D','E','F','G','H','I'];
const CORRECT_DSF_POSTORDER = ['A','C','E','D','B','H','I','G','F'];
const CORRECT_BSF = ['F','B','G','A','D','I','C','E','H'];


describe('BinaryTree', function() {

  describe('#DSF()', function() {
    it('should return an array of pre-ordered node values', function() {
      assert.deepStrictEqual(testTree.DSF(),CORRECT_DSF_PREORDER);
      assert.deepStrictEqual(testTree.DSF('PREORDER'),CORRECT_DSF_PREORDER);
    });
    it('should return an array of in-ordered node values', function() {
      assert.deepStrictEqual(testTree.DSF('INORDER'),CORRECT_DSF_INORDER);
    });
    it('should return an array of post-ordered node values', function() {
      assert.deepStrictEqual(testTree.DSF('POSTORDER'),CORRECT_DSF_POSTORDER);
    });
  });


  describe('#BSF()', function() {
    it('should return an array of node values by breath order', function() {
      assert.deepStrictEqual(testTree.BSF(),CORRECT_BSF);
    });
  });


});
