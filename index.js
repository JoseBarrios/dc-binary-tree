'use strict'

const BinaryTreeNode = require('binarytreenode');


class BinaryTree{

  constructor(value){
    this.root = new BinaryTreeNode(value);
  }



  getNode(targetValue){
    let targetNode = null;
    //Uses pre-order transversal
    function search(node){
      if(node.value === targetValue){ targetNode = node; }
      if(node.left && !targetNode){ search(node.left) };
      if(node.right && !targetNode){ search(node.right) };
    }
    search(this.root)
    return targetNode;
  }


  insert(value, position, parentNode){
    const DEFAULT_LEAF_POSITION = 'LEFT';
    position = position.toUpperCase() || DEFAULT_LEAF_POSITION;
    parentNode = parentNode || this.root;
    switch(position){
      case 'LEFT':
        parentNode.insertLeft(value);
        return parentNode.left;
      case 'RIGHT':
        parentNode.insertRight(value);
        return parentNode.right;
      default:
        console.error(`Invalid position ${position}, arg must be 'left' or 'right'`);
    }
  }


  toArray(delimiter){
    delimiter = delimiter || null;
    let array = [];
    let queue = [];
    let level = 0;

    queue.push(this.root);
    while(queue.length){
      let nodesInLevel = queue.length;
      while(nodesInLevel){
        let currentNode = queue.shift();
        array.push(currentNode.value);
        if(currentNode.left){ queue.push(currentNode.left) }
        if(currentNode.right){ queue.push(currentNode.right); }
        nodesInLevel--;
      }
      array.push(null);
      level++;
    }
    return array;
  }


  //Also known as Level Order Transversal
  BFS(){
    var stack = [];
    var queue = [];
    let depth = 0;
    queue.push(this.root);

    while(queue.length){
      let level = queue.length;
      while(level){
        var currentNode = queue.shift();
        stack.push(currentNode.value);
        if(currentNode.left){ queue.push(currentNode.left) }
        if(currentNode.right){ queue.push(currentNode.right); }
        level--;
      }
      depth++;
    }
    return stack;
  }

  preOrder(){ this.DFS('PREORDER')}
  inOrder(){ this.DFS('INORDER')}
  postOrder(){ this.DFS('POSTORDER')}

  DFS(transversalOrder){
    //Most efficient for duplicating trees
    const PRE = 'PREORDER';
    //Most commonly used for binary search trees (due to order)
    const IN = 'INORDER';
    //Most efficient for deleting or freeing nodes
    const POST = 'POSTORDER';

    const DEFAULT = IN;
    var order = [];

    ///////////////////
    // Validate input
    ///////////////////
    transversalOrder = transversalOrder == null? DEFAULT : transversalOrder;
    let invalidInput = typeof transversalOrder !== 'string';
    invalidInput = invalidInput || transversalOrder !== PRE;
    invalidInput = invalidInput && transversalOrder !== IN;
    invalidInput = invalidInput && transversalOrder !== POST;
    //If transversal transversalOrder arg is not a string, use default order
    if(invalidInput){
      console.warn(`BinaryTree.DFS() argument must be a string of value
      'PREORDER', 'INORDER', or 'POSTORDER'. You passed '${transversalOrder}'.
      Defaulting to '${DEFAULT}'`);
      transversalOrder = DEFAULT;
    }
    var transversalOrder = transversalOrder.toUpperCase() || DEFAULT;

    //////////
    // SEARCH
    //////////
    function search(node){
      if(node === null) return;
      if(transversalOrder === PRE){ order.push(node.value); }
      if(node.left){ search(node.left) }
      if(transversalOrder === IN){ order.push(node.value); }
      if(node.right){ search(node.right) }
      if(transversalOrder === POST){ order.push(node.value); }
    }
    search(this.root);
    return order;
  }


  getLeafDepths(){
    var depths = [];
    function getDepth(node, level){
      if(node.left){ getDepth(node.left, level+1) }
      //In-order nodes: gets smallest items in binary tree
      if(node.right){ getDepth(node.right, level+1) }
      //Leafs and pruned leafs only: this can include parents, if prev pruned
      if(!node.left && !node.right){ depths.push(level); }
    }
    getDepth(this.root, 0);
    return depths;
  }

  getMaxDepth(){
    let maxDepth = 0;
    let currentDepth = 0;
    function depth(node, level){
      if(node.left){ depth(node.left, level+1) }
      if(node.right){ depth(node.right, level+1) }
      maxDepth = Math.max(level, maxDepth);
      return maxDepth;
    }
    return depth(this.root, 0);
  }


  //Finds the path to the value provided.
  getPathTo(value, search){
    var ancestors = [];
    function search(node){
      //Null nodes cannot be the target, return false
      if(!node){ return false; }

      let isMatch = node.value === value;
      if(isMatch){ return true; }

      //If current node's left/right is target value
      if(search(node.left) || search(node.right)){
        //Enqueue current node value
        ancestors.unshift(node.value);
        return true;
      }
    }
    search(this.root)
    return ancestors.length? ancestors : null;
  }


  getLCA(a, b){
    //Check that both a and b exist
    if(this.getPathTo(a) && this.getPathTo(b)){
      //Iterate in pre-order, searching for a and b
      function search(node, a, b){
        //If incorrect input, return null
        if(!node || !a || !b){ return null }
        //If a or b is found, return node reference
        if(a === node.value || b === node.value){ return node; }

        // PRE-ORDER TRASVERSAL
        var left = search(node.left, a, b);
        var right = search(node.right, a, b);

        //RESULT
        //If both left and right found, nodes are in separate branches
        if(left && right){ return node; }
        //Otherwise, check if left/right subtree is LCA
        return left? left : right;
      }
      return search(this.root, a, b).value;
    }
    else {return null}
  }


  reverse(){
    var reversedTree = new BinaryTree(this.root.value);
    function search(node, reversedNode){
      if(node === null){return null}
      if(node.left){
        reversedNode.insertRight(node.left.value);
        search(node.left, reversedNode.right)
      }
      if(node.right){
        reversedNode.insertLeft(node.right.value);
        search(node.right, reversedNode.left)
      }
    }
    search(this.root, reversedTree.root);
    return reversedTree;
  }

}

module.exports = BinaryTree;

