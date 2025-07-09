const GuestService = () => {
  const names = ["24-Hour room service","Tour & excursions","Meeting Facilities","Babysitting on reques",];
  return (
    <ul>
      {names.map((data, index) => (
        <li key={index}>
          <i className="fa fa-check" />
          {data}
        </li>
      ))}
    </ul>
  );
};

export default GuestService;
