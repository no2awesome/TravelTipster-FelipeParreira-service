const pluckData = (collectionOrItem) => {
  if (Array.isArray(collectionOrItem)) {
    return collectionOrItem.dataValues;
  }

  return collectionOrItem.forEach(item => item.dataValues);
};

const functions = {};
functions.pluckData = pluckData;

export default functions;
