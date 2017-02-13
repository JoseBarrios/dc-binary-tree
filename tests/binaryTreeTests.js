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
const CORRECT_DSF_PREORDER = ['F','B','A','D','C','E','G','I','H'];
const CORRECT_DSF_INORDER = ['A','B','C','D','E','F','G','H','I'];
const CORRECT_DSF_POSTORDER = ['A','C','E','D','B','H','I','G','F'];
const CORRECT_BSF = ['F','B','G','A','D','I','C','E','H'];
const CORRECT_LEAF_DEPTHS = [ 2, 3, 3, 3 ];
const CORRECT_A_PATH = ['F','B'];
const CORRECT_A1_PATH = ['F','B', 'A'];
const CORRECT_E_PATH = ['F','B','D'];
const CORRECT_H_PATH = ['F','G','I'];


describe('BinaryTree', function() {

  describe('#DSF()', function() {
    it('should return an array of pre-ordered node values', function() {
      assert.deepStrictEqual(alphabetTree.DSF('PREORDER'),CORRECT_DSF_PREORDER);
    });
    it('should return an array of in-ordered node values', function() {
      assert.deepStrictEqual(alphabetTree.DSF(),CORRECT_DSF_INORDER);
      assert.deepStrictEqual(alphabetTree.DSF('INORDER'),CORRECT_DSF_INORDER);
    });
    it('should return an array of post-ordered node values', function() {
      assert.deepStrictEqual(alphabetTree.DSF('POSTORDER'),CORRECT_DSF_POSTORDER);
    });
  });

  describe('#BSF()', function() {
    it('should return an array of node values by breath order', function() {
      assert.deepStrictEqual(alphabetTree.BSF(),CORRECT_BSF);
    });
  });

  describe('#getNodeByValue()', function() {
    it('should return the first instance of the node with matching value', function() {
      assert.deepStrictEqual(alphabetTree.getNodeByValue('A'), aNode );
      //assert.deepStrictEqual(alphabetTreeWithRepetitions.getNodeByValue('A', 2), a2Node );
    });
  });

  describe('#findPathToValue()', function() {
    it('should return the path to the passed value', function() {
      assert.deepStrictEqual(alphabetTree.findPathToValue('A'),CORRECT_A_PATH);
      //assert.deepStrictEqual(alphabetTreeWithRepetitions.findPathToValue('A', 2),CORRECT_A1_PATH);
    });
  });

  describe('#findPathToNode()', function() {
    it('should return the path to the passed value', function() {
      assert.deepStrictEqual(alphabetTree.findPathToNode(aNode),CORRECT_A_PATH);
      //assert.deepStrictEqual(alphabetTreeWithRepetitions.findPathToNode(a2Node),CORRECT_A1_PATH);
    });
  });

  describe('#getLeafDepths()', function() {
    it('should return an array of leaf depths', function() {
      assert.deepStrictEqual(alphabetTree.getLeafDepths(), CORRECT_LEAF_DEPTHS);
    });
  });
});

