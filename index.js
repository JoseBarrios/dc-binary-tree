'use strict'

const BinaryTreeNode = require('binarytreenode');


class BinaryTree{

  constructor(value){
    this.root = new BinaryTreeNode(value);
  }

  static print(stack){
    var values = [];
    stack.forEach(function(node){
      values.push(node.value);
    })
    console.log(values);
  }

  getNodeByValue(targetValue, nthMatch){
    nthMatch = nthMatch  || 1;
    let targetNode = null;
    let currentMatches = 0;

    function search(node, value){
      if(!node)return false;
      let isMatch = node.value === value;
      currentMatches += isMatch? 1 : 0;
      let isNthMatch = currentMatches === nthMatch;
      if(isMatch && isNthMatch){
        targetNode = node;
        return true;
      }
      if(search(node.left, value) || search(node.right, value)){
        return true;
      }
    }
    search(this.root, targetValue)
    return targetNode;
  }


  appendChildNode(value, position, parentNode){
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


  BSF(){
    var stack = [];
    var queue = [];
    queue.push(this.root);

    while(queue.length){
      //Dequeue node at index 0 (remove from queue)
      var currentNode = queue.shift();
      //Add value to stack
      stack.push(currentNode.value);
      //Enqueue children (add to queue)
      if(currentNode.left){ queue.push(currentNode.left) }
      if(currentNode.right){ queue.push(currentNode.right); }
    }
    return stack;
  }


  DSF(transversalOrder){
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
      console.warn(`BinaryTree.DSF() argument must be a string of value
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
      //PRE: If node is not null, push value to order
      if(transversalOrder === PRE){ order.push(node.value); }
      if(node.left){ search(node.left) }
      //IN: If we've reached leftmost leaf, push value to order
      if(transversalOrder === IN){ order.push(node.value); }
      if(node.right){ search(node.right) }
      //POST: If we've reached left or rightmost leaf, push value to order
      if(transversalOrder === POST){ order.push(node.value); }
    }
    search(this.root);
    return order;
  }


  getLeafDepths(){
    var depths = [];
    function search(node, depth){
      if(node === null) return;
      if(!node.left && !node.right){ depths.push(depth); }
      if(node.left){ search(node.left, depth+1) }
      if(node.right){ search(node.right, depth+1) }
    }
    search(this.root, 0);
    return depths;
  }


  findPathToNode(target){
    var ancestors = [];
    function search(node, target){
      if(!node)return false;
      let nodeString = JSON.stringify(node);
      let targetString = JSON.stringify(target);
      let deepMatch = nodeString === targetString;
      if(deepMatch){ return true; }
      if(search(node.left, target) || search(node.right, target)){
        ancestors.unshift(node.value);
        return true;
      }
    }
    search(this.root, target)

    return ancestors.length? ancestors : null;
  }


  //Finds the path to the value provided. If there are multiple values that
  //match the criteria, the shortest path is returned unless specified in nthMatch
  findPathToValue(value, nthMatch){
    var ancestors = [];
    nthMatch = nthMatch  || 1;
    let currentMatches = 0;
    function search(node){
      //Null nodes cannot be target, return false
      if(!node)return false;

      let isMatch = node.value === value;
      if(isMatch){ currentMatches++; }
      let isTarget = isMatch && currentMatches === nthMatch;
      if(isTarget){ return true; }

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


  getLeastCommonAncester(a, b){
    //Check that both a and b exist
    if(this.findPath(a) && this.findPath(b)){
      //Iterate in pre-order, searching for a and b
      function search(node, a, b){
        //////////////////////
        // SEARCH RESULTS  //
        ////////////////////
        //If incorrect input, return null
        if(!node || !a || !b){ return null }
        //If a or b is found, return node reference
        if(a === node.value || b === node.value){ return node; }

        ////////////////////////////
        // PRE-ORDER TRASVERSAL  //
        //////////////////////////
        //Recurse LEFT nodes (first) until you find a or b
        var left = search(node.left, a, b);
        //Recurse RIGHT nodes (when no lefts) until you find a or b
        var right = search(node.right, a, b);

        //////////////
        // RESULT  //
        ////////////
        //If both left and right found, nodes are in separate branches
        if(left && right){ return node; }
        //Otherwise, check if left/right subtree is LCA
        return left? left : right;
      }
      return search(this, a, b).value;
    }
    else {return null}
  }


  reverse(){
    var reversedTree = new BinaryTreeNode(this.value);
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
    search(this, reversedTree);
    return reversedTree;
  }


  /////////////////////////////
  // CONSIDERING REMOVING THESE
  // //////////////////////////
  singlyLinkedSiblings(){
    var levelOrderNodes = this.BSFWithLevelDelimiter(null);
    for(var i = 0; i < levelOrderNodes.length-1; i++){
      if(levelOrderNodes[i] !== null){
        levelOrderNodes[i].next = levelOrderNodes[i+1];
      }
    }
    return levelOrderNodes;
  }


  BSFWithLevelDelimiter(delimiter){
    var delimiter = delimiter || null;
    var nodes = [];
    var queue = [];
    queue.push(this);
    while(queue.length){
      var levels = queue.length;
      while(levels > 0){
        var currentNode = queue.shift();
        nodes.push(currentNode);
        if(currentNode.left){ queue.push(currentNode.left) }
        if(currentNode.right){ queue.push(currentNode.right); }
        levels--;
      }
      nodes.push(delimiter)
    }
    return nodes;
  }
}

module.exports = BinaryTree;

