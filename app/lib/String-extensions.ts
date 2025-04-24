String.prototype.countOfWords = function (): number {
  return this.length === 0 ? 0 : this.trim().split(" ").length;
};
