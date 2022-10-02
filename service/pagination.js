const pagePagination = (arr, limit, page) => {
  const countPage = Math.ceil(arr.length / limit);
  const paginArr = new Array(countPage);
  for (let i = 0; i < paginArr.length; i++) {
    paginArr[i] = arr.slice(i * limit, (i + 1) * limit);
  }
  return page ? paginArr[page - 1] : paginArr[0];
};

module.exports = pagePagination;
