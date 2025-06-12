import React from 'react';

export default function TeaFullCard({tea}) {
  return (
    <>
      <h1>{tea.name}</h1>
      <h4>{tea.location}</h4>
      <img src={tea.image} alt='Tea' width="600" height="400" />
      <p>{tea.description}</p>
    </>
  );
}
