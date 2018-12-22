import React from 'react'; // eslint-disable-line no-unused-vars

const Question = (props) => {
  const { data } = props;

  return (
    <li>
      {data.Content}
      <br />
      {data.PostedDate}
    </li>
  );
};

export default Question;
