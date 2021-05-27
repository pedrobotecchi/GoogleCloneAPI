function generateResultItem (searchString) {
  const randomNumber = Math.round(Math.random() * 100);
  capitalizedSearchString = searchString[0].toUpperCase() + searchString.slice(1);
  searchTextWithNoSpaces = searchString.replace(/\s/, '');
  searchTextURL = `www.${searchTextWithNoSpaces}${randomNumber}.com.br`;

  return ({
    search: searchString,
    href: searchTextURL,
    description: randomNumber + ': Accelerating Engineering Results & Business Outcomes. Daitan provides engineering expertise in a wide range of technologies, frameworks and tools. Our software development approach applies data-driven techniques such as, Artificial Intelligence, Machine Learning, Data Engineering, BI and Analytics.',
    homeURL: `${capitalizedSearchString}${randomNumber}: Home`,
  })
}

module.exports = {
  generateResults: function (searchString) {
    const returnedResults = [
      generateResultItem(searchString),generateResultItem(searchString),generateResultItem(searchString),generateResultItem(searchString),generateResultItem(searchString),
      generateResultItem(searchString),generateResultItem(searchString),generateResultItem(searchString),generateResultItem(searchString),generateResultItem(searchString)   
    ]
    return returnedResults;
  },
}