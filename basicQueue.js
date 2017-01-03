function Queue() {
    this._storage = [];
}

Queue.prototype.size = function() {
    return this._newestIndex - this._oldestIndex;
};

Queue.prototype.isEmpty = function () {
    return this._storage.length === 0;
};

Queue.prototype.peek = function () {
    return !this.isEmpty() ? this._storage[0] : undefined;
};

Queue.prototype.enqueue = function(data) {
    this._storage[this._newestIndex] = data;
    this._newestIndex++;
};

Queue.prototype.dequeue = function() {
    var oldestIndex = this._oldestIndex;
    var newestIndex = this._newestIndex;
    var poppedData;

    if (oldestIndex !== newestIndex) {
        deletedData = this._storage[oldestIndex];
        delete this._storage[oldestIndex];
        this._oldestIndex++;

        return poppedData;
    }
};
