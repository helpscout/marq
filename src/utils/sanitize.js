const sanitize = text => {
  return text.toString().replace(/\"/g, '"');
};

export default sanitize;
