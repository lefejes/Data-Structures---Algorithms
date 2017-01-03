function Stack() {
    this._size = 0;
    this._storage = [];
}

Queue.prototype.isEmpty = function () {
    return this._storage.length === 0;
};

Queue.prototype.peek = function () {
    return !this.isEmpty() ? this._storage[0] : undefined;
};

Stack.prototype.push = function(data) {
    var size = ++this._size;
    this._storage[size] = data;
};

Stack.prototype.pop = function() {
    var size = this._size;
    var poppedData;

    if (size) {
        deletedData = this._storage[size];

        delete this._storage[size];
        this._size--;

        return poppedData;
    }
};
