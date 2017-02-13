# Usage

#### 1. Building the tree:

```javascript
var BinaryTree = require('binarytree');

var binaryTree = new BinaryTree('F');
let bNode = binaryTree.appendChildNode('B', 'left', alphabetTree.root);
let aNode = binaryTree.appendChildNode('A', 'left', bNode);
let dNode = binaryTree.appendChildNode('D', 'right', bNode);
let cNode = binaryTree.appendChildNode('C', 'left', dNode);
let eNode = binaryTree.appendChildNode('E', 'right', dNode);
let gNode = binaryTree.appendChildNode('G', 'right', binaryTree.root);      
let iNode = binaryTree.appendChildNode('I', 'right', gNode);                 
let hNode = binaryTree.appendChildNode('H', 'left', iNode);   
```
![image](https://upload.wikimedia.org/wikipedia/commons/d/d4/Sorted_binary_tree_preorder.svg)

#### 2. Transversing the tree:
```javascript
// Breath Search First
let breathTransversal = binaryTree.BSF(); //['F','B','G','A','D','I','C','E','H'];    

// Depth Search First
let preTransversal = binaryTree.DSF('preorder');//['F','B','A','D','C','E','G','I','H'];             
let inorderTransversal = binaryTree.DSF('inorder'); //['A','B','C','D','E','F','G','H','I'];              
let postorderTransversal = binaryTree.DSF('postorder');//['A','C','E','D','B','H','I','G','F'];   
   
```