var BinaryTree = require('../index.js');
var assert = require('assert');


/*  Test tree is a replica of the tree found in wikipedia under:
 *  https://en.wikipedia.org/wiki/Tree_traversal
 */
var testTree = new BinaryTree('F')
//testTree.root.insertLeft('B');//DEPRECATED
testTree.appendChildNode('B', 'left', testTree.root);
testTree.root.left.insertLeft('A');
testTree.root.left.insertRight('D');
testTree.root.left.right.insertLeft('C');
testTree.root.left.right.insertRight('E');
//testTree.insertRight('G');//DEPRECATED
testTree.root.insertRight('G');
testTree.root.right.insertRight('I');
testTree.root.right.right.insertLeft('H');

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
