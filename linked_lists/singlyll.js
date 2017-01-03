function Node(data){
  this.data = data;
  this.next = null;
}

function LinkedList() {
  this.length = 0;
  this.head = null;
}

LinkedList.prototype.add = function(val) {
  if (!val) {
    throw new Error("Please pass in a value!");
  }
  var node = new Node(val);
  var currentNode = this.head;

  if (!currentNode) {
    this.head = node;
    this.length += 1;
    return node;
  }

  while (currentNode.next) {
    currentNode = currentNode.next;
  }
  currentNode.next = node;
  this.length += 1;
  return node;
};

var sll = new LinkedList();
