'use strict'

////////////////////
///////////////////
//              //
// BINARY TREE //
//            //
///////////////
//////////////

class BinaryTree{

    //Eventually we want to use ES6 args with default values
    constructor(value, leftNode, rightNode){
        this.value = value || null;
        this.left = leftNode || null;
        this.right = rightNode || null;
    }

    insertLeft(value){
        var node = new BinaryTree(value);
        this.left = node;
        return this.left;
    }

    insertRight(value){
        var node = new BinaryTree(value);
        this.right = node;
        return this.right;
    }

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


    BSF(){
        var nodes = [];
        var queue = [];
        queue.push(this);
        while(queue.length){
            var currentNode = queue.shift();
            nodes.push(currentNode);
            if(currentNode.left){ queue.push(currentNode.left) }
            if(currentNode.right){ queue.push(currentNode.right); }
        }
        return nodes;
    }

    DSF(order){
        var order = order.toUpperCase() || 'PRE'
        var nodes = [];
        function recurse(node){
            if(node === null) return;
            if(order === 'PRE'){ nodes.push(node); }
            if(node.left){ recurse(node.left) }
            if(order === 'IN'){ nodes.push(node); }
            if(node.right){ recurse(node.right) }
            if(order === 'POST'){ nodes.push(node); }
        }
        recurse(this);
        return nodes;
    }

    getDepths(){
        var depths = [];
        function recurse(node, depth){
            if(node === null) return;
            if(!node.left && !node.right){ depths.push(depth); }
            if(node.left){ recurse(node.left, depth+1) }
            if(node.right){ recurse(node.right, depth+1) }
        }
        recurse(this, 0);
        return depths;
    }

    findPath(value){
        var ancestors = [];
        function recurse(node, value){
            if(!node)return false;
            if(node.value === value){ return true; }
            if(recurse(node.left, value) || recurse(node.right, value)){
                ancestors.unshift(node.value);
                return true;
            }
        }
        recurse(this, value)
        return ancestors.length? ancestors : null;
    }

    getLeastCommonAncester(a, b){
        //Check that both a and b exist
        if(this.findPath(a) && this.findPath(b)){
            //Iterate in pre-order, searching for a and b
            function recurse(node, a, b){
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
                var left = recurse(node.left, a, b);
                //Recurse RIGHT nodes (when no lefts) until you find a or b
                var right = recurse(node.right, a, b);

                //////////////
                // RESULT  //
                ////////////
                //If both left and right found, nodes are in separate branches
                if(left && right){ return node; }
                //Otherwise, check if left/right subtree is LCA
                return left? left : right;
            }
            return recurse(this, a, b).value;
        }
        else {return null}
    }


    reverse(){
        var reversedTree = new BinaryTree(this.value);
        function recurse(node, reversedNode){
            if(node === null){return null}
            if(node.left){
                reversedNode.insertRight(node.left.value);
                recurse(node.left, reversedNode.right)
            }
            if(node.right){
                reversedNode.insertLeft(node.right.value);
                recurse(node.right, reversedNode.left)
            }
        }
        recurse(this, reversedTree);
        return reversedTree;
    }


}

module.exports = BinaryTree;

